// App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import { SearchNearShops } from "./backend/find_near_Shops";
export interface CardData {
  id: number | null;
  plaseid: string;
  image: string;
  title: string;
  address: string;
  webURL: string;
  hours: string;
}
const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("user") || null
  );
  const [user_id, setUserID] = useState<number | null>(
    localStorage.getItem("user_id")
      ? parseInt(localStorage.getItem("user_id")!)
      : null
  );
  /*カードデータを保持するための配列を定義*/
  const [carddata, setCardData] = useState<CardData[]>(() => {
    // 初期状態としてlocalStorageからカードデータを取得
    const savedCardData = localStorage.getItem("carddata");
    return savedCardData ? JSON.parse(savedCardData) : [];
  });

  /*現在地を保持*/
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  } | null>(null);

  // カード情報を追加する関数
  const addCardData = (newCard: CardData) => {
    //setCardData(prevCardData => [...prevCardData, newCard]);
    setCardData((prevCardData) => {
      const updatedCardData = [...prevCardData, newCard];
      localStorage.setItem("carddata", JSON.stringify(updatedCardData)); // localStorageに保存
      return updatedCardData;
    });
  };

  // カード情報を削除する関数
  const deleteCardData = (place_id: string) => {
    //setCardData(prevCardData => prevCardData.filter(card => card.plaseid !== place_id));
    setCardData((prevCardData) => {
      const updatedCardData = prevCardData.filter(
        (card) => card.plaseid !== place_id
      );
      localStorage.setItem("carddata", JSON.stringify(updatedCardData)); // localStorageに保存
      return updatedCardData;
    });
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
  }, []); // 空の依存配列でマウント時に一度だけ実行
  //現在地から近い店舗のカード情報を登録する関数
  const fetchNearbyShops = async () => {
    console.log("fetchNearbyShops実行");
    if (location?.latitude && location?.longitude && carddata.length === 0) {
      try {
        const card = await SearchNearShops(
          location.latitude,
          location.longitude
        );
        setCardData(card);
      } catch (error) {
        console.error("Error fetching nearby shops:", error);
      }
    } else {
      console.log("if分ではじかれた");
      console.log("latitude", location?.latitude);
      console.log("carddata", carddata, carddata.length);
      setCardData([]);
    }
  };

  useEffect(() => {
    if (location) fetchNearbyShops();
  }, [location]);

  // ログイン状態を localStorage に保存
  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (user_id !== null) {
      localStorage.setItem("user_id", user_id.toString());
    } else {
      localStorage.removeItem("user_id");
    }
  }, [user_id]);

  useEffect(() => {
    localStorage.setItem("carddata", JSON.stringify(carddata));
  }, [carddata]);

  return (
    <div className="App">
      <Header
        user={user}
        user_id={user_id}
        location={location}
        setUser={setUser}
        setUserID={setUserID}
        carddata={carddata}
        setCardData={setCardData}
        addCardData={addCardData}
        fetchNearbyShops={fetchNearbyShops}
      />
      <div className="main">
        <Content
          user_id={user_id}
          location={location}
          carddata={carddata}
          setCardData={setCardData}
          addCardData={addCardData}
          deleteCardData={deleteCardData}
        />
      </div>
    </div>
  );
};

export default App;
