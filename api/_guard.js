// Shared request guard for the Anthropic proxy functions.
// Provides best-effort origin allow-listing and per-IP rate limiting so the
// serverless endpoints can't be used as an open relay to the paid API key.

// Origins allowed to call the proxy. In production set ALLOWED_ORIGINS to a
// comma-separated list (e.g. "https://your-app.vercel.app"). Localhost dev
// ports are always allowed.
const DEV_ORIGINS = [
  'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
  'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175',
];

function allowedOrigins() {
  const env = (process.env.ALLOWED_ORIGINS || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  return [...DEV_ORIGINS, ...env];
}

// Fixed-window in-memory limiter. Note: serverless instances are ephemeral and
// not shared, so this is a coarse safety net — use Upstash/Redis for hard
// guarantees. Still meaningfully blocks naive abuse from a single instance.
const WINDOW_MS = 60_000;
const MAX_REQ = Number(process.env.RATE_LIMIT_PER_MIN || 20);
const hits = new Map(); // ip -> { count, resetAt }

function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_REQ;
}

// Returns true if the request is allowed to proceed. On rejection it writes the
// response and returns false, so callers do: `if (!guard(req, res)) return;`
export function guard(req, res) {
  const origin = req.headers.origin;
  // Browser requests carry an Origin; reject cross-site origins. Requests with
  // no Origin (curl, server-to-server) are permitted.
  if (origin && !allowedOrigins().includes(origin)) {
    res.status(403).json({ error: 'Origin not allowed' });
    return false;
  }
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(204).end(); return false; }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }
  if (rateLimited(clientIp(req))) {
    res.status(429).json({ error: 'Too many requests — slow down a moment.' });
    return false;
  }
  return true;
}
