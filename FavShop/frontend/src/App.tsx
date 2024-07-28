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
  webURL:string;
  hours: string;
}
const App: React.FC = () => {
  console.log("Content OPEN")
  const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null);
  const [user_id, setUserID] = useState<number | null>(localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')!) : null);

  /*現在地を保持*/
  const [location, setLocation] = useState<{ latitude: number|null; longitude: number|null } | null>(null);
  /*カードデータを保持するための配列を定義*/
  const [carddata,setCardData] =useState<CardData[]>([]);
  // カード情報を追加する関数
  const addCardData = (newCard: CardData) => {
    setCardData(prevCardData => [...prevCardData, newCard]);
  };
  
  // カード情報を削除する関数
  const deleteCardData = (place_id: string) => {
    setCardData(prevCardData => prevCardData.filter(card => card.plaseid !== place_id));
  };
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
        webURL:"https://github.com/Ktento",
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 2,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+2',
        title: '店名2',
        address: '住所2',
        webURL:"https://github.com/Ktento",
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 3,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+3',
        title: '店名3',
        address: '住所3',
        webURL:"https://github.com/Ktento",
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 4,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+4',
        title: '店名4',
        address: '住所4',
        webURL:"https://github.com/Ktento",
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
      {
        id: 5,
        plaseid: "11111",
        image: 'https://via.placeholder.com/300x140?text=Image+5',
        title: '店名5',
        address: '住所5',
        webURL:"https://github.com/Ktento",
        hours: 'Sunday: 10:00 AM – 2:00 AM',
      },
    ]);
  }, []); // 空の依存配列でマウント時に一度だけ実行

  // ログイン状態を localStorage に保存
  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (user_id !== null) {
      localStorage.setItem('user_id', user_id.toString());
    } else {
      localStorage.removeItem('user_id');
    }
  }, [user_id]);


  
  
  return (
    <div className="App">
      <Header user={user} user_id={user_id} location={location} 
      setUser={setUser} setUserID={setUserID} carddata={carddata} setCardData={setCardData}/>
      <div className="main">
        <Content user_id={user_id} location={location} 
        carddata={carddata} setCardData={setCardData} addCardData={addCardData} deleteCardData={deleteCardData}/>
      </div>
    </div>
  );
}

export default App;
