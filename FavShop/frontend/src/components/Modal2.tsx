
import React from 'react';
import '../CSS/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal2: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {       //モーダルに内包されているモーダルの土台
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-2">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal2;
