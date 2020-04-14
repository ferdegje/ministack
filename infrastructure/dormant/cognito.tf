resource "aws_cognito_user_pool" "pool" {
  name = "${local.project}.${local.domain}"
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = replace("${local.project}.${local.domain}", ".", "-")
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}