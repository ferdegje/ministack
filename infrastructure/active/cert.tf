resource "aws_acm_certificate" "cert" {
  domain_name       = "*.${local.domain}"
  validation_method = "DNS"
  provider          = aws.us_east_1
}

resource "aws_route53_record" "cert_validation" {
  name     = aws_acm_certificate.cert.domain_validation_options[0].resource_record_name
  type     = aws_acm_certificate.cert.domain_validation_options[0].resource_record_type
  zone_id  = data.aws_route53_zone.primary.id
  records  = [aws_acm_certificate.cert.domain_validation_options[0].resource_record_value]
  ttl      = 60
  provider = aws.us_east_1
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
  provider                = aws.us_east_1
}

