import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "ABOUT THEGUESSPRICE",
    body: `TheGuessPrice is a price-guessing game built for anyone who's ever looked at something weird on the internet and thought "how much does THAT cost?"

Each round, you're shown a real product — sourced from Amazon, Etsy, and other online marketplaces — and challenged to guess its actual price. Some are cheaper than you'd expect. Some are shockingly expensive. Most will make you question humanity's relationship with money.

The game runs for 5 rounds. You're scored on how close your guess is to the real price. At the end, you get a total score and a verdict on your price intuition — from "Bargain Hunter" to "Completely Clueless".`,
  },
  {
    title: "WHY WE BUILT THIS",
    body: `We got obsessed with weird product listings online — the kind where someone has spent $89 on a pillow shaped like a piece of toast, or $14 on a jar of "artisanal air". We wanted to build something that captured that feeling of bewildered amusement, while also being genuinely fun and replayable.

TheGuessPrice is independent and self-funded. It is built using Base44 and hosted at theguessprice.com. We earn a small commission on products viewed through our affiliate links, which helps keep the site running.`,
  },
  {
    title: "THE PRODUCTS",
    body: `All products featured in the game are real items available for purchase online. Prices are updated regularly to reflect current listings. We try to feature a mix of categories — from novelty gifts to surprisingly practical gadgets — to keep things unpredictable.`,
  },
  {
    title: "WHAT'S COMING",
    body: `TheGuessPrice is currently in active development. We're working on new products, new game modes, and more ways to challenge your price intuition. Check back soon.`,
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About | TheGuessPrice";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Learn about TheGuessPrice — the price-guessing game featuring real weird products from around the internet.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Learn about TheGuessPrice — the price-guessing game featuring real weird products from around the internet.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="border-b border-border/60 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neon font-mono font-bold text-lg neon-text">$</span>
            <Link to="/" className="font-bold font-grotesk tracking-tight text-foreground hover:text-neon transition-colors">Guess The Price</Link>
          </div>
          <nav className="flex items-center gap-5 text-xs font-mono text-muted-foreground">
            <Link to="/" className="hover:text-neon transition-colors">Game</Link>
            <Link to="/blog" className="hover:text-neon transition-colors">Blog</Link>
            <Link to="/about" className="text-neon">About</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-16">
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="text-xs font-mono font-bold text-neon uppercase tracking-[0.2em]">
                {section.title}
              </h2>
              <div className="h-px bg-gradient-to-r from-neon/40 to-transparent" />
              <div className="space-y-4">
                {section.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="inline-block py-3 px-6 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 transition-opacity"
          >
            Play the Game →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}