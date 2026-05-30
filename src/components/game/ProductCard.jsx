import { useState } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { getProductImageUrl } from "@/lib/gameUtils";

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getProductImageUrl(product);

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

      {/* Product image */}
      {!imgError ? (
        <div className="w-full h-52 bg-muted flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full"
            style={{ objectFit: "contain", borderRadius: "0.5rem", padding: "0.75rem" }}
          />
        </div>
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-muted">
          <span className="text-8xl select-none">{product.emoji}</span>
        </div>
      )}

      <div className="p-6 text-center">
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