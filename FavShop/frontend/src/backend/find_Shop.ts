export interface SearchResult {
  title: string;
  description: string;
  place_id:string;
}
/*画像の型
interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}*/
const BASE_URL: string = process.env.REACT_APP_GOOGLE_PLACES_API_URL ?? "";
const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";
export const searchPlaceByName = async (Shopname:string):Promise<SearchResult[]> => {
  // 環境変数が正しく設定されているか確認
  if (!BASE_URL || !API_KEY) {
    throw new Error("BASE_URL or API_KEY is not defined");
  }
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&query=${encodeURIComponent(Shopname)}`);
    console.log(response)
    const data = await response.json();
    console.log('API Response:', data); // レスポンスをコンソールに出力
    if (!data.results) {
      throw new Error("Invalid API response format");
    }
    return data.results.map((place: any) => ({
        title: place.name,
        description: place.formatted_address,
        place_id:place.place_id/*その他のレスポンス
        住所,電話番号,営業時間{今営業しているか true or false},webサイトURL,phots型のオブジェクト,口コミ評価
        location: place.geometry.location,
        phone_number:place.formatted_phone_number,
        opening_hours:place.opening_hours,
        website:place.website,
        photos:place.photos,
        rating:place.rating*/
      }as SearchResult));
}


/*テスト用のコード*/
/*
const placeName = '粋蓮華'; // 検索したい店の名前
searchPlaceByName(placeName).then(places => {
  console.log('Found places:', places);
});*/

