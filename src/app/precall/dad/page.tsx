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

export default function PrecallDadPage() {
  return (
    <div className="precall-page">
      <ScrollReveal />
      <ScrollProgress />

      <Hero
        headline="You just took the first step toward getting your family back"
        subtitle="Everything you need to know before your call. This takes five&nbsp;minutes."
        trustText='Trusted by <strong>[XX] families</strong> across Austin, San Francisco, and beyond'
      />


      {/* What's actually happening */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">What&rsquo;s actually happening at home</div>
          <h2>
            The weight someone in your house has been carrying alone
          </h2>
          <p>
            Someone in your home is the one who remembers the permission slips,
            tracks the pediatrician appointments, knows which kid needs new
            shoes, plans dinner on Tuesday at 2 PM on a Monday, and lies awake
            at night running through tomorrow&rsquo;s logistics while the house
            sleeps.
          </p>
          <p>
            If that person is your partner, research shows mothers carry 71% of
            all household cognitive labor. Not the tasks. The thinking behind the
            tasks. The planning, tracking, anticipating, and managing that never
            shuts off.
          </p>
          <p>
            If that person is you, you already know exactly how heavy it is.
            And you know it&rsquo;s not sustainable.
          </p>
          <p>
            Either way, someone in your household is running an operation that
            would qualify as a full-time job, on top of whatever career
            they&rsquo;re already managing.
          </p>
          <div className="pullquote">
            The weight isn&rsquo;t the tasks. It&rsquo;s being the only one
            holding the thread, knowing that if you drop it, everything
            unravels.
          </div>
          <p className="fwd-hook">Here&rsquo;s what that costs your family.</p>
        </div>
      </section>

      {/* Cost of doing nothing */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">The cost of doing nothing</div>
          <h2>Five years from now</h2>
          <p>
            Same pace. Same tension. Same weekends that feel like logistics
            meetings instead of family time.
          </p>
          <p>
            Your career, or your partner&rsquo;s, never gets the bandwidth it
            deserves because half the brain is always running the house. Your
            relationship is five years more threadbare. Not because the love
            disappeared. Because there&rsquo;s never enough energy left after
            the managing.
          </p>
          <div className="stat">
            <div className="stat-num">46%</div>
            <div className="stat-cap">
              of working fathers say they don&rsquo;t spend enough time with
              their children
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            Your kids are five years closer to leaving. The window for bedtime
            stories and Saturday mornings and being the person they run to, that
            window is closing. It doesn&rsquo;t reopen. And you&rsquo;re losing
            it in 30-minute increments, not because you don&rsquo;t care, but
            because the logistics consume everything.
          </p>
          <div className="pullquote">
            You don&rsquo;t lose those years in a single moment. You lose them
            folding laundry, coordinating vendors, running tomorrow&rsquo;s list,
              while the life you wanted was happening in the next room.
          </div>
          <div className="proof-inline rv rv-d2">
            <p>
              &ldquo;[Placeholder: Client quote, ideally from a dad or a couple,
              about what changed after HUM. 1-2 sentences.]&rdquo;
            </p>
            <div className="proof-attr">
              , [First Name], [City] · HUM client since [Year]
            </div>
          </div>
          <p className="fwd-hook">But something brought you here. That instinct matters.</p>
        </div>
      </section>

      {/* Clarity */}
      <section className="sect rv">
        <div className="narrow">
          <h2>
            You&rsquo;re here because you know something has to change
          </h2>
          <p>
            Maybe you&rsquo;ve watched your partner try to fix this, cleaners,
            nannies, meal services, apps. Every solution solved one thing while
            adding another thing to manage. Maybe you&rsquo;ve tried to take
            more on yourself, and it created friction instead of relief because
            the system lives in her head and delegating means explaining
            everything.
          </p>
          <p>
            Or maybe you&rsquo;re carrying it all yourself, and you&rsquo;ve
            reached the limit of what one person can do.
          </p>
          <p>
            Either way, you booked this call because the current situation
            isn&rsquo;t working. That&rsquo;s not failure. That&rsquo;s clarity.
          </p>
          <p className="fwd-hook">Here&rsquo;s what that clarity makes possible.</p>
        </div>
      </section>

      {/* After picture */}
      <section className="sect warm rv">
        <div className="narrow">
          <div className="label">What&rsquo;s on the other side</div>
          <h2>The weekend you haven&rsquo;t had in years</h2>
          <p>
            The house is running. Not because someone is managing it, because a
            system is managing it. The errands are handled. The schedule is
            coordinated. The pantry is stocked. Nobody is standing over
            anyone&rsquo;s shoulder.
          </p>
          <p>
            Saturday morning comes and it feels like a Saturday morning.
            Pancakes. No agenda. Nobody is catching up on what fell through the
            cracks during the week.
          </p>
          <p>
            You&rsquo;re present with your kids. Actually present. And the
            tension that used to live in every room, it&rsquo;s gone. Because
            nobody is carrying the invisible weight anymore.
          </p>
          <div className="pullquote">
            Same house. Same family. Same life. The only difference is that
            everyone is finally living it instead of managing it.
          </div>
          <p className="fwd-hook">Now for the part your gut is already asking about.</p>
        </div>
      </section>

      {/* Why everything else failed */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Why everything else failed</div>
          <h2>Every solution you&rsquo;ve tried had the same flaw</h2>
          <p>
            Someone showed up, asked &ldquo;what do you want me to do?&rdquo;
            and whoever was carrying the mental load was right back to managing,
            reminding, correcting. More work, not less.
          </p>
          <p>
            The people weren&rsquo;t the problem. The missing system was.
            Without a system, no one else can access what&rsquo;s in the
            operator&rsquo;s head. So every hire becomes another person who
            depends on direction.
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
        introText="Three things have to happen for your home to run without anyone at the center of it. We do all three."
        proofQuote="[Placeholder: Client quote about the system or what changed, 1-2 sentences.]"
        proofAttr=", [First Name], [City]"
        footerNote="Your house manager can also serve as a nanny, housekeeper, or combination, tailored to your family's needs."
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
            <a href="/partner/for-her" className="partner-btn">
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
