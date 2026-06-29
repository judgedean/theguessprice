import { motion } from "framer-motion";
import { Calendar, Zap, Trophy, Check } from "lucide-react";
import { formatChallengeDate, getDailyChallengeStatus } from "@/lib/dailyChallenge";

export default function HomeScreen({ onStartDaily, onStartQuick }) {
  const today = new Date();
  const status = getDailyChallengeStatus(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-6xl">🎯</div>
        <h1 className="text-3xl font-bold font-grotesk tracking-tight">
          TheGuess<span className="text-neon neon-text">Price</span>
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Real weird products. Real prices. How well do you know what things cost?
        </p>
      </div>

      {/* Daily Challenge — primary / featured */}
      <div className="rounded-2xl border border-neon/40 bg-card p-6 space-y-4 neon-glow">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-neon" />
          <span className="text-xs font-mono text-neon uppercase tracking-widest">Featured</span>
        </div>
        {status.completed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-neon">
              <Check className="w-5 h-5" />
              <span className="font-bold font-mono uppercase tracking-wider">Completed Today</span>
            </div>
            <div className="text-3xl font-mono font-bold text-neon">
              {status.score}<span className="text-base text-muted-foreground font-normal"> / 500 pts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4" />
              <span>🔥 Day streak: {status.streak}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Come back tomorrow ({formatChallengeDate(tomorrow)}) for a new challenge!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold font-grotesk">Daily Challenge</h2>
              <p className="text-sm text-muted-foreground font-mono">{formatChallengeDate(today)}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Same 5 products for everyone today. One shot. Come back tomorrow for a new set.
            </p>
            <button
              onClick={onStartDaily}
              className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Play Daily Challenge →
            </button>
          </>
        )}
      </div>

      {/* Quick Play — secondary */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Casual</span>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-grotesk">Quick Play</h2>
          <p className="text-sm text-muted-foreground">Random products, play anytime</p>
        </div>
        <button
          onClick={onStartQuick}
          className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase font-mono border border-border text-foreground hover:border-neon/50 hover:text-neon transition-colors"
        >
          Quick Play →
        </button>
      </div>
    </motion.div>
  );
}