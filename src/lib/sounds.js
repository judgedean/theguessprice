const SOUNDS = {
  tier0: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/33bf5fd55_Tier0.mp3",
  tier1: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/f5522fe47_Tier1.mp3",
  tier2: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/ce0731842_Tier2.mp3",
  tier3: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/2f0b1206c_Tier3.mp3",
  exact: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/1c905a704_Exactguess.mp3",
  finish: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/cd09dbc47_GameOver.mp3",
};

// Preload audio objects
const audioCache = {};
Object.entries(SOUNDS).forEach(([key, url]) => {
  const audio = new Audio(url);
  audio.preload = "auto";
  audioCache[key] = audio;
});

export function isMuted() {
  return localStorage.getItem("gtp_muted") === "true";
}

export function setMuted(val) {
  localStorage.setItem("gtp_muted", val ? "true" : "false");
}

export function playSound(name) {
  if (isMuted()) return;
  const audio = audioCache[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Play the correct tier sound based on guess accuracy
export function playTierSound(tier, isExact = false) {
  if (isExact) {
    playSound("exact");
  } else {
    playSound(`tier${tier}`);
  }
}