// Home Page (/)
"use client";

import { useState, useEffect } from "react";
import { submitToMaropost } from "../actions";

export default function Home() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [otherCity, setOtherCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load Scheduler.ai - create iframe directly for full width control
  useEffect(() => {
    const container = document.getElementById("scheduler-container");
    if (!container) return;

    // Check if iframe already exists (handles React strict mode)
    if (document.getElementById("scheduler-iframe")) return;

    const iframe = document.createElement("iframe");
    iframe.src = "https://app.scheduler.ai/book_meeting/?poolID=73b74168-a87e-4c70-a140-cb2161e112f4&embedded=true&embed=true&hideLogo=true&hide_logo=true";
    iframe.id = "scheduler-iframe";
    iframe.title = "Scheduler.ai Booking Form";
    iframe.allow = "fullscreen";
    iframe.setAttribute("scrolling", "yes");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox");
    iframe.style.cssText = "width: 900px; height: 700px; border: none; overflow: auto; display: block; background: transparent;";

    container.appendChild(iframe);
  }, []);

  const cities = [
    "Atlanta",
    "Austin",
    "Boston",
    "Charlotte",
    "Chicago",
    "Dallas",
    "Denver",
    "Houston",
    "Las Vegas",
    "Los Angeles",
    "Miami",
    "Minneapolis",
    "Nashville",
    "New York",
    "Orlando",
    "Philadelphia",
    "Phoenix",
    "Portland",
    "San Antonio",
    "San Diego",
    "San Francisco",
    "Seattle",
    "Tampa",
    "Washington D.C.",
    "Other",
  ];

  const faqs = [
    {
      question: "How much does HUM cost?",
      answer:
        "Pricing depends on your specific household needs. Your investment covers everything required to set this up correctly from day one—building your household manual, sourcing, vetting, and training your house manager. After that, you pay your house manager directly, typically $25–45/hour depending on experience and your market.",
    },
    {
      question: "What exactly does a house manager do?",
      answer:
        "Our house managers are a hybrid between a household assistant and a house manager. They handle daily operations, organization, errands, and vendor coordination—but can also take on light childcare, cooking, and more. The biggest value? Role consolidation. Instead of managing multiple people, you have one trained professional who runs it all.",
    },
    {
      question: "Where do you find your house managers?",
      answer:
        "We actively recruit experienced household professionals, personal assistants transitioning to private homes, and hospitality industry talent. We also source from an unexpected place: moms who are strong systems thinkers, run tight homes, and are looking to apply those skills in a new career.",
    },
    {
      question: "How long does it take to get started?",
      answer:
        "Typically 30–90 days from when you decide to move forward to your house manager's first day. This timeframe covers building your manual, sourcing and vetting candidates, and training. Timing is also subject to our availability—we're in high demand and capacity varies.",
    },
    {
      question: "Am I the employer, or is HUM?",
      answer:
        "You are. Your house manager works for your household directly. Most clients set them up as a W-2 employee using a payroll service (we can recommend options). Some use 1099 arrangements depending on structure and hours. We'll walk you through the best setup for your situation.",
    },
    {
      question: "What if my house manager doesn't work out?",
      answer:
        "We repair before we replace—often issues are system problems, not people problems. If it's truly not a fit, we find a replacement at no additional cost.",
    },
    {
      question: "What systems will we use?",
      answer:
        "Your household runs on HomeOS, our custom software with an AI co-pilot built in. It's built around a complete directory of your home with custom playbooks for every area. Your house manager uses it daily to know exactly what needs to happen when they walk in—while giving you full visibility into what gets done each day and how long they worked.",
    },
    {
      question: "What happens after placement?",
      answer:
        "We don't disappear. You get active support during onboarding, then ongoing access to our team for system updates, troubleshooting, or questions. We stay involved until your home actually runs.",
    },
    {
      question: "How is HUM different from a staffing agency?",
      answer:
        "Staffing agencies find people. HUM builds your entire household operating system, trains professionals on YOUR specific way of doing things, and stays involved to ensure it actually works.",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && city && (city !== "Other" || otherCity)) {
      setIsSubmitting(true);
      setSubmitError(null);

      const finalCity = city === "Other" ? otherCity : city;

      const result = await submitToMaropost({
        email,
        city: finalCity,
      });

      setIsSubmitting(false);

      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#fefdfb] text-[#454545] overflow-x-hidden">
      {/* Static Logo (visible before scroll) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-opacity duration-300 ${
          showNav ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <img src="/hum-logo.jpg" alt="HUM" className="h-6 sm:h-8 w-auto" />
        </div>
      </div>

      {/* Navigation (appears on scroll) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#fefdfb]/90 backdrop-blur-md transition-all duration-300 ${
          showNav
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-4 flex items-center justify-between">
          <img src="/hum-logo.jpg" alt="HUM" className="h-5 sm:h-5 w-auto" />
          <div className="hidden md:flex items-center gap-10 text-[10px] text-[#666]">
            <button
              onClick={() => scrollToSection("difference")}
              className="hover:text-[#323B46] transition-colors uppercase"
            >
              Difference
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="hover:text-[#323B46] transition-colors uppercase"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="hover:text-[#323B46] transition-colors uppercase"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("guarantee")}
              className="hover:text-[#323B46] transition-colors uppercase"
            >
              Guarantee
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setFaqOpen(true)}
              className="px-4 sm:px-5 py-2 sm:py-2 text-[11px] sm:text-[10px] text-[#666] hover:text-[#323B46] border border-[#e0e0e0] rounded-full transition-colors uppercase"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="px-4 sm:px-5 py-2 sm:py-2 text-[11px] sm:text-[10px] text-white bg-[#1a1a1a] hover:bg-black rounded-full transition-colors uppercase"
            >
              Book
            </button>
          </div>
        </div>
      </nav>

      {/* FAQ Modal */}
      {faqOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFaqOpen(false)}
          />
          <div className="relative bg-[#fefdfb] rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            <button
              onClick={() => setFaqOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#999] hover:text-[#323B46] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#323B46] mb-4 sm:mb-6 text-center">
              FAQ
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#f5f5f5] rounded-xl sm:rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === i ? null : i)
                    }
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
                      className={`transition-transform flex-shrink-0 ml-2 ${
                        expandedFaq === i ? "rotate-180" : ""
                      }`}
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
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trusted by moms badge */}
          <div className="inline-flex items-center gap-2.5 border border-[#e0dbd4] rounded-full px-5 py-2 mb-8 sm:mb-12">
            <svg width="18" height="16" viewBox="0 0 24 22" fill="#e74c3c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="text-sm sm:text-base text-[#777] font-medium">Trusted by moms</span>
          </div>

          <h1 className="text-[36px] sm:text-[60px] md:text-[76px] font-semibold text-[#0e0e0d] leading-[1.08] tracking-tight mb-2 sm:mb-3">
            Your home on autopilot.
          </h1>
          <h2 className="text-[36px] sm:text-[60px] md:text-[76px] font-semibold text-[#c6bfb5] leading-[1.08] tracking-tight mb-8 sm:mb-10">
            No lists. No reminders.<br />
            No mental load.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#969593] max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            HUM builds your household operating system, finds and trains your
            perfect house manager to run it, and stays involved until it actually
            works so you don&apos;t have to.
          </p>

          <button
            onClick={() => scrollToSection("cta")}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-sm sm:text-lg"
          >
            See If HUM Is Right for You
          </button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0 bg-[#f8f6f2]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
            The Reality
          </p>
          <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight mb-8 sm:mb-16">
            Every solution adds another thing to manage.
          </h2>
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-16 text-left sm:text-center">
            <p className="text-base sm:text-xl text-[#888]">
              Hired a cleaner — now you manage a cleaner
            </p>
            <p className="text-base sm:text-xl text-[#888]">
              Downloaded the apps — now you run the apps
            </p>
            <p className="text-base sm:text-xl text-[#888]">
              Made the lists — now you enforce the lists
            </p>
          </div>
          <p className="text-base sm:text-xl text-[#454545]">HUM doesn&apos;t.</p>
        </div>
      </section>

      {/* The HUM Difference */}
      <section
        id="difference"
        className="sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
            The HUM Difference
          </p>
          <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight mb-4 sm:mb-6">
            System + professional<br className="sm:hidden" />
            <span className="sm:hidden"> </span>
            <span className="hidden sm:inline"> </span>+ support{" "}
            <br className="hidden sm:block" />= you&apos;re out.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-[#454545] max-w-2xl mx-auto mb-12 sm:mb-20">
            HUM isn&apos;t another tool. It&apos;s the complete standard. So your home
            actually runs without you.
          </p>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {[
              {
                number: "01",
                title: "We build your household manual",
                description:
                  "Your home, systematized. Every task, preference, and routine documented.",
              },
              {
                number: "02",
                title: "We train a professional on YOUR system",
                description: "Matched, vetted, and HUM-trained. They learn your home.",
              },
              {
                number: "03",
                title: "We stay involved",
                description:
                  "Ongoing optimization and support. When something breaks, we handle it.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#ebe6df] rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <span className="text-[#b8926b] text-base sm:text-xl font-mono">
                  {item.number}
                </span>
                <h3 className="text-base sm:text-xl font-medium text-[#323B46] mt-2 sm:mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-base sm:text-xl text-[#888] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="process"
        className="sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0 bg-[#f8f6f2]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
            <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
              How It Works
            </p>
            <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#323B46] leading-tight">
              Four steps to autopilot
            </h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                step: "1",
                title: "We learn your home",
                description: "Full audit. Tasks, pain points, preferences.",
              },
              {
                step: "2",
                title: "We build your system",
                description: "Your personalized household manual.",
              },
              {
                step: "3",
                title: "We match & train your professional",
                description: "Trained by HUM. On YOUR system.",
              },
              {
                step: "4",
                title: "We stay involved",
                description: "Ongoing support. You stay out of it.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-baseline">
                <span className="text-base sm:text-xl font-mono text-[#ccc] w-4">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base sm:text-xl font-semibold text-[#323B46] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-xl text-[#888]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Measured Impact */}
      <section
        id="impact"
        className="sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
            <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
              Measured Impact
            </p>
            <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight">
              See your life improving.
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-[#454545] mt-4 max-w-2xl mx-auto">
              Your Home Performance Dashboard tracks what matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-8 text-center">
            {[
              { metric: "Hours Returned", description: "Real time back in your week." },
              { metric: "System Uptime", description: "How consistently your home runs." },
              {
                metric: "Mental Load Eliminated",
                description: "Tasks you no longer think about.",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-base sm:text-xl font-medium text-[#454545] mb-1">
                  {item.metric}
                </div>
                <p className="text-base sm:text-xl text-[#999]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dignity Standard */}
      <section className="sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0 bg-[#f8f6f2]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
            The Dignity Standard
          </p>
          <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight mb-8 sm:mb-12">
            Running a home shouldn&apos;t run someone down.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#454545]">
            When you pay fairly, people stay. Our retention rates reflect it.
            HUM-trained professionals earn fair wages. Complete transparency. No
            exploitation.
          </p>
        </div>
      </section>

      {/* The Guarantee */}
      <section
        id="guarantee"
        className="sm:min-h-screen flex items-center justify-center px-4 py-16 sm:py-0"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
            The Guarantee
          </p>
          <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight mb-4">
            We don&apos;t disappear after the match.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-[#454545] max-w-md mx-auto mb-12 sm:mb-20">
            We stay until your home actually runs.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            {[
              { title: "Repair First", description: "We fix the system before replacing people." },
              { title: "Unlimited Replacements", description: "As many times as it takes." },
              { title: "Happy or Full Refund", description: "We stay until you're satisfied." },
            ].map((item, i) => (
              <div key={i} className="bg-[#ebe6df] rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <h3 className="text-base sm:text-xl font-medium text-[#454545] mb-1">
                  {item.title}
                </h3>
                <p className="text-base sm:text-xl text-[#888]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Call / CTA Section */}
      <section id="cta" className="px-4 py-24 sm:py-24 bg-[#f8f6f2]">
        <div className="max-w-4xl lg:max-w-6xl mx-auto text-center w-full">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-4 sm:mb-6">
            Next Steps
          </p>
          <h2 className="text-[30px] sm:text-[44px] md:text-[56px] font-semibold text-[#454545] leading-tight mb-4">
            Ready to stop managing?
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-[#454545] mb-0 max-w-2xl mx-auto">
            Book a free call with our team.
          </p>

          {/* Scheduler.ai Widget */}
          <div className="mb-2 w-full max-w-6xl mx-auto overflow-x-auto">
            <div
              id="scheduler-container"
              className="min-h-[700px] w-full"
              style={{ minWidth: "900px" }}
            />
          </div>

          {/* Email Fallback */}
          <div id="waitlist" className="border-t border-[#e0e0e0] pt-12 sm:pt-16">
            <div className="bg-[#ebe6df] rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-[#888] mb-6">
                Not ready to talk yet? Stay in the loop.
              </p>
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 sm:px-5 py-3 sm:py-4 rounded-full border border-[#d5d0c8] bg-white text-[#323B46] placeholder-[#999] focus:outline-none focus:border-[#666] transition-colors text-sm sm:text-base"
                    />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className={`px-4 sm:px-5 py-3 sm:py-4 rounded-full border appearance-none cursor-pointer border-[#d5d0c8] bg-white text-[#323B46] focus:outline-none focus:border-[#666] transition-colors text-sm sm:text-base ${
                        !city ? "text-[#999]" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select your city
                      </option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  {city === "Other" && (
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={otherCity}
                      onChange={(e) => setOtherCity(e.target.value)}
                      required
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-full border border-[#d5d0c8] bg-white text-[#323B46] placeholder-[#999] focus:outline-none focus:border-[#666] transition-colors text-sm sm:text-base"
                    />
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Sign Me Up"}
                  </button>
                  {submitError && (
                    <p className="text-sm text-red-600">{submitError}</p>
                  )}
                </form>
              ) : (
                <div className="inline-block">
                  <p className="text-lg font-medium text-[#323B46]">
                    You&apos;re on the list.
                  </p>
                  <p className="mt-1 text-[#666]">We&apos;ll be in touch soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 bg-[#fefdfb] text-[#454545]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <img src="/hum-logo.jpg" alt="HUM" className="h-6 w-auto" />
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a
                href="/privacy-policy"
                className="text-xs text-[#999] hover:text-[#666] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-xs text-[#999] hover:text-[#666] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/disclaimer"
                className="text-xs text-[#999] hover:text-[#666] transition-colors"
              >
                Disclaimer
              </a>
              <a
                href="/cookie-policy"
                className="text-xs text-[#999] hover:text-[#666] transition-colors"
              >
                Cookie Policy
              </a>
            </div>
            <p className="text-xs text-[#bbb]">© {new Date().getFullYear()} HUM</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
