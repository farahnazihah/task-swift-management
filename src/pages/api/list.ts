import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

import {
  DO_BUCKET_ACCESS_KEY_ID,
  DO_BUCKET_SECRET_KEY,
  DO_BUCKET_URL,
} from "@/constants/env";

const s3Client = new AWS.S3({
  endpoint: "https://fra1.digitaloceanspaces.com/",
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
    s3Client.listObjects({ Bucket: "task-challenge-2" }, (err, data) => {
      res.status(200).json(data.Contents);
    });
    console.log("Listing files");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error listing files" });
  }
}
