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
