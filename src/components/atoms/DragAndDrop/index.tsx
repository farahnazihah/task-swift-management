import React, { useEffect, useState } from "react";

export const DragDrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileName = encodeURIComponent(file.name);
    const fileType = file.type;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target?.result as string;

      const base64File = fileContent.split(",")[1]; // Get base64 content

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: base64File,
            fileName,
            fileType,
          }),
        });

        if (!res.ok) throw new Error("Failed to upload file");

        const data = await res.json();
        setFileUrl(data.url);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p>Error: {error}</p>}
      {fileUrl && (
        <p>
          File uploaded to: <a href={fileUrl}>{fileUrl}</a>
        </p>
      )}
    </>
  );
};
