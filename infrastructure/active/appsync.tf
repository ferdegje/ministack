resource "aws_appsync_graphql_api" "test" {
  authentication_type = "API_KEY"
  name                = "tf-example"
  schema              = <<EOF
input CreateMinistackArticleInput {
	id: String!
	title: String!
}

input DeleteMinistackArticleInput {
	id: String!
	title: String!
}

type MinistackArticle {
	id: String!
	title: String!
}

type MinistackArticleConnection {
	items: [MinistackArticle]
	nextToken: String
}

type Mutation {
	createMinistackArticle(input: CreateMinistackArticleInput!): MinistackArticle
	updateMinistackArticle(input: UpdateMinistackArticleInput!): MinistackArticle
	deleteMinistackArticle(input: DeleteMinistackArticleInput!): MinistackArticle
}

type Query {
	getMinistackArticle(id: String!, title: String!): MinistackArticle
	listMinistackArticles(filter: TableMinistackArticleFilterInput, limit: Int, nextToken: String): MinistackArticleConnection
}

type Subscription {
	onCreateMinistackArticle(id: String, title: String): MinistackArticle
		@aws_subscribe(mutations: ["createMinistackArticle"])
	onUpdateMinistackArticle(id: String, title: String): MinistackArticle
		@aws_subscribe(mutations: ["updateMinistackArticle"])
	onDeleteMinistackArticle(id: String, title: String): MinistackArticle
		@aws_subscribe(mutations: ["deleteMinistackArticle"])
}

input TableBooleanFilterInput {
	ne: Boolean
	eq: Boolean
}

input TableFloatFilterInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	contains: Float
	notContains: Float
	between: [Float]
}

input TableIDFilterInput {
	ne: ID
	eq: ID
	le: ID
	lt: ID
	ge: ID
	gt: ID
	contains: ID
	notContains: ID
	between: [ID]
	beginsWith: ID
}

input TableIntFilterInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	contains: Int
	notContains: Int
	between: [Int]
}

input TableMinistackArticleFilterInput {
	id: TableStringFilterInput
	title: TableStringFilterInput
}

input TableStringFilterInput {
	ne: String
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
	contains: String
	notContains: String
	between: [String]
	beginsWith: String
}

input UpdateMinistackArticleInput {
	id: String!
	title: String!
}
EOF

}

resource "aws_iam_role" "example" {
  name = "example"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy" "example" {
  name = "example"
  role = aws_iam_role.example.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_dynamodb_table.article.arn}"
      ]
    }
  ]
}
EOF

}

resource "aws_cloudfront_distribution" "appsync" {
  origin {
    domain_name = trimsuffix(trimprefix(aws_appsync_graphql_api.test.uris.GRAPHQL,"https://"),"/graphql")
	origin_id = format("Custom-%s", trimsuffix(trimprefix(aws_appsync_graphql_api.test.uris.GRAPHQL,"https://"),"/graphql"))
	custom_origin_config {
		http_port = "80"
		https_port = "443"
		origin_protocol_policy = "http-only"
		origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
		origin_read_timeout = 30
		origin_keepalive_timeout = 5
	}
  }

  enabled = true
  aliases = ["graphql-${local.project}.${local.domain}"]

  default_cache_behavior {
	allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
	cached_methods   = ["GET", "HEAD"]
	target_origin_id = format("Custom-%s", trimsuffix(trimprefix(aws_appsync_graphql_api.test.uris.GRAPHQL,"https://"),"/graphql"))
	
	viewer_protocol_policy = "allow-all"

	forwarded_values {
      query_string = true
      headers      = ["*"]

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
    minimum_protocol_version = "TLSv1"
	ssl_support_method = "sni-only"
  }
}

output "aws_appsync_graphql_api_api_key" {
	value = aws_appsync_api_key.test.key
}

output "aws_appsync_graphql_api_authentication_type" {
	value = aws_appsync_graphql_api.test.authentication_type
}

resource "aws_appsync_api_key" "test" {
  api_id  = aws_appsync_graphql_api.test.id
  expires = timeadd(timestamp(), "8760h")
}

resource "aws_appsync_datasource" "example" {
  api_id           = aws_appsync_graphql_api.test.id
  name             = "ministack_article"
  service_role_arn = aws_iam_role.example.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.article.name
  }
}

