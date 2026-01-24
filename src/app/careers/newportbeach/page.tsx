// Careers Newport Beach (/careers/newportbeach)
"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showNav, setShowNav] = useState(false);

  const faqs = [
    {
      question: "Do I need professional experience?",
      answer: "No. We hire two types of people: those with professional household/hospitality experience, and those who've been running their own homes with intention. If you can describe a system you've created that keeps things running, you're qualified."
    },
    {
      question: "How does matching work?",
      answer: "You'll do two interviews with our team first. If you pass, you'll interview with a family we think is a good fit. Then we run thorough background checks and reference calls. If everything clears, you'll do a trial day, then a trial week. Both you and the family share feedback, and if it's a match, an offer is made. If you have anything concerning in your background or references, this process won't be the right fit."
    },
    {
      question: "What does the pay range depend on?",
      answer: "$25–$45/hr depends on experience, scope of the role, and hours. We'll discuss specifics once we understand your situation and match you with a family."
    },
    {
      question: "What are the hours like?",
      answer: "Minimum 20 hours/week, up to 40. Families have preferences for when they want someone, so your schedule needs to work for both sides."
    },
    {
      question: "Is this a W-2 job or contract work?",
      answer: "It can be either. It depends on the state you're hired in. Every state has different requirements."
    },
    {
      question: "What happens if the fit isn't right?",
      answer: "HUM stays involved. If something isn't working, we'll help mediate or find you a better match. You're not on your own."
    },
    {
      question: "What training or support do I get?",
      answer: "Every home comes with a 'Home Operating System' playbook. You also get an AI copilot for quick answers, personal onboarding onto the home, access to a house manager community where you'll learn best practices from peers, and regular calls to train you on the latest skills."
    },
    {
      question: "Do I need my own car?",
      answer: "Ideally, yes, for errands. Gas is covered."
    },
    {
      question: "What does the background check involve?",
      answer: "We run a full background check: criminal, sexual harassment, identity, and employment. If we can check it, we check it. For everyone's safety."
    },
    {
      question: "How long is the commitment?",
      answer: "We're looking to place people long-term. Ideally at least a year, but if you're happy, much longer. We want people who see this as a career, not just a gig. The families want stability."
    }
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fefdfb] text-[#454545] overflow-x-hidden">
      <style jsx global>{`
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up-delay-1 { transition-delay: 0.1s; }
        .fade-up-delay-2 { transition-delay: 0.2s; }
        .fade-up-delay-3 { transition-delay: 0.3s; }
        .fade-up-delay-4 { transition-delay: 0.4s; }
      `}</style>

      {/* Static Logo (visible before scroll) */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-opacity duration-300 ${showNav ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <img src="/hum-logo.png" alt="HUM" className="h-6 sm:h-8 w-auto" />
        </div>
      </div>

      {/* Navigation (appears on scroll) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#fefdfb]/90 backdrop-blur-md transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <img src="/hum-logo.png" alt="HUM" className="h-4 sm:h-5 w-auto" />
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setFaqOpen(true)}
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-[9px] sm:text-[10px] text-[#666] hover:text-[#323B46] border border-[#e0e0e0] rounded-full transition-colors uppercase"
            >
              FAQ
            </button>
            <a
              href="#apply"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-[9px] sm:text-[10px] text-white bg-[#1a1a1a] hover:bg-black rounded-full transition-colors uppercase"
            >
              Apply
            </a>
          </div>
        </div>
      </nav>

      {/* FAQ Modal */}
      {faqOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFaqOpen(false)} />
          <div className="relative bg-[#fefdfb] rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            <button
              onClick={() => setFaqOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#999] hover:text-[#323B46] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#323B46] mb-4 sm:mb-6 text-center">FAQ</h2>
            <div className="space-y-2 sm:space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#f5f5f5] rounded-xl sm:rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 font-medium text-[#323B46] text-sm sm:text-base flex items-center justify-between"
                  >
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform flex-shrink-0 ml-2 ${expandedFaq === i ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 sm:px-5 pb-3 sm:pb-4 text-sm sm:text-base text-[#666]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-up inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white rounded-full border border-[#eee] mb-6 sm:mb-10 shadow-sm">
            <span className="w-2 h-2 bg-[#a67c64] rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-[#666]">Newport Beach · Actively Interviewing</span>
          </div>

          <h1 className="fade-up fade-up-delay-1 text-[26px] sm:text-[56px] md:text-[72px] font-semibold leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6">
            If You&apos;re the One Everyone Relies On, There&apos;s a Family Ready to Pay You for It
          </h1>

          <p className="fade-up fade-up-delay-2 text-sm sm:text-xl md:text-2xl leading-relaxed text-[#454545] mb-6 sm:mb-12 max-w-2xl mx-auto">
            Finally. Above-market rates. Flexible schedule. Long-term career. Families vetted for mutual fit.
          </p>

          <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <a
              href="#apply"
              className="group px-6 sm:px-10 py-3.5 sm:py-5 bg-[#454545] text-white text-sm sm:text-lg font-medium rounded-full hover:bg-[#323B46] transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
            >
              See If It&apos;s a Fit
              <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#is-this-you"
              className="px-6 sm:px-10 py-3.5 sm:py-5 text-sm sm:text-lg font-medium text-[#454545] border border-[#ddd] rounded-full hover:border-[#bbb] hover:bg-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

      </section>

      {/* Is This You? Section */}
      <section id="is-this-you" className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="fade-up text-xs uppercase tracking-widest text-[#a67c64] mb-3 sm:mb-6">
              Is This You?
            </p>
            <h2 className="fade-up fade-up-delay-1 text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.15] sm:leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Two paths lead here
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-16 text-center max-w-3xl mx-auto">
            {/* You've Done This Before */}
            <div className="fade-up fade-up-delay-2">
              <svg className="w-10 h-10 mx-auto mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17l2 2 4-4" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                You&apos;ve Done This Before
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                You&apos;ve done the work. You want a role that respects it.
              </p>
            </div>

            {/* You've Never Been Paid for This */}
            <div className="fade-up fade-up-delay-3">
              <svg className="w-10 h-10 mx-auto mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                You&apos;ve Never Been Paid for This
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                You&apos;ve run your home like a pro for years. Now get paid for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* You Are Section */}
      <section className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-[#fefdfb]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="fade-up text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.15] sm:leading-[1.1] tracking-[-0.02em] mb-3 sm:mb-6 max-w-3xl mx-auto">
              We know you
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-16 text-center max-w-4xl mx-auto">
            <div className="fade-up fade-up-delay-2">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                You&apos;re proactive
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                You fix problems before anyone has to ask.
              </p>
            </div>

            <div className="fade-up fade-up-delay-3">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <circle cx="12" cy="5" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v14m0 0c-4 0-7-2-7-5m7 5c4 0 7-2 7-5M5 12h2m10 0h2" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                You&apos;re reliable
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                No micromanaging needed. It&apos;s handled.
              </p>
            </div>

            <div className="fade-up fade-up-delay-4">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                You hold standards
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Discretion. Hotel-level standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Responsibilities */}
      <section className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-[#fefdfb] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left column - Illustration and Compensation */}
            <div className="fade-up order-2 lg:order-1">
              {/* House Manager Illustration */}
              <div className="mb-8 sm:mb-12">
                <img
                  src="/house-manager.svg"
                  alt="House manager illustration"
                  className="w-full max-w-sm mx-auto"
                />
              </div>

              <div className="relative lg:sticky lg:top-32">
                {/* Layered cards representing organization - hidden on mobile to prevent overflow */}
                <div className="hidden sm:block absolute top-8 left-8 w-full h-64 bg-gradient-to-br from-stone-100 to-stone-50 rounded-3xl"></div>
                <div className="hidden sm:block absolute top-4 left-4 w-full h-64 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl"></div>
                <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 border border-[#eee]">
                  <div className="mb-6 sm:mb-8">
                    <p className="text-xs uppercase tracking-widest text-[#a67c64] mb-2">What You Get</p>
                    <p className="text-3xl font-bold text-[#454545]">$25–$45<span className="text-base sm:text-xl font-medium text-[#888]">/hr</span></p>
                    <p className="text-base sm:text-xl text-[#666] mt-1">Skilled work, fair pay.</p>
                  </div>
                  <div className="space-y-4 sm:space-y-5">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#a67c64] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-base sm:text-xl font-medium text-[#323B46]">Flexible hours</p>
                        <p className="text-base sm:text-xl text-[#666]">Built around your schedule.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#a67c64] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-base sm:text-xl font-medium text-[#323B46]">A family that sees you</p>
                        <p className="text-base sm:text-xl text-[#666]">Essential, not invisible.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#a67c64] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-base sm:text-xl font-medium text-[#323B46]">HUM in your corner</p>
                        <p className="text-base sm:text-xl text-[#666]">Training, community, backup.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#a67c64] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-base sm:text-xl font-medium text-[#323B46]">A career, not a gig</p>
                        <p className="text-base sm:text-xl text-[#666]">1 year minimum.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="fade-up text-xs uppercase tracking-widest text-[#a67c64] mb-4 sm:mb-6 text-center lg:text-left">
                The Role
              </p>
              <h2 className="fade-up fade-up-delay-1 text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.1] tracking-tight mb-4 sm:mb-6 text-center lg:text-left">
                Your days
              </h2>
              <p className="fade-up fade-up-delay-2 text-base sm:text-xl text-[#666] leading-relaxed mb-8 sm:mb-12 text-center lg:text-left">
                What you do depends on the family.
              </p>

              <div className="space-y-2 sm:space-y-4">
                {[
                  { num: "01", title: "Daily Reset", desc: "Kitchen, common areas, bedrooms" },
                  { num: "02", title: "Laundry Management", desc: "Wash, fold, put away" },
                  { num: "03", title: "Organization Maintenance", desc: "Maintain and improve existing systems" },
                  { num: "04", title: "Restocking & Inventory", desc: "Pantry, fridge, supplies" },
                  { num: "05", title: "Errands", desc: "Groceries, pickups" },
                  { num: "06", title: "Meal Prep", desc: "Breakfast, lunch, dinner, kids' meals" },
                  { num: "07", title: "School Runs", desc: "Pick-ups, drop-offs, packing bags" },
                  { num: "08", title: "Vendor Coordination", desc: "Cleaners, repairs, services" },
                  { num: "09", title: "Vehicle Support", desc: "Wash, fuel, oil changes" },
                  { num: "10", title: "Light Pet Support", desc: "Dogs out/in, feeding, basics" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`fade-up fade-up-delay-${Math.min(i % 4 + 1, 4)} group flex items-start gap-3 sm:gap-5 p-3 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-[#f7f7f7] transition-all duration-300`}
                  >
                    <span className="text-base sm:text-xl font-mono text-amber-500 mt-1">{item.num}</span>
                    <div>
                      <h4 className="font-medium text-[#323B46] mb-0.5 sm:mb-1 text-base sm:text-xl">{item.title}</h4>
                      <p className="text-[#666] text-base sm:text-xl">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Families */}
      <section className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="fade-up text-xs uppercase tracking-widest text-[#a67c64] mb-3 sm:mb-6">
              Who You'll Work For
            </p>
            <h2 className="fade-up fade-up-delay-1 text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6">
              The families
            </h2>
            <p className="fade-up fade-up-delay-2 text-sm sm:text-xl md:text-2xl text-[#666] max-w-2xl mx-auto">
              Here&apos;s what we require from every family.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-16 text-center max-w-4xl mx-auto">
            <div className="fade-up fade-up-delay-2">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                They treat you like a professional
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Fair pay. Clear boundaries. No midnight texts.
              </p>
            </div>

            <div className="fade-up fade-up-delay-3">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                They communicate and appreciate
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Clear expectations. Open feedback. You&apos;re essential, not invisible.
              </p>
            </div>

            <div className="fade-up fade-up-delay-4">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                They&apos;re vetted too
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Background checked. Trial period before either side commits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Fit */}
      <section className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-[#fefdfb]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="fade-up text-xs uppercase tracking-widest text-[#a67c64] mb-3 sm:mb-6">
              Experience & Fit
            </p>
            <h2 className="fade-up fade-up-delay-1 text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.15] sm:leading-[1.1] tracking-tight">
              Who thrives here
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 sm:gap-5">
            {[
              { main: "Long-term mindset", sub: "1 year minimum" },
              { main: "Home, hospitality, or household experience", sub: "" },
              { main: "Comfortable around kids", sub: "" },
              { main: "No food restrictions", sub: "" },
              { main: "High energy", sub: "Mornings don't scare you." },
              { main: "Comfortable in a multi-ethnic household", sub: "" },
              { main: "US work authorization", sub: "" },
            ].map((item, i) => (
              <div
                key={i}
                className={`fade-up fade-up-delay-${Math.min(i % 4 + 1, 4)} flex items-start gap-2 sm:gap-4 p-3 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-[#eee] hover:shadow-lg hover:border-[#ccc] transition-all duration-300`}
              >
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#454545] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-xl font-medium text-[#323B46]">{item.main}</p>
                  {item.sub && <p className="text-xs sm:text-xl text-[#666]">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HUM Has Your Back */}
      <section className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="fade-up text-xs uppercase tracking-widest text-[#a67c64] mb-3 sm:mb-6">
              Why HUM
            </p>
            <h2 className="fade-up fade-up-delay-1 text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6">
              You&apos;re not alone
            </h2>
            <p className="fade-up fade-up-delay-2 text-sm sm:text-xl md:text-2xl text-[#666] max-w-2xl mx-auto">
              We don&apos;t disappear after we place you.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-16 text-center max-w-4xl mx-auto">
            <div className="fade-up fade-up-delay-2">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                A playbook for every home
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Every family has a Home Operating System. No guessing.
              </p>
            </div>

            <div className="fade-up fade-up-delay-3">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                AI copilot at your fingertips
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Forgot something? Our AI copilot gives instant answers.
              </p>
            </div>

            <div className="fade-up fade-up-delay-4">
              <svg className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-3 sm:mb-4 text-[#a67c64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#323B46] mb-2 sm:mb-3">
                We&apos;re in your corner
              </h3>
              <p className="text-sm sm:text-xl text-[#666] leading-relaxed">
                Training, community, ongoing support. Your success is our success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0 bg-[#fefdfb] relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="fade-up text-[30px] sm:text-[44px] md:text-[56px] font-semibold leading-[1.15] tracking-tight mb-6 sm:mb-12 text-[#454545]">
            The right family is out there.<br />
            <span className="text-[#a67c64]">And they&apos;re looking for exactly what you do.</span>
          </h2>
          <a
            href="#apply"
            className="fade-up fade-up-delay-1 inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-12 py-3.5 sm:py-6 bg-[#454545] text-white text-sm sm:text-lg font-semibold rounded-full hover:bg-[#323B46] transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            Apply Now
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#fefdfb]">
        <div className="max-w-4xl mx-auto">
          {/* Application Header */}
          <div className="fade-up text-center mb-8 sm:mb-12">
            <p className="text-xs uppercase tracking-widest text-[#a67c64] mb-3 sm:mb-4">
              Apply Now
            </p>
            <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight mb-3 sm:mb-4">
              Ready?
            </h2>
            <p className="text-sm sm:text-xl text-[#666] max-w-xl mx-auto">
              We&apos;ll ask about your experience and how you keep things running.
            </p>
          </div>

          {/* What Happens Next - 3 Step Process */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-stone-100 flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-base sm:text-xl font-bold text-[#666]">1</span>
                </div>
                <p className="text-sm sm:text-xl font-medium text-[#323B46]">Apply</p>
                <p className="text-xs sm:text-xl text-[#666]">5 min form</p>
              </div>

              {/* Arrow */}
              <svg className="hidden sm:block w-8 h-8 text-[#ccc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <svg className="sm:hidden w-5 h-5 text-[#ccc] rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-stone-100 flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-base sm:text-xl font-bold text-[#666]">2</span>
                </div>
                <p className="text-sm sm:text-xl font-medium text-[#323B46]">Interview</p>
                <p className="text-xs sm:text-xl text-[#666]">Meet HUM team</p>
              </div>

              {/* Arrow */}
              <svg className="hidden sm:block w-8 h-8 text-[#ccc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <svg className="sm:hidden w-5 h-5 text-[#ccc] rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-stone-100 flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-base sm:text-xl font-bold text-[#666]">3</span>
                </div>
                <p className="text-sm sm:text-xl font-medium text-[#323B46]">Match</p>
                <p className="text-xs sm:text-xl text-[#666]">Find your family</p>
              </div>
            </div>
            <p className="text-center text-xs sm:text-xl text-[#888] mt-4 sm:mt-6">
              If you&apos;re a good fit, we&apos;ll reach out in most cases within 24 hours.
            </p>
          </div>

          {/* Gut Check */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 p-4 sm:p-8 bg-stone-50 rounded-xl sm:rounded-2xl border border-[#e5e5e5]">
            <p className="text-sm sm:text-xl font-medium text-[#323B46] mb-2 sm:mb-3">Note</p>
            <p className="text-sm sm:text-xl text-[#666] mb-3 sm:mb-4">
              We&apos;ll ask you to describe a system you&apos;ve built to run a home like a pro. Doesn&apos;t have to be fancy. We just want to know how you think.
            </p>
            <p className="text-xs sm:text-xl text-[#888]">
              If you can&apos;t articulate this, it&apos;s probably not the right fit.
            </p>
          </div>

          <div data-tf-live="01KFQ6R2YDRYNTNJMAEWNBC4QZ"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-[#fefdfb] text-[#454545]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <img src="/hum-logo.png" alt="HUM" className="h-5 sm:h-6 w-auto" />
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2">
              <a href="/" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Home
              </a>
              <a href="/privacy-policy" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Terms of Service
              </a>
              <a href="/disclaimer" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Disclaimer
              </a>
              <a href="/cookie-policy" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Cookie Policy
              </a>
            </div>
            <p className="text-[10px] sm:text-xs text-[#bbb]">
              © {new Date().getFullYear()} HUM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
