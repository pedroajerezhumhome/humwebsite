interface ProductShowcaseProps {
  introText: string;
  showOnboarding?: boolean;
  proofQuote?: string;
  proofAttr?: string;
  footerNote?: string;
  label?: string;
  heading?: string;
}

export default function ProductShowcase({
  introText,
  showOnboarding = true,
  proofQuote,
  proofAttr,
  footerNote,
  label = "What you're getting",
  heading = "The HUM System",
}: ProductShowcaseProps) {
  return (
    <section className="sect dark rv">
      <div className="container">
        <div className="label">{label}</div>
        <h2>{heading}</h2>
        <p style={{ maxWidth: 540, marginBottom: 8 }}>{introText}</p>

        <div className="showcase-grid">
          <div className="showcase-card rv rv-d1">
            <div className="showcase-img" style={{ padding: 12, overflow: 'hidden', height: 'auto', aspectRatio: 'auto' }}>
              <img
                src="/candidate-journey.png"
                alt="HUM Candidate Journey — Source, Screen, Interviews, Background Check, Reference Calls, Client Interview, Trial Day, Trial Week, Hire"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: 8 }}
              />
            </div>
            <div className="showcase-text">
              <h3>Find your house manager</h3>
              <p>
                Hundreds of candidates scored by AI daily. Only 9/10 and above
                continue. Eight-point background check. Trial day, then trial
                week. You choose based on experience, not a résumé.
              </p>
            </div>
          </div>
          <div className="showcase-card rv rv-d2">
            <div className="showcase-img" style={{ padding: 12, overflow: 'hidden', height: 'auto', aspectRatio: 'auto' }}>
              <img
                src="/home-os-screenshot.png"
                alt="Home Operating System — Daily Home Reset, Laundry Management, Food and Meal Prep, Pet Care, Grocery Ordering, Family Logistics, Organization, and more"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: 8 }}
              />
            </div>
            <div className="showcase-text">
              <h3>Your Home Operating System</h3>
              <p>
                Everything in your head, documented, organized, visual. How the
                kitchen gets reset. What the pantry looks like stocked. Your
                house manager follows it daily. No more repeating yourself.
              </p>
            </div>
          </div>
          <div className="showcase-card full rv rv-d3">
            <div className="showcase-img" style={{ aspectRatio: "21/9" }}>
              <div className="ph-label">Screenshot: AI co-pilot</div>
              <div
                className="ph"
                style={{ flexDirection: "row", width: "90%", gap: 14 }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div className="bar s g" />
                  <div className="block" />
                </div>
                <div
                  style={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div className="bar m" />
                  <div className="bar l" />
                  <div className="block" />
                  <div className="bar s g" />
                  <div className="bar m" />
                </div>
              </div>
            </div>
            <div className="showcase-text">
              <h3>AI co-pilot built in</h3>
              <p>
                &ldquo;Where do the soccer cleats go?&rdquo; Answered
                instantly, without texting you. The knowledge isn&rsquo;t in your
                head anymore. It&rsquo;s in the system.
              </p>
            </div>
          </div>
          {showOnboarding && (
            <div className="showcase-card full rv rv-d4">
              <div className="showcase-text" style={{ padding: 28 }}>
                <h3>Onboarded and trained to your standards</h3>
                <p>
                  Day one doesn&rsquo;t feel like day one. For the first 30
                  days, our team is in it with you: check-ins, adjustments, and
                  when your house manager has questions, they come to us first.
                  Not you.
                </p>
              </div>
            </div>
          )}
        </div>

        {proofQuote && (
          <div className="proof-inline rv" style={{ marginTop: 32 }}>
            <p>&ldquo;{proofQuote}&rdquo;</p>
            <div className="proof-attr">{proofAttr}</div>
          </div>
        )}

        {footerNote && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: 32 }}>
            {footerNote}
          </p>
        )}
      </div>
    </section>
  );
}
