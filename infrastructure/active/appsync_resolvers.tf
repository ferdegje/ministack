resource "aws_appsync_resolver" "createMinistackArticle" {
  api_id      = aws_appsync_graphql_api.test.id
  field       = "createMinistackArticle"
  type        = "Mutation"
  data_source = aws_appsync_datasource.example.name

  request_template = file("resolver_files/createMinistackArticle.request.template")

  response_template = <<EOF
## Pass back the result from DynamoDB. **
$util.toJson($ctx.result)
EOF
}

resource "aws_appsync_resolver" "listMinistackArticles" {
  api_id      = aws_appsync_graphql_api.test.id
  field       = "listMinistackArticles"
  type        = "Query"
  data_source = aws_appsync_datasource.example.name

  request_template = file("resolver_files/listMinistackArticles.request.template")

  response_template = <<EOF
## Pass back the result from DynamoDB. **
$util.toJson($ctx.result)
EOF
}

resource "aws_appsync_resolver" "deleteMinistackArticle" {
  api_id      = aws_appsync_graphql_api.test.id
  field       = "deleteMinistackArticle"
  type        = "Mutation"
  data_source = aws_appsync_datasource.example.name

  request_template = file("resolver_files/deleteMinistackArticle.request.template")

  response_template = <<EOF
## Pass back the result from DynamoDB. **
$util.toJson($ctx.result)
EOF
}