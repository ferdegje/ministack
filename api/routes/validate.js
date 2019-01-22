const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

validate = (req, res) => {
  let errors = []
  if (!req.body.username) {
    errors.push('You need to provide a username');
  }
  if (!req.body.code) {
    errors.push('You need to provide a code');
  }
  if (errors.length) {
    res.boom.badRequest("Bad Request", {'errors': errors, 'body': req.body})
  }
  const poolData = {
    UserPoolId : process.env.cognitoPoolId, // Your user pool id here
    ClientId : process.env.cognitoClientId // Your client id here
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
      Username: req.body.username,
      Pool: userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(req.body.code, true, function(err, result) {
      if (err) {
          res.boom.badRequest("Failed to validate code",err);
          return;
      }
      res.json(result);
  });
}

module.exports = validate
