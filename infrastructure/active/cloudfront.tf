resource "aws_cloudfront_distribution" "appsync" {
  origin {
    domain_name = trimsuffix(trimprefix(aws_appsync_graphql_api.test.uris.GRAPHQL,"https://"),"/graphql")
	origin_id = format("Custom-%s", trimsuffix(trimprefix(aws_appsync_graphql_api.test.uris.GRAPHQL,"https://"),"/graphql"))
	custom_origin_config {
		http_port = "80"
		https_port = "443"
		origin_protocol_policy = "https-only"
		origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
		origin_read_timeout = 30
		origin_keepalive_timeout = 5
	}
  }

  enabled = true
  aliases = ["graphql-${local.project}.${local.domain}"]

  price_class = "PriceClass_100"

  custom_error_response {
      error_code = 403
      error_caching_min_ttl = 3
  }

  default_cache_behavior {
	allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
	cached_methods   = ["GET", "HEAD"]
	target_origin_id = format("Custom-%s", trimsuffix(trimprefix(aws_appsync_graphql_api.test.uris.GRAPHQL,"https://"),"/graphql"))
	
	viewer_protocol_policy = "redirect-to-https"
    compress = true

	forwarded_values {
      query_string = false
      headers      = ["x-api-key"]

      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
	geo_restriction {
		restriction_type = "none"
	}
  }

  viewer_certificate {
	acm_certificate_arn = aws_acm_certificate.cert.arn
    minimum_protocol_version = "TLSv1.1_2016"
	ssl_support_method = "sni-only"
  }

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.cloudfront.bucket}.s3.amazonaws.com"
    prefix          = "graphql"
  }

  comment = "${local.project}.${local.domain}"
}

resource "aws_s3_bucket" "cloudfront" {
  bucket = "cloudfront.${local.project}.${local.domain}"

  force_destroy = "true"
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