import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { calculateScore, sliderToPrice } from "@/lib/gameUtils";

function AnimatedScore({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value]);

  return <motion.span className="text-neon font-bold">{rounded}</motion.span>;
}

const dotColors = ["bg-neon", "bg-green-400", "bg-yellow-400", "bg-orange-400", "bg-red-400"];

function getScoreDotColor(score) {
  if (score === 100) return "bg-neon shadow-[0_0_8px_hsl(142_100%_50%/0.8)]";
  if (score >= 80) return "bg-green-400";
  if (score >= 60) return "bg-yellow-400";
  if (score >= 40) return "bg-orange-400";
  return "bg-red-400";
}

export default function ScoreStrip({ rounds, currentRound }) {
  const total = rounds.reduce((sum, r) => sum + calculateScore(sliderToPrice(r.sliderValue), r.product.price), 0);

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Round dots */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const done = i < rounds.length;
          const score = done ? calculateScore(sliderToPrice(rounds[i].sliderValue), rounds[i].product.price) : null;
          const isCurrent = i === currentRound - 1;
          return (
            <motion.div
              key={i}
              initial={done ? { scale: 0 } : {}}
              animate={done ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`w-3 h-3 rounded-full transition-all ${
                done
                  ? getScoreDotColor(score)
                  : isCurrent
                  ? "bg-neon/30 animate-pulse-neon"
                  : "bg-secondary"
              }`}
            />
          );
        })}
      </div>

      {/* Running total */}
      {rounds.length > 0 && (
        <div className="text-xs font-mono text-muted-foreground">
          <AnimatedScore value={total} /> pts
        </div>
      )}
    </div>
  );
}