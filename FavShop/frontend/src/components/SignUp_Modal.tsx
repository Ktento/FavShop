import React, { useState } from "react";
import "../CSS/SignUp_Modal.css";
import { InsertUser } from "../backend/SignUp"; //サインイン用の関数呼び出し
interface SignUpModalProps {
  onClose: () => void;
}

const SignUp_Modal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // 英数字の検証
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    let entryflag = true;
    if (
      !alphanumericRegex.test(username) ||
      !alphanumericRegex.test(password)
    ) {
      setInputError("ユーザー名/パスワードは英数字のみです");
      entryflag = false;
      return;
    }

    // パスワードと確認パスワードの検証
    if (password !== confirmPassword) {
      setInputError("パスワードが一致しません");
      entryflag = false;
      return;
    }
    try {
      const success = await InsertUser(username, password);
      if (success) {
        setInputError(null);
        onClose();
      } else {
        setInputError(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      setInputError("ログイン中にエラーが発生しました");
    }
  };
  /*** 仮ログイン
        if (username == 'user' && password == 'pass' && confirmPassword == 'pass') {
          alert('ログイン成功');
          setInputError(null);
          onClose();
        } else {
          setInputError(null);
        }
        }
        ***/

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">サインアップ</h2>
      </div>
      <form onSubmit={handleSignUp} className="signup-form">
        <label>
          ユーザーID:
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
        <label>
          パスワード（確認）:
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </label>
        {inputError && <div className="error-message">{inputError}</div>}
        <button type="submit" className="signup-button">
          サインアップ
        </button>
      </form>
    </div>
  );
};

export default SignUp_Modal;
