import React from 'react';

interface DialogWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const DialogWindow: React.FC<DialogWindowProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 min-w-[350px] shadow-[0_4px_25px_rgba(0,0,0,0.3)] transform transition-all duration-200" 
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-center mb-4 text-xl font-bold">{title}</h2>}
        <div className="flex flex-col gap-3">
          {children}
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 bg-blue-500 text-white border-none rounded-md p-2.5 cursor-pointer w-full hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogWindow;