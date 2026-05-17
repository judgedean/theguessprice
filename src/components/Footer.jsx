import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-12 py-6 px-4">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-3 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/privacy-policy" className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest">
            Terms of Service
          </Link>
          <Link to="/affiliate-disclosure" className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest">
            Affiliate Disclosure
          </Link>
        </div>
        <p className="text-xs text-muted-foreground/60 font-mono">
          As an Amazon Associate, I earn from qualifying purchases.
        </p>
      </div>
    </footer>
  );
}