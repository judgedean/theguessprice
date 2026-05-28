import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { calculateScore, getScoreLabel, formatPrice, sliderToPrice, getPurchaseLink, getGuessTier } from "@/lib/gameUtils";
import { playTierSound } from "@/lib/sounds";
import SourceButton from "@/components/game/SourceButton";

const scoreColors = {
  neon: "text-neon",
  green: "text-green-400",
  yellow: "text-yellow-400",
  orange: "text-orange-400",
  red: "text-red-400",
};

const borderColors = {
  neon: "border-neon neon-border",
  green: "border-green-500/60",
  yellow: "border-yellow-500/60",
  orange: "border-orange-500/60",
  red: "border-red-500/60",
};



const tierBadge = {
  1: { text: "So Close! 🎉",    bg: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" },
  2: { text: "Great Guess! 🔥",  bg: "bg-green-500/20 border-green-500/50 text-green-300" },
  3: { text: "Price Expert! 🎯", bg: "bg-neon/20 border-neon/60 text-neon" },
};

export default function ScoreReveal({ product, sliderValue, onNext, isLast }) {
  const guessedPrice = sliderToPrice(sliderValue);
  const score = calculateScore(guessedPrice, product.price);
  const { label, color, emoji } = getScoreLabel(score);
  const firedRef = useRef(false);
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const tier = getGuessTier(guessedPrice, product.price);
    playTierSound(tier, guessedPrice === product.price);
    if (tier === 0) return;

    setBadge(tierBadge[tier]);
    setTimeout(() => setBadge(null), 2200);

    if (tier === 1) {
      // Light sprinkle
      confetti({
        particleCount: 18,
        spread: 40,
        startVelocity: 18,
        gravity: 1.2,
        colors: ["#facc15", "#ffffff", "#fde68a"],
        origin: { y: 0.55 },
      });
    } else if (tier === 2) {
      // Standard colorful burst
      confetti({
        particleCount: 90,
        spread: 90,
        startVelocity: 40,
        colors: ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#ffffff"],
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        confetti({ particleCount: 40, spread: 70, startVelocity: 28, colors: ["#4ade80", "#ffffff", "#86efac"], origin: { y: 0.45, x: 0.35 } });
        confetti({ particleCount: 40, spread: 70, startVelocity: 28, colors: ["#60a5fa", "#ffffff", "#f472b6"], origin: { y: 0.45, x: 0.65 } });
      }, 250);
    } else if (tier === 3) {
      // Massive gold explosion
      const gold = ["#FFD700", "#FFC200", "#FFEC80", "#ffffff", "#d4af37", "#fffacd"];
      confetti({ particleCount: 200, spread: 120, startVelocity: 60, colors: gold, origin: { y: 0.5 } });
      setTimeout(() => {
        confetti({ particleCount: 120, spread: 140, startVelocity: 45, colors: gold, origin: { y: 0.4, x: 0.15 } });
        confetti({ particleCount: 120, spread: 140, startVelocity: 45, colors: gold, origin: { y: 0.4, x: 0.85 } });
      }, 200);
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 100, startVelocity: 35, colors: gold, origin: { y: 0.35, x: 0.5 } });
        confetti({ particleCount: 60, angle: 60,  spread: 80, startVelocity: 50, colors: gold, origin: { y: 0.6, x: 0.0 } });
        confetti({ particleCount: 60, angle: 120, spread: 80, startVelocity: 50, colors: gold, origin: { y: 0.6, x: 1.0 } });
      }, 450);
    }
  }, []);

  const diff = guessedPrice - product.price;
  const diffText = diff > 0
    ? `${formatPrice(diff)} too high`
    : diff < 0
    ? `${formatPrice(Math.abs(diff))} too low`
    : "Exact!";

  return (
    <div className="relative">
      {/* Floating points ticker */}
      <motion.div
        key={score}
        initial={{ opacity: 1, y: 0, scale: 1 }}
        animate={{ opacity: 0, y: -110, scale: 1.08 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
        className="absolute left-1/2 -translate-x-1/2 top-6 z-20 pointer-events-none flex flex-col items-center gap-0.5"
      >
        <span
          className={`font-mono font-bold ${
            color === "neon"
              ? "text-4xl text-neon neon-text"
              : color === "green"
              ? "text-4xl text-green-400"
              : color === "yellow"
              ? "text-3xl text-yellow-400"
              : color === "orange"
              ? "text-3xl text-orange-400"
              : "text-2xl text-red-400"
          }`}
          style={{
            textShadow:
              color === "neon"
                ? "0 0 14px hsl(142 100% 50% / 0.9), 0 0 30px hsl(142 100% 50% / 0.5)"
                : "0 0 10px currentColor",
          }}
        >
          +{score} pts
        </span>
        {label && (
          <span
            className={`font-mono font-bold text-sm uppercase tracking-widest ${
              color === "neon"
                ? "text-neon/80"
                : color === "green"
                ? "text-green-400/80"
                : color === "yellow"
                ? "text-yellow-400/80"
                : color === "orange"
                ? "text-orange-400/80"
                : "text-red-400/80"
            }`}
          >
            {label}!
          </span>
        )}
      </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-xl border-2 bg-card overflow-hidden ${borderColors[color]}`}
    >
      {/* Top neon line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-neon to-transparent opacity-40" />

      <div className="p-8 text-center space-y-6">
        {/* Tier badge */}
        <AnimatePresence>
          {badge && (
            <motion.div
              key="tier-badge"
              initial={{ opacity: 0, y: -12, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-bold font-mono uppercase tracking-wider ${badge.bg}`}
            >
              {badge.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score pop */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 16 }}
        >
          <div className="text-5xl mb-2">{emoji}</div>
          <div className={`text-6xl font-mono font-bold ${scoreColors[color]} ${color === "neon" ? "neon-text" : ""}`}>
            {score}
          </div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">points</div>
          <div className={`text-xl font-bold mt-2 ${scoreColors[color]}`}>{label}</div>
        </motion.div>

        {/* Price comparison */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="rounded-lg bg-muted p-4">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Your Guess</div>
            <div className="text-xl font-mono font-bold text-foreground">{formatPrice(guessedPrice, true)}</div>
          </div>
          <div className="rounded-lg bg-muted p-4 border border-neon/30">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Actual Price</div>
            <div className="text-xl font-mono font-bold text-neon neon-text">{formatPrice(product.price, true)}</div>
          </div>
        </motion.div>

        {/* Diff */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground font-mono"
        >
          {score === 100 ? "🎯 Absolutely perfect!" : `You were ${diffText}`}
        </motion.p>

        {/* View on store + Next */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <SourceButton product={product} href={getPurchaseLink(product)} size="lg" className="rounded-xl font-bold tracking-widest" />
          <button
            onClick={onNext}
            className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 transition-opacity"
          >
            {isLast ? "See Final Results →" : "Next Round →"}
          </button>
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
}