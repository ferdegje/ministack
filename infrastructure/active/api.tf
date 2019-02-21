resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.example.arn}"
  principal     = "apigateway.amazonaws.com"
}

resource "aws_lambda_function" "example" {
  filename         = "../../api/lambda_function_payload.zip"
  function_name    = "${local.project}_Endpoints"
  role             = "${aws_iam_role.iam_for_lambda.arn}"
  handler          = "lambda.handler"
  source_code_hash = "${base64sha256(file("../../api/lambda_function_payload.zip"))}"
  runtime          = "nodejs8.10"
  timeout          = 4
  memory_size      = 3008

  environment {
    variables = {
      projectName = "${local.project}"
      cognitoPoolId = "${aws_cognito_user_pool.pool.id}"
      cognitoClientId = "${aws_cognito_user_pool_client.client.id}"
    }
  }

  tags = {
    Project = "${local.projectLongName}"
  }
}

resource "aws_api_gateway_rest_api" "example" {
  name        = "${local.projectLongName} API"
  description = "Terraform"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  parent_id   = "${aws_api_gateway_rest_api.example.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = "${aws_api_gateway_rest_api.example.id}"
  resource_id   = "${aws_api_gateway_resource.proxy.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.example.invoke_arn}"
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.example.id}"
  resource_id   = "${aws_api_gateway_rest_api.example.root_resource_id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_root.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.example.invoke_arn}"
}

module "MyResourceCors" {
  source = "github.com/carrot/terraform-api-gateway-cors-module"
  resource_name = "MyResource"
  resource_id = "${aws_api_gateway_resource.proxy.id}"
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
}

resource "aws_api_gateway_deployment" "example" {
  depends_on = [
    "aws_api_gateway_integration.lambda",
    "aws_api_gateway_integration.lambda_root",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  stage_name  = "test"
}

resource "aws_api_gateway_domain_name" "example" {
  domain_name = "${local.project}api.${local.domain}"

  certificate_arn = "${aws_acm_certificate.cert.arn}"
}

# Example DNS record using Route53.
# Route53 is not specifically required; any DNS host can be used.
resource "aws_route53_record" "example" {
  zone_id = "${data.aws_route53_zone.primary.id}" # See aws_route53_zone for how to create this

  name = "${aws_api_gateway_domain_name.example.domain_name}"
  type = "A"

  alias {
    name                   = "${aws_api_gateway_domain_name.example.cloudfront_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.example.cloudfront_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_api_gateway_base_path_mapping" "test" {
  api_id      = "${aws_api_gateway_rest_api.example.id}"
  stage_name  = "${aws_api_gateway_deployment.example.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.example.domain_name}"
}

resource "aws_cloudwatch_log_group" "example" {
  name              = "/aws/lambda/${aws_lambda_function.example.function_name}"
  retention_in_days = 14
}

output "api_url" {
  value = "https://${aws_api_gateway_domain_name.example.domain_name}/"
}