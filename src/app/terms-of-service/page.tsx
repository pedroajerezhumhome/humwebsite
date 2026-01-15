"use client";

import Script from "next/script";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-[#454545]">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <img src="/hum-logo.jpg" alt="HUM" className="h-8 w-auto" />
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div
          id="Tld0WVkyUTFiMU4xVVN0TVQxRTlQUT09"
          className="policy_embed_div"
          style={{ width: 640, height: 480 }}
        >
          Please wait while the policy is loaded. If it does not load, please{" "}
          <a
            rel="nofollow"
            href="https://policies.termageddon.com/api/policy/Tld0WVkyUTFiMU4xVVN0TVQxRTlQUT09"
            target="_blank"
          >
            click here
          </a>{" "}
          to view the policy.
        </div>
      </main>

      <Script
        src="https://policies.termageddon.com/api/embed/Tld0WVkyUTFiMU4xVVN0TVQxRTlQUT09.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
