data "aws_route53_zone" "selected" {
  name = "${local.domain}."
}

resource "aws_route53_record" "www-dev" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = local.project
  type    = "CNAME"
  ttl     = "5"

  records        = ["alias.zeit.co"]
}
