resource "aws_s3_bucket" "www" {
  bucket = "${local.project}.${local.domain}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

