/* ══════════════════════════════════════════════
   AI API CLIENT — talks to the serverless proxies in /api.
══════════════════════════════════════════════ */
export const SYSTEM = `You are an elite DVIDA-certified ballroom dance coach specializing in American Smooth (Waltz, Foxtrot, Tango, Viennese Waltz) and American Rhythm (Rumba, Cha-Cha, East Coast Swing, Samba, Bolero, Mambo). You follow the DVIDA Bronze syllabus precisely.
Your personality: Warm, encouraging, technically precise, passionate. Give specific, actionable feedback using correct DVIDA terminology. Be concise — dancers read on mobile between sessions.`;

// Fetch with an abort timeout so a stalled request never hangs the UI forever.
export async function fetchJSON(url, payload, timeoutMs = 30000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: ctrl.signal,
    });
    let d = null;
    try { d = await r.json(); } catch { /* non-JSON body */ }
    if (!r.ok) throw new Error(d?.error || `Request failed (${r.status})`);
    if (d?.error) throw new Error(d.error);
    return d;
  } catch (e) {
    if (e.name === "AbortError") throw new Error("Request timed out — please try again.");
    throw e;
  } finally {
    clearTimeout(t);
  }
}

// model: "smart" (Sonnet, default — coaching) or "fast" (Haiku — cheap structured tasks)
export async function callAI(messages, sys = SYSTEM, max = 1000, model = "smart") {
  const d = await fetchJSON("/api/chat", { messages, system: sys, max_tokens: max, model });
  return d.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "";
}

export async function visionAI(b64) {
  return fetchJSON("/api/vision", { imageData: b64 });
}

// Quiz figure descriptions are deterministic per (dance, figure) — cache them in
// localStorage so re-quizzing the same figure never re-hits (or re-bills) the API.
export async function describeFigure(dance, fig) {
  const key = `dc-desc:${dance.id}:${fig}`;
  try {
    const hit = localStorage.getItem(key);
    if (hit) return hit;
  } catch { /* ignore */ }
  const text = await callAI(
    [{ role: "user", content: `In 2 sentences, describe the DVIDA Bronze "${fig}" in ${dance.name} — what it looks like and one key technique point. Be specific.` }],
    SYSTEM, 300, "fast"
  );
  try { localStorage.setItem(key, text); } catch { /* ignore */ }
  return text;
}
