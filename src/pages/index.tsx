"use client";

import { Modal } from "@/components/atoms";
import { TextArea, TextInput } from "@/components/molecules";
import { SelectFile } from "@/components/organisms";

import { useState } from "react";

export default function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectFile = (url: string) => {
    setSelectedFile(url);
    setIsModalOpen(false);
  };

  return (
    <main className="w-full flex items-center justify-center h-screen bg-white text-black">
      <div className="flex flex-col p-8 gap-4 items-center justify-center w-[600px] ">
        <TextInput placeholder="Enter Your Name" label="Name" />
        <TextArea placeholder="Enter Your Name" label="Description" />
        <div className="flex gap-2 items-center w-full">
          <text className="mr-auto break-words">
            Selected File:{" "}
            {selectedFile ? (
              <a className="font-bold" href={selectedFile} target="_blank">
                {selectedFile?.split("/").pop()}
              </a>
            ) : (
              "-"
            )}
          </text>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Upload
          </button>
          {selectedFile && (
            <button
              onClick={() => setSelectedFile(null)}
              className="btn btn-error btn-outline"
            >
              Remove
            </button>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <SelectFile onFileSelected={handleSelectFile} />
        </Modal>
      </div>
    </main>
  );
}
