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

export default function PrecallIndividualPage() {
  return (
    <div className="precall-page">
      <ScrollReveal />
      <ScrollProgress />

      <Hero
        headline="You just took the first step toward getting your life back"
        subtitle="Everything you need to know before your call. This takes five&nbsp;minutes."
        trustText='Trusted by <strong>[XX] households</strong> across Austin, San Francisco, and beyond'
      />


      {/* Your life right now */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Your life right now</div>
          <h2>You built a life you don&rsquo;t have time to enjoy</h2>
          <p>
            You&rsquo;ve worked hard for what you have. The career, the home,
            the life you&rsquo;ve put together. And somewhere along the way,
            maintaining it became a second job.
          </p>
          <p>
            The errands that eat your evenings. The weekend that disappears into
            grocery runs, laundry, cleaning, returns, and the list of things
            you&rsquo;ve been meaning to get to for three weeks. The mental
            inventory you run constantly, what needs to get done, what&rsquo;s
            overdue, what&rsquo;s falling behind.
          </p>
          <p>
            You come home after a demanding day and the house needs you too. The
            fridge is empty. The dry cleaning is still there. The contractor
            never called back. The house isn&rsquo;t dirty, exactly, it&rsquo;s
            just never quite handled. And the only person who&rsquo;s going to
            handle it is you.
          </p>
          <p>
            You lie in bed running through tomorrow&rsquo;s logistics instead of
            actually resting. You wake up and do it again.
          </p>
          <div className="pullquote">
            You&rsquo;re working to sustain a life that you never have the time
            or energy to actually live.
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
            Same pace. Same weight. Same weekends consumed by maintenance. Your
            career is five years deeper into never getting your full attention
            because part of your brain is always running the house. Your health
            is five years more neglected, the workouts you keep meaning to
            start, the sleep you keep sacrificing.
          </p>
          <p>
            The things you keep saying you&rsquo;ll do &ldquo;when things calm
            down&rdquo;, the trip, the hobby, the project, the relationship
            you&rsquo;ve been meaning to invest in, those things never happen.
            Because things never calm down. The logistics just keep compounding.
          </p>
          <div className="pullquote">
            You don&rsquo;t lose the years in a single moment. You lose them in
            30-minute increments, running errands, managing vendors, handling
            the house, while the life you&rsquo;re working for stays
            permanently on hold.
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
            that successful people just figure it out, here&rsquo;s the truth.
            You&rsquo;ve been figuring it out. For years. And the cost
            hasn&rsquo;t been financial. It&rsquo;s been the life you&rsquo;re
            not living while you&rsquo;re busy maintaining everything.
          </p>
          <div className="pullquote">
            Wanting your life back is not a luxury. It&rsquo;s clarity about
            what your time is actually worth.
          </div>
          <p className="fwd-hook">Here&rsquo;s what that clarity makes possible.</p>
        </div>
      </section>

      {/* After picture */}
      <section className="sect warm rv">
        <div className="narrow">
          <div className="label">What&rsquo;s on the other side</div>
          <h2>The evening you haven&rsquo;t had in years</h2>
          <p>
            You come home and the house is handled. Not just clean, handled.
            The groceries are stocked. The dry cleaning is put away. The
            contractor came and it&rsquo;s done. You didn&rsquo;t coordinate any
            of it.
          </p>
          <p>
            Your evening is yours. Saturday is yours. You spend your time on the
            things you&rsquo;ve been putting off, the ones that actually matter
            to you. Not maintenance. Life.
          </p>
          <p>
            You stop feeling like you&rsquo;re running two jobs. Your career
            gets your full brain. Your downtime is actually downtime.
          </p>
          <div className="pullquote">
            Same home. Same life. The only difference is that you&rsquo;re
            finally living it instead of maintaining it.
          </div>
          <p className="fwd-hook">Now for the part your gut is already asking about.</p>
        </div>
      </section>

      {/* Why everything else failed */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Why everything else failed</div>
          <h2>You&rsquo;ve tried piecemeal solutions before</h2>
          <p>
            A cleaning service that handles one thing. A laundry service that
            handles another. An errand app you used for a week. Each one solved
            one piece while adding another thing to coordinate.
          </p>
          <p>
            The problem was never the individual tasks. It was the fact that
            managing all of it, remembering, scheduling, coordinating, following
            up, still fell on you. The logistics layer never went away.
          </p>
          <div className="pullquote">
            The solution isn&rsquo;t more services to manage. It&rsquo;s a
            system that runs your home, with a trained professional already
            operating it.
          </div>
          <p>That&rsquo;s what HUM builds. Here&rsquo;s exactly how.</p>
        </div>
      </section>

      <ProductShowcase
        introText="Three things have to happen for your home to run without you. We do all three."
        proofQuote="[Placeholder: Client quote about the system or what changed, 1-2 sentences.]"
        proofAttr=", [First Name], [City]"
        footerNote="Your house manager's role is tailored to what you need, household operations, errands, vendor management, meal prep, organization, or any combination. We'll define the scope on your call."
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
            Most clients are fully set up within 30 to 60 days.
          </p>
          <div className="journey-steps">
            <div className="j-step">
              <div className="j-dot active" />
              <h3>Discovery Call</h3>
              <p>
                You&rsquo;re here. We learn about your situation and fit.
              </p>
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

      <TeamSection subtitle="You&rsquo;re not working with a platform. You&rsquo;re working with people who stay with you from first call through full onboarding." />


      {/* Calculator */}
      <section className="sect dark2 rv">
        <div className="narrow">
          <div className="label" style={{ textAlign: "center" }}>The math</div>
          <h2 style={{ textAlign: "center" }}>What&rsquo;s Your Time Actually Worth?</h2>
          <CostCalculator embedded />
        </div>
      </section>

      <Guarantees
        managerNote="You pay your house manager directly at $30 to $35/hour. We never mark up their time. Exact pricing is tailored to your needs and confirmed on the call."
      />

      {/* Prepare */}
      <section className="sect warm rv">
        <div className="container">
          <div className="narrow" style={{ textAlign: "center" }}>
            <div className="label">Before your call</div>
            <h2>Three things to think about</h2>
            <p style={{ color: "var(--text-soft)" }}>
              You don&rsquo;t need to prepare anything formal. But people
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
              <h3>What&rsquo;s consuming your time</h3>
              <p>
                Which tasks eat your evenings and weekends? What&rsquo;s the
                stuff you keep meaning to get to but never do?
              </p>
            </div>
            <div className="prep-card rv rv-d2">
              <div className="prep-num">2</div>
              <h3>What you&rsquo;ve tried</h3>
              <p>
                Cleaning services, errand apps, doing it all yourself,
                what&rsquo;s worked and what&rsquo;s created more to manage?
              </p>
            </div>
            <div className="prep-card rv rv-d3">
              <div className="prep-num">3</div>
              <h3>What great looks like</h3>
              <p>
                If your home ran itself, what would you do with the time?
                What&rsquo;s been on hold that you&rsquo;d finally get to?
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
              If someone else is involved in this decision, share this with
              them. We built a short page for their perspective, three minutes.
              Families aligned from the start move faster.
            </p>
            <a href="/partner/general" className="partner-btn">
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
            what&rsquo;s consuming your time, and what it would actually take to
            fix it. We won&rsquo;t pressure you. We won&rsquo;t waste your time.
          </p>
          <p>
            What we hear from most clients is that the call itself feels
            different, like the first time someone actually understood what
            they&rsquo;ve been carrying instead of offering another band-aid.
          </p>
          <hr className="divider" style={{ margin: "36px auto" }} />
          <p>
            You&rsquo;ve been managing everything on your own for a long time.
            You booked this call because something told you it was time to stop.
            Trust that.
          </p>
          <p className="signoff">See you soon.</p>
        </div>
      </section>

      <PrecallFooter />
    </div>
  );
}
