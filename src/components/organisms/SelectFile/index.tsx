import { UploadedFile } from "@/components/molecules";
import { DO_BUCKET_URL, DO_BUCKET_URL_FULL } from "@/constants/env";
import { useFileBucket } from "@/hooks/useFileBucket";
import { FileProps } from "@/types/file";
import axios from "axios";
import { useEffect, useState } from "react";

import { FileUploader } from "react-drag-drop-files";

interface SelectFileProps {
  onFileSelected: (url: string) => void;
}

export const SelectFile = ({ onFileSelected }: SelectFileProps) => {
  const { fetchUploadFile, isLoading, files } = useFileBucket();

  const handleFileChange = async (file: File) => {
    if (!file) return;
    const fileURL = await fetchUploadFile(file);
    onFileSelected(fileURL);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("/api/list");
        if (!res) throw new Error("Failed to fetch files");
        const data: FileProps[] = await res.data;
        console.log(data);
        // setFiles(data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="flex flex-col !w-full items-center justify-center gap-4">
      <FileUploader handleChange={handleFileChange} name="file" />
      <p>files count: {files.length}</p>
      <div className="flex flex-col gap-4 w-full p-2 overflow-y-auto max-h-96">
        {files.map((file) => (
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
