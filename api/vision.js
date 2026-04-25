// Vercel Serverless Function — proxies Anthropic vision analysis
// Accepts base64 image, returns structured technique scores JSON

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const { imageData, prompt } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'imageData (base64 JPEG) required' });
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a DVIDA-certified ballroom dance analyst. Analyze the dancer's form. Return ONLY valid JSON:\n{"scores":{"posture":N,"frame":N,"alignment":N,"balance":N,"expression":N},"overall":N,"feedback":["point 1","point 2","point 3"],"strengths":["strength"],"priority":"single most important focus"}`,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: imageData },
            },
            {
              type: 'text',
              text: prompt || 'Analyze this dancer using DVIDA American Smooth/Rhythm Bronze standards. Score each area 0-100.',
            },
          ],
        }],
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data.error?.message || 'Anthropic error' });
    }

    // Parse the JSON from the text response
    const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || '';
    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
    return res.status(200).json(parsed);
  } catch (err) {
    console.error('api/vision error:', err);
    return res.status(500).json({ error: 'Analysis failed' });
  }
}
