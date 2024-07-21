export interface MapData {
  mapUrl: string;
}
const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";

export const SearchDetailShops = async (place_ids: string[]): Promise<MapData[]> => {
  if (!API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  const placeinfoPromises = place_ids.map(async (place_id) => {
    const response = await fetch(`/api/get-map-url-from-placeid?place_id=${encodeURIComponent(place_id)}`);
    const data = await response.json();

    if (!data.mapUrl) {
      throw new Error(`place_id: ${place_id} の詳細が見つかりません`);
    }

    return {
      mapUrl: data.mapUrl
    };
  });

  const places = await Promise.all(placeinfoPromises);
  return places;
}
