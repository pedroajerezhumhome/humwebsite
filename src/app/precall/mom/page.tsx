import type { Metadata } from "next";
import Hero from "@/components/precall/Hero";
import ProductShowcase from "@/components/precall/ProductShowcase";
import CostCalculator from "@/components/CostCalculator";
import PrecallFooter from "@/components/precall/PrecallFooter";
import FAQ from "@/components/precall/FAQ";
import ScrollReveal from "@/components/precall/ScrollReveal";
import ScrollProgress from "@/components/precall/ScrollProgress";
import HelloBar from "@/components/precall/HelloBar";
import "../precall.css";
import "@/app/calculator/calculator.css";

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
      <HelloBar />

      <div className="precall-logo">
        <img src="/hum-logo.png" alt="HUM" />
      </div>

      <Hero
        headline="You just took the first step toward getting your life back"
        subtitle="Everything you need to know before your call. Five&nbsp;minutes. No&nbsp;pressure on the call, either."
        trustText='Trusted by <strong>200+ families</strong> across Austin, San Francisco, and beyond. Backed by a 90-day guarantee.'
      />

      <p className="urgency-nudge rv">
        Families who read this before their call tell us the conversation goes deeper.
        Five minutes now saves you thirty on the phone.
      </p>

      {/* Page navigation */}
      <nav className="page-nav rv">
        <div className="page-nav-label">Jump to what matters most</div>
        <div className="page-nav-links">
          <a href="#how-it-works" className="page-nav-link">How it works</a>
          <a href="#how-we-find-them" className="page-nav-link">How we vet</a>
          <a href="#what-they-handle" className="page-nav-link">What they handle</a>
          <a href="#timeline" className="page-nav-link">Timeline</a>
          <a href="#if-they-leave" className="page-nav-link">If they leave</a>
          <a href="#the-investment" className="page-nav-link">The investment</a>
          <a href="#the-roi" className="page-nav-link">The real ROI</a>
          <a href="#more-questions" className="page-nav-link">More questions</a>
        </div>
      </nav>

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

          <p className="fwd-hook">This is what you decided to change.</p>
        </div>
      </section>

      {/* Cost of staying here */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">Why the timing is right</div>
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
        </div>
      </section>

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

      {/* After picture */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">What changes first</div>
          <h2>The morning you haven&rsquo;t had in years</h2>
          <p>
            You wake up and the house is already running. The lunches are made.
            The errands are in motion &mdash; not because you remembered them,
            but because someone else did. You sit down with your coffee. Your
            morning is yours.
          </p>
          <p>
            The electrician comes and you don&rsquo;t know about it until
            it&rsquo;s done. The pantry is stocked. The returns got dropped off.
            You pick up your kids and you&rsquo;re actually present. Not
            distracted. Just there.
          </p>
          <p>
            Your daughter asks &ldquo;Can we bake cookies?&rdquo; and you say
            yes. Not because you found the time. Because the time was already
            there. Your partner says &ldquo;What should we do this weekend?&rdquo;
            and neither of you means chores.
          </p>
          <p>
            Saturday morning pancakes. A spontaneous trip to the park.
            You catch yourself laughing at the dinner table &mdash; actually
            laughing &mdash; because you&rsquo;re not running tomorrow&rsquo;s
            audit in your head. The weekend comes and it feels like a weekend.
            Not a catchup day. A day with your family where nobody is managing
            anything.
          </p>
          <div className="pullquote">
            Same house. Same family. Same life. The only difference is that
            you&rsquo;re finally in it instead of managing it.
          </div>
          <p className="fwd-hook">And if part of you is still wondering whether this time is different &mdash; that&rsquo;s worth reading too.</p>
        </div>
      </section>

      {/* Why everything else failed */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">What makes this different</div>
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
          <p>That&rsquo;s what HUM builds. Here&rsquo;s a preview of how it works.</p>
        </div>
      </section>

      <div id="how-it-works" />
      <ProductShowcase
        label="What we'll build for you"
        heading="The Three Parts of Your System"
        introText="So you have context for the call — here's what HUM actually sets up for your family."
        footerNote="Your house manager can also serve as a nanny, housekeeper, or combination, depending on what your family needs. We'll tailor the role on your call."
      />

      {/* Home OS deep dive — turnover protection */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">Why the Home OS matters most</div>
          <h2>The part most families don&rsquo;t expect to be the most valuable</h2>
          <p>
            Here&rsquo;s something no one talks about: it&rsquo;s not a question of
            <em>if</em> your house manager will eventually move on. It&rsquo;s a question
            of <em>when</em>. Even great house managers leave &mdash; for family reasons,
            relocation, career changes. It happens in every position.
          </p>
          <p>
            Without a system, that means starting from scratch. Re-explaining every routine.
            Re-training every preference. Standing over someone&rsquo;s shoulder for weeks
            while your life goes back to chaos.
          </p>
          <p>
            The Home Operating System changes that equation completely. Everything about how
            your home runs is documented, organized, and accessible &mdash; with visual
            playbooks showing exactly how the pantry looks when stocked, how the kitchen gets
            reset, what the daily and weekly routines look like. When a new house manager steps
            in, they have full context from day one. No re-training. No lost momentum.
          </p>
          <div className="pullquote">
            You don&rsquo;t build any of this yourself. We extract it from you through the
            onboarding process. Before you even realize it, we&rsquo;re turning what&rsquo;s
            trapped in your head into a system that runs without you.
          </div>
          <p>
            And once it&rsquo;s built, there&rsquo;s an AI co-pilot inside it. Your house
            manager can ask &ldquo;Where do the soccer cleats go?&rdquo; or &ldquo;Which
            vendor does the family use for pest control?&rdquo; and get an answer instantly
            &mdash; without texting you. The knowledge isn&rsquo;t trapped in your head
            anymore. It&rsquo;s in the system.
          </p>
        </div>
      </section>

      {/* Vetting deep dive */}
      <section id="how-we-find-them" className="sect dark rv">
        <div className="narrow">
          <div className="label">How we find your person</div>
          <h2>This person will be in your home, around your children. We take that seriously.</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-soft)", marginBottom: 8 }}>
            Our founding team spent seven years running one of the top executive placement
            firms in the country. The vetting methodology, the scoring system, the background
            check protocol &mdash; all refined over thousands of placements before we brought
            it to households.
          </p>
          <p>
            Every candidate is measured against three non-negotiables:
          </p>
          <div className="vetting-pillars">
            <div className="vetting-pillar rv rv-d1">
              <h3>Proven experience</h3>
              <p>
                Candidates who have done this job for multiple families, or high performers
                with strong transferable experience. We verify their track record with previous
                families and employers.
              </p>
            </div>
            <div className="vetting-pillar rv rv-d2">
              <h3>Values alignment</h3>
              <p>
                When your house manager walks in, you should feel like that person naturally
                belongs there. The energy shouldn&rsquo;t feel off. This is someone in your
                most private space, around your children, embedded in your daily life.
              </p>
            </div>
            <div className="vetting-pillar rv rv-d3">
              <h3>Safety</h3>
              <p>
                An eight-point background check covering county, state, federal, and national
                criminal searches, sex offender registry, global watchlist screening, SSN
                identity trace, and motor vehicle report. The most comprehensive check available.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 28 }}>
            We go through hundreds of applicants every day. Before our team ever looks at a
            candidate, an AI agent trained on what makes an incredible house manager scores them
            from 0&ndash;10. Only 9+ continue. That scoring happens at every stage.
          </p>
          <p>
            You only meet pre-vetted finalists on a short call. You choose who to invite for a
            trial day, then a trial week. You decide based on a lived experience of what it&rsquo;s
            like to be supported by this person &mdash; not a résumé.
          </p>
          <div className="pullquote">
            Candidates don&rsquo;t learn your address until after you&rsquo;ve met them.
            You never commit to someone without seeing them in action first.
          </div>
        </div>
      </section>

      {/* What your house manager handles — Q5 + Q3 */}
      <section id="what-they-handle" className="sect rv">
        <div className="narrow">
          <div className="q-callout">Families ask: &ldquo;What does a house manager actually do?&rdquo;</div>
          <div className="label">The role</div>
          <h2>Everything that&rsquo;s currently living in your head</h2>
          <p>
            Your house manager isn&rsquo;t another person to manage. They&rsquo;re
            a trained professional running your Home&nbsp;OS across every category
            of your household:
          </p>
          <div className="scope-grid">
            <span>Daily home resets</span>
            <span>Cleaning &amp; laundry</span>
            <span>Cooking &amp; meal prep</span>
            <span>Grocery &amp; restocking</span>
            <span>Childcare support</span>
            <span>Pet care</span>
            <span>Errands &amp; returns</span>
            <span>Organization &amp; decluttering</span>
            <span>Home maintenance</span>
            <span>Vehicle care</span>
            <span>Outdoor &amp; yard care</span>
            <span>Mail &amp; packages</span>
            <span>Calendar &amp; scheduling</span>
            <span>Gift management</span>
            <span>Guest management</span>
            <span>Travel management</span>
            <span>Seasonal transitions</span>
            <span>Technology management</span>
          </div>
          <p style={{ marginTop: 28 }}>
            Already have a cleaner? They skip housekeeping and focus on
            management. Have a nanny? They become the backup and handle
            everything the nanny doesn&rsquo;t. The role molds to what your
            family actually needs. We&rsquo;ll tailor it on your call.
          </p>
          <div className="pullquote">
            Most families start at 20&nbsp;hours a week &mdash; the threshold
            where you actually feel the difference. You can scale up anytime,
            flex seasonally, and at 40&nbsp;hours your household runs itself
            completely.
          </div>
        </div>
      </section>

      {/* Journey — Q4 timeline */}
      <section id="timeline" className="sect dark2 rv">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="q-callout light">Families ask: &ldquo;How long does it take to find someone?&rdquo;</div>
          <div className="label">
            What happens after your call
          </div>
          <h2>From First Call to Autopilot</h2>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 480,
              margin: "0 auto 12px",
            }}
          >
            So you know the full timeline. Most families are fully set up within 30 to 60 days.
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
                Nine-stage vetting with AI scoring. You meet finalists. Trial day, then trial week.
              </p>
            </div>
            <div className="j-step">
              <div className="j-dot" />
              <h3>Onboard + Support</h3>
              <p>
                30 days of weekly check-ins. About 2&nbsp;hours of your time total.
              </p>
            </div>
            <div className="j-step">
              <div className="j-dot" />
              <h3>Autopilot</h3>
              <p>Your home runs. You live.</p>
            </div>
          </div>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              maxWidth: 540,
              margin: "28px auto 0",
              lineHeight: 1.7,
            }}
          >
            Our target is 30&nbsp;days from call to placed. While we&rsquo;re
            recruiting, we build your Home&nbsp;OS in parallel &mdash; so
            you&rsquo;re getting value immediately, not waiting idle. Day one
            doesn&rsquo;t feel like day one &mdash; your house manager walks in
            knowing your schedules, preferences, and standards before they touch
            anything. Outside the kickoff call, expect about two&nbsp;hours of your
            time over the first month. We do the heavy lifting.
          </p>
        </div>
      </section>

      {/* Ongoing support — after onboarding */}
      <section className="sect rv">
        <div className="narrow">
          <div className="label">After the first 30 days</div>
          <h2>We don&rsquo;t disappear after onboarding</h2>
          <p>
            After the 30-day onboarding period, HUM continues to handle
            everything on the employment side &mdash; payroll, taxes,
            workers&rsquo;&nbsp;comp, and general liability insurance. You pay
            HUM, we pay your house manager. You don&rsquo;t deal with any of it.
          </p>
          <p>
            Need help updating your Home&nbsp;OS? Have a question about the role?
            We&rsquo;re available on an ad&nbsp;hoc basis whenever you need us.
            And we continue building tools that help your house manager grow in
            the role &mdash; so they keep getting better at anticipating what
            your family needs before you think of it.
          </p>
          <div className="pullquote">
            The relationship doesn&rsquo;t end at placement. Compliance is
            handled, the system keeps evolving, and we&rsquo;re a message away
            when you need us.
          </div>
        </div>
      </section>

      {/* Replacement guarantee — #1 objection killer */}
      <section id="if-they-leave" className="sect rv">
        <div className="narrow" style={{ textAlign: "center" }}>
          <div className="q-callout">Families ask: &ldquo;What happens if my house manager leaves?&rdquo;</div>
          <div className="label">Built-in protection</div>
          <h2>What happens if your house manager leaves</h2>
          <p style={{ color: "var(--text-soft)" }}>
            We replace them. At no additional cost. No re-placement fee, no new
            setup charge &mdash; whether it&rsquo;s six months or six years from
            now. Your Home OS already has everything documented, so your new
            house manager steps in with full context from day one. You&rsquo;re
            not starting over. The system protects you.
          </p>
          <div className="guarantee-badges">
            <div className="g-badge">
              <span className="g-badge-icon">&infin;</span>
              <span className="g-badge-text">Unlimited replacements</span>
            </div>
            <div className="g-badge">
              <span className="g-badge-icon">$0</span>
              <span className="g-badge-text">No re-placement fees</span>
            </div>
            <div className="g-badge">
              <span className="g-badge-icon">&#10003;</span>
              <span className="g-badge-text">Home OS protects continuity</span>
            </div>
          </div>
        </div>
      </section>


      {/* Retention — why they stay */}
      <section className="sect dark rv">
        <div className="narrow">
          <div className="label">Why they stay</div>
          <h2>The #1 reason house managers leave any position? Part-time work.</h2>
          <p>
            When someone is working 20&nbsp;hours for one family, they&rsquo;re
            always one full-time offer away from leaving. That&rsquo;s the
            reality of this role across the entire industry &mdash; and it&rsquo;s
            the single biggest retention risk.
          </p>
          <p>
            HUM solves this structurally. When your house manager has availability
            beyond your hours, we place them with a second family nearby &mdash;
            securing full-time work for them without adding anything to your plate.
            They&rsquo;re not looking elsewhere because their income is already whole.
          </p>
          <p>
            That&rsquo;s one of the advantages of working with a company versus
            hiring on your own. We can coordinate across families, solve the
            part-time problem, and keep your person in place long-term.
          </p>
          <div className="pullquote">
            The Home&nbsp;OS gives them clarity. The onboarding builds a real
            relationship with your family. And the full-time income means
            they&rsquo;re not one job posting away from leaving. Retention
            isn&rsquo;t luck &mdash; it&rsquo;s structure.
          </div>
        </div>
      </section>

      {/* Joy interlude — the point of all of this */}
      <section className="sect warm rv">
        <div className="narrow" style={{ textAlign: "center" }}>
          <p className="joy-interlude">
            All of that &mdash; the system, the vetting, the guarantees, the
            structure &mdash; exists so that on a random Tuesday night, you&rsquo;re
            not thinking about any of it. You&rsquo;re on the couch. The house is
            quiet. Dinner happened. The kids are asleep. And you&rsquo;re just&hellip;
            there. Not planning. Not catching up. Just there.
          </p>
        </div>
      </section>

      {/* The investment — Q1 pricing */}
      <section id="the-investment" className="sect dark2 rv">
        <div className="narrow">
          <div className="q-callout light">Families ask: &ldquo;How much does this actually cost?&rdquo;</div>
          <div className="label" style={{ textAlign: "center" }}>The investment</div>
          <h2 style={{ textAlign: "center" }}>Two parts, fully transparent</h2>
          <div className="pricing-frame">
            <div className="pricing-part">
              <div className="pricing-part-label">One-time setup</div>
              <div className="pricing-part-range">$6,000 &ndash; $10,000</div>
              <p>
                Covers recruiting and vetting your house manager, building your
                Home&nbsp;OS, 30&nbsp;days of onboarding and training, and
                lifetime access to the AI&nbsp;co-pilot. You own everything
                we build. This isn&rsquo;t a fee &mdash; it&rsquo;s the
                infrastructure that makes the whole system work.
              </p>
            </div>
            <div className="pricing-part">
              <div className="pricing-part-label">Ongoing</div>
              <div className="pricing-part-range">Flat hourly rate</div>
              <p>
                Fully inclusive &mdash; payroll, employer-on-record, workers&rsquo;&nbsp;comp,
                and general liability are all built in. No hidden fees. No
                monthly platform charges. You pay for the hours your house
                manager works, and everything else is covered.
              </p>
            </div>
          </div>
          <div className="employment-detail rv">
            <h3>Employment is fully handled &mdash; W-2, not 1099</h3>
            <p>
              Your house manager is employed through our employer-on-record
              structure. Payroll, workers&rsquo;&nbsp;comp, general liability,
              and tax compliance are all managed by&nbsp;us. You don&rsquo;t
              file anything, manage benefits paperwork, or deal with employment
              law. The flat hourly rate covers everything.
            </p>
          </div>
          <div style={{ marginTop: 40 }}>
            <CostCalculator embedded />
          </div>
        </div>
      </section>

      {/* What families didn't expect — experiential ROI */}
      <section id="the-roi" className="sect rv">
        <div className="narrow">
          <div className="q-callout">Families ask: &ldquo;Is it actually worth it?&rdquo;</div>
          <div className="label">What families tell us they didn&rsquo;t expect</div>
          <h2>The part no one sees coming</h2>
          <p>
            The calculator shows you the financial math. But when we check in
            with families a few months in, the money is never what they talk
            about. It&rsquo;s the stuff they didn&rsquo;t know they were
            missing:
          </p>
          <div className="roi-grid">
            <div className="roi-item rv rv-d1">
              <h3>&ldquo;We actually cook together now&rdquo;</h3>
              <p>
                Groceries ordered, meals prepped, kitchen ready. Families
                routinely cut $800&ndash;$1,200/month in delivery and takeout
                they didn&rsquo;t realize they were spending. But the real
                shift is dinner becomes something you enjoy again.
              </p>
            </div>
            <div className="roi-item rv rv-d2">
              <h3>&ldquo;Saturday feels like Saturday again&rdquo;</h3>
              <p>
                No errands, no deep cleaning, no &ldquo;we should really
                organize the garage.&rdquo; The house ran all week. Saturday
                morning pancakes happen. Spontaneous trips to the park happen.
                The weekend is actually free.
              </p>
            </div>
            <div className="roi-item rv rv-d3">
              <h3>&ldquo;I&rsquo;m not two places at once anymore&rdquo;</h3>
              <p>
                At work, you&rsquo;re not thinking about the plumber. At
                home, you&rsquo;re not thinking about tomorrow&rsquo;s list.
                That split-brain feeling &mdash; half here, half somewhere
                else &mdash; it just goes away.
              </p>
            </div>
            <div className="roi-item rv rv-d4">
              <h3>&ldquo;We talk about things that aren&rsquo;t logistics&rdquo;</h3>
              <p>
                No more &ldquo;Did you call the electrician?&rdquo; or
                &ldquo;Can you grab milk?&rdquo; When the household runs
                itself, you find out your partner is actually pretty fun to
                be around.
              </p>
            </div>
            <div className="roi-item rv rv-d1">
              <h3>&ldquo;I go to the gym again&rdquo;</h3>
              <p>
                The first thing that got cut when life got heavy. Most
                families say it comes back within the first month. Not
                because they found the time &mdash; because the time was
                already there.
              </p>
            </div>
            <div className="roi-item rv rv-d2">
              <h3>&ldquo;She knew before I did&rdquo;</h3>
              <p>
                Month one feels like relief. Month three feels like ease.
                By month six, your house manager is anticipating what you
                need before you think of it. The system gets smarter. The
                home gets lighter.
              </p>
            </div>
          </div>
          <div className="pullquote" style={{ marginTop: 40 }}>
            The families who hesitate on the cost are usually the ones who,
            three months later, say they should have done it years ago.
          </div>
        </div>
      </section>

      {/* More questions — Tier 3 */}
      <section id="more-questions" className="sect dark rv">
        <div className="narrow">
          <div className="label" style={{ textAlign: "center" }}>Still have questions?</div>
          <h2 style={{ textAlign: "center" }}>Other things families ask</h2>
          <p style={{ textAlign: "center", color: "var(--text-soft)", marginBottom: 36 }}>
            Everything above covers the big picture. Here are the practical details families want to know.
          </p>
          <FAQ />
        </div>
      </section>

      {/* Closing */}
      <section className="close-sect rv">
        <div className="narrow">
          <h2>You already booked the call</h2>
          <p>
            Here&rsquo;s what happens next: a 30-minute conversation with
            someone who genuinely wants to understand your family. What&rsquo;s
            not working, what you&rsquo;ve already tried, and what it would
            look like if your home just&hellip; ran. No pitch. No pressure.
            If HUM isn&rsquo;t the right fit, we&rsquo;ll tell you. And if
            you have more questions, we&rsquo;ll stay on as long as you need.
          </p>
          <p>
            What we hear from families is that the call itself feels different.
            Not like a sales conversation. More like talking to someone who
            actually gets it &mdash; the weight, the invisible work, the
            guilt about wanting help. And for the first time, feeling like
            someone is offering a real solution instead of another band-aid.
          </p>
          <div className="partner-callout">
            <h3>Bring your partner if you can</h3>
            <p>
              The families that move fastest are the ones where both decision-makers
              hear it firsthand. If your partner can&rsquo;t make it, that&rsquo;s
              fine &mdash; we&rsquo;ll give you everything you need to have that
              conversation at home. But if they can join, even for part of the call,
              it saves weeks and means you&rsquo;re both on the same page from the start.
            </p>
          </div>
          <p>
            You&rsquo;ve been carrying this for a long time. You booked this
            call because something told you it was time to stop. Trust that.
            The life you&rsquo;ve been reading about on this page &mdash; it
            starts with this conversation.
          </p>
          <p className="signoff">We&rsquo;ll see you there.</p>
        </div>
      </section>

      <PrecallFooter />
    </div>
  );
}
