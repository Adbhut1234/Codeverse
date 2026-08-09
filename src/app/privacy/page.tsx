import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — CodeVerse",
  description: "Privacy Policy for the CodeVerse platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-300">
      <header className="border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Logo" className="h-6 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPwsRlAZ5rJMu1udfoErWTL8RFzrvmqcEsL8-K8Xg0FAZvaG5m4yUqgO8OtjgWcKCJNQb99C9sYNF2gRtXSB1JFtsPZFBWJzY4sqRi-PHbstoXGOWzuMJ5Npbdd0D8uMWCtQtHgMgyfVNTX9N_UsjcNVN60qF3Xxfa6yAVIzlSss7iSioSjutks4nSmp6Np04oSX3xxi0JDrXZGui6ofGfYuDfmtG0JmA1bZmQxfgy9Xx7sHo-PSV4w" />
            <span className="text-base font-bold text-white">CodeVerse</span>
          </Link>
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">← Back to home</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: August 1, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect information you provide directly, including:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li><strong className="text-zinc-300">Account Information:</strong> Name, email address, and password when you create an account</li>
              <li><strong className="text-zinc-300">Payment Information:</strong> Billing details processed securely through our payment provider (we do not store card numbers)</li>
              <li><strong className="text-zinc-300">Content:</strong> Code, files, and workspace data you create on the Platform</li>
              <li><strong className="text-zinc-300">Usage Data:</strong> How you interact with the Platform, including features used and session duration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li>To provide, maintain, and improve the Platform</li>
              <li>To process transactions and send related information</li>
              <li>To send technical notices, security alerts, and support messages</li>
              <li>To respond to your comments, questions, and support requests</li>
              <li>To improve our AI features (using anonymized, aggregated data only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Data Storage & Security</h2>
            <p>Your workspace data is stored locally in your browser using localStorage. We use industry-standard encryption and security practices for all data transmitted to our servers. Code execution is performed via sandboxed third-party services and is not permanently stored.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. AI & Code Processing</h2>
            <p>When you use AI features, your code may be sent to third-party AI providers (such as Puter.js) for processing. This data is used solely to generate responses and is not retained by these providers beyond the processing session. We never use your private code to train AI models.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>We use third-party services for authentication (Google, GitHub), code execution (Wandbox), and AI processing (Puter.js). Each service has its own privacy policy. We encourage you to review them.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Cookies & Tracking</h2>
            <p>We use essential cookies to maintain your session and preferences. We do not use third-party advertising trackers. Analytics data, if collected, is anonymized and used solely to improve the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li>Access, update, or delete your personal information</li>
              <li>Export your workspace data at any time</li>
              <li>Request deletion of your account and all associated data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
            <p>CodeVerse is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will promptly delete it.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes via email or a prominent notice on the Platform. Your continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:privacy@codeverse.dev" className="text-[#388bfd] hover:underline">privacy@codeverse.dev</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
