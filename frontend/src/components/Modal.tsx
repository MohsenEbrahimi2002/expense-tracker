import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

function Modal({children,isOpen,onClose,title}: ModalProps) {
  return <div>Modal</div>;
}

export default Modal;
