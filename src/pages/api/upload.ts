import AWS from "aws-sdk";

import {
  DO_BUCKET_ACCESS_KEY_ID,
  DO_BUCKET_NAME,
  DO_BUCKET_SECRET_KEY,
  DO_BUCKET_URL,
} from "@/constants/env";
import { NextApiRequest, NextApiResponse } from "next";

const s3Client = new AWS.S3({
  endpoint: DO_BUCKET_URL,
  region: "fra1",
  credentials: {
    accessKeyId: DO_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: DO_BUCKET_SECRET_KEY,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const { file, fileName, fileType } = req.body;

    const params = {
      Bucket: DO_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(file, "base64"),
      ContentType: fileType,
      ACL: "public-read",
    };

    console.log(params);

    const uploadResult = await s3Client.upload(params).promise();

    res.status(200).json({ url: uploadResult.Location });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error uploading file" });
  }
}
