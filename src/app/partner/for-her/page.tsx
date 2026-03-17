import type { Metadata } from "next";
import Hero from "@/components/precall/Hero";
import ProductShowcase from "@/components/precall/ProductShowcase";
import TeamSection from "@/components/precall/TeamSection";
import Calculator from "@/components/precall/Calculator";
import Guarantees from "@/components/precall/Guarantees";
import PrecallFooter from "@/components/precall/PrecallFooter";
import ScrollReveal from "@/components/precall/ScrollReveal";
import ImagePlaceholder from "@/components/precall/ImagePlaceholder";
import "../../precall/precall.css";

export const metadata: Metadata = {
  title: "HUM, For Your Partner",
  description:
    "Your partner is exploring HUM. This three-minute read will help you understand what it is and why it matters.",
};

export default function PartnerForHerPage() {
  return (
    <div className="precall-page">
      <ScrollReveal />

      <Hero
        headline="Someone you love sent you this"
        subtitle="Your partner is exploring HUM. This takes three minutes. It&rsquo;ll make your upcoming call together much more productive."
        trustText='Trusted by <strong>[XX] families</strong> across Austin, San Francisco, and beyond'
        short
      />

      {/* Visual moment 1 */}
      <section className="sect" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container">
          <ImagePlaceholder
            variant="wide"
            label="Opening image"
            brief="A woman at peace in her home. Maybe sitting at a kitchen island with coffee, looking out a window. The house is calm and handled. Morning light. No tasks in motion. She's not managing, she's just being. Warm tones, natural materials. Kinfolk quality. The feeling is: the weight has been lifted. Shot on 50mm at f/2.8."
          />
        </div>
      </section>

      {/* Before anything else */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Before anything else</div>
          <h2>This isn&rsquo;t about you not being enough</h2>
          <p>
            Your partner booked this call because he sees the weight you&rsquo;re
            carrying. Not because he thinks you can&rsquo;t handle it. Because
            he knows you shouldn&rsquo;t have to.
          </p>
          <p>
            You carry 71% of the cognitive labor in your household. The
            planning, the tracking, the anticipating. Not just the tasks. The
            thinking about the tasks. The invisible weight that makes everything
            work but that nobody else sees.
          </p>
          <p>
            You&rsquo;ve probably tried to fix this before. Cleaners, nannies,
            apps. Every one solved one thing while adding another thing for you
            to manage. None of them removed the weight.
          </p>
          <div className="pullquote">
            Wanting help is not a failure. It&rsquo;s clarity about what your
            time and your presence are actually worth.
          </div>
        </div>
      </section>

      {/* Why this is different */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">Why this is different</div>
          <h2>This won&rsquo;t become another thing you manage</h2>
          <p>
            That&rsquo;s the promise, and it&rsquo;s the entire reason HUM is
            built the way it is.
          </p>
          <p>
            Every other solution failed because someone showed up, asked
            &ldquo;what do you want me to do?&rdquo; and you were right back to
            managing. The people weren&rsquo;t the problem. The missing system
            was.
          </p>
          <div className="pullquote">
            HUM builds the operating system for your home first, every
            preference, every routine, every standard documented, then places a
            trained professional to run it. The system tells them what to do. Not
            you.
          </div>
          <p>
            Your house manager shows up on day one already knowing how you want
            things done. You don&rsquo;t train them. You don&rsquo;t manage
            them. You don&rsquo;t stand over their shoulder. The system does that
            work.
          </p>
        </div>
      </section>

      {/* After picture */}
      <section className="sect warm rv">
        <div className="narrow">
          <div className="label">What&rsquo;s on the other side</div>
          <h2>The morning you haven&rsquo;t had in years</h2>
          <p>
            You wake up and the house is already running. The lunches are made.
            The errands are in motion. You sit down with your coffee and your
            morning is yours. No mental tab open running tomorrow&rsquo;s
            logistics.
          </p>
          <p>
            You pick up your kids and you&rsquo;re actually present. The weekend
            feels like a weekend. Not a recovery day. A day with your family
            where nobody is managing anything.
          </p>
          <ImagePlaceholder
            variant="editorial"
            label="Aspirational moment"
            brief="A mother picking up her child from school or walking in the door. She's present, not distracted. The child is running toward her. Golden afternoon light. The feeling is: she's there, fully, for the first time in years. Shot on 85mm at f/2. Shallow DOF. Tender, unguarded."
            style={{ marginTop: 8, marginBottom: 32 }}
          />
          <div className="pullquote">
            Same house. Same family. Same life. The only difference is that
            you&rsquo;re finally living it instead of managing it.
          </div>
        </div>
      </section>

      <ProductShowcase
        introText="Three things have to happen for your home to run without you at the center. We do all three."
        showOnboarding={false}
        footerNote="Your house manager can also serve as a nanny, housekeeper, or combination, tailored to your family's needs."
        label="What you're getting"
      />

      <TeamSection />

      {/* Calculator */}
      <section className="sect dark2 rv">
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="label">The math</div>
          <h2>What your time is actually worth</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Every hour you spend on tasks a house manager could handle costs your
            family far more than the $30 to $35/hr it would cost to delegate.
          </p>
          <Calculator
            insightPrefix="your family"
            lowIncomeExtra="the time you get back with your family, your career, and yourself"
          />
        </div>
      </section>

      <Guarantees />

      {/* Prepare */}
      <section className="sect warm rv">
        <div className="container">
          <div className="narrow" style={{ textAlign: "center" }}>
            <div className="label">Before the call</div>
            <h2>Two things to think about</h2>
            <p style={{ color: "var(--text-soft)" }}>
              You&rsquo;ll be joining this call together. These will help you
              get the most from it.
            </p>
          </div>
          <div
            className="prep-items"
            style={{
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div className="prep-card rv rv-d1">
              <div className="prep-num">1</div>
              <h3>Your questions</h3>
              <p>
                Anything you want to understand about how this works, what it
                costs, or what the process looks like. The call is the place to
                ask.
              </p>
            </div>
            <div className="prep-card rv rv-d2">
              <div className="prep-num">2</div>
              <h3>What great looks like</h3>
              <p>
                If this worked perfectly, what changes at home? What does your
                weekend look like? What do you do with the time?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="close-sect rv">
        <div className="narrow">
          <ImagePlaceholder
            variant="editorial"
            label="Home at peace"
            brief="Detail shot. Fresh flowers in a ceramic vase on a clean kitchen counter. Warm window light catching the petals. The counter is clear, organized, beautiful. A small gesture of a house that runs itself. Very shallow DOF (f/1.4). The feeling is quiet luxury. Cereal Magazine."
            style={{ marginBottom: 48 }}
          />
          <h2>Join the call</h2>
          <p>
            The families who move forward confidently are the ones where both
            partners are aligned from the start. If you have questions, the call
            is the place to ask them.
          </p>
          <p>
            This isn&rsquo;t a high-pressure pitch. It&rsquo;s a conversation
            about whether HUM is the right fit for your family. If it is,
            you&rsquo;ll know. If it isn&rsquo;t, so will we.
          </p>
          <p className="signoff">See you there.</p>
        </div>
      </section>

      <PrecallFooter />
    </div>
  );
}
