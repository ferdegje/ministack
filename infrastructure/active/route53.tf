data "aws_route53_zone" "selected" {
  name = "${local.domain}."
}

resource "aws_route53_record" "infrastructure" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = aws_s3_bucket.infrastructure.bucket
  type    = "A"

  alias {
    name                   = "s3-website.${local.region}.amazonaws.com"
    zone_id                = aws_s3_bucket.infrastructure.hosted_zone_id
    evaluate_target_health = true
  }
}

