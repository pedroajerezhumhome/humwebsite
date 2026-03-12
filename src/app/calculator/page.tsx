"use client";

import Link from "next/link";
import CostCalculator from "@/components/CostCalculator";
import "./calculator.css";

export default function CalculatorPage() {
  return (
    <div className="calculator-page">
      {/* Header */}
      <header className="calculator-header">
        <div className="calculator-header-content">
          <Link href="/">
            <img src="/hum-logo.jpg" alt="HUM" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="calculator-main">
        <div className="calculator-container">
          <CostCalculator />
        </div>
      </main>

      {/* Footer */}
      <footer className="calculator-footer">
        <div className="calculator-footer-content">
          <img src="/hum-logo.jpg" alt="HUM" className="footer-logo" />
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} HUM</p>
        </div>
      </footer>
    </div>
  );
}
