let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(frequency, type, startTime, duration, ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.3, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function isMuted() {
  return localStorage.getItem("gtp_muted") === "true";
}

export function setMuted(val) {
  localStorage.setItem("gtp_muted", val ? "true" : "false");
}

export function playSound(name) {
  if (isMuted()) return;
  const ctx = getCtx();
  const now = ctx.currentTime;

  if (name === "correct") {
    // Cheerful double-beep: 150ms at 523Hz, then 300ms at 659Hz
    playTone(523, "square", now, 0.15, ctx);
    playTone(659, "square", now + 0.16, 0.3, ctx);
  } else if (name === "incorrect") {
    // Low dramatic buzzer: 400ms at 180Hz sawtooth
    playTone(180, "sawtooth", now, 0.4, ctx);
  }
}