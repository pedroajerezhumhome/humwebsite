interface GuaranteesProps {
  pricingNote?: string;
  managerNote?: string;
}

export default function Guarantees({
  pricingNote = "The initial investment for most families is approximately <strong>$10,000</strong>, which includes recruiting, vetting, your custom Home Operating System with AI co-pilot, training, onboarding, and 30 days of active support. Both guarantees included.",
  managerNote = "You pay your house manager directly at $30 to $35/hour. We never mark up their time. Exact pricing is tailored to your family\u2019s needs and confirmed on the call.",
}: GuaranteesProps) {
  return (
    <section className="sect rv">
      <div className="container">
        <div className="narrow" style={{ textAlign: "center" }}>
          <h2>Find your perfect house manager. Or pay nothing.</h2>
        </div>

        <div className="guar-row">
          <div className="guar-card rv rv-d1">
            <h3>90-Day Placement Guarantee</h3>
            <p>
              No match in 90 days? Full refund. Or we keep searching. Your
              choice.
            </p>
          </div>
          <div className="guar-card rv rv-d2">
            <h3>60-Day Replacement Guarantee</h3>
            <p>
              Not working for any reason? We replace them at no additional cost.
            </p>
          </div>
        </div>
        <div
          className="narrow"
          style={{ textAlign: "center", marginTop: 36 }}
        >
          <p
            style={{ color: "var(--text-soft)", fontSize: "0.92rem" }}
            dangerouslySetInnerHTML={{ __html: pricingNote }}
          />
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            {managerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
