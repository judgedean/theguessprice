import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { fetchWikimediaImage } from "@/lib/gameUtils";

const placeholderUrl = (name) =>
  `https://placehold.co/600x400/1a1a2e/00ff66?text=${encodeURIComponent(name.slice(0, 40))}`;

export default function ProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(product.image || null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgSrc(product.image || null);
    setImgError(false);
  }, [product.id]);

  useEffect(() => {
    if (!imgSrc && !imgError) {
      fetchWikimediaImage(product.name)
        .then((url) => setImgSrc(url || placeholderUrl(product.name)))
        .catch(() => setImgSrc(placeholderUrl(product.name)));
    }
  }, [product.id, imgSrc, imgError]);

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
      <div className="w-full bg-muted flex items-center justify-center overflow-hidden p-4" style={{ maxHeight: "300px" }}>
        {imgError ? (
          <span className="text-8xl select-none">{product.emoji}</span>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full"
            style={{ objectFit: "contain", maxHeight: "300px", borderRadius: "0.5rem" }}
          />
        ) : (
          <span className="text-8xl select-none animate-pulse">{product.emoji}</span>
        )}
      </div>

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