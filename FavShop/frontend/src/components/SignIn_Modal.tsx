import React, { useState } from 'react';
import '../CSS/SignIn_Modal.css'; 

interface SignInModalProps {
  openSignUpModal: () => void;
  onClose: () => void;
  setUser: (user: string | null) => void;
  closeDrawer: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ openSignUpModal, onClose, setUser,closeDrawer }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
//ログインボタンが押された際の動作
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();     //非必要なページリロードを防ぐ
    // 英数字の検証
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    if (!alphanumericRegex.test(username) || !alphanumericRegex.test(password)) {
      setInputError('ユーザー名/パスワードは英数字のみです');
      return;
    }
    /* 関数呼び出し */
/********************************************* 
 * import axios from 'axios';をこのコンポーネントに適用する。
 * /api/login  にある関数コンポーネントに対して入力したusernameとpasswordを送信。
 * 
 * 
    try {
      const response = await axios.post('/api/login', { username, password });
      const { success } = response.data;
      
      if (success) {
        setInputError(null);
        setUser(user.username);     //userstatusを設定
        onClose(); 
        closeDrawer();
        alert('ログイン成功');
      } else {
        setInputError(null);
      }
    } catch (error) {
      console.error('Login error:', error);
      setInputError('ログイン中にエラーが発生しました');
    }
  };
****************************************************************/
    /* 仮ログイン */
    if (username == 'user' && password == 'pass') {
      setInputError(null);
      setUser(username);
      onClose();
      closeDrawer();
      alert('ログイン成功');
    } else {
      setInputError(null);
      setInputError('ログインできません');
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
