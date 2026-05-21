const SOUNDS = {
  correct: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/fe8157013_success2.wav",
  incorrect: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/ad63c9d2c_error.wav",
  finish: "https://media.base44.com/files/public/6a082846c530d2487ed5d239/f75516bd2_finish.wav",
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