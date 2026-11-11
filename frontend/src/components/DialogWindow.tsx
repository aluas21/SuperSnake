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
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="dialog-title">{title}</h2>}
        <div className="dialog-body">{children}</div>
        <button onClick={onClose} className="dialog-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogWindow;
