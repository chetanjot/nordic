const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const bucketName = process.env.AWS_S3_BUCKET_NAME;

const imageUploadToS3 = async (file, folderName) => {
  try {
    if (folderName === undefined) {
      throw "Folder name is required for uploading files to AWS S3!";
    }

    const bucketFolderName = `${bucketName}`;
    const key = `${folderName}/${file.name}`;

    const uploadImage = await s3
      .upload({
        Bucket: bucketFolderName,
        Key: key,
        Body: file.data,
      })
      .promise();

    return uploadImage;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const getSignedUrlFromS3 = async (key) => {
  return process.env.AWS_CLOUDFRONT_KEY + key;
};

module.exports = {
  imageUploadToS3,
  getSignedUrlFromS3,
};
