resource "aws_dynamodb_table" "article" {
  name             = "${local.project}Article"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "id"
  range_key        = "title"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "title"
    type = "S"
  }

  tags = {
    Project = local.projectLongName
  }
}

