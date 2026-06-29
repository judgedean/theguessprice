import { Link, useLocation } from "react-router-dom";

export default function NavBar({ children }) {
  const { pathname } = useLocation();

  const links = [
    { label: "Game", to: "/" },
    { label: "Blog", to: "/blog" },
    { label: "About", to: "/about" },
  ];

  const isActive = (to) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="border-b border-border/60 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-neon font-mono font-bold text-lg neon-text">$</span>
          <Link to="/" className="font-bold font-grotesk tracking-tight text-foreground hover:text-neon transition-colors">
            TheGuessPrice
          </Link>
          <span className="hidden sm:inline text-xs font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">🇺🇸 USD</span>
        </div>

        {children}

        <nav className="flex items-center gap-5 text-xs font-mono">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors ${isActive(to) ? "text-neon" : "text-muted-foreground hover:text-neon"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}