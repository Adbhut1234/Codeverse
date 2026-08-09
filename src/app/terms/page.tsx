import Link from "next/link";

export const metadata = {
  title: "Terms of Service — CodeVerse",
  description: "Terms of Service for using the CodeVerse platform.",
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: August 1, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using CodeVerse (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform. CodeVerse reserves the right to update these terms at any time, and your continued use constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
            <p>CodeVerse provides an AI-native cloud development environment including code editing, compilation, execution, AI-assisted code analysis, and workspace management. The service is provided &quot;as is&quot; and may be updated, modified, or discontinued at any time.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate, current, and complete information during registration. You must be at least 13 years of age to use this service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p className="mb-2">You agree not to use the Platform to:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li>Violate any applicable laws or regulations</li>
              <li>Distribute malware, viruses, or harmful code</li>
              <li>Attempt to gain unauthorized access to other accounts or systems</li>
              <li>Use the Platform for cryptocurrency mining or excessive resource consumption</li>
              <li>Engage in any activity that disrupts the service for others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>You retain ownership of all code and content you create on the Platform. CodeVerse does not claim any rights to your intellectual property. However, by using the Platform, you grant CodeVerse a limited license to host and process your content solely for the purpose of providing the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Payment Terms</h2>
            <p>Paid plans are billed in advance on a monthly basis. All fees are non-refundable except as required by law. CodeVerse reserves the right to change pricing with 30 days advance notice. Failure to pay may result in suspension of your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, CodeVerse shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including but not limited to loss of data, revenue, or business opportunities.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Termination</h2>
            <p>Either party may terminate this agreement at any time. CodeVerse may suspend or terminate your account if you violate these terms. Upon termination, your right to use the Platform ceases immediately, though we will make your data available for export for 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>If you have questions about these Terms, contact us at <a href="mailto:legal@codeverse.dev" className="text-[#388bfd] hover:underline">legal@codeverse.dev</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
