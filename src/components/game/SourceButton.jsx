// Retailer-aware button with favicon + matching color theme
const RETAILER_STYLES = {
  Amazon: {
    border: "border-[#00ff66]/50",
    text: "text-[#00ff66]",
    hover: "hover:bg-[#00ff66]/10",
    shadow: "0 0 8px rgba(0,255,102,0.35)",
  },
  Etsy: {
    border: "border-[#F2711C]/60",
    text: "text-[#F2711C]",
    hover: "hover:bg-[#F2711C]/10",
    shadow: "0 0 8px rgba(242,113,28,0.35)",
  },
  "Hammacher Schlemmer": {
    border: "border-[#002F6C]/80",
    text: "text-[#4a90d9]",
    hover: "hover:bg-[#002F6C]/20",
    shadow: "0 0 8px rgba(0,47,108,0.5)",
  },
};

// Luxury brands get a gold/silver glow
const LUXURY_SOURCES = [
  "Louis Vuitton", "Hermès", "Bottega Veneta", "Baccarat",
  "Goldgenie", "Gläce Luxury Ice", "Supreme", "Franklin Mint",
  "Hammacher Schlemmer",
];

const LUXURY_STYLE = {
  border: "border-[#c9a84c]/60",
  text: "text-[#d4af37]",
  hover: "hover:bg-[#c9a84c]/10",
  shadow: "0 0 8px rgba(201,168,76,0.4)",
};

function getStyle(source) {
  if (RETAILER_STYLES[source]) return RETAILER_STYLES[source];
  if (LUXURY_SOURCES.includes(source)) return LUXURY_STYLE;
  // Default: neon green for Amazon-fallback / unknown
  return RETAILER_STYLES.Amazon;
}

function getFaviconUrl(source) {
  const domainMap = {
    Amazon: "amazon.com",
    Etsy: "etsy.com",
    "Hammacher Schlemmer": "hammacher.com",
    "Louis Vuitton": "louisvuitton.com",
    "Hermès": "hermes.com",
    "Bottega Veneta": "bottegaveneta.com",
    Baccarat: "baccarat.com",
    Goldgenie: "goldgenie.com",
    "Gläce Luxury Ice": "glaceluxuryice.com",
    Supreme: "supremenewyork.com",
    "Franklin Mint": "franklinmint.com",
    Secretlab: "secretlab.co",
    Wayfair: "wayfair.com",
    Brookstone: "brookstone.com",
    Wacaco: "wacaco.com",
    Ember: "ember.com",
    HAPILABS: "hapilabs.com",
    HiMirror: "himirror.com",
    LG: "lg.com",
    Sephora: "sephora.com",
    "D'Artagnan": "dartagnan.com",
    "Hamilton Beach": "hamiltonbeach.com",
    OXO: "oxo.com",
    Goldschläger: "goldschlager.com",
    "Vermont Novelty Toaster Corp": "vermonttoaster.com",
    ThinkGeek: "thinkgeek.com",
    "Spencer's": "spencersonline.com",
  };
  const domain = domainMap[source] || "google.com";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
}

export default function SourceButton({ product, href, className = "", size = "sm" }) {
  const style = getStyle(product.source);
  const favicon = getFaviconUrl(product.source);

  const sizeClasses = size === "sm"
    ? "px-3 py-1.5 text-xs gap-1.5"
    : "py-3 text-sm gap-2 w-full justify-center";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-lg border font-mono font-bold uppercase tracking-wider transition-colors ${style.border} ${style.text} ${style.hover} ${sizeClasses} ${className}`}
      style={{ boxShadow: style.shadow }}
    >
      <img
        src={favicon}
        alt=""
        width={14}
        height={14}
        className="rounded-sm shrink-0 opacity-90"
        onError={(e) => { e.target.style.display = "none"; }}
      />
      {size === "sm" ? product.source : `View on ${product.source} →`}
    </a>
  );
}