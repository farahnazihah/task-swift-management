import { useState } from "react";

import DragDrop from "@/components/atoms/DragAndDrop";
import Modal from "@/components/atoms/Modal";

const FileUploadModal = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleToggleModal = () => setIsUploadModalOpen((prev) => !prev);

  return (
    <>
      <div className="flex justify-between items-center gap-4 w-full">
        <text className="text-lg">Documents (PDF, Image, etc.)</text>
        <button className="btn btn-primary" onClick={handleToggleModal}>
          Upload
        </button>
      </div>
      <Modal isOpen={isUploadModalOpen} onClose={handleToggleModal}>
        <DragDrop />
      </Modal>
    </>
  );
};

export { FileUploadModal };
