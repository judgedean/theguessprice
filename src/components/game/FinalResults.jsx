import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { getFinalGrade, formatPrice, calculateScore, sliderToPrice, getScoreLabel } from "@/lib/gameUtils";

const gradeColors = {
  neon: "text-neon neon-text",
  green: "text-green-400",
  yellow: "text-yellow-400",
  orange: "text-orange-400",
  red: "text-red-400",
};

export default function FinalResults({ rounds, onRestart }) {
  const totalScore = rounds.reduce((sum, r) => sum + calculateScore(sliderToPrice(r.sliderValue), r.product.price), 0);
  const { grade, label, color } = getFinalGrade(totalScore);

  useEffect(() => {
    if (totalScore >= 400) {
      confetti({
        particleCount: 200,
        spread: 100,
        colors: ["#00ff66", "#ffffff", "#00cc52", "#a0ffcc"],
        origin: { y: 0.4 },
      });
    }
  }, [totalScore]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Game Over</div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 16 }}
          className={`text-8xl font-mono font-bold ${gradeColors[color]}`}
        >
          {grade}
        </motion.div>
        <div className={`text-xl font-bold font-mono uppercase tracking-wider ${gradeColors[color]}`}>
          {label}
        </div>
        <div className="text-4xl font-mono font-bold text-foreground">
          {totalScore}<span className="text-lg text-muted-foreground font-normal"> / 500 pts</span>
        </div>
      </div>

      {/* Score bar */}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(totalScore / 500) * 100}%` }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="h-full bg-neon rounded-full"
          style={{ boxShadow: "0 0 10px hsl(142 100% 50% / 0.7)" }}
        />
      </div>

      {/* Round breakdown */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Round Breakdown</span>
        </div>
        <div className="divide-y divide-border">
          {rounds.map((r, i) => {
            const guessedPrice = sliderToPrice(r.sliderValue);
            const score = calculateScore(guessedPrice, r.product.price);
            const { color: sc, emoji } = getScoreLabel(score);
            const scoreTextColors = {
              neon: "text-neon",
              green: "text-green-400",
              yellow: "text-yellow-400",
              orange: "text-orange-400",
              red: "text-red-400",
            };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between px-5 py-3.5 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{r.product.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{r.product.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Actual: <span className="text-neon">{formatPrice(r.product.price)}</span>
                      <span className="mx-1.5 opacity-40">·</span>
                      Guess: {formatPrice(guessedPrice)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-lg">{emoji}</span>
                  <span className={`font-mono font-bold text-sm ${scoreTextColors[sc]}`}>{score}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Restart */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 transition-opacity"
      >
        Play Again ↺
      </motion.button>
    </motion.div>
  );
}