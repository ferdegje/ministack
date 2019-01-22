resource "aws_dynamodb_table" "article" {
  name             = "${local.project}Article"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "ArticleId"
  # range_key        = "ParentId"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "ArticleId"
    type = "S"
  }

  attribute {
    name = "ParentId"
    type = "S"
  }

  global_secondary_index {
    name            = "ParentIdIndex"
    hash_key        = "ParentId"
    projection_type = "ALL"
  }

  tags = {
    Project = "${local.projectLongName}"
  }
}
