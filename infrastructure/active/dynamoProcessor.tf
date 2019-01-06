# resource "aws_lambda_event_source_mapping" "dynamo_processor" {
#   event_source_arn  = "${aws_dynamodb_table.kids.stream_arn}"
#   function_name     = "${aws_lambda_function.dynamo_processor.arn}"
#   starting_position = "LATEST"
# }

resource "aws_lambda_function" "dynamo_processor" {
  filename         = "../../dynamo_processor/lambda_function_payload.zip"
  function_name    = "${local.project}_DynamoProcessor"
  role             = "${aws_iam_role.iam_for_lambda.arn}"
  handler          = "lambda.handler"
  source_code_hash = "${base64sha256(file("../../dynamo_processor/lambda_function_payload.zip"))}"
  runtime          = "nodejs8.10"
  timeout          = 15
  memory_size      = 3008

  environment {
    variables = {
      foo = "bar"
    }
  }

  tags = {
    Project = "${local.projectLongName}"
  }
}

resource "aws_cloudwatch_log_group" "dynamo_processor" {
  name              = "/aws/lambda/${aws_lambda_function.dynamo_processor.function_name}"
  retention_in_days = 14
}