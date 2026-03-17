interface TeamSectionProps {
  subtitle?: string;
}

export default function TeamSection({
  subtitle = "You\u2019re not working with a platform. You\u2019re working with people who stay with your family from first call through full onboarding.",
}: TeamSectionProps) {
  return (
    <section className="sect rv">
      <div className="container" style={{ textAlign: "center" }}>
        <div className="label">Who&rsquo;s behind this</div>
        <h2>Your HUM Team</h2>
        <p
          className="narrow"
          style={{ color: "var(--text-soft)", marginBottom: 0 }}
        >
          {subtitle}
        </p>
        <div className="team-row">
          <div className="team-member rv rv-d1">
            <div className="team-photo">Photo</div>
            <div className="team-name">[Name]</div>
            <div className="team-title">Your Adviser</div>
          </div>
          <div className="team-member rv rv-d2">
            <div className="team-photo">Photo</div>
            <div className="team-name">[Name]</div>
            <div className="team-title">Recruiter</div>
          </div>
          <div className="team-member rv rv-d3">
            <div className="team-photo">Photo</div>
            <div className="team-name">[Name]</div>
            <div className="team-title">Home OS Builder</div>
          </div>
          <div className="team-member rv rv-d4">
            <div className="team-photo">Photo</div>
            <div className="team-name">[Name]</div>
            <div className="team-title">Onboarding Lead</div>
          </div>
        </div>
      </div>
    </section>
  );
}
