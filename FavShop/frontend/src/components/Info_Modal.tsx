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
            ?アプリについて
          </Typography>
        </div>
        <div className="info-modal-content">
          <Typography variant="body1">
            このアプリケーションは、自身のお気に入り店舗を登録することによりいつでも
            営業状況を確認することができます。まずは登録しましょう。登録が完了したらお気に入り店舗を
            追加しましょう。名前から検索,付近から検索をすることができます。あなたも自分だけのフルコースを
            探しに行きましょう！！！！
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
