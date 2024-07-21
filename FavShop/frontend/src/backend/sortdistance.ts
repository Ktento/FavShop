interface PlaceDistance{
  place_id:string,
  distance:number
}
const BASE_URL: string = process.env.REACT_APP_GOOGLE_DISTANCE_API_URL ?? "";
const API_KEY: string = process.env.REACT_APP_GOOGLE_DISTANCE_API_KEY ?? "";
  export const SortDistance = async (place_ids:string[],latitude:number|null,longitude:number|null):Promise<string[]> => {
    // 環境変数が正しく設定されているか確認
    if (!BASE_URL || !API_KEY) {
      throw new Error("BASE_URL or API_KEY is not defined");
    }
    //現在地（緯度、経度)がnullでないことを確認
  if (!latitude||!longitude) {
    throw new Error("Current location is not defined");
  }
    const origin = `${latitude},${longitude}`;

    const distancePromises = place_ids.map(async (place_id) => {
      const response = await fetch(`/api/distance-place?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(place_id)}`);
      console.log(response);
      const data = await response.json();
      //responseがすべてnullでないかの検査
      if (data.rows && data.rows[0] && data.rows[0].elements && data.rows[0].elements[0] && data.rows[0].elements[0].distance) {
        const distance = data.rows[0].elements[0].distance.value; // 距離（メートル）
        return { place_id, distance } as PlaceDistance;
      } else {
        throw new Error("Invalid API response format");
      }
    });
      //すべての距離が取得できるまで待つ
      const distances = await Promise.all(distancePromises);
      //距離に応じてソート(昇順)
      distances.sort((a, b) => a.distance - b.distance);
      return distances.map(distance => distance.place_id);

  }
  
  
  /*テスト用のコード*/
  /*
  const placeName = '粋蓮華'; // 検索したい店の名前
  searchPlaceByName(placeName).then(places => {
    console.log('Found places:', places);
  });*/
  
  