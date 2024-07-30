import { CardData } from "../App"; 
  const BASE_URL: string = process.env.REACT_APP_GOOGLE_NEARBYSEARCH_API_URL ?? "";
  const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";
  export const SearchNearShops = async ( latitude:number, longitude:number):Promise<CardData[]> => {
    // 環境変数が正しく設定されているか確認
    if (!BASE_URL || !API_KEY) {
      throw new Error("BASE_URL or API_KEY is not defined");
    }
    const response = await fetch(`/api/search-near-places?latitude=${encodeURIComponent(latitude.toString())}&longitude=${encodeURIComponent(longitude.toString())}`);
    const data = await response.json();
    console.log('data=',data);
    if (!data.results||data.results.length==0) {
        throw new Error(`詳細が見つかりません`);
    } 
    const cardData: CardData[] = data.results.map((place: any) => {
        // 写真の参照を取得し、画像URLを構成する
        const photoReference = place.photos ? place.photos[0].photo_reference : '';
        const image = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';

      return {
        id: null, 
        plaseid: place.place_id,// place_id をユニークな識別子として使用
        image,
        title: place.name || '',
        address: place.vicinity || '',
        webURL:'',
        hours:  ''
      };
    });
    return cardData;
  }

  /*テスト用のコード*/
  /*
  const placeName = '粋蓮華'; // 検索したい店の名前
  searchPlaceByName(placeName).then(places => {
    console.log('Found places:', places);
  });*/
  
  