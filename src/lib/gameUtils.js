// Logarithmic slider: maps slider value (0-1000) to price range $0.01 - $10,000
export const SLIDER_MIN = 0;
export const SLIDER_MAX = 1000;
export const PRICE_MIN = 0.01;
export const PRICE_MAX = 10000;

export function sliderToPrice(sliderValue) {
  const logMin = Math.log10(PRICE_MIN);
  const logMax = Math.log10(PRICE_MAX);
  const logValue = logMin + (sliderValue / SLIDER_MAX) * (logMax - logMin);
  return Math.pow(10, logValue);
}

export function priceToSlider(price) {
  const logMin = Math.log10(PRICE_MIN);
  const logMax = Math.log10(PRICE_MAX);
  const logValue = Math.log10(Math.max(price, PRICE_MIN));
  return ((logValue - logMin) / (logMax - logMin)) * SLIDER_MAX;
}

export function formatPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  if (price >= 100) return `$${price.toFixed(0)}`;
  if (price >= 10) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(2)}`;
}

// Score: 100 points for perfect guess, scales down logarithmically
export function calculateScore(guessedPrice, actualPrice) {
  const ratio = Math.max(guessedPrice, actualPrice) / Math.min(guessedPrice, actualPrice);
  // ratio of 1 = perfect, ratio of 10 = off by 10x
  const logRatio = Math.log10(ratio); // 0 = perfect, 1 = 10x off
  const score = Math.max(0, Math.round(100 * Math.max(0, 1 - logRatio)));
  return score;
}

export function getScoreLabel(score) {
  if (score === 100) return { label: "PERFECT!", color: "neon", emoji: "🎯" };
  if (score >= 80) return { label: "Amazing!", color: "green", emoji: "🔥" };
  if (score >= 60) return { label: "Nice!", color: "yellow", emoji: "👍" };
  if (score >= 40) return { label: "Not Bad", color: "orange", emoji: "😅" };
  if (score >= 20) return { label: "Way Off", color: "red", emoji: "💀" };
  return { label: "Terrible", color: "red", emoji: "🗑️" };
}

export function getFinalGrade(totalScore) {
  const avg = totalScore / 5;
  if (avg >= 90) return { grade: "S", label: "PRICE ORACLE", color: "neon" };
  if (avg >= 70) return { grade: "A", label: "PRICE WIZARD", color: "green" };
  if (avg >= 50) return { grade: "B", label: "PRICE DETECTIVE", color: "yellow" };
  if (avg >= 30) return { grade: "C", label: "PRICE STUDENT", color: "orange" };
  return { grade: "F", label: "PRICE DISASTER", color: "red" };
}