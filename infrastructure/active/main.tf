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
  region          = var.region
  accountId       = var.accountId
  domain          = var.domain
  project         = var.project
  projectLongName = var.projectLongName
}

variable "region" {
  default = ""
}
variable "accountId" {
  default = ""
}
variable "domain" {
  default = ""
}
variable "project" {
  default = ""
}
variable "projectLongName" {
  default = ""
}

data "aws_route53_zone" "primary" {
  name = "${local.domain}."
}
