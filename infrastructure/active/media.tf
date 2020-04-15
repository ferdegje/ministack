resource "aws_route53_record" "media" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = aws_s3_bucket.media.bucket
  type    = "A"

  alias {
    name                   = "s3-website.${local.region}.amazonaws.com"
    zone_id                = aws_s3_bucket.media.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_kms_key" "mykey" {
  description             = "This key is used to encrypt bucket objects"
  deletion_window_in_days = 10
}

resource "aws_s3_bucket" "media" {
  bucket = "media.${local.project}.${local.domain}"
  acl    = "public-read"

  force_destroy = "true"
  
  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.mykey.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
  tags = {
    Name        = "${local.project} Users Media"
    Project     = "${local.projectLongName}"
  }
}
