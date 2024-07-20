import React, { useState } from 'react';
import '../CSS/SignIn_Modal.css'; 
import {Login} from '../backend/Login';
//import { getAllTodos } from '../../../backend/db.ts'; ログイン用の関数呼び出し

interface SignInModalProps {
  openSignUpModal: () => void;
  onClose: () => void;
  setUser: (user_id: Number | null) => void;
  closeDrawer: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ openSignUpModal, onClose, setUser,closeDrawer }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
//ログインボタンが押された際の動作
  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();     //非必要なページリロードを防ぐ
    // 英数字の検証
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    if (!alphanumericRegex.test(username) || !alphanumericRegex.test(password)) {
      setInputError('ユーザー名/パスワードは英数字のみです');
      return;
    }


    try {
      const response = await Login(username, password);//Loginできるか試す
      if (response.success) {//responce.successに成功したらtrueが入る
        setInputError(null);
        setUser(response.user_id??null);     //userstatusを設定
        onClose(); 
        closeDrawer();
        alert('ログイン成功');
      } else {
        setInputError(null);
        setInputError('ログインできません');
      }
    } catch (error) {
      console.error('Login error:', error);
      setInputError('ログイン中にエラーが発生しました');
    }
  };




  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">ログイン</h2>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          ユーザー名:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </label>
        <label>
          パスワード:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>
        {inputError && (
          <div className="error-message">{inputError}</div>
        )}
        <button type="submit" className="signup-button">ログイン</button>
        <div className="signup-link">
          <span><a href="#" onClick={(e) => { e.preventDefault(); openSignUpModal(); }}>Sign Upこちら</a></span>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
