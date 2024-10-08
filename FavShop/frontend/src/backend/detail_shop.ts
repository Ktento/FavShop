import { CardData } from "../App"; 
  const BASE_URL: string = process.env.REACT_APP_GOOGLE_PLACES_API_URL ?? "";
  const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";
  export const SearchDetailShops = async (user_id:number,place_ids:string[]):Promise<CardData[]> => {
    // 環境変数が正しく設定されているか確認
    if (!BASE_URL || !API_KEY) {
      throw new Error("BASE_URL or API_KEY is not defined");
    }
    const placeinfoPromises = place_ids.map(async (place_id) => {
      const response = await fetch(`/api/search-places-from-placeid?place_id=${encodeURIComponent(place_id)}`);
      const data = await response.json();
      if (!data.result) {
        throw new Error(`place_id: ${place_id} の詳細が見つかりません`);
      } const place = data.result;
    
      // 写真の参照を取得し、画像URLを構成する
      const photoReference = place.photos ? place.photos[0].photo_reference : '';
      const image = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';
      
      // 今日の曜日を取得する
      const today = (new Date().getDay()+ 6) % 7; // 0:日曜日, 1:月曜日, ..., 6:土曜日
      const weekdayText = place.opening_hours?.weekday_text || [];
      const hoursToday = weekdayText[today] || 'N/A'; // 今日の営業時間

      return {
        id: user_id, 
        plaseid: place_id,// place_id をユニークな識別子として使用
        image,
        title: place.name || '',
        address: place.formatted_address || '',
        webURL:place.website || '',
        hours:  hoursToday
      };
    });
    // すべてのプロミスが解決するのを待ち、結果を返す
    const places = await Promise.all(placeinfoPromises);
    return places;
  }
  
  /*テスト用のコード*/
  /*
  const placeName = ''; // 検索したい店の名前
  searchPlaceByName(placeName).then(places => {
    console.log('Found places:', places);
  });*/
  
  