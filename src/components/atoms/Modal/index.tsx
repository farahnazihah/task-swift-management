import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div className={twMerge('modal', isOpen ? 'modal-open' : '')}>
      <div className="modal-box">{children}</div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

export default Modal;
