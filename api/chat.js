// Vercel Serverless Function — proxies Anthropic /v1/messages
// API key never leaves the server; origin-locked + rate-limited via _guard.

import { guard } from './_guard.js';

const MAX_MESSAGES = 24;        // cap conversation length sent upstream
const MAX_TOKENS_CAP = 1500;    // never let a caller request more than this
const MAX_CHARS = 24_000;       // rough cap on total prompt size

// Callers pick a tier by name; ids stay server-side. 'fast' (Haiku) is used for
// cheap, structured tasks (quiz blurbs, drills); 'smart' (Sonnet) for coaching.
const MODELS = {
  smart: 'claude-sonnet-4-20250514',
  fast: 'claude-haiku-4-5-20251001',
};

export default async function handler(req, res) {
  if (!guard(req, res)) return;

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server misconfigured — API key missing' });
  }

  try {
    const { messages, system, max_tokens = 1000, model = 'smart' } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }
    if (messages.length > MAX_MESSAGES) {
      return res.status(400).json({ error: 'Too many messages' });
    }
    const totalChars = JSON.stringify(messages).length + (system ? system.length : 0);
    if (totalChars > MAX_CHARS) {
      return res.status(413).json({ error: 'Prompt too large' });
    }

    const body = {
      model: MODELS[model] || MODELS.smart,
      max_tokens: Math.min(Number(max_tokens) || 1000, MAX_TOKENS_CAP),
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
