import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { calculateScore, getScoreLabel, formatPrice, sliderToPrice } from "@/lib/gameUtils";

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

export default function ScoreReveal({ product, sliderValue, onNext, isLast }) {
  const guessedPrice = sliderToPrice(sliderValue);
  const score = calculateScore(guessedPrice, product.price);
  const { label, color, emoji } = getScoreLabel(score);
  const firedRef = useRef(false);

  useEffect(() => {
    if (score === 100 && !firedRef.current) {
      firedRef.current = true;
      // Neon green confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        startVelocity: 45,
        colors: ["#00ff66", "#00cc52", "#ffffff", "#a0ffcc"],
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 120,
          startVelocity: 30,
          colors: ["#00ff66", "#ffffff"],
          origin: { y: 0.4, x: 0.2 },
        });
        confetti({
          particleCount: 60,
          spread: 120,
          startVelocity: 30,
          colors: ["#00ff66", "#ffffff"],
          origin: { y: 0.4, x: 0.8 },
        });
      }, 300);
    }
  }, [score]);

  const diff = guessedPrice - product.price;
  const diffText = diff > 0
    ? `${formatPrice(diff)} too high`
    : diff < 0
    ? `${formatPrice(Math.abs(diff))} too low`
    : "Exact!";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-xl border-2 bg-card overflow-hidden ${borderColors[color]}`}
    >
      {/* Top neon line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-neon to-transparent opacity-40" />

      <div className="p-8 text-center space-y-6">
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
            <div className="text-xl font-mono font-bold text-foreground">{formatPrice(guessedPrice)}</div>
          </div>
          <div className="rounded-lg bg-muted p-4 border border-neon/30">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Actual Price</div>
            <div className="text-xl font-mono font-bold text-neon neon-text">{formatPrice(product.price)}</div>
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

        {/* Next button */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onNext}
          className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 transition-opacity"
        >
          {isLast ? "See Final Results →" : "Next Round →"}
        </motion.button>
      </div>
    </motion.div>
  );
}