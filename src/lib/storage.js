/* ══════════════════════════════════════════════
   STORAGE — localStorage for personal data, Supabase REST for community.
══════════════════════════════════════════════ */
export const SUPA_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const load = async (k, shared = false) => {
  try {
    if (shared) {
      if (!SUPA_URL) return null;
      const r = await fetch(`${SUPA_URL}/rest/v1/community_posts?order=created_at.desc&limit=50`, {
        headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` }
      });
      return r.ok ? r.json() : null;
    }
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : null;
  } catch (e) { return null; }
};

export const save = async (k, v, shared = false) => {
  try {
    if (shared) return;
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) { /* quota / private mode — ignore */ }
};
