import Link from "next/link";

export default function PrecallFooter() {
  return (
    <footer style={{
      padding: "32px 24px 100px",
      background: "var(--bg)",
      borderTop: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{
        maxWidth: "1152px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>
        <img src="/hum-logo.png" alt="HUM" style={{ height: "24px", width: "auto" }} />
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
        }}>
          <Link href="/privacy-policy" style={{ fontSize: "12px", color: "#999", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" style={{ fontSize: "12px", color: "#999", textDecoration: "none" }}>
            Terms of Service
          </Link>
          <Link href="/disclaimer" style={{ fontSize: "12px", color: "#999", textDecoration: "none" }}>
            Disclaimer
          </Link>
          <Link href="/cookie-policy" style={{ fontSize: "12px", color: "#999", textDecoration: "none" }}>
            Cookie Policy
          </Link>
        </div>
        <p style={{ fontSize: "12px", color: "#bbb", margin: 0 }}>
          &copy; {new Date().getFullYear()} HUM
        </p>
      </div>
    </footer>
  );
}
