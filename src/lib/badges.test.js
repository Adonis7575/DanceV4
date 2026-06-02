import { describe, it, expect } from "vitest";
import { BADGES } from "./badges.js";
import { DEF, figKey } from "./scoring.js";
import { DVIDA } from "../data/dvida.js";

const badge = (id) => BADGES.find((b) => b.id === id);
const prog = (over = {}) => ({ ...DEF, ...over });

describe("BADGES", () => {
  it("have unique ids", () => {
    const ids = BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("'first' unlocks after one completed figure", () => {
    expect(badge("first").check(prog())).toBe(false);
    expect(badge("first").check(prog({ completedFigures: { "a::b::c": true } }))).toBe(true);
  });

  it("streak badges respect thresholds", () => {
    expect(badge("streak3").check(prog({ streak: 2 }))).toBe(false);
    expect(badge("streak3").check(prog({ streak: 3 }))).toBe(true);
    expect(badge("streak7").check(prog({ streak: 6 }))).toBe(false);
    expect(badge("streak7").check(prog({ streak: 7 }))).toBe(true);
  });

  it("'century' needs 100 XP", () => {
    expect(badge("century").check(prog({ xp: 99 }))).toBe(false);
    expect(badge("century").check(prog({ xp: 100 }))).toBe(true);
  });

  it("'quiz80' needs >=10 answers AND >=80% accuracy", () => {
    expect(badge("quiz80").check(prog({ quizScore: { correct: 8, total: 9 } }))).toBe(false); // too few
    expect(badge("quiz80").check(prog({ quizScore: { correct: 7, total: 10 } }))).toBe(false); // 70%
    expect(badge("quiz80").check(prog({ quizScore: { correct: 8, total: 10 } }))).toBe(true); // 80%
  });

  it("'bronze1_waltz' unlocks only when all Waltz Bronze I figures are done", () => {
    const figs = DVIDA.smooth.waltz.levels["Bronze I"];
    const partial = prog({
      completedFigures: Object.fromEntries(figs.slice(0, -1).map((f) => [figKey("waltz", "Bronze I", f), true])),
    });
    const all = prog({
      completedFigures: Object.fromEntries(figs.map((f) => [figKey("waltz", "Bronze I", f), true])),
    });
    expect(badge("bronze1_waltz").check(partial)).toBe(false);
    expect(badge("bronze1_waltz").check(all)).toBe(true);
  });

  it("every badge check is a pure boolean predicate over default progress", () => {
    for (const b of BADGES) expect(typeof b.check(prog())).toBe("boolean");
  });
});
