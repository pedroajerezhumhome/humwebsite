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

export default function PartnerForHimPage() {
  return (
    <div className="precall-page">
      <ScrollReveal />

      <Hero
        headline="Someone you love sent you this"
        subtitle="She&rsquo;s exploring HUM. This takes three minutes. It&rsquo;ll make your upcoming call together much more productive."
        trustText='Trusted by <strong>[XX] families</strong> across Austin, San Francisco, and beyond'
        short
      />

      {/* Visual moment 1 */}
      <section className="sect" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container">
          <ImagePlaceholder
            variant="wide"
            label="Opening image"
            brief="A family scene. A mother and children in a warm, calm home. She looks relaxed, present. The house is clearly handled. Warm late-afternoon window light. Oak, linen, fresh flowers. The feeling is: this is what life looks like when the weight is lifted. Kinfolk quality. Shot on 35mm at f/4."
          />
        </div>
      </section>

      {/* What's actually going on */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">What&rsquo;s actually going on</div>
          <h2>She&rsquo;s been carrying more than you realize</h2>
          <p>
            Not because you haven&rsquo;t helped. Because the system lives in
            her head, every preference, every schedule, every vendor, every
            routine, and there&rsquo;s no way to transfer it without her
            stopping to explain everything, which creates more work, not less.
          </p>
          <p>
            Research shows mothers handle 71% of all household cognitive labor.
            The invisible thinking behind the doing. It&rsquo;s why she&rsquo;s
            the one lying awake at night running through tomorrow while the house
            sleeps.
          </p>
          <p>
            She&rsquo;s tried to fix it. Cleaners, nannies, meal services, apps.
            Every one solved one task while adding another thing for her to
            manage. None of them removed the weight.
          </p>
        </div>
      </section>

      {/* What this means */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">What this means for you</div>
          <h2>This isn&rsquo;t just about helping her</h2>
          <div className="stat">
            <div className="stat-num">46%</div>
            <div className="stat-cap">
              of working fathers say they don&rsquo;t spend enough time with
              their children
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            Less tension at home. Fewer conversations that turn into logistics
            meetings. Weekends that actually feel like weekends. And more time
            with your kids, actually present, not just in the room.
          </p>
          <p>
            Your kids are growing up now. Not later. The time spent on household
            logistics is time not spent with them. That window doesn&rsquo;t
            reopen.
          </p>
          <div className="pullquote">
            This isn&rsquo;t an expense. It&rsquo;s buying back time with your
            family that&rsquo;s worth far more than what you&rsquo;re paying for
            it.
          </div>
          <ImagePlaceholder
            variant="editorial"
            label="Family connection"
            brief="A father present with his children. Maybe on the floor building something, or carrying a kid on his shoulders in the yard. Not posed. Genuine connection. Warm golden light. Shallow depth of field. The feeling is: this is what you get back. Kodak Portra 400."
            style={{ marginTop: 32 }}
          />
        </div>
      </section>

      {/* Why this time is different */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Why this time is different</div>
          <h2>
            Every solution she&rsquo;s tried turned into more work for her
          </h2>
          <p>
            Same pattern every time: someone showed up, asked &ldquo;what do you
            want me to do?&rdquo; and she was right back to managing. The people
            weren&rsquo;t the problem. The missing system was.
          </p>
          <div className="pullquote">
            HUM doesn&rsquo;t just place a person. It builds the operating
            system for your home first, then places a trained professional to
            run it. She stops being the center of everything. That&rsquo;s the
            point.
          </div>
        </div>
      </section>

      <ProductShowcase
        introText="Three things have to happen for your home to run without her at the center. We do all three."
        showOnboarding={false}
        footerNote="Your house manager can also serve as a nanny, housekeeper, or combination, tailored to your family's needs."
        label="What you're paying for"
      />

      <TeamSection />

      {/* Calculator */}
      <section className="sect dark2 rv">
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="label">The math</div>
          <h2>What your family&rsquo;s time is actually worth</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Every hour she spends on tasks a house manager could handle costs
            your family far more than the $30 to $35/hr it would cost to delegate.
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
            brief="Wide environmental. A calm, beautiful home interior at golden hour. No people, but evidence of life: a child's toy on a clean rug, a book open on the coffee table, a blanket draped. The space is cared for. Light streaming through windows. The feeling is peace. Rich Stapleton for Cereal. Shot on 35mm at f/8."
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
