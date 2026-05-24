const SOUNDS = {
  tier0: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/139faf9df_alexis_gaming_cam-sfx-acceptation-363730.mp3",
  tier1: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/3d7cf868d_Tier1.mp3",
  tier2: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/4b60be15d_Tier2.mp3",
  tier3: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/ba29e61c1_Tier3.mp3",
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
export function playTierSound(tier) {
  playSound(`tier${tier}`);
}