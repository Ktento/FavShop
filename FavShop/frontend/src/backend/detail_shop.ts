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
      console.log('data=',data);
      if (!data.result) {
        throw new Error(`place_id: ${place_id} の詳細が見つかりません`);
      } const place = data.result;
    
      // 写真の参照を取得し、画像URLを構成する
      const photoReference = place.photos ? place.photos[0].photo_reference : '';
      const image = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';
      
      // 今日の曜日を取得する
      const today = new Date().getDay(); // 0:日曜日, 1:月曜日, ..., 6:土曜日
      const weekdayText = place.opening_hours?.weekday_text || [];
      const hoursToday = weekdayText[today] || 'N/A'; // 今日の営業時間
      const formatTime = (time: string): string => {
        const [start, end] = time.split(' – '); // 「AM – PM」の部分で分割
        const format = (t: string): string => {
          const [timePart, period] = t.split(' ');
          let [hours, minutes] = timePart.split(':').map(num => parseInt(num, 10));
          
          // 24時間形式に変換
          if (period === 'PM' && hours !== 12) {
            hours += 12;
          } else if (period === 'AM' && hours === 12) {
            hours = 0;
          }
          
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };
      
        const formattedStart = format(start);
        const formattedEnd = format(end);
        
        return `${formattedStart} – ${formattedEnd}`;
      };

      // 時間範囲が複数行ある場合の処理
    const formattedHours = hoursToday
    .split('\n') // 複数行の時間範囲がある場合に対応
    .map((range:string) => formatTime(range.trim())) // 各範囲をフォーマット
    .join(' / '); // 時間範囲を / で結合

      console.log(formattedHours);

      return {
        id: user_id, // place_id をユニークな識別子として使用
        plaseid: parseInt(place_id, 10),
        image,
        title: place.name || '',
        address: place.formatted_address || '',
        hours:  formattedHours,
      };
    });
    // すべてのプロミスが解決するのを待ち、結果を返す
    const places = await Promise.all(placeinfoPromises);
    return places;
  }
  
  /*テスト用のコード*/
  /*
  const placeName = '粋蓮華'; // 検索したい店の名前
  searchPlaceByName(placeName).then(places => {
    console.log('Found places:', places);
  });*/
  
  