const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.get({
//     TableName: "td_notes_sdk",
//     Key: {
//         user_id: "11",
//         timestamp: 1
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// docClient.query({
//     TableName: "td_notes_sdk",
//     KeyConditionExpression: "user_id = :uid",
//     ExpressionAttributeValues: {
//         ":uid": "11"
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// docClient.scan({
//     TableName: "td_notes_sdk",
//     FilterExpression: "title = :title",
//     ExpressionAttributeValues: {
//         ":title": "Title 11"
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

docClient.batchGet({
    RequestItems: {
        'td_notes_sdk': {
            Keys: [
                {
                    user_id: '11',
                    timestamp: 1
                }
            ]
        },
        'td_notes': {
            Keys: [
                {
                    user_id: 'Théo Henrique',
                    timestamp: 1
                }
            ]
        }
    }

}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});