interface HeroProps {
  headline: string;
  subtitle: string;
  trustText: string;
  short?: boolean;
}

export default function Hero({ headline, subtitle, trustText, short }: HeroProps) {
  return (
    <section className={`hero${short ? " short" : ""}`}>
      <h1>{headline}</h1>
      <p className="sub" dangerouslySetInnerHTML={{ __html: subtitle }} />
      <div className="trust-line" dangerouslySetInnerHTML={{ __html: trustText }} />
      <div className="scroll-line" />
    </section>
  );
}
