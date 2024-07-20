// App.tsx
import React, { useState ,useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);          //**ユーザ情報を保持 */
  const [user_id, setUserID] = useState<Number | null>(null);

  /*現在地を保持*/
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  /*現在地を取得*/
  useEffect(() => {
    // 位置情報を取得する関数
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };

    // 取得に成功した場合の処理
    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    // 取得に失敗した場合の処理
    const errorCallback = (error: GeolocationPositionError) => {
      alert("位置情報が取得できませんでした");
    };
    // 位置情報を取得
    getCurrentPosition();
  }, []); // 空の依存配列でマウント時に一度だけ実行

  return (
    <div className="App">
      <Header user={user} user_id={user_id}  setUser={setUser} setUserID={setUserID} />
      <div className="main">
        <Content user_id={user_id} location={location}/>
      </div>
    </div>
  );
}

export default App;
