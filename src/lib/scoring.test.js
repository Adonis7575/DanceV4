import { describe, it, expect } from "vitest";
import { DEF, levelFromXp, figKey, localDate, pctLevel, dancePct, isLevelUnlocked, getUserId } from "./scoring.js";
import { DVIDA, ALL_DANCES } from "../data/dvida.js";

// Build a progress object with the given figures marked complete.
const progWith = (entries = []) => ({
  ...DEF,
  completedFigures: Object.fromEntries(entries.map((k) => [k, true])),
});

const waltz = DVIDA.smooth.waltz;
const waltzB1 = waltz.levels["Bronze I"]; // 5 figures

describe("levelFromXp", () => {
  it("is 1 below 100 XP and rolls every 100", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(99)).toBe(1);
    expect(levelFromXp(100)).toBe(2);
    expect(levelFromXp(250)).toBe(3);
  });
  it("treats undefined XP as 0", () => {
    expect(levelFromXp(undefined)).toBe(1);
  });
});

describe("figKey", () => {
  it("joins ids with the :: delimiter", () => {
    expect(figKey("waltz", "Bronze I", "Box Step")).toBe("waltz::Bronze I::Box Step");
  });
});

describe("localDate", () => {
  it("formats as zero-padded YYYY-MM-DD", () => {
    expect(localDate(new Date(2026, 0, 5))).toBe("2026-01-05");
    expect(localDate(new Date(2026, 11, 31))).toBe("2026-12-31");
  });
});

describe("pctLevel", () => {
  it("is 0 with no progress and 1 when all figures are done", () => {
    expect(pctLevel("waltz", "Bronze I", progWith())).toBe(0);
    const all = progWith(waltzB1.map((f) => figKey("waltz", "Bronze I", f)));
    expect(pctLevel("waltz", "Bronze I", all)).toBe(1);
  });
  it("returns the completed fraction", () => {
    const p = progWith(waltzB1.slice(0, 2).map((f) => figKey("waltz", "Bronze I", f)));
    expect(pctLevel("waltz", "Bronze I", p)).toBeCloseTo(2 / waltzB1.length);
  });
  it("returns 0 for an unknown dance", () => {
    expect(pctLevel("nope", "Bronze I", progWith())).toBe(0);
  });
});

describe("isLevelUnlocked", () => {
  it("always unlocks the first level", () => {
    expect(isLevelUnlocked("waltz", "Bronze I", progWith())).toBe(true);
  });
  it("locks the next level until the previous is 80% complete", () => {
    const figs = (n) => waltzB1.slice(0, n).map((f) => figKey("waltz", "Bronze I", f));
    expect(isLevelUnlocked("waltz", "Bronze II", progWith(figs(3)))).toBe(false); // 3/5 = 60%
    expect(isLevelUnlocked("waltz", "Bronze II", progWith(figs(4)))).toBe(true); //  4/5 = 80%
  });
});

describe("dancePct", () => {
  it("is a rounded whole-dance percentage", () => {
    expect(dancePct(waltz, progWith())).toBe(0);
    const total = Object.values(waltz.levels).flat().length;
    const oneDone = progWith([figKey("waltz", "Bronze I", waltzB1[0])]);
    expect(dancePct(waltz, oneDone)).toBe(Math.round((1 / total) * 100));
  });
  it("reaches 100 when every figure across levels is complete", () => {
    const everyKey = Object.entries(waltz.levels).flatMap(([lvl, figs]) =>
      figs.map((f) => figKey("waltz", lvl, f))
    );
    expect(dancePct(waltz, progWith(everyKey))).toBe(100);
  });
});

describe("getUserId", () => {
  it("is stable for the same progress and reflects practice date", () => {
    const p = { ...DEF, lastPractice: "2026-06-01" };
    expect(getUserId(p)).toBe(getUserId({ ...p }));
    expect(getUserId(p)).toContain("2026-06-01");
  });
});

describe("data integrity", () => {
  it("every dance has all four Bronze levels with figures", () => {
    for (const d of ALL_DANCES) {
      for (const lvl of ["Bronze I", "Bronze II", "Bronze III", "Full Bronze"]) {
        expect(Array.isArray(d.levels[lvl])).toBe(true);
        expect(d.levels[lvl].length).toBeGreaterThan(0);
      }
    }
  });
  it("dance ids are unique", () => {
    const ids = ALL_DANCES.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
