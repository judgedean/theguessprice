const SOUNDS = {
  correct: "https://signals.nextzen.im/sounds/success.mp3",
  incorrect: "https://signals.nextzen.im/sounds/error.mp3",
};

// Preload audio objects
const audioCache = {};
Object.entries(SOUNDS).forEach(([key, url]) => {
  const audio = new Audio(url);
  audio.preload = "auto";
  audioCache[key] = audio;
});

export function isMuted() {
  // Default is unmuted — only muted if explicitly set to "true"
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