resource "aws_cognito_user_pool" "pool" {
  name = "${local.project}.${local.domain}"

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "client" {
  name = "Next.js"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"

  allowed_oauth_flows = ["code", "implicit"]
  allowed_oauth_scopes = ["phone","email","profile", "openid"]
  allowed_oauth_flows_user_pool_client = true

  explicit_auth_flows = ["ADMIN_NO_SRP_AUTH"]
  
  callback_urls = ["https://${local.project}.${local.domain}/api/callback", "http://localhost:3000/api/callback"]
  logout_urls = ["https://${local.project}.${local.domain}/logout", "http://localhost:3000/logout"]
  supported_identity_providers = ["COGNITO"]
}

output "client_id" {
    value = aws_cognito_user_pool_client.client.id
}

output "client_secret" {
    value = aws_cognito_user_pool_client.client.client_secret
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = replace("${local.project}.${local.domain}", ".", "-")
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}