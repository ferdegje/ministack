data "aws_route53_zone" "selected" {
  name         = "${local.domain}."
}

resource "aws_route53_record" "www" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "${local.project}.${local.domain}"
  type    = "A"

  alias {
    name                   = "${aws_s3_bucket.www.bucket_domain_name}"
    zone_id                = "${aws_s3_bucket.www.hosted_zone_id}"
    evaluate_target_health = true
  }
}