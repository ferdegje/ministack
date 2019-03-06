const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const ucfirst = require('ucfirst')
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB();

module.exports = class GenericEntity {
    constructor(parent, entityName) {
        this.parent = parent
        this.entityName = entityName
        this.idKey = ucfirst(entityName)+"Id"
        this.tableName = ucfirst(entityName)
    }

    delete(objectId) {
        var params = {
            Key: {
                "ParentId": {"S": this.parent.cognitoUser.username}
            },
            TableName: process.env.projectName+this.tableName
        };
        params["Key"][this.idKey] = {"S": objectId}
        console.debug(params)
        return new Promise((resolve, reject) => {
            dynamodb.deleteItem(params, function(err, data) {
                if (err) reject(err); // an error occurred
                else     resolve(data);           // successful response
            })
        })
    }
    get(objectId) {
        var params = {
            Key: {
                "ParentId": {"S": this.parent.cognitoUser.username}
            },
            TableName: process.env.projectName+this.tableName
        };
        params["Key"][this.idKey] = {"S": objectId}
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

    add(/*object*/entityList) {
        let listOfPromises = []
        if (typeof(entityList) !== "object") {
            throw new Error("Was expecting a dictionary")
        }
        entityList.forEach((anObjectPayload) => {
            listOfPromises.push(new Promise((resolve, reject) => {
                if ('ParentId' in anObjectPayload) {
                    reject({"message": "ParentId cannot be supplied", "code": "ParentIdShouldNotBeSupplied"}) 
                    return
                }
                if (this.idKey in anObjectPayload) {
                    reject({"message": this.idKey+" cannot be supplied", "code": "EntityKeyShouldNotBeSupplied"})
                    return
                }
                anObjectPayload.ParentId = this.parent.cognitoUser.username
                anObjectPayload[this.idKey] = uuidv4()
                Object.keys(anObjectPayload).forEach((k) => {
                    if (typeof(anObjectPayload[k]) == "string") {
                        anObjectPayload[k]= {"S": anObjectPayload[k]}
                    }
                })
                let params = {
                    TableName: process.env.projectName+this.tableName,
                    Item: anObjectPayload
                }
                console.log(params)
                console.log("reaching here")
                dynamodb.putItem(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                        reject(err)
                    } else {
                        resolve(anObjectPayload)
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
            TableName: process.env.projectName+this.tableName,
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