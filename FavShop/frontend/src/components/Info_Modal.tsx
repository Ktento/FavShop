import React from 'react';
import Modal from './Modal'; // Modal コンポーネントのインポート
import { Typography } from '@mui/material';

interface InfoModalProps {
  open: boolean; // モーダルが開いているかどうかの状態
  onClose: () => void; // モーダルを閉じる関数
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose }) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="modal-content">
        <div className="modal-header">
          <Typography variant="h6" className="modal-title">
            アプリについて
          </Typography>
        </div>
        <div className="info-modal-content">
          <Typography variant="body1">
            このアプリケーションは、ユーザーが様々な機能を利用できるように設計されています。
            ここでは、アプリの簡単な説明や、主要な機能について説明します。
            例えば、ユーザー登録やログイン、店舗の検索機能などが含まれます。
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
