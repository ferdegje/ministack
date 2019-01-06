resource "aws_dynamodb_table" "user" {
    name           = "${local.project}Users"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "UserId"
    stream_enabled = true
    stream_view_type = "NEW_AND_OLD_IMAGES"

    attribute {
        name = "UserId"
        type = "S"
    }

    tags = {
        Project = "${local.projectLongName}"
    }
}

resource "aws_dynamodb_table" "gifts" {
    name           = "${local.project}Gifts"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "GiftId"
    range_key      = "forUserId"
    stream_enabled = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
    
    attribute {
      name = "GiftId"
      type = "S"
    }
  
    attribute {
      name = "forUserId"
      type = "S"
    }
  
  
    global_secondary_index {
      name               = "forUserIdIndex"
      hash_key           = "forUserId"
      projection_type    = "ALL"
    }
  
    tags = {
      Project = "${local.projectLongName}"
    }
  }

resource "aws_dynamodb_table" "purchases" {
    name           = "${local.project}Purchases"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "GiftId"
    stream_enabled = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
    
    attribute {
      name = "GiftId"
      type = "S"
    }
  
    tags = {
      Project = "${local.projectLongName}"
    }
  }

  resource "aws_dynamodb_table" "contributions" {
    name           = "${local.project}Contributions"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "ContributionId"
    stream_enabled = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
    
    attribute {
      name = "ContributionId"
      type = "S"
    }
  
    attribute {
      name = "byUserId"
      type = "S"
    }
    
    attribute {
      name = "forGiftId"
      type = "S"
    }
  
    global_secondary_index {
      name               = "byUserIdIndex"
      hash_key           = "byUserId"
      projection_type    = "ALL"
    }
    
    global_secondary_index {
        name               = "forGiftIdIndex"
        hash_key           = "forGiftId"
        projection_type    = "ALL"
    }
  
    tags = {
      Project = "${local.projectLongName}"
    }
  }

  resource "aws_dynamodb_table" "message" {
    name           = "${local.project}Messages"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "MessageId"
    stream_enabled = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
    
    attribute {
      name = "MessageId"
      type = "S"
    }
  
    attribute {
      name = "byUserId"
      type = "S"
    }
  
  
    global_secondary_index {
      name               = "byUserIdIndex"
      hash_key           = "byUserId"
      projection_type    = "ALL"
    }
  
    tags = {
      Project = "${local.projectLongName}"
    }
  }
  
# resource "aws_dynamodb_table" "kids" {
#   name           = "${local.project}Kids"
#   billing_mode   = "PAY_PER_REQUEST"
#   hash_key       = "KidId"
#   range_key      = "ParentId"
#   stream_enabled = true
#   stream_view_type = "NEW_AND_OLD_IMAGES"
  
#   attribute {
#     name = "KidId"
#     type = "S"
#   }

#   attribute {
#     name = "ParentId"
#     type = "S"
#   }


#   global_secondary_index {
#     name               = "ParentIdIndex"
#     hash_key           = "ParentId"
#     projection_type    = "ALL"
#   }

#   server_side_encryption {
#     enabled = true
#   }

#   tags = {
#     Project = "${local.projectLongName}"
#   }
# }
