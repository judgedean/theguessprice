let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(frequency, type, startTime, duration, gainVal, ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(gainVal, startTime);
  gain.gain.setValueAtTime(gainVal, startTime + duration * 0.7);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
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
  // Resume context if suspended (browser autoplay policy)
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;

  if (name === "correct") {
    // Cheerful ascending double-beep
    playTone(523, "square", now, 0.15, 0.25, ctx);        // C5 for 150ms
    playTone(659, "square", now + 0.18, 0.3, 0.25, ctx);  // E5 for 300ms
  } else if (name === "incorrect") {
    // Low dramatic descending buzzer
    playTone(220, "sawtooth", now, 0.2, 0.3, ctx);        // A3
    playTone(180, "sawtooth", now + 0.22, 0.35, 0.3, ctx); // drop to F#3
  }
}