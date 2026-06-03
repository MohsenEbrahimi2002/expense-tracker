import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

function Modal({ children, isOpen, onClose, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20">
      <div className="relative w-full rounded-lg shadow-sm max-w-2xl p-4 bg-white max-h-full">
        {/* Modal content */}
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b md:p-5 rounded-t-lg border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 w-8 h-8 inline-flex justify-center items-center cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
