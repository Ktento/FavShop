import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL: string = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY: string = process.env.SUPABASE_API_KEY ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { user_id, place_id } = req.body;

  if (!user_id || !place_id) {
    return res.status(400).json({ error: 'user_id and place_id are required' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/entry_shop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ user_id, place_id })
    });

    const data = await response.json();
    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with Supabase' });
  }
}
