import { Link } from "react-router-dom";

export default function AffiliateDisclosure() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <Link to="/" className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest">← Back to Game</Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono text-neon">Affiliate Disclosure</h1>
          <p className="text-xs text-muted-foreground font-mono">Last updated: May 2026</p>
        </div>

        <div className="rounded-xl border border-neon/30 bg-neon/5 px-6 py-4">
          <p className="text-sm text-foreground font-mono leading-relaxed">
            <span className="text-neon font-bold">As an Amazon Associate, I earn from qualifying purchases.</span>
          </p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">What This Means</h2>
            <p>TheGuessPrice participates in affiliate marketing programs, including the Amazon Associates Programme. This means that when you click certain product links on this site and make a purchase, we may receive a small commission — at absolutely no extra cost to you.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">Which Links Are Affiliate Links?</h2>
            <p>All "View on [Store]" buttons displayed after each game round and on the final results screen may be affiliate links. This includes links to Amazon, Etsy, and other third-party retailers where we participate in affiliate programmes.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">Our Editorial Independence</h2>
            <p>Products featured in the game are chosen for their entertainment value and absurdity — not because of affiliate relationships. Our affiliate partnerships do not influence which products are selected or how they are described.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">Etsy Affiliate Programme</h2>
            <p>We may also participate in the Etsy affiliate programme. Clicking an Etsy link may result in a commission being earned if a qualifying purchase is made.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">Your Trust Matters</h2>
            <p>We are committed to transparency. Affiliate commissions help keep the game free and allow us to continue developing new features. Thank you for your support.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">Questions?</h2>
            <p>If you have any questions about our affiliate relationships, please reach out via the contact information on this site. You can also review our <Link to="/privacy-policy" className="text-neon hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-neon hover:underline">Terms of Service</Link> for further information.</p>
          </section>
        </div>
      </div>
    </div>
  );
}