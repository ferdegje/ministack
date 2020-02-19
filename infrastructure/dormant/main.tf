# Configure the AWS Provider
provider "aws" {
  region = "eu-west-2"
}

provider "aws" {
  region = "us-east-1"
  alias  = "us_east_1"
}

terraform {
  backend "s3" {
    bucket = "terraform-state-jmf"
    key    = "github.com/ferdegje/ministack/terraform.tfstate"
    region = "eu-west-2"
  }
}

locals {
  region          = "eu-west-2"
  accountId       = "314027424334"
  domain          = "nokdo.com"
  project         = "ministack"
  projectLongName = "Ministack demo"
}

data "aws_route53_zone" "primary" {
  name = "${local.domain}."
}

resource "aws_api_gateway_account" "demo" {
  cloudwatch_role_arn = aws_iam_role.cloudwatch.arn
}

resource "aws_iam_role" "cloudwatch" {
  name = "api_gateway_cloudwatch_${local.project}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy" "cloudwatch" {
  name = "Role-Policy-CloudWatch-API-GW-${local.project}"
  role = aws_iam_role.cloudwatch.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
EOF

}

