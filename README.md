This projects is a part of task challenge for Young Professional Exchange Program by Swift Management. This project is a simple file uploader that uploads files to DigitalOcean Spaces.

### Deployment

This application is deployed on [Vercel](https://vercel.com/) and can be accessed at [https://task-swift-management.vercel.app/](https://task-swift-management.vercel.app/).

### Configurations

The env variables are also included in `.env.example` file.

```
# DigitalOcean Bucket
DO_BUCKET_ACCESS_KEY_ID=bucket_access_key_id
DO_BUCKET_SECRET_KEY=bucket_secret_access_key_id
```

### Run the application localy

Installing dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, the page should look like this:
![image](https://github.com/farahnazihah/task-swift-management/assets/52520854/c56cf099-a4d1-460b-8e97-a9599e0daacb)

### Folder Structure

This project’s folder structure reflects the atomic design pattern:

- atoms: the smallest and most fundamental components in the design system.
- molecules: groups of atoms that bonded together and functioning as a single unit.
- organisms: relatively complex components composed of groups of molecules and/or atoms.

```bash
src/
├── components/
│   ├── atoms/
│   │   ├── ...
│   ├── molecules/
│   │   ├── ...
│   ├── organisms/
│   │   └── ...
│   └── index.ts
└── hooks/
    └── useFileBucket.ts
└── pages/
    └── index.tsx
```

This structure helps in organizing the components logically and makes it easier to locate, develop, and maintain them as the project evolves.

#### API endpoints

- `/api/upload`
  to upload a file to the DigitalOcean Spaces, returning the URL of the uploaded file.
- `/api/list`
  to list all files uploaded in the DigitalOcean Spaces, returning an array object containing the files key.

#### Short explanation of the code

`ModalSelectFile` is a component that allows users to select a file from their local computer or from a list of previously uploaded files. It uses the `useFileBucket` custom hook to interact with the API.
