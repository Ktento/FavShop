import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const BASE_URL: string = process.env.REACT_APP_GOOGLE_NEARBYSEARCH_API_URL ?? "";
const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and Longitude parameters are required' });
    }
  
    if (!API_KEY) {
      return res.status(500).json({ error: 'Google Places API key is not defined' });
    }
  
    try {
      const response = await fetch(`${BASE_URL}?location=${encodeURIComponent(latitude as string)},${encodeURIComponent(longitude as string)}&radius=1500&language=ja&keyword=飲食店ORカフェOR居酒屋&key=${API_KEY}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from Google Places API' });
    }
}
