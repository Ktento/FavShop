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
      <div className="info-modal-content">
        <div className="modal-header">
          <Typography variant="h6" className="modal-title">
            アプリについて
          </Typography>
        </div>
        <div className="modal-content">
          <Typography variant="body2">
            このアプリケーションは、ユーザーが様々な機能を利用できるように設計されています。
          <ul>
            <li><strong>近くの店舗表示機能:</strong> ログアウト状態では周辺の店舗が初期状態として表示されます。</li>
            <li><strong>ログイン機能:</strong> アカウント登録がされているユーザはログインすることができます。サイドバーメニューからログインをしてください。</li>
            <li><strong>サインイン機能:</strong> アカウントの登録をすることができます。ユーザ名、パスワードは半角英数字で未登録の名前を設定する必要があります。</li>
            <li><strong>お気に入りの店舗登録機能:</strong> サイドバーメニューの+を押すことで店舗の検索メニューが表示されます。検索キーワードは店舗名 地名を入力することでより正確な店舗検索ができます。検索ボタンを押すと検索が開始されます。表示された店舗を選択し決定ボタンを押すことで店舗の追加ができます。※店舗の追加はログイン中でかつ未登録の店舗でないと実行できません</li>
            <li><strong>お気に入りの店舗の表示:</strong> 登録されたお気に入りの店舗が現在地から<strong>近い順</strong>に表示されます。赤色→営業終了、黄色→営業終了30分前、青色→営業中を示しています。店舗をクリックすることで詳細を確認できます。店舗までの経路→現在地からの経路をgooglemapで表示します。店舗詳細を確認→店舗のWebサイトが表示されます。</li>
          </ul>
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
