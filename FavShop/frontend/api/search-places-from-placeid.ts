import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const BASE_URL: string = process.env.REACT_APP_GOOGLE_PLACES_API_URL ?? "";
const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const placeId = req.query.place_id as string;

  if (!placeId) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  if (!API_KEY||!BASE_URL) {
    return res.status(500).json({ error: 'Google Places API key is not defined' });
  }

  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&place_id=${encodeURIComponent(placeId)}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Places API' });
  }
}
