const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB();

module.exports = class News {
    constructor(parent) {
        this.parent = parent
    }

    delete(newsId) {
        var params = {
            Key: {
                "NewsId": {"S": newsId},
                "ParentId": {"S": this.parent.cognitoUser.username}
            },
            TableName: "PiggyBankNews"
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
                "NewsId": {"S": kidId},
                "ParentId": {"S": this.parent.cognitoUser.username}
            },
            TableName: "PiggyBankNews"
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
                        reject({"code": "NotFound", "message": "News not found"})
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

    add(/*object*/newsList) {
        let listOfPromises = []
        if (typeof(newsList) !== "object") {
            return new Promise((resolve, reject) => reject({"message": "Was expecting a dictionary as payload and received payload instead (see payload)", "code": "IncorrectPayload", "payload": newsList}))
        }
        newsList.forEach((aNews) => {
            listOfPromises.push(new Promise((resolve, reject) => {
                if ('ParentId' in aNews) {
                    reject({"message": "ParentId cannot be supplied", "code": "ParentIdShouldNotBeSupplied"}) 
                    return
                }
                if ('NewsId' in aNews) {
                    reject({"message": "KidId cannot be supplied", "code": "KidIdShouldNotBeSupplied"})
                    return
                }
                aNews.ParentId = this.parent.cognitoUser.username
                aNews.NewsId = uuidv4()
                Object.keys(aNews).forEach((k) => {
                    if (typeof(aNews[k]) == "string") {
                        aNews[k]= {"S": aNews[k]}
                    }
                })
                let params = {
                    TableName: "PiggyBankNews",
                    Item: aNews
                }
                dynamodb.putItem(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                        reject(err)
                    } else {
                        resolve(aNews)
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
            TableName: "PiggyBankNews",
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