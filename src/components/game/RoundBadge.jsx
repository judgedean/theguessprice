import { motion } from "framer-motion";

export default function RoundBadge({ current, total = 5 }) {
  return (
    <motion.div
      key={current}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border neon-border bg-card"
    >
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Round</span>
      <span className="font-mono font-bold text-neon text-sm neon-text">{current}</span>
      <span className="text-muted-foreground font-mono text-xs">/ {total}</span>
    </motion.div>
  );
}