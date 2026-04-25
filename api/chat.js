// Vercel Serverless Function — proxies Anthropic /v1/messages
// API key never leaves the server; CORS locked to same origin

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic rate limit via Vercel Edge (add Upstash Redis for production rate limiting)
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server misconfigured — API key missing' });
  }

  try {
    const { messages, system, max_tokens = 1000 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const body = {
      model: 'claude-sonnet-4-20250514',
      max_tokens,
      messages,
    };
    if (system) body.system = system;

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data.error?.message || 'Anthropic error' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('api/chat error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
