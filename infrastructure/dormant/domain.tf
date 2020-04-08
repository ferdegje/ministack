data "aws_route53_zone" "primary" {
  name = "${local.domain}."
}