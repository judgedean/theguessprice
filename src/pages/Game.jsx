import { useState } from "react";
import NavBar from "@/components/NavBar";
import HomeScreen from "@/components/game/HomeScreen";
import GamePlay from "@/components/game/GamePlay";
import BlogSection from "@/components/game/BlogSection";
import Footer from "@/components/Footer";
import MuteButton from "@/components/game/MuteButton";

export default function Game() {
  const [mode, setMode] = useState("home"); // "home" | "daily" | "quick"
  const [sessionKey, setSessionKey] = useState(0);

  const startDaily = () => {
    setMode("daily");
    setSessionKey((k) => k + 1);
  };
  const startQuick = () => {
    setMode("quick");
    setSessionKey((k) => k + 1);
  };
  const goHome = () => setMode("home");
  const restartQuick = () => setSessionKey((k) => k + 1);

  const handleRestart = () => {
    if (mode === "daily") goHome();
    else restartQuick();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {mode === "home" ? (
        <>
          <NavBar>
            <MuteButton />
          </NavBar>
          <main className="flex-1 max-w-[700px] mx-auto w-full px-4 py-8">
            <HomeScreen onStartDaily={startDaily} onStartQuick={startQuick} />
          </main>
        </>
      ) : (
        <GamePlay key={sessionKey} mode={mode} onRestart={handleRestart} />
      )}

      <BlogSection />
      <Footer />
    </div>
  );
}