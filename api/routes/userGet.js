const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

userGet = (req, res) => {
  let user = new User()
  user.authenticate(req, res).then(
        (result) => {
            res.json(result)
    }).catch((err) => res.boom.forbidden(null, err))
}

module.exports = userGet
