import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

const XAWS = AWSXRay.captureAWS(AWS);

const options: AWS.S3.Types.ClientConfiguration = {
    signatureVersion: 'v4',
};

const xS3 = new XAWS.S3(options);

// const s3 = new AWS.S3({
//   signatureVersion: 'v4'
// })

const bucketName = process.env.IMAGES_S3_BUCKET;
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

export function getUploadUrl(imageId: string) {
    return xS3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: urlExpiration
    })
}
