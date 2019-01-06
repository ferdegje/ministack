const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
userDelete = (req, res) => {
  let user = new User()
  user.authenticate(req, res).then(
        (result) => {
            user.delete().then((result) => {
                res.json(result)
            }).catch(err => {
                res.boom.badRequest(null, err)
            })
    }).catch((err) => {
        if (err.code && err.code == "NotAuthorizedException") {
            res.boom.unauthorized(null, err)    
        } else {
            res.boom.badRequest(null, err)
        }
    })
}

module.exports = userDelete
