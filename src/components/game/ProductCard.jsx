import { motion } from "framer-motion";
import { Tag } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative scanlines rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Neon accent line top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />

      <div className="p-8 text-center">
        {/* Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
          className="text-8xl mb-5 select-none"
        >
          {product.emoji}
        </motion.div>

        {/* Category badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono mb-3">
          <Tag className="w-3 h-3" />
          {product.category}
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-foreground leading-tight mb-3">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          {product.description}
        </p>

        {/* Source */}
        <div className="mt-4 text-xs text-muted-foreground font-mono">
          Sold on <span className="text-neon">{product.source}</span>
        </div>
      </div>
    </motion.div>
  );
}