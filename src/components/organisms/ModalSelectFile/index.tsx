import { FileUploader } from "react-drag-drop-files";

import { UploadedFile } from "@/components/molecules";
import { DO_BUCKET_URL_FULL } from "@/constants/env";
import { useFileBucket } from "@/hooks/useFileBucket";
import { Modal } from "@/components/atoms";

interface ModalSelectFileProps {
  onFileSelected: (url: string) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const ModalSelectFile = ({
  onFileSelected,
  isModalOpen,
  onCloseModal,
}: ModalSelectFileProps) => {
  const { fetchUploadFile, isLoading, files } = useFileBucket();

  const handleFileChange = async (file: File) => {
    if (!file) return;
    const fileURL = await fetchUploadFile(file);
    onFileSelected(fileURL);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
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
      )}
    </Modal>
  );
};
