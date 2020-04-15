locals {
  region          = "eu-west-2"
  accountId       = "314027424334"
  domain          = "nokdo.com"
  project         = "ministack"
  projectLongName = "Ministack demo"
}

output "region" {
    value = local.region
}

output "domain" {
    value = local.domain
}

output "project" {
    value = local.project
}

output "projectLongName" {
    value = local.projectLongName
}