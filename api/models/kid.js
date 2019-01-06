const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB();

module.exports = class Kid {
    constructor(parent) {
        this.parent = parent
    }

    delete(kidId) {
        var params = {
            Key: {
                "KidId": {"S": kidId},
                "ParentId": {"S": this.parent.cognitoUser.username}
            },
            TableName: "PiggyBankKids"
        };
        return new Promise((resolve, reject) => {
            dynamodb.deleteItem(params, function(err, data) {
                if (err) reject(err); // an error occurred
                else     resolve(data);           // successful response
            })
        })
    }
    get(kidId) {
        var params = {
            Key: {
                "KidId": {"S": kidId},
                "ParentId": {"S": this.parent.cognitoUser.username}
            },
            TableName: "PiggyBankKids"
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
                        reject({"code": "NotFound", "message": "Kid not found"})
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

    add(/*object*/kidsList) {
        let listOfPromises = []
        if (typeof(kidsList) !== "object") {
            throw new Error("Was expecting a dictionary")
        }
        kidsList.forEach((aKid) => {
            listOfPromises.push(new Promise((resolve, reject) => {
                if ('ParentId' in aKid) {
                    reject({"message": "ParentId cannot be supplied", "code": "ParentIdShouldNotBeSupplied"}) 
                    return
                }
                if ('KidId' in aKid) {
                    reject({"message": "KidId cannot be supplied", "code": "KidIdShouldNotBeSupplied"})
                    return
                }
                if ('status' in aKid) {
                    reject({"message": "Status cannot be supplied", "code": "StatusShouldNotBeSupplied"})
                    return
                }
                aKid.ParentId = this.parent.cognitoUser.username
                aKid.KidId = uuidv4()
                aKid.status = "created"
                Object.keys(aKid).forEach((k) => {
                    if (typeof(aKid[k]) == "string") {
                        aKid[k]= {"S": aKid[k]}
                    }
                })
                let params = {
                    TableName: "PiggyBankKids",
                    Item: aKid
                }
                dynamodb.putItem(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                        reject(err)
                    } else {
                        resolve(aKid)
                    }
                })
            }))
        });
        return Promise.all(listOfPromises)
        // .catch(err => console.log("Rejection on one of the promises", err))
    }

    all() {
        
        
        var params = {
            ExpressionAttributeValues: {
                ":v1": {
                    S: this.parent.cognitoUser.username
                }
            }, 
            KeyConditionExpression: "ParentId = :v1", 
            // ProjectionExpression: "KidId", 
            TableName: "PiggyBankKids",
            IndexName: "ParentIdIndex",
            ScanIndexForward: false
        };
        console.log("Querying with parameters", params)
        var promise = new Promise((resolve, reject) => {
            dynamodb.query(params, function(err, data) {
                console.log("Query returned with data", data)
                if (err) {
                    console.error(err, err.stack); // an error occurred
                    reject(err)
                } else {
                    resolve(data.Items)
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
}