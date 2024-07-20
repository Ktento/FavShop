// Position_Modal.tsx
import React from 'react';
import '../CSS/Position_Modal.css';

interface PositionModalProps {
  onClose: () => void;
  closeDrawer: () => void;
}

const PositionModal: React.FC<PositionModalProps> = ({ onClose, closeDrawer }) => {

  const handleConfirmSelection = () => {
    onClose();
    closeDrawer();
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">位置情報から探す</h2>
      </div>
      <div className="modal-body">
        <p>位置情報からお気に入り場所を検索</p>
        <button className="confirm-button" onClick={handleConfirmSelection}>決定</button>
      </div>
    </div>
  );
};

export default PositionModal;
