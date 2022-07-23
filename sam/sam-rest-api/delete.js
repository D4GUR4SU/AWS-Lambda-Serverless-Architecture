const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {

    let userid = event.pathParameters.userid;
    let data = await dynamodb.delete({
        TableName: tableName,
        Key: {
            userid: userid
        }
    }).promise();

    if (data.Item != null) {
        return {
            statusCode: 204,
            body: JSON.stringify({
                message: "User deleted successfully"
            })
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "User not found"
            })
        };
    }
}