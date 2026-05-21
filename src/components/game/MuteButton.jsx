import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isMuted, setMuted } from "@/lib/sounds";

export default function MuteButton() {
  const [muted, setMutedState] = useState(() => isMuted());

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  return (
    <button
      onClick={toggle}
      title={muted ? "Unmute" : "Mute"}
      className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
}