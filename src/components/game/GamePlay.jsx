import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomProducts } from "@/data/products";
import { getDailyProducts } from "@/lib/dailyChallenge";
import NavBar from "@/components/NavBar";
import RoundBadge from "@/components/game/RoundBadge";
import ProductCard from "@/components/game/ProductCard";
import PriceSlider from "@/components/game/PriceSlider";
import ScoreReveal from "@/components/game/ScoreReveal";
import FinalResults from "@/components/game/FinalResults";
import AdSidebar from "@/components/game/AdSidebar";
import ScoreStrip from "@/components/game/ScoreStrip";
import MuteButton from "@/components/game/MuteButton";

const TOTAL_ROUNDS = 5;

function useGame(mode) {
  const [products] = useState(() =>
    mode === "daily" ? getDailyProducts() : getRandomProducts(TOTAL_ROUNDS)
  );
  const [round, setRound] = useState(1);
  const [sliderValue, setSliderValue] = useState(500);
  const [phase, setPhase] = useState("guessing");
  const [completedRounds, setCompletedRounds] = useState([]);

  const currentProduct = products[round - 1];

  const submitGuess = useCallback(() => setPhase("reveal"), []);

  const nextRound = useCallback(() => {
    const newCompleted = [...completedRounds, { product: currentProduct, sliderValue }];
    setCompletedRounds(newCompleted);
    if (round >= TOTAL_ROUNDS) {
      setPhase("results");
    } else {
      setRound((r) => r + 1);
      setSliderValue(500);
      setPhase("guessing");
    }
  }, [completedRounds, currentProduct, sliderValue, round]);

  return {
    round,
    sliderValue,
    setSliderValue,
    phase,
    completedRounds,
    currentProduct,
    submitGuess,
    nextRound,
  };
}

function ModeBadge({ mode }) {
  const isDaily = mode === "daily";
  return (
    <span
      className={`hidden sm:inline text-xs font-mono border rounded px-2 py-0.5 ${
        isDaily ? "border-neon/50 text-neon" : "border-border text-muted-foreground"
      }`}
    >
      {isDaily ? "📅 Daily" : "⚡ Quick"}
    </span>
  );
}

export default function GamePlay({ mode, onRestart }) {
  const {
    round,
    sliderValue,
    setSliderValue,
    phase,
    completedRounds,
    currentProduct,
    submitGuess,
    nextRound,
  } = useGame(mode);

  return (
    <>
      <NavBar>
        {phase !== "results" && <RoundBadge current={round} total={TOTAL_ROUNDS} />}
        <ModeBadge mode={mode} />
        <MuteButton />
      </NavBar>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex gap-6 items-start justify-center">
        <AdSidebar side="Left" />

        <div className="w-full max-w-[700px] flex-1 space-y-5">
          <AnimatePresence mode="wait">
            {phase === "results" ? (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FinalResults rounds={completedRounds} onRestart={onRestart} mode={mode} />
              </motion.div>
            ) : phase === "reveal" ? (
              <motion.div key={`reveal-${round}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ScoreReveal
                  product={currentProduct}
                  sliderValue={sliderValue}
                  onNext={nextRound}
                  isLast={round >= TOTAL_ROUNDS}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`guess-${round}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <ProductCard product={currentProduct} />

                <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Set Your Price
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      Logarithmic Scale
                    </span>
                  </div>
                  <PriceSlider sliderValue={sliderValue} onChange={setSliderValue} />

                  <button
                    onClick={submitGuess}
                    className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Lock In My Guess →
                  </button>
                </div>

                {completedRounds.length > 0 && (
                  <div className="px-1">
                    <ScoreStrip rounds={completedRounds} currentRound={round} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AdSidebar side="Right" />
      </main>
    </>
  );
}