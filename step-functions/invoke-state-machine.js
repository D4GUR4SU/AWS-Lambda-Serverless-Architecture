const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event) => {

    let params = {
        stateMarchineArn: "arn:aws:states:us-east-1:218054971058:stateMachine:HelloWorld",
        input: JSON.stringify(event)
    }


    let data = await stepFunctions.startExecution(params).promise();
    console.log(data);
    return data;
};
