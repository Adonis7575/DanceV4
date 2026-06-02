/* ══════════════════════════════════════════════
   SCORING & PROGRESS — pure functions (no React, no DOM).
   Unit-tested in scoring.test.js.
══════════════════════════════════════════════ */
import { ALL_DANCES, BRONZE_LEVELS, UNLOCK_THRESHOLD } from "../data/dvida.js";

// Default progress shape persisted to localStorage.
export const DEF = {
  xp:0, level:1, streak:0, lastPractice:null, userName:"",
  completedFigures:{}, earnedBadges:[], drillsCompleted:0,
  metronomeSessions:0, postsCount:0, practiceMinutes:0,
  aiChats:0, analysisCount:0, articlesRead:0,
  quizScore:{correct:0, total:0}, dailyLog:{}, routine:[],
  dailyGoalMinutes:15, challengeDoneDate:null,
  onboarded:false,
};

// Local calendar date (YYYY-MM-DD) — used for streaks and daily logs.
export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

// 100 XP per level, starting at level 1.
export const levelFromXp = (xp) => Math.floor((xp || 0) / 100) + 1;

// Stable key for a completed figure.
export const figKey = (danceId, lvl, fig) => `${danceId}::${lvl}::${fig}`;

// Fraction (0..1) of a single level's figures completed.
export function pctLevel(danceId, lvl, prog) {
  const dance = ALL_DANCES.find(d => d.id === danceId);
  if (!dance) return 0;
  const figs = dance.levels[lvl] || [];
  if (!figs.length) return 0;
  return figs.filter(f => prog.completedFigures[figKey(danceId, lvl, f)]).length / figs.length;
}

// Whole-dance completion as a rounded percentage (0..100).
export function dancePct(dance, prog) {
  const all = Object.values(dance.levels).flat();
  if (!all.length) return 0;
  const done = all.filter(f => BRONZE_LEVELS.some(lvl => prog.completedFigures[figKey(dance.id, lvl, f)])).length;
  return Math.round((done / all.length) * 100);
}

// A level is unlocked when the previous level is >= threshold complete.
export function isLevelUnlocked(danceId, lvl, prog) {
  const idx = BRONZE_LEVELS.indexOf(lvl);
  if (idx <= 0) return true;
  return pctLevel(danceId, BRONZE_LEVELS[idx-1], prog) >= UNLOCK_THRESHOLD;
}

// Stable client UID derived from first-practice date (best-effort, not auth).
export function getUserId(prog) {
  return `dancer-${prog.lastPractice || "new"}-${Object.keys(prog.completedFigures).length}`;
}
