import { useCallback } from "react";
import { motion } from "framer-motion";
import { sliderToPrice, formatPrice, SLIDER_MIN, SLIDER_MAX } from "@/lib/gameUtils";

export default function PriceSlider({ sliderValue, onChange }) {
  const currentPrice = sliderToPrice(sliderValue);

  const handleChange = useCallback((e) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  // Compute fill percentage for the track
  const fillPct = ((sliderValue - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

  return (
    <div className="space-y-4">
      {/* Price display */}
      <div className="text-center">
        <motion.div
          key={Math.round(currentPrice)}
          initial={{ y: -6, opacity: 0.6 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.08 }}
          className="text-5xl font-mono font-bold text-neon neon-text tabular-nums"
        >
          {formatPrice(currentPrice)}
        </motion.div>
        <p className="text-xs text-muted-foreground font-mono mt-1 uppercase tracking-widest">
          Your Guess · 🇺🇸 USD
        </p>
      </div>

      {/* Slider track wrapper */}
      <div className="relative px-1">
        {/* Custom filled track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1 right-1 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-neon transition-all duration-75"
            style={{
              width: `${fillPct}%`,
              boxShadow: "0 0 8px hsl(142 100% 50% / 0.6)"
            }}
          />
        </div>
        <input
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          value={sliderValue}
          onChange={handleChange}
          className="price-slider relative z-10"
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs font-mono text-muted-foreground px-1">
        <span>$0.01 USD</span>
        <span>$10,000 USD</span>
      </div>
    </div>
  );
}