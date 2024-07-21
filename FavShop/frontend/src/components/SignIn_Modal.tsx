import React, { useState } from 'react';
import '../CSS/SignIn_Modal.css'; 
import {Login} from '../backend/Login';
import { CardData } from '../App';
import { user_entry_shops } from '../backend/user_entry_shops';
import { SortDistance } from '../backend/sortdistance';
import { SearchDetailShops } from '../backend/detail_shop';
interface SignInModalProps {
  user: string | null; 
  user_id: number | null;
  location :{latitude:number|null, longitude:number|null}|null;
  openSignUpModal: () => void;
  onClose: () => void;
  setUser: (user: string | null) => void;
  setUserID: (user_id: number | null) => void;
  closeDrawer: () => void;
  carddata : CardData[]|null;
  //CardData配列をすべて初期化するか、配列の一つを更新するか選べる
  setCardData:React.Dispatch<React.SetStateAction<CardData[]>>;
}

const SignInModal: React.FC<SignInModalProps> = ({ user_id,location,openSignUpModal, onClose, setUser,setUserID,closeDrawer,setCardData}) => {
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
        setUser(response.username??null);
        setUserID(response.user_id??null);     //userstatusを設定
        onClose(); 
        closeDrawer();
        alert('ログイン成功');
        if(user_id){
          const response=user_entry_shops(user_id);
          if((await response).success){
            const place_ids=(await response).place_ids;
            if(place_ids){
                if(location?.latitude!=null||location?.longitude!=null){
                  const sortplace_ids=await SortDistance(place_ids,location.latitude,location.longitude);
                  const card=await SearchDetailShops(user_id,sortplace_ids);
                  setCardData(card);
                }else{
                  const card=await SearchDetailShops(user_id,place_ids);
                  setCardData(card);
                }
            }else{
              alert("placeidが取得できませんでした");
            }

          }else{
            alert("お気に入りの店舗が登録されていません");
          }
        }else{
          alert("user_idがありません");
        } 
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
