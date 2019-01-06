const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const User = require('../models/user')
const s3 = new AWS.S3();

mediaUploadLink = (req, res) => {
  let user = new User()
  user.authenticate(req, res).then(
        (result) => {
            switch(req.method) {
                case 'GET':
                    var params = { 
                        Bucket: 'piggy-bank-user-media', 
                        Fields: { key: "users/"+user.cognitoUser.username } 
                    }
                    console.log(params)
                    s3.createPresignedPost(params, function(err, data) {
                        console.log("data",data)
                        console.log("err",err)
                        if (err) { 
                            res.boom.badRequest(null, err)
                        } else { 
                            console.log("Success")
                            res.json(data)
                        } 
                    });
                    break
                default:
                    res.boom.methodNotAllowed()                
            }
    })
    .catch((err) => {
        if (err.code && err.code == "NotAuthorizedException") {
            res.boom.unauthorized(null, err)    
        } else {
            res.boom.badRequest(null, err)
        }
    })
}

module.exports = mediaUploadLink
