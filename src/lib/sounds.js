const SOUNDS = {
  correct: "https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav",
  incorrect: "https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav",
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