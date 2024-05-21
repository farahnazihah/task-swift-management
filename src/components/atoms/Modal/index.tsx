import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div className={twMerge("modal", isOpen ? "modal-open" : "")}>
      <div className="modal-box !w-full flex justify-center items-center">
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};
