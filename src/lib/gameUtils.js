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

export function formatPrice(price, showCurrency = false) {
  let str;
  if (price >= 1000) str = `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  else if (price >= 100) str = `$${price.toFixed(0)}`;
  else str = `$${price.toFixed(2)}`;
  return showCurrency ? `${str} USD` : str;
}

// Tier thresholds (percentage difference from actual price)
export const TIER_THRESHOLDS = {
  tier3: 0.05,  // Within 5% (Bullseye / Incredible)
  tier2: 0.20,  // Within 20% (Amazing)
  tier1: 0.50,  // Within 50% (Nice / Safety Net)
};

export function getGuessTier(guessedPrice, actualPrice) {
  const pct = Math.abs(guessedPrice - actualPrice) / actualPrice;
  if (pct <= TIER_THRESHOLDS.tier3) return 3;
  if (pct <= TIER_THRESHOLDS.tier2) return 2;
  if (pct <= TIER_THRESHOLDS.tier1) return 1;
  return 0;
}

// Score calculation scaled smoothly to match the 5% / 20% / 50% thresholds
export function calculateScore(guessedPrice, actualPrice) {
  const pct = Math.abs(guessedPrice - actualPrice) / actualPrice;
  if (pct === 0) return 100;

  if (pct <= TIER_THRESHOLDS.tier3) {
    // 95–99 pts: within 5%
    return Math.round(99 - (pct / TIER_THRESHOLDS.tier3) * 4);
  }
  if (pct <= TIER_THRESHOLDS.tier2) {
    // 70–94 pts: within 20%
    const t = (pct - TIER_THRESHOLDS.tier3) / (TIER_THRESHOLDS.tier2 - TIER_THRESHOLDS.tier3);
    return Math.round(94 - t * 24);
  }
  if (pct <= TIER_THRESHOLDS.tier1) {
    // 30–69 pts: within 50%
    const t = (pct - TIER_THRESHOLDS.tier2) / (TIER_THRESHOLDS.tier1 - TIER_THRESHOLDS.tier2);
    return Math.round(69 - t * 39);
  }
  if (pct <= 0.80) {
    // 10–29 pts: up to 80% off
    const t = (pct - TIER_THRESHOLDS.tier1) / (0.80 - TIER_THRESHOLDS.tier1);
    return Math.round(29 - t * 19);
  }
  // 0–9 pts: completely missed the ballpark
  const t = Math.min(1, (pct - 0.80) / 0.50);
  return Math.round(9 - t * 9);
}

export function getScoreLabel(score) {
  if (score === 100) return { label: "PERFECT!", color: "neon", emoji: "🎯" };
  if (score >= 95) return { label: "Incredible!", color: "neon", emoji: "🎯" };
  if (score >= 70) return { label: "Amazing!", color: "green", emoji: "🔥" };
  if (score >= 30) return { label: "Nice!", color: "yellow", emoji: "👍" };
  if (score >= 10) return { label: "Way Off", color: "orange", emoji: "😅" };
  return { label: "Terrible", color: "red", emoji: "🗑️" };
}

// Fetch a relevant image URL from Wikimedia Commons based on a search term.
// Returns null if nothing found.
export async function fetchWikimediaImage(searchTerm) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchTerm)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (page?.thumbnail?.source) return page.thumbnail.source;

  // Fallback: Wikimedia image search
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&prop=pageimages&format=json&origin=*`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const firstResult = searchData?.query?.search?.[0];
  if (!firstResult) return null;

  const detailUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(firstResult.title)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
  const detailRes = await fetch(detailUrl);
  const detailData = await detailRes.json();
  const detailPages = detailData?.query?.pages;
  if (!detailPages) return null;
  const detailPage = Object.values(detailPages)[0];
  return detailPage?.thumbnail?.source || null;
}

export function getProductImageUrl(product) {
  if (product.image) return product.image;
  return null; // signals ProductCard to fetch dynamically
}

export function getPurchaseLink(product) {
  const q = encodeURIComponent(product.name);
  const src = product.source;
  if (src === "Amazon") return product.amazonLink || `https://www.amazon.com/s?k=${q}&tag=theguessprice-20`;
  if (src === "Etsy") return `https://www.etsy.com/search?q=${q}`;
  if (src === "Uncommon Goods") return `https://www.uncommongoods.com/search?q=${q}`;
  if (src === "IWOOT") return `https://www.iwantoneofthose.com/elysium.search?search=${q}`;
  if (src === "Hammacher Schlemmer") return `https://www.hammacher.com/search/default.aspx?query=${q}`;
  return `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(src + " " + product.name)}`;
}

export function getFinalGrade(totalScore) {
  const avg = totalScore / 5;
  if (avg >= 90) return { grade: "S", label: "PRICE ORACLE", color: "neon" };
  if (avg >= 70) return { grade: "A", label: "PRICE WIZARD", color: "green" };
  if (avg >= 50) return { grade: "B", label: "PRICE DETECTIVE", color: "yellow" };
  if (avg >= 30) return { grade: "C", label: "PRICE STUDENT", color: "orange" };
  return { grade: "F", label: "PRICE DISASTER", color: "red" };
}