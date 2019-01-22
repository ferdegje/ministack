const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");

global.fetch = require('node-fetch');

const poolData = {
UserPoolId : process.env.cognitoPoolId, // Your user pool id here
ClientId : process.env.cognitoClientId // Your client id here
};
const pool_region = 'eu-west-2';

register = (req, res) => {
  console.log(req.body.email)
  if (!req.body.email) {
    res.boom.badRequest('You need to provide an email for the registration', req.body);
    return;
  }
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:req.body.email}));
    const password = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
    userPool.signUp(req.body.email, password, attributeList, null, function(err, result){
        if (err) {
            res.boom.conflict(err.message, err)
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        res.json({
          "username": cognitoUser.getUsername(),
          "password": password
        })
    });

}

module.exports = register
