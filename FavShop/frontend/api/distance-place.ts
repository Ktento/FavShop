//APIを使用するためのサーバレス関数
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const BASE_URL: string = process.env.REACT_APP_GOOGLE_DISTANCE_API_URL ?? "";
const API_KEY: string = process.env.REACT_APP_GOOGLE_DISTANCE_API_KEY ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const origin = req.query.origin as string;  
    const destination = req.query.destination as string;

  if (!origin||!destination) {
    return res.status(400).json({ error: 'origin or destination parameter is required' });
  }

  if (!API_KEY||!BASE_URL) {
    return res.status(500).json({ error: 'Google Distance API key is not defined' });
  }

  try {
    const response = await fetch(`${BASE_URL}?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Google Places API' });
  }
}
