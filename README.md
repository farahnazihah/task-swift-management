This projects is a part of task challenge for Young Professional Exchange Program by Swift Management. This project is a simple file uploader that uploads files to DigitalOcean Spaces.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Configurations

The env variables are also included in `.env.example` file.

```
# DigitalOcean Bucket
DO_BUCKET_ACCESS_KEY_ID=bucket_access_key_id
DO_BUCKET_SECRET_KEY=bucket_secret_access_key_id
```

#### API endpoints

- `/api/upload`
  to upload a file to the DigitalOcean Spaces, returning the URL of the uploaded file.
- `/api/list`
  to list all files uploaded in the DigitalOcean Spaces, returning an array object containing the files key.

#### Short explanation of the code

`ModalSelectFile` is a component that allows users to select a file from their local computer or from a list of previously uploaded files. It uses the `useFileBucket` custom hook to interact with the API.
