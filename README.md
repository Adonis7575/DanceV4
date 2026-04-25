# 💃 Dance Coach — DVIDA Bronze AI Trainer

AI-powered ballroom dance training app built on the official DVIDA Bronze syllabus.
American Smooth (Waltz, Foxtrot, Tango, Viennese Waltz) + American Rhythm (Rumba, Cha-Cha, ECS, Samba, Bolero, Mambo).

## Stack
- **Frontend**: React 18 + Vite
- **AI**: Anthropic Claude (claude-sonnet-4) via secure Vercel serverless functions
- **Community DB**: Supabase (Postgres + REST API)
- **Personal data**: localStorage (no backend needed)
- **Hosting**: Vercel

---

## Deploy in 4 Steps

### 1. Supabase — Community Database
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste `supabase-setup.sql` → Run
3. Copy your **Project URL** and **anon (public) key** from Settings → API

### 2. Anthropic API Key
1. Get your key at [console.anthropic.com](https://console.anthropic.com)
2. This stays **server-side only** — never put it in a VITE_ env var

### 3. Vercel — Deploy
```bash
# Option A: GitHub (recommended)
git init && git add . && git commit -m "initial"
# Push to GitHub, then import in vercel.com → New Project

# Option B: Vercel CLI
npm i -g vercel
vercel --prod
```

### 4. Environment Variables
Add these in **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable | Value | Where |
|----------|-------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Server only |
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | All environments |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | All environments |

---

## Local Development
```bash
cp .env.example .env      # fill in your values
npm install
npm run dev               # http://localhost:5173
```

> Local dev uses Vite's proxy to forward /api/* to localhost:3000.
> Run `vercel dev` instead of `npm run dev` to also run the serverless functions locally.

---

## Project Structure
```
dance-coach/
├── api/
│   ├── chat.js          # Anthropic chat proxy (server-side key)
│   └── vision.js        # Anthropic vision proxy (camera analysis)
├── src/
│   ├── main.jsx         # React root
│   └── App.jsx          # Full app (1300+ lines)
├── index.html
├── vite.config.js
├── vercel.json
├── supabase-setup.sql   # Run once in Supabase SQL editor
└── .env.example
```

## Features
- **DVIDA Bronze Syllabus** — all official figures, Bronze I → Full Bronze, with 80% level gating
- **AI Coach Chat** — Claude-powered DVIDA expert coach, context-aware
- **Camera Technique Analysis** — Claude Vision scores posture, frame, alignment, balance, expression
- **AI Drill Generator** — dynamic per-figure drill plans with DVIDA-specific coaching
- **Figure Quiz** — AI-generated descriptions, multiple choice, tracks accuracy
- **Routine Builder** — chain figures into competition routines, get AI coaching notes
- **Metronome** — Web Audio API, per-dance BPM presets, time signature
- **Daily Challenge** — date-seeded figure of the day
- **Progress Tracking** — XP, streaks, badges, weekly chart (real data)
- **Community** — shared posts via Supabase, likes, real-time refresh
