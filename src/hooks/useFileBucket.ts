import { useToast } from "@/providers/ToastProvider";
import { FileProps } from "@/types/file";
import { EnumToastType } from "@/types/global";
import { useEffect, useState } from "react";

interface errorProps {
  upload: string | null;
  getFiles: string | null;
}

export const useFileBucket = () => {
  const { showToast } = useToast();

  const [files, setFiles] = useState<FileProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // to fetch all the files in the bucket for first time
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
      setFiles(data);
    } catch (e) {
      console.log(e);
      showToast("Failed to fetch files", EnumToastType.ERROR);
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

          fecthGetFiles(); // update the files list
          resolve(data.url);
          showToast("File uploaded successfully", EnumToastType.SUCCESS);
        } catch (e) {
          console.log(e);
          reject(e);
          showToast("Failed to upload files", EnumToastType.ERROR);
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

  return { files, isLoading, fetchUploadFile };
};
