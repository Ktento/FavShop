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
            アカウントを登録してログインをしてください<br />
            お気に入り店舗は現在地から近い順に表示されます。<br />
            お気に入り店舗の●は営業の状態を示しています。（30分以内に営業終了する場合は黄色）<br />
            店舗をクリックすることで現在地からの経路や店舗のWebサイトなどを確認できます。
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
