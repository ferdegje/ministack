const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Kid = require('../models/kid')

allKids = (req, res) => {
  console.log("All Kids")
  let user = new User()
  user.authenticate(req, res).then(
        (result) => {
            let kidsFromUser = new Kid(user)
            kidsFromUser.get(req.params.kidId).then(aKid => {
                switch(req.method) {
                    case 'GET':
                        res.json(aKid)
                        break
                    case 'DELETE':
                        kidsFromUser.delete(req.params.kidId).then((result) => res.json(result))
                        break
                    default:
                        res.boom.methodNotAllowed()                
                }
            })
            .catch(err => res.boom.notFound(null, err))
    })
    .catch((err) => {
        if (err.code && err.code == "NotAuthorizedException") {
            res.boom.unauthorized(null, err)    
        } else {
            res.boom.badRequest(null, err)
        }
    })
}

module.exports = allKids
