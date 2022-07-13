const im = require('imagemagic');
const fs = require('fs');
const os = require('os');
const uuidv4 = require('uuid/v4');
const { promisify } = require('util');
const AWS = require('aws-sdk');

const reziseAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({ region: "us-east-1" });
const s3 = new AWS.s3();

exports.handler = async (event) => {
    let filesProcessed = event.Records.map(async (record) => {
        let bucket = record.s3.bucket.name;
        let fileName = record.s3.object.key;

        // Get file from S3
        var params = {
            Bucket: bucket,
            Key: fileName
        };
        let inputData = await s3.getObject(params).promise();

        // Resize the file
        let tempFile = os.tempdir() + '/' + uuidv4() + '.jpg';
        let resizeArgs = {
            srcData: inputData.Body,
            dstPath: tempFile,
            width: 150
        };
        await reziseAsync(resizeArgs);

        // Read the resized file
        let resizedData = await readFileAsync(tempFile);

        // Upload the new file to s3
        let targetFileName = fileName.substring(0, fileName.lastIndexOf('.')) + '-small.jpg';
        var params = {
            ACL: 'public-read',
            Bucket: bucket + '-dest',
            Key: targetFileName,
            Body: new Buffer(resizedData),
            ContentType: 'image/jpg'
        };
        await s3.putObject(params).promise();
         return await unlinkAsync(tempFile);
    });

    await Promise.all(filesProcessed);
    console.log("done");
    return "done";
}