import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <Link to="/" className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest">← Back to Game</Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono text-neon">Terms of Service</h1>
          <p className="text-xs text-muted-foreground font-mono">Last updated: May 2026</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using Guess The Price ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Use of the Site</h2>
            <p>Guess The Price is provided for entertainment purposes only. You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Site.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Accuracy of Product Information</h2>
            <p>Product names, descriptions, and prices listed on this Site are intended for game purposes only. Prices may be approximated, out of date, or otherwise inaccurate. We make no warranties regarding the accuracy or completeness of any product information displayed.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Affiliate Links & External Sites</h2>
            <p>The Site contains affiliate links to third-party retailers. We are not responsible for the content, accuracy, or practices of any external site. Clicking a product link and completing a purchase is entirely at your own discretion and risk.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">5. Intellectual Property</h2>
            <p>All original content on this Site, including game logic, design, and copy, is the property of Guess The Price and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without prior written permission.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">6. Disclaimer of Warranties</h2>
            <p>The Site is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Guess The Price shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">8. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the updated Terms.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved in the appropriate courts of the applicable jurisdiction.</p>
          </section>
        </div>
      </div>
    </div>
  );
}