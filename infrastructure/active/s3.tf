resource "aws_kms_key" "mykey" {
  description             = "This key is used to encrypt bucket objects"
  deletion_window_in_days = 10
}

resource "aws_s3_bucket" "www" {
  bucket = "www.${local.domain}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# resource "aws_s3_bucket" "project-user-media" {
#   bucket = "${local.project}-user-media"
#   acl    = "private"


#   lifecycle_rule {
#     id      = "users"
#     enabled = true


#     prefix = "users/"


#     tags = {
#         "rule"      = "users"
#         "autoclean" = "true"
#     }


#     transition {
#         days          = 30
#         storage_class = "STANDARD_IA" # or "ONEZONE_IA"
#     }
#   }


#   server_side_encryption_configuration {
#     rule {
#       apply_server_side_encryption_by_default {
#         kms_master_key_id = "${aws_kms_key.mykey.arn}"
#         sse_algorithm     = "aws:kms"
#       }
#     }
#   }


#   tags = {
#     Name        = "${local.project} Users Media"
#     Project     = "${local.projectLongName}"
#   }
# }

