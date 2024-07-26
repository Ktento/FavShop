// App.tsx
import React, { useState ,useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
export interface CardData {
  id: number;
  plaseid: string;
  image: string;
  title: string;
  address: string;
  hours: string;
}
const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);          //**ユーザ情報を保持 */
  const [user_id, setUserID] = useState<number | null>(null);

  /*現在地を保持*/
  const [location, setLocation] = useState<{ latitude: number|null; longitude: number|null } | null>(null);
  /*カードデータを保持するための配列を定義*/
  const [carddata,setCardData] =useState<CardData[]>([]);
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

    // ダミーデータとして最初に表示するカードデータを表示
    setCardData([
      {
        id: 1,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+1',
        title: '店名1',
        address: '住所1',
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 2,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+2',
        title: '店名2',
        address: '住所2',
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 3,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+3',
        title: '店名3',
        address: '住所3',
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 4,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+4',
        title: '店名4',
        address: '住所4',
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 5,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+5',
        title: '店名5',
        address: '住所5',
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
    ]);
  }, []); // 空の依存配列でマウント時に一度だけ実行


  
  
  return (
    <div className="App">
      <Header user={user} user_id={user_id} location={location} 
      setUser={setUser} setUserID={setUserID} carddata={carddata} setCardData={setCardData}/>
      <div className="main">
        <Content user_id={user_id} location={location} carddata={carddata} setCardData={setCardData}/>
      </div>
    </div>
  );
}

export default App;
