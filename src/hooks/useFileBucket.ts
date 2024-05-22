import { FileProps } from "@/types/file";
import axios from "axios";
import { useEffect, useState } from "react";

interface errorProps {
  upload: string | null;
  getFiles: string | null;
}

export const useFileBucket = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<errorProps>({
    upload: null,
    getFiles: null,
  });

  useEffect(() => {
    fecthGetFiles();
  }, []);

  const fecthGetFiles = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/list", {
        method: "GET",
      });
      if (!res) throw new Error("Failed to fetch files");
      const data: FileProps[] = await res.json();
      console.log(data);
      setFiles(data);
      setErrors({ ...errors, getFiles: null });
    } catch (e) {
      console.log(e);
      setErrors({ ...errors, getFiles: "Failed to fetch files" });
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUploadFile = (file: File) => {
    return new Promise<string>(async (resolve, reject) => {
      setIsLoading(true);

      const fileName = encodeURIComponent(file.name);
      const fileType = file.type;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target?.result as string;

        const base64File = fileContent.split(",")[1]; // get base64 content

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
          setErrors({ ...errors, upload: null });

          await fecthGetFiles();
          resolve(data.url);
        } catch (e) {
          console.log(e);
          setErrors({ ...errors, upload: "Failed to upload file" });
          reject(e);
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = (error) => {
        setIsLoading(false);
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  return { files, isLoading, errors, fetchUploadFile };
};
