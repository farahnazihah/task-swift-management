import { UploadedFile } from "@/components/molecules";
import { DO_BUCKET_URL, DO_BUCKET_URL_FULL } from "@/constants/env";
import { FileProps } from "@/types/file";
import axios from "axios";
import { useEffect, useState } from "react";

import { FileUploader } from "react-drag-drop-files";

interface SelectFileProps {
  onFileSelected: (url: string) => void;
}

export const SelectFile = ({ onFileSelected }: SelectFileProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<FileProps[]>([]);

  const handleFileChange = (file: File) => {
    if (!file) return;
    fetchUploadFile(file);
  };

  const fetchUploadFile = async (file: File) => {
    setIsLoading(true);

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
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("/api/list");
        if (!res) throw new Error("Failed to fetch files");
        const data: FileProps[] = await res.data;
        console.log(data);
        setFiles(data);
      } catch (error) {
        console.error(error);
      }
    };

    setIsLoading(true);
    fetchFiles().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="flex flex-col !w-full items-center justify-center gap-4">
      <FileUploader handleChange={handleFileChange} name="file" />
      <div className="flex flex-col gap-4 w-full p-2 overflow-y-auto max-h-96">
        {files &&
          files.length > 0 &&
          files.map((file) => (
            <UploadedFile
              key={file.Key}
              name={file.Key}
              onSelect={() => {
                onFileSelected(`${DO_BUCKET_URL_FULL}/${file.Key}`);
              }}
            />
          ))}
      </div>
    </div>
  );
};
