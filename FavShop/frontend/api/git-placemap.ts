//APIを使用するためのサーバレス関数
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

// Google Places APIのエンドポイントURL
const BASE_URL: string = process.env.REACT_APP_GOOGLE_PLACES_API_URL ?? "https://maps.googleapis.com/maps/api/place/textsearch/json";
const STATIC_MAP_BASE_URL: string = process.env.REACT_APP_GOOGLE_STATIC_MAP_API_URL ?? "https://maps.googleapis.com/maps/api/staticmap";
const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'Google API key is not defined' });
  }

  try {
    // Google Places APIで店舗情報を取得
    const placesResponse = await fetch(`${BASE_URL}?key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const placesData = await placesResponse.json();

    if (placesData.results && placesData.results.length > 0) {
      // 最初の結果を取得
      const place = placesData.results[0];
      const { geometry } = place;

      if (geometry && geometry.location) {
        const { lat, lng } = geometry.location;

        // Google Maps Static APIで地図画像を取得
        const staticMapUrl = `${STATIC_MAP_BASE_URL}?center=${lat},${lng}&zoom=15&size=600x400&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${API_KEY}`;

        // 画像URLをクライアントに返す
        res.status(200).json({ mapUrl: staticMapUrl });
      } else {
        res.status(404).json({ error: 'Location data not found in place result' });
      }
    } else {
      res.status(404).json({ error: 'No results found for the query' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google API' });
  }
}
