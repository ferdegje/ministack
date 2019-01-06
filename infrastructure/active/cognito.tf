resource "aws_cognito_user_pool" "pool" {
  name = "Digital Moneybox"

  auto_verified_attributes   = ["email"]
  username_attributes           = ["email"]
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }
  password_policy {
    minimum_length    = 6
    require_lowercase = false
    require_numbers   = false
    require_symbols   = false
    require_uppercase = false
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name = "web"

  user_pool_id = "${aws_cognito_user_pool.pool.id}"
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}

output "aws_cognito_user_pool_client_id" {
  value = "${aws_cognito_user_pool_client.client.id}"
}

output "aws_cognito_user_pool_id" {
  value = "${aws_cognito_user_pool.pool.id}"
}
