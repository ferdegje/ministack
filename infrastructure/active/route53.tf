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

resource "aws_route53_record" "graphql" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "graphql-${local.project}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.appsync.domain_name
    zone_id                = aws_cloudfront_distribution.appsync.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-dev" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = local.project
  type    = "CNAME"
  ttl     = "5"

  records        = ["alias.zeit.co"]
}
