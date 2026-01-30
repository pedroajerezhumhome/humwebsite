// =============================================================================
// Welcome/Enrollment Confirmation Page (/welcome)
// =============================================================================
// This page is shown to users after they successfully purchase/enroll.
// URL: humhome.co/welcome
// =============================================================================

"use client";

import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// =============================================================================
// CONFETTI ANIMATION COMPONENT
// =============================================================================
function Confetti() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    color: string;
    size: number;
    rotate: number;
  }>>([]);

  useEffect(() => {
    const colors = ["#b8926b", "#d4b896", "#e8d5c4", "#6b8e5e", "#8fb07a", "#c9a87c", "#ffffff"];
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 10,
      rotate: Math.random() * 360,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// CUSTOM HOOK - Parse customer details from URL parameters
// =============================================================================
function useCustomerDetails() {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<{
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const firstNameParam = searchParams.get("first_name") || searchParams.get("firstName");
    const lastNameParam = searchParams.get("last_name") || searchParams.get("lastName");
    const emailParam = searchParams.get("email");
    const fullNameParam = searchParams.get("name") || searchParams.get("full_name");

    let firstName = "";
    let lastName = "";

    if (firstNameParam) {
      firstName = decodeURIComponent(firstNameParam).replace(/\+/g, " ").trim();
    }
    if (lastNameParam) {
      lastName = decodeURIComponent(lastNameParam).replace(/\+/g, " ").trim();
    }

    if (fullNameParam && !firstName) {
      const parts = decodeURIComponent(fullNameParam).replace(/\+/g, " ").trim().split(" ");
      firstName = parts[0] || "";
      lastName = parts.slice(1).join(" ") || "";
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const email = emailParam ? decodeURIComponent(emailParam).replace(/\+/g, " ").trim() : "";

    setDetails({ firstName, lastName, fullName, email });
  }, [searchParams]);

  return details;
}

// =============================================================================
// PERSONALIZED HERO WITH ASPIRATIONAL HOOK
// =============================================================================
function PersonalizedHero() {
  const customerDetails = useCustomerDetails();
  const firstName = customerDetails?.firstName || "";

  return (
    <section className="px-4 pt-6 pb-10 sm:pt-12 sm:pb-20 bg-[#fefdfb]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#b8926b] mb-4 sm:mb-6">
          YOU&apos;RE IN
        </p>

        {/* Main Headline */}
        <h1 className="text-[28px] sm:text-[44px] md:text-[52px] font-semibold text-[#323B46] leading-[1.15] tracking-tight mb-4 sm:mb-6">
          {firstName ? (
            <>Welcome to HUM,<br />{firstName}!</>
          ) : (
            <>Welcome to HUM!</>
          )}
        </h1>

        {/* Aspirational Vision - from welcome email */}
        <div className="bg-[#f8f6f2] rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 text-left">
          <p className="text-[14px] sm:text-[17px] text-[#555] leading-relaxed mb-4">
            Imagine this: You wake up. Your house manager has already cleaned the house, made your coffee and breakfast, packed bags and school lunches, and taken care of a dozen things you didn&apos;t even ask for.
          </p>
          <p className="text-[14px] sm:text-[17px] text-[#555] leading-relaxed mb-4">
            You spend breakfast doing whatever matters most to you instead of running around making lists. You leave for work without scrambling.
          </p>
          <p className="text-[15px] sm:text-[18px] text-[#323B46] font-medium">
            That&apos;s what you just invested in, and so much more.
          </p>
        </div>

        {/* CTA intro */}
        <p className="text-[14px] sm:text-[18px] text-[#555] leading-relaxed">
          Complete the three steps below to start your journey.
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// UNIFIED ACTION STEPS SECTION - All 3 steps together
// =============================================================================
function ActionStepsSection() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { num: 1, title: "Agreement", icon: "✍️" },
    { num: 2, title: "Questionnaire", icon: "📝" },
    { num: 3, title: "Kickoff Call", icon: "📅" },
  ];

  return (
    <section className="px-4 py-10 sm:py-16 bg-[#f8f6f2]">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-3">
            Your Next Steps
          </p>
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight">
            Three Things To Do Today
          </h2>
        </div>

        {/* Step Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
          {steps.map((step) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`flex-1 py-3 sm:py-4 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-center transition-all ${
                activeStep === step.num
                  ? "bg-white shadow-md"
                  : "bg-[#ebe6df] hover:bg-[#e5ded4]"
              }`}
            >
              <span className="text-xl sm:text-2xl block mb-1">{step.icon}</span>
              <span className={`text-[11px] sm:text-[13px] font-medium ${
                activeStep === step.num ? "text-[#323B46]" : "text-[#888]"
              }`}>
                Step {step.num}
              </span>
              <span className={`block text-[10px] sm:text-[12px] ${
                activeStep === step.num ? "text-[#555]" : "text-[#aaa]"
              }`}>
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* STEP 1: Agreement */}
          {activeStep === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f8f6f2] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#b8926b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#323B46] mb-3">
                Review & Sign Your Agreement
              </h3>

              <p className="text-[14px] sm:text-[16px] text-[#555] mb-6 leading-relaxed max-w-md mx-auto">
                We&apos;ve sent your agreement via DocuSign. It&apos;s written in plain English. Simple and clear.
              </p>

              <a
                href="https://mail.google.com/mail/u/0/#search/docusign"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 sm:px-12 py-3.5 sm:py-4 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-[14px] sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Open Email
              </a>

              <p className="text-[12px] sm:text-[13px] text-[#888] mt-5">
                Can&apos;t find it? Check spam or contact{" "}
                <a href="mailto:vip@humhome.co" className="text-[#b8926b] hover:underline">
                  vip@humhome.co
                </a>
              </p>
            </div>
          )}

          {/* STEP 2: Questionnaire */}
          {activeStep === 2 && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f8f6f2] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#b8926b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#323B46] mb-3">
                Tell Us About Your Household
              </h3>

              <p className="text-[14px] sm:text-[16px] text-[#555] mb-6 leading-relaxed max-w-md mx-auto">
                This helps us start to understand who your dream house manager is, so we can write the perfect job description and start your search.
              </p>

              <a
                href="https://let-us-know.typeform.com/to/gFojEmRj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 sm:px-12 py-3.5 sm:py-4 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-[14px] sm:text-base"
              >
                Start Questionnaire
              </a>

              <p className="text-[12px] sm:text-[13px] text-[#888] mt-5">
                Your kickoff call will go deeper. 24 hours after, your job posting goes live
              </p>
            </div>
          )}

          {/* STEP 3: Kickoff Call */}
          {activeStep === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f8f6f2] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#b8926b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#323B46] mb-3">
                Schedule Your Kickoff Call
              </h3>

              <p className="text-[14px] sm:text-[16px] text-[#555] mb-6 leading-relaxed max-w-md mx-auto">
                Schedule for <span className="font-semibold">three days after completing your questionnaire</span>. This gives us time for your answers and preparation.
              </p>

              {!showCalendly ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowCalendly(true)}
                    className="inline-block px-8 sm:px-12 py-3.5 sm:py-4 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-[14px] sm:text-base"
                  >
                    Choose a Time
                  </button>
                </div>
              ) : (
                <div className="bg-[#f8f6f2] rounded-xl p-3 sm:p-4 -mx-2 sm:-mx-4">
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/meetwithpedro/discovery-call?hide_gdpr_banner=1"
                    style={{ minWidth: "280px", height: "550px" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setActiveStep(num)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeStep === num ? "bg-[#b8926b] w-6" : "bg-[#d4ccc0]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Calendly Script */}
      {showCalendly && (
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      )}
    </section>
  );
}

// =============================================================================
// JOURNEY TIMELINE - 6 key milestones
// =============================================================================
function JourneyTimeline() {
  const milestones = [
    {
      label: "NOW",
      title: "Complete your steps",
      description: "Agreement → Questionnaire → Kickoff",
      isActive: true,
    },
    {
      label: "24 HOURS",
      title: "Job search launches",
      description: "Your job description goes live",
      isActive: false,
    },
    {
      label: "SHORTLY AFTER",
      title: "Home Playbook v1",
      description: "Your personalized system delivered",
      isActive: false,
    },
    {
      label: "ONGOING",
      title: "Refinement",
      description: "We perfect your system together",
      isActive: false,
    },
    {
      label: "30-90 DAYS",
      title: "Meet your candidates",
      description: "Trial day → Trial week → Your decision",
      isActive: false,
    },
    {
      label: "LAUNCH",
      title: "Your new life begins",
      description: "You hire, we train, autopilot starts",
      isActive: false,
    },
  ];

  return (
    <section className="px-4 py-10 sm:py-16 bg-[#fefdfb]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-3">
            The Road Ahead
          </p>
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight">
            Your Journey to Autopilot
          </h2>
        </div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden sm:block">
          <div className="relative">
            {/* Connector Line */}
            <div className="absolute top-4 left-[8%] right-[8%] h-[2px] bg-[#e0d8cd]" />

            {/* Milestones */}
            <div className="grid grid-cols-6 gap-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 relative z-10 ring-4 ring-[#fefdfb] ${
                      milestone.isActive ? "bg-[#b8926b]" : "bg-[#d4ccc0]"
                    }`}
                  >
                    {milestone.isActive ? (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    ) : (
                      <span className="text-white text-[10px] font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <p className={`text-[10px] uppercase tracking-[0.1em] font-semibold mb-1 ${
                    milestone.isActive ? "text-[#b8926b]" : "text-[#999]"
                  }`}>
                    {milestone.label}
                  </p>
                  <p className={`text-[13px] font-medium leading-tight mb-1 ${
                    milestone.isActive ? "text-[#323B46]" : "text-[#666]"
                  }`}>
                    {milestone.title}
                  </p>
                  <p className="text-[11px] text-[#888] leading-snug">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Timeline - Mobile */}
        <div className="sm:hidden">
          <div className="relative pl-10">
            <div className="absolute left-[12px] top-2 bottom-2 w-[2px] bg-[#e0d8cd]" />

            {milestones.map((milestone, index) => (
              <div key={index} className={`relative ${index < milestones.length - 1 ? "pb-6" : ""}`}>
                <div
                  className={`absolute left-[-28px] w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-[#fefdfb] ${
                    milestone.isActive ? "bg-[#b8926b]" : "bg-[#d4ccc0]"
                  }`}
                >
                  {milestone.isActive ? (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  ) : (
                    <span className="text-white text-[10px] font-semibold">{index + 1}</span>
                  )}
                </div>
                <div>
                  <p className={`text-[10px] uppercase tracking-[0.1em] font-semibold mb-0.5 ${
                    milestone.isActive ? "text-[#b8926b]" : "text-[#999]"
                  }`}>
                    {milestone.label}
                  </p>
                  <p className={`text-[14px] font-medium ${
                    milestone.isActive ? "text-[#323B46]" : "text-[#666]"
                  }`}>
                    {milestone.title}
                  </p>
                  <p className="text-[12px] text-[#888]">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SIMPLIFIED HOW WE BUILD SECTION - 4 phases
// =============================================================================
function HowWeBuildSection() {
  const phases = [
    {
      num: "01",
      title: "You Share",
      description: "Questionnaire + kickoff call give us everything we need to start.",
    },
    {
      num: "02",
      title: "We Build",
      description: "Your Home Playbook v1 is delivered shortly after.",
    },
    {
      num: "03",
      title: "We Refine",
      description: "Hope, our AI voice agent, asks targeted follow-up questions to fill gaps we've identified.",
    },
    {
      num: "04",
      title: "We Evolve",
      description: "Once your house manager starts, we capture imagery to make your system even clearer.",
    },
  ];

  return (
    <section className="px-4 py-10 sm:py-16 bg-[#f8f6f2]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-3">
            The Process
          </p>
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-3">
            How Your System Gets Built
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#555]">
            Your input shapes everything, but you&apos;re not building it alone.
          </p>
        </div>

        {/* Phases */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center"
            >
              <span className="text-[28px] sm:text-[32px] font-light text-[#b8926b]">
                {phase.num}
              </span>
              <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#323B46] mb-2 mt-1">
                {phase.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#666] leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// IMPROVED TEAM SECTION
// =============================================================================
function TeamSection() {
  return (
    <section className="px-4 py-10 sm:py-16 bg-[#f8f6f2]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-10 h-[2px] bg-[#b8926b] mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-[#b8926b] mb-3">
            Your Dedicated Team
          </p>
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-3">
            Meet Your HUM Pod
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#555] max-w-lg mx-auto">
            Three people dedicated to making your home run. Not just a service.
          </p>
        </div>

        {/* Team Cards */}
        <div className="space-y-4">
          {/* Pedro - Assigned */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 bg-white ring-4 ring-white">
              <img
                src="/pedro-headshot.png"
                alt="Pedro Jerez"
                className="w-full h-full object-cover object-top scale-125"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#323B46]">
                  Pedro Jerez
                </h3>
                <span className="px-2 py-0.5 bg-[#6b8e5e] text-white text-[10px] sm:text-[11px] font-medium rounded-full">
                  Assigned
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] text-[#b8926b] font-medium">
                Co-Founder & Onboarding Lead
              </p>
              <p className="text-[13px] sm:text-[14px] text-[#666] mt-1">
                He&apos;ll lead your kickoff call and ensure you&apos;re set up for success.
              </p>
            </div>
          </div>

          {/* Coming Soon Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Account Manager */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-dashed border-[#e0d8cd]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#ebe6df] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c9b8a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#666]">
                    Account Manager
                  </h3>
                  <span className="text-[11px] text-[#999]">Assigned after kickoff</span>
                </div>
              </div>
              <p className="text-[12px] sm:text-[13px] text-[#888]">
                Your dedicated point of contact for ongoing support and questions.
              </p>
            </div>

            {/* Recruiter */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-dashed border-[#e0d8cd]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#ebe6df] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c9b8a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#666]">
                    Dedicated Recruiter
                  </h3>
                  <span className="text-[11px] text-[#999]">Introduced during onboarding</span>
                </div>
              </div>
              <p className="text-[12px] sm:text-[13px] text-[#888]">
                The person who will find your rockstar house manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SUPPORT SECTION
// =============================================================================
function SupportSection() {
  return (
    <section className="px-4 py-10 sm:py-14 bg-[#ebe6df]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[20px] sm:text-[26px] font-semibold text-[#323B46] mb-3">
          Questions? We&apos;re Here.
        </h2>
        <p className="text-[14px] sm:text-[16px] text-[#555] mb-5">
          Our VIP support team is ready to help.
        </p>
        <a
          href="mailto:vip@humhome.co"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-[14px] sm:text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          vip@humhome.co
        </a>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
export default function WelcomePage() {
  return (
    <div className="bg-[#fefdfb] text-[#454545] min-h-screen">
      {/* Confetti Animation */}
      <Confetti />

      {/* ===================================================================
          HEADER - Logo
      =================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <img src="/hum-logo.png" alt="HUM" className="h-6 sm:h-8 w-auto" />
      </div>

      {/* ===================================================================
          HERO - Personalized Welcome + Aspirational Hook
      =================================================================== */}
      <Suspense fallback={null}>
        <PersonalizedHero />
      </Suspense>

      {/* ===================================================================
          ACTION STEPS - All 3 steps in one tabbed section
      =================================================================== */}
      <ActionStepsSection />

      {/* ===================================================================
          JOURNEY TIMELINE - Simplified 5 milestones
      =================================================================== */}
      <JourneyTimeline />

      {/* ===================================================================
          HOW WE BUILD - Simplified 4 phases (HIDDEN)
      =================================================================== */}
      {/* <HowWeBuildSection /> */}

      {/* ===================================================================
          YOUR HUM TEAM
      =================================================================== */}
      <TeamSection />

      {/* ===================================================================
          SUPPORT
      =================================================================== */}
      <SupportSection />

      {/* ===================================================================
          FOOTER
      =================================================================== */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-[#fefdfb] text-[#454545]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <img src="/hum-logo.png" alt="HUM" className="h-5 sm:h-6 w-auto" />
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
              <Link href="/privacy-policy" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Disclaimer
              </Link>
              <Link href="/cookie-policy" className="text-[10px] sm:text-xs text-[#999] hover:text-[#666] transition-colors">
                Cookie Policy
              </Link>
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
