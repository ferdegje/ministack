const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB();

module.exports = class User {
    

    constructor() {
        this.cognitoUser = null;
    }

    async delete() {
        var promise = new Promise((resolve, reject) => {
            if (this.cognitoUser === null) {
                reject("You first need to authenticate")
            }
            console.log("Deleting user")
            this.cognitoUser.deleteUser((err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
        return promise
    }

    username() {
        if (this.cognitoUser == null) {
            throw new Error("UnknownUser")
        }
        return this.cognitoUser.username
    }

    getKyc() {
        var params = {
            Key: {
                "ParentId": {"S": this.username()}
            },
            TableName: "PiggyBankKYC"
        };
        var promise = new Promise((resolve, reject) => {
            dynamodb.getItem(params, function(err, data) {
                if (err) {
                    console.error(err, err.stack); // an error occurred
                    reject(err)
                } else {
                    if ("Item" in data) {
                        resolve(data.Item)
                    } else {
                        reject({"code": "NotFound", "message": "KYC not found"})
                    }
                    
                }
                /*
                data = {
                ConsumedCapacity: {
                }, 
                Count: 2, 
                Items: [
                    {
                "SongTitle": {
                    S: "Call Me Today"
                    }
                }
                ], 
                ScannedCount: 2
                }
                */
            });
        })
        return promise
    }

    submitKyc(req, res) {
        return new Promise((resolve, reject) => {
            if (typeof(req.body) !== "object") {
                reject({"message": "Body should be a dictionary", "code": "IncorrectPayload"})
                return
            }
            if (Object.keys(req.body).length == 0) {
                reject({"message": "Body should not be empty", "code": "IncorrectPayload"})
                return
            }
            if ("ParentId" in req.body) {
                reject({"message": "Body cannot contain ParentId", "code": "IncorrectPayload"})
                return
            }
            if ("Status" in req.body) {
                reject({"message": "Body cannot contain Status", "code": "IncorrectPayload"})
                return
            }
            let kycDynamoItem = req.body
            kycDynamoItem.ParentId = this.username()
            kycDynamoItem.Status = "created"
            Object.keys(kycDynamoItem).forEach(k => {
                if (typeof(kycDynamoItem[k]) == "string") {
                    kycDynamoItem[k] = {"S": kycDynamoItem[k]}
                }
            })
            let params = {
                TableName: "PiggyBankKYC",
                Item: kycDynamoItem
            }
            dynamodb.putItem(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err)
                } else {
                    resolve(kycDynamoItem)
                }
            })
            // resolve({"message": payload})
        })
    }

    async authenticate(req, res) {
        try {
            let errors = []
            if (!req.headers.authorization) {
                res.boom.unauthorized()
            }
            // var Buffer = require('safe-buffer').Buffer
            var [username, password] = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString().split(":")
            var authenticationData = {
                Username : username,
                Password : password,
            };
            // console.log(authenticationData)
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            const poolData = {
                UserPoolId : process.env.cognitoPoolId, // Your user pool id here
                ClientId : process.env.cognitoClientId // Your client id here
            };
            
            const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            var userData = {
                Username: username,
                Pool: userPool
            };
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            // const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            var promise1 = new Promise(function(resolve, reject) {
                
                cognitoUser.authenticateUser(authenticationDetails, {
                    onFailure: (err) => {
                        reject(err);
                    },
                    onSuccess: (result) => {
                        resolve(result)
                    }
                })
            })
            this.cognitoUser = cognitoUser
            return promise1
        } catch(err) {
            console.error(err)
        }
        
    }
}