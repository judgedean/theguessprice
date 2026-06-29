import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <Link to="/" className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest">← Back to Game</Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono text-neon">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground font-mono">Last updated: May 2026</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Information We Collect</h2>
            <p>TheGuessPrice is a browser-based game. We do not require you to create an account or submit any personal information to play. We may collect anonymous, aggregated usage data (such as page views and game sessions) through standard analytics tools to help improve the experience.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Cookies</h2>
            <p>We may use cookies or local storage solely to preserve your game state within a session. We do not use tracking cookies for advertising purposes. Third-party services embedded on this site (such as Google Analytics or advertising networks) may set their own cookies subject to their respective privacy policies.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Advertising</h2>
            <p>This site may display advertisements served by third-party ad networks. These networks may use cookies and similar technologies to serve ads based on your interests. You can opt out of personalised advertising through your browser settings or via industry opt-out tools such as <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">aboutads.info</a>.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Affiliate Links</h2>
            <p>Some product links on this site are affiliate links. If you click a link and make a purchase, we may earn a small commission at no extra cost to you. Please see our <Link to="/affiliate-disclosure" className="text-neon hover:underline">Affiliate Disclosure</Link> for full details.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">5. Third-Party Links</h2>
            <p>Our site links to third-party retailers (Amazon, Etsy, etc.). We are not responsible for the privacy practices of those websites and encourage you to review their policies before making a purchase.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">6. Children's Privacy</h2>
            <p>This site is not directed at children under the age of 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Continued use of the site after changes are posted constitutes your acceptance of the revised policy.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">8. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact us via the information provided on this site.</p>
          </section>
        </div>
      </div>
    </div>
  );
}