data "aws_route53_zone" "primary" {
  name = "${local.domain}."
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = local.project
  type    = "CNAME"
  ttl     = "5"

  records        = ["alias.zeit.co"]
}
