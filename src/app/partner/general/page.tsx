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

export default function PartnerGeneralPage() {
  return (
    <div className="precall-page">
      <ScrollReveal />

      <Hero
        headline="Someone you live with sent you this"
        subtitle="Your partner is exploring HUM. This takes three minutes. It&rsquo;ll make your upcoming call together much more productive."
        trustText='Trusted by <strong>[XX] households</strong> across Austin, San Francisco, and beyond'
        short
      />

      {/* Visual moment 1 */}
      <section className="sect" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container">
          <ImagePlaceholder
            variant="wide"
            label="Opening image"
            brief="A calm, beautiful home interior. Lived-in but immaculate. Morning light streaming through windows. Natural materials: wood, linen, ceramic. A few signs of life: a mug on the counter, a book on the side table. No people. The space is the subject. The feeling is: this is what a handled home looks like. Rich Stapleton for Cereal. Shot on 35mm at f/8."
          />
        </div>
      </section>

      {/* What's going on */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">What&rsquo;s going on</div>
          <h2>
            Your partner has been carrying more than you probably realize
          </h2>
          <p>
            Running a household is an invisible job. The errands, the vendors,
            the scheduling, the restocking, the following up, the mental
            inventory of everything that needs to happen and when. Someone in
            your home has been carrying most of that weight, on top of whatever
            career they&rsquo;re already managing.
          </p>
          <p>
            They&rsquo;ve tried to fix it. Cleaning services, apps, doing it all
            themselves. Every solution solved one task while adding another thing
            to coordinate. None of them removed the weight.
          </p>
          <p>
            They&rsquo;re exploring HUM because they&rsquo;ve reached the point
            where the current approach isn&rsquo;t sustainable, and piecemeal
            fixes aren&rsquo;t working.
          </p>
        </div>
      </section>

      {/* What this means */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">What this means for both of you</div>
          <h2>This isn&rsquo;t just about the house</h2>
          <p>
            When someone in a household is constantly managing the logistics, it
            affects everything. The tension in conversations that turn into
            coordination meetings. The weekends that feel like catchup days
            instead of actual rest. The career that never gets full attention
            because half the brain is running the house.
          </p>
          <p>
            When the house runs itself, everything else gets better. Less
            tension. More time. More presence. More energy for the things that
            actually matter to both of you.
          </p>
          <div className="pullquote">
            This isn&rsquo;t an expense. It&rsquo;s buying back time that&rsquo;s
            worth far more than what you&rsquo;re paying for it.
          </div>
        </div>
      </section>

      {/* Why this is different */}
      <section className="sect warm rv">
        <div className="narrow">
          <div className="label">Why this is different</div>
          <h2>This won&rsquo;t become another thing to manage</h2>
          <p>
            Every other solution failed because someone showed up, asked
            &ldquo;what do you want me to do?&rdquo; and whoever was managing
            the household was right back to managing them. More work, not less.
          </p>
          <div className="pullquote">
            HUM builds the operating system for your home first, every
            preference, every routine, every standard documented, then places a
            trained professional to run it. The system tells them what to do. Not
            you.
          </div>
          <ImagePlaceholder
            variant="editorial"
            label="The system at work"
            brief="Medium shot: hands at work. A house manager's hands carefully organizing a pantry shelf or folding linens. Precise, unhurried. The competence of someone excellent at their craft. Warm natural light. Cereal Magazine artisan-profile quality. Shot on 50mm at f/2.8. The feeling is quiet professionalism."
            style={{ marginTop: 32 }}
          />
        </div>
      </section>

      <ProductShowcase
        introText="Three things have to happen for your home to run without anyone at the center. We do all three."
        showOnboarding={false}
        footerNote="Your house manager's role is tailored to what your household needs, including operations, errands, vendor management, meal prep, organization, or any combination."
        label="What you're paying for"
      />

      <TeamSection subtitle="You&rsquo;re not working with a platform. You&rsquo;re working with people who stay with you from first call through full onboarding." />

      {/* Calculator */}
      <section className="sect dark2 rv">
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="label">The math</div>
          <h2>What your time is actually worth</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Every hour spent on tasks a house manager could handle costs your
            household far more than the $30 to $35/hr it would cost to delegate.
          </p>
          <Calculator
            insightPrefix="you"
            lowIncomeExtra="the time you get back for your career, your health, and your life"
          />
        </div>
      </section>

      <Guarantees
        managerNote="You pay your house manager directly at $30 to $35/hour. We never mark up their time. Exact pricing is tailored to your needs and confirmed on the call."
      />

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
                If your home ran itself, what changes? What do you do with the
                time? What does your weekend look like?
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
            brief="Wide environmental. A living room at dusk. Warm lamp light mixing with the last natural light. The space is calm and cared for. A throw blanket on the couch, a plant on the windowsill. Nobody managing anything. The feeling is: home as it should be. Shot on 35mm at f/5.6. Warm practical lighting."
            style={{ marginBottom: 48 }}
          />
          <h2>Join the call</h2>
          <p>
            The households that move forward confidently are the ones where
            everyone involved is aligned from the start. If you have questions,
            the call is the place to ask them.
          </p>
          <p>
            This isn&rsquo;t a high-pressure pitch. It&rsquo;s a conversation
            about whether HUM is the right fit. If it is, you&rsquo;ll know. If
            it isn&rsquo;t, so will we.
          </p>
          <p className="signoff">See you there.</p>
        </div>
      </section>

      <PrecallFooter />
    </div>
  );
}
