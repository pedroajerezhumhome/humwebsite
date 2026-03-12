import type { Metadata } from "next";
import Hero from "@/components/precall/Hero";
import ProductShowcase from "@/components/precall/ProductShowcase";
import TeamSection from "@/components/precall/TeamSection";
import CostCalculator from "@/components/CostCalculator";
import Guarantees from "@/components/precall/Guarantees";
import PrecallFooter from "@/components/precall/PrecallFooter";
import ScrollReveal from "@/components/precall/ScrollReveal";
import ScrollProgress from "@/components/precall/ScrollProgress";
import "../precall.css";

export const metadata: Metadata = {
  title: "HUM: Before Your Call",
  description:
    "Your personalized pre-call guide. Everything you need to know before your HUM discovery call.",
};

export default function PrecallMomPage() {
  return (
    <div className="precall-page">
      <ScrollReveal />
      <ScrollProgress />

      <Hero
        headline="You just took the first step toward getting your life back"
        subtitle="Everything you need to know before your call. This takes five&nbsp;minutes."
        trustText='Trusted by <strong>[XX] families</strong> across Austin, San Francisco, and beyond'
      />


      {/* Your life right now */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Your life right now</div>
          <h2>You already know how tomorrow is going to go</h2>
          <p>
            You&rsquo;re up before everyone else. Packing lunches, managing the
            chaos of getting everyone fed, dressed, and out the door, while
            answering a work email that can&rsquo;t wait. Then the evening.
            Dinner, homework, baths, bedtime. All while running through
            tomorrow&rsquo;s logistics.
          </p>
          <p>
            Your phone never shuts off. Nobody else is going to notice the kids
            are outgrowing their shoes. Nobody else is going to remember the
            permission slip is due Friday. Nobody else is going to think about
            what&rsquo;s for dinner on Tuesday night at 2 PM on a Monday.
          </p>
          <p>
            You lie in bed at night running the audit. Did the permission slip
            get signed? Is there enough milk? When was the last time the dog had
            his heartworm pill? The household never shuts down. It works because
            you never stop.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Research shows mothers handle 71% of all household cognitive labor.
            Not just the doing. The thinking about the doing.
          </p>
          <div className="pullquote">
            You can&rsquo;t drop the thread. Because if you do, everything
            unravels. So you never do.
          </div>

          <p className="fwd-hook">Here&rsquo;s what that actually costs you.</p>
        </div>
      </section>

      {/* Cost of staying here */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">The cost of staying here</div>
          <h2>Five years from now</h2>
          <p>
            Same pace. Same weight. Same list. Your kids are five years older. The logistics multiplied. Your career never got the bandwidth it
            deserved. Your relationship is five years more threadbare, not
            because the love disappeared, but because every conversation became a
            logistics meeting.
          </p>
          <p>
            And your kids are five years closer to leaving. The window for
            bedtime stories and Saturday morning pancakes, it&rsquo;s closing.
            It doesn&rsquo;t reopen.
          </p>
          <div className="pullquote">
            You lose those years in 30-minute increments, folding laundry,
            coordinating vendors, making tomorrow&rsquo;s list, while the life
            you wanted was happening in the next room.
          </div>
          <div className="proof-inline rv rv-d2">
            <p>
              &ldquo;[Placeholder: Client quote about what life was like before
              HUM and what changed, 1-2 sentences from a real
              client.]&rdquo;
            </p>
            <div className="proof-attr">
              , [First Name], [City] · HUM client since [Year]
            </div>
          </div>
          <p className="fwd-hook">But something brought you to this page. That instinct matters.</p>
        </div>
      </section>

      {/* Permission */}
      <section className="sect rv">
        <div className="narrow">
          <h2>You&rsquo;re allowed to want your life back</h2>
          <p>
            If there&rsquo;s a voice saying you should be able to handle this,
            that wanting help means you&rsquo;re not enough, here&rsquo;s the
            truth. You are carrying more than any one person should. Not because
            you signed up for it. Because nobody else picked it up.
          </p>
          <div className="pullquote">
            Wanting your life back is not a luxury. It&rsquo;s clarity.
          </div>
          <p className="fwd-hook">Here&rsquo;s what that clarity makes possible.</p>
        </div>
      </section>

      {/* After picture */}
      <section className="sect warm rv">
        <div className="narrow">
          <div className="label">What&rsquo;s on the other side</div>
          <h2>The morning you haven&rsquo;t had in years</h2>
          <p>
            You wake up and the house is already running. The lunches are made.
            The errands are in motion, not because you remembered them, but
            because someone else did. You sit down with your coffee. Your morning
            is yours.
          </p>
          <p>
            The electrician comes and you don&rsquo;t know about it until
            it&rsquo;s done. The pantry is stocked. The returns got dropped off.
            You pick up your kids and you&rsquo;re actually present. Not
            distracted. Just there.
          </p>
          <p>
            The weekend comes and it feels like a weekend. Not a catchup day. A
            day with your family where nobody is managing anything.
          </p>
          <div className="pullquote">
            Same house. Same family. Same life. The only difference is that
            you&rsquo;re finally living it instead of managing it.
          </div>
          <p className="fwd-hook">Now for the part your gut is already asking about.</p>
        </div>
      </section>

      {/* Why everything else failed */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Why everything else failed</div>
          <h2>You&rsquo;ve heard promises like this before</h2>
          <p>
            If part of you is reading this thinking &ldquo;that sounds like
            exactly what I need&rdquo;, and right behind that is &ldquo;I&rsquo;ve
            been burned before&rdquo;, good. That instinct has protected you.
          </p>
          <p>
            But every solution you&rsquo;ve tried had the same flaw: someone
            showed up, asked &ldquo;what do you want me to do?&rdquo; and you
            were right back to managing. The people weren&rsquo;t the problem.
            The missing system was.
          </p>
          <div className="pullquote">
            The solution isn&rsquo;t another person to manage. It&rsquo;s a
            system that runs your home, with a trained professional already
            operating it.
          </div>
          <p>That&rsquo;s what HUM builds. Here&rsquo;s exactly how.</p>
        </div>
      </section>

      <ProductShowcase
        introText="Three things have to happen for your home to run without you. We do all three."
        proofQuote="[Placeholder: Client quote about the Home Operating System or what it felt like to stop managing, 1-2 sentences.]"
        proofAttr=", [First Name], [City]"
        footerNote="Your house manager can also serve as a nanny, housekeeper, or combination, depending on what your family needs. We'll tailor the role on your call."
      />

      {/* Journey */}
      <section className="sect dark2 rv">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="label">
            From your call to a house manager in your home
          </div>
          <h2>The Journey</h2>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 480,
              margin: "0 auto 12px",
            }}
          >
            Most families are fully set up within 30 to 60 days.
          </p>
          <div className="journey-steps">
            <div className="j-step">
              <div className="j-dot active" />
              <h3>Discovery Call</h3>
              <p>You&rsquo;re here. We learn about your family and fit.</p>
            </div>
            <div className="j-step">
              <div className="j-dot" />
              <h3>Build Your System</h3>
              <p>
                We extract what&rsquo;s in your head and build your Home OS.
              </p>
            </div>
            <div className="j-step">
              <div className="j-dot" />
              <h3>Find Your Person</h3>
              <p>
                AI-scored candidates. You meet finalists. Trial day + week.
              </p>
            </div>
            <div className="j-step">
              <div className="j-dot" />
              <h3>Onboard + Support</h3>
              <p>
                30 days of active support until the training wheels come off.
              </p>
            </div>
            <div className="j-step">
              <div className="j-dot" />
              <h3>Autopilot</h3>
              <p>Your home runs. You live.</p>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />


      {/* Calculator */}
      <section className="sect dark2 rv">
        <div className="narrow">
          <div className="label" style={{ textAlign: "center" }}>The math</div>
          <h2 style={{ textAlign: "center" }}>What&rsquo;s Your Time Actually Worth?</h2>
          <CostCalculator embedded />
        </div>
      </section>

      <Guarantees />

      {/* Prepare */}
      <section className="sect warm rv">
        <div className="container">
          <div className="narrow" style={{ textAlign: "center" }}>
            <div className="label">Before your call</div>
            <h2>Three things to think about</h2>
            <p style={{ color: "var(--text-soft)" }}>
              You don&rsquo;t need to prepare anything formal. But families
              who&rsquo;ve thought about these get the most from the
              conversation.
            </p>
          </div>
          <div
            className="prep-items"
            style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
          >
            <div className="prep-card rv rv-d1">
              <div className="prep-num">1</div>
              <h3>What&rsquo;s not working</h3>
              <p>
                What are the specific moments where the weight is heaviest?
                Morning chaos, evening scramble, weekends consumed by catch-up?
              </p>
            </div>
            <div className="prep-card rv rv-d2">
              <div className="prep-num">2</div>
              <h3>What you&rsquo;ve tried</h3>
              <p>
                Cleaners, nannies, apps, asking your partner. What solved a
                piece and what created more to manage?
              </p>
            </div>
            <div className="prep-card rv rv-d3">
              <div className="prep-num">3</div>
              <h3>What great looks like</h3>
              <p>
                If this worked perfectly, what does your Tuesday look like? Your
                Saturday? What do you do with the time you get back?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner share */}
      <section className="sect rv" id="partnerShare">
        <div className="container">
          <div className="partner-share">
            <h3>Have a partner?</h3>
            <p>
              Families aligned from the start move faster. We built a short page
              for them, three minutes, designed for their perspective. Share it
              now so you&rsquo;re both prepared.
            </p>
            <a href="/partner/for-him" className="partner-btn">
              Share with Your Partner
            </a>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="close-sect rv">
        <div className="narrow">
          <h2>You already booked the call</h2>
          <p>
            On the call, we&rsquo;ll talk about your specific situation,
            what&rsquo;s not working, and what it would actually take to fix it.
            We won&rsquo;t pressure you. We won&rsquo;t waste your time.
          </p>
          <p>
            What we hear from most families is that the call itself feels
            different, like the first time someone actually understood the
            weight they&rsquo;ve been carrying instead of offering another
            band-aid.
          </p>
          <hr className="divider" style={{ margin: "36px auto" }} />
          <p>
            You&rsquo;ve been carrying this for a long time. You booked this
            call because something told you it was time to stop. Trust that.
          </p>
          <p className="signoff">See you soon.</p>
        </div>
      </section>

      <PrecallFooter />
    </div>
  );
}
