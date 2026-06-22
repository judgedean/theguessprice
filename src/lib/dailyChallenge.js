import { PRODUCTS } from "@/data/products";

const STORAGE_KEY = "tgp_daily_challenge";

// Mulberry32 seeded PRNG — deterministic per seed
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateToSeed(date) {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

export function getDailyKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Deterministically select `count` products for the given date.
// Everyone playing on the same day gets the same set.
export function getDailyProducts(date = new Date(), count = 5) {
  const seed = dateToSeed(date);
  const rand = mulberry32(seed);
  const shuffled = [...PRODUCTS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

// "Monday 22 June" style formatting
export function formatChallengeDate(date = new Date()) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `${weekday} ${day} ${month}`;
}

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage may be blocked — fail silently
  }
}

export function getDailyChallengeStatus(date = new Date()) {
  const key = getDailyKey(date);
  const data = readStorage();
  if (data[key]) {
    return { completed: true, score: data[key].score, streak: data[key].streak };
  }
  return { completed: false };
}

// Saves today's result and updates the consecutive-day streak.
// Returns the new streak. Safe to call multiple times — won't double count.
export function saveDailyChallengeResult(score, date = new Date()) {
  const key = getDailyKey(date);
  const data = readStorage();
  if (data[key]) {
    return data[key].streak;
  }
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDailyKey(yesterday);
  const prevStreak = data[yesterdayKey]?.streak || 0;
  const newStreak = prevStreak > 0 ? prevStreak + 1 : 1;
  data[key] = { score, streak: newStreak };
  writeStorage(data);
  return newStreak;
}