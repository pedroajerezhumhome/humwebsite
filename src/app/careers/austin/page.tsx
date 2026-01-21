"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    <div className="min-h-screen bg-white text-[#454545] overflow-x-hidden">
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

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 6s ease-in-out infinite; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <img src="/hum-logo.jpg" alt="HUM" className="h-6 sm:h-8 w-auto" />
          <a
            href="https://humhome.recruitee.com/o/house-manager-austin/c/new" target="_blank" rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium px-4 sm:px-6 py-2.5 sm:py-3 bg-[#454545] text-white rounded-full hover:bg-[#333] transition-all duration-300"
          >
            Apply Now
          </a>
        </div>
      </nav>

      {/* Hero Section - Abstract */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 overflow-hidden">
        {/* Abstract shapes - hidden on mobile */}
        <div className="hidden sm:block absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-100 to-orange-50 rounded-full blur-3xl opacity-60 animate-pulse-soft"></div>
        <div className="hidden sm:block absolute bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-stone-100 to-amber-50 rounded-full blur-3xl opacity-50 animate-pulse-soft" style={{ animationDelay: "2s" }}></div>
        <div className="hidden md:block absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-rose-50 to-orange-50 rounded-full blur-3xl opacity-40 animate-pulse-soft" style={{ animationDelay: "4s" }}></div>

        {/* Floating organic shapes - hidden on mobile */}
        <svg className="hidden md:block absolute top-32 right-20 w-24 h-24 text-amber-200 animate-float" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="50" rx="45" ry="40" />
        </svg>
        <svg className="hidden md:block absolute bottom-40 left-20 w-16 h-16 text-stone-200 animate-float-reverse" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" />
        </svg>
        <svg className="hidden lg:block absolute top-1/2 right-10 w-12 h-12 text-orange-100 animate-float" style={{ animationDelay: "1s" }} viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="50" rx="40" ry="45" />
        </svg>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-[#eee] mb-10 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-[#666]">Now Hiring in Austin, Texas</span>
          </div>

          <h1 className="fade-up fade-up-delay-1 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.1] tracking-tight mb-6 md:mb-8">
            Join the team that brings families closer together
          </h1>

          <p className="fade-up fade-up-delay-2 text-xl md:text-2xl leading-relaxed text-[#666] mb-12 max-w-2xl mx-auto">
            We&apos;re looking for an exceptional Household Manager to support one of Austin&apos;s most dynamic entrepreneurial families.
          </p>

          <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <a
              href="https://humhome.recruitee.com/o/house-manager-austin/c/new" target="_blank" rel="noopener noreferrer"
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-[#454545] text-white text-base sm:text-lg font-medium rounded-full hover:bg-[#333] transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
            >
              Start Your Application
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#about"
              className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium text-[#454545] border border-[#ddd] rounded-full hover:border-[#bbb] hover:bg-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-[#ccc] flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#999] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* Mission Section */}
      <section id="about" className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 bg-white relative overflow-hidden">
        {/* Abstract accent - hidden on mobile */}
        <div className="hidden sm:block absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full opacity-60"></div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="fade-up text-sm font-semibold tracking-[0.25em] uppercase text-amber-600 mb-4 sm:mb-6">
                Our Mission
              </p>
              <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-6 sm:mb-8">
                We believe entrepreneurial families deserve extraordinary support
              </h2>
              <p className="fade-up fade-up-delay-2 text-lg md:text-xl leading-relaxed text-[#666] mb-6">
                At HUM, we exist for one reason: to bring entrepreneurial families closer together. When the home runs smoothly, families thrive.
              </p>
              <p className="fade-up fade-up-delay-3 text-lg md:text-xl leading-relaxed text-[#666]">
                We place Household Managers in roles that truly fit their skills, values, and season of life. Beyond placement, HUM provides guidance, structure, and a community so you&apos;re never doing this work alone.
              </p>
            </div>

            {/* Family Illustration */}
            <div className="fade-up fade-up-delay-2 relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/family-illustration.svg"
                  alt="Family illustration"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* Quote Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <svg className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 sm:mb-8 text-[#e5e5e5]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="fade-up text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight mb-6 sm:mb-8 text-[#454545]">
            You walk into a home and immediately know what needs to happen next.
          </p>
          <p className="fade-up fade-up-delay-1 text-xl text-[#888]">
            This is the mindset we look for.
          </p>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* You Are Section */}
      <section className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 bg-white relative overflow-hidden">
        {/* Abstract accents - hidden on mobile */}
        <div className="hidden sm:block absolute top-40 -left-20 w-60 h-60 bg-gradient-to-br from-stone-100 to-stone-50 rounded-full opacity-60"></div>
        <div className="hidden sm:block absolute bottom-20 -right-10 w-40 h-40 bg-gradient-to-br from-amber-100 to-orange-50 rounded-full opacity-50"></div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <p className="fade-up text-sm font-semibold tracking-[0.25em] uppercase text-[#888] mb-4 sm:mb-6">
              You Are
            </p>
            <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4 sm:mb-6 max-w-3xl mx-auto bg-gradient-to-r from-[#333] via-[#454545] to-[#666] bg-clip-text text-transparent">
              Someone who notices the small things, because you know they&apos;re never actually small.
            </h2>
            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-[#666] max-w-2xl mx-auto leading-relaxed">
              You take pride in how a space feels, not just how it looks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { trait: "Extremely detail-oriented and observant", icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )},
              { trait: "Naturally proactive and anticipatory, handling things before they're asked", icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              )},
              { trait: "Comfortable working quietly and independently, without needing oversight", icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
              { trait: "Highly trustworthy and respectful of boundaries", icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              )},
              { trait: "Excellent at closing loops and communicating progress", icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              )},
              { trait: "Hospitality-minded, with a true 'hotel reset' standard for the home", icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              )},
            ].map((item, i) => (
              <div
                key={i}
                className={`fade-up fade-up-delay-${Math.min(i + 1, 4)} group relative p-7 sm:p-9 bg-white rounded-2xl sm:rounded-3xl border border-[#e8e8e8] hover:border-transparent transition-all duration-500 hover:-translate-y-1`}
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(251,146,60,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)';
                }}
              >
                {/* Icon container with refined hover state */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center mb-6 text-[#333] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>

                {/* Trait text with better spacing */}
                <p className="text-base md:text-lg font-medium text-[#333] leading-relaxed tracking-[-0.01em]">{item.trait}</p>

                {/* Subtle bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* Daily Responsibilities */}
      <section className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 bg-white relative overflow-hidden">
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
                {/* Layered cards representing organization */}
                <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-full h-56 sm:h-64 bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl sm:rounded-3xl"></div>
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-full h-56 sm:h-64 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl"></div>
                <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 border border-[#eee]">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[#888] font-medium">Compensation (based on experience)</p>
                      <p className="text-3xl font-bold text-[#454545]">$25–$45<span className="text-base sm:text-lg font-medium text-[#888]">/hr</span></p>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-3 text-[#666]">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Part-time & full-time available</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#666]">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Based in Austin, Texas</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#666]">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Supportive community</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="fade-up text-sm font-semibold tracking-[0.25em] uppercase text-[#888] mb-4 sm:mb-6">
                The Role
              </p>
              <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-4 sm:mb-6">
                What your days will look like
              </h2>
              <p className="fade-up fade-up-delay-2 text-base sm:text-lg text-[#666] leading-relaxed mb-8 sm:mb-12">
                Every day, you&apos;ll bring order, beauty, and calm to a home that supports a thriving entrepreneurial family.
              </p>

              <div className="space-y-2 sm:space-y-4">
                {[
                  { num: "01", title: "Daily Reset", desc: "Kitchen, common areas, bedrooms as needed" },
                  { num: "02", title: "Laundry Management", desc: "Wash, fold, put away (correctly)" },
                  { num: "03", title: "Organization Maintenance", desc: "Home already has systems; you help maintain and improve them" },
                  { num: "04", title: "Restocking & Inventory", desc: "Pantry, fridge, supplies, household goods awareness" },
                  { num: "05", title: "Errands", desc: "Grocery runs, household pickups as needed" },
                  { num: "06", title: "Meal Prep", desc: "Prep weekly lunches, protein shakes, and ingredients" },
                  { num: "07", title: "Vendor Coordination", desc: "Coordinate cleaners, repairs, and services as needed" },
                  { num: "08", title: "Vehicle Support", desc: "Car wash, refueling/charging, oil change coordination" },
                  { num: "09", title: "Light Pet Support", desc: "Let dogs out/in, kibble, basic routine" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`fade-up fade-up-delay-${Math.min(i % 4 + 1, 4)} group flex items-start gap-3 sm:gap-5 p-3 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-[#f7f7f7] transition-all duration-300`}
                  >
                    <span className="text-xs sm:text-sm font-mono text-amber-500 mt-1">{item.num}</span>
                    <div>
                      <h4 className="font-semibold text-[#333] mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-[#666] text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* Experience & Fit */}
      <section className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="fade-up text-sm font-semibold tracking-[0.25em] uppercase text-[#888] mb-4 sm:mb-6">
              Experience & Fit
            </p>
            <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
              What we&apos;re looking for
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
            {[
              { main: "1+ years of household management experience,", sub: "family assistant experience, or similar home-operations role" },
              { main: "Experience supporting families with school-aged children", sub: "(parenting experience is a plus, but not required)" },
              { main: "Comfortable working in a multi-ethnic household", sub: "and handling a variety of foods" },
              { main: "No food-handling restrictions", sub: "(must be comfortable with nuts, shellfish, etc.)" },
              { main: "Physically capable", sub: "of active mornings and household movement" },
              { main: "Authorized to work in the US", sub: "" },
            ].map((item, i) => (
              <div
                key={i}
                className={`fade-up fade-up-delay-${Math.min(i % 4 + 1, 4)} flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-[#eee] hover:shadow-lg hover:border-emerald-200 transition-all duration-300`}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#333]">{item.main}</p>
                  {item.sub && <p className="text-sm text-[#666]">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* CTA Section */}
      <section className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="fade-up text-3xl sm:text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6 sm:mb-8 text-[#454545]">
            Ready to do meaningful work?
          </h2>
          <p className="fade-up fade-up-delay-1 text-lg sm:text-xl text-[#666] max-w-2xl mx-auto mb-8 sm:mb-12">
            If you&apos;re someone who takes pride in creating calm, order, and beauty, and wants to be part of a mission bigger than yourself, we want to hear from you.
          </p>
          <a
            href="https://humhome.recruitee.com/o/house-manager-austin/c/new" target="_blank" rel="noopener noreferrer"
            className="fade-up fade-up-delay-2 inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-6 bg-[#454545] text-white text-base sm:text-lg font-semibold rounded-full hover:bg-[#333] transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            Apply Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent"></div>
      </div>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-white text-[#454545]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 items-start">
            {/* Logo and Copyright */}
            <div className="text-center sm:text-left">
              <img src="/hum-logo.jpg" alt="HUM" className="h-8 sm:h-10 w-auto mb-4 sm:mb-6 mx-auto sm:mx-0" />
              <p className="text-xs text-[#888] uppercase tracking-wider">
                HUM HOME, INC. © {new Date().getFullYear()}
              </p>
            </div>

            {/* Policy Links */}
            <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
              <a href="#" className="text-xs text-[#666] uppercase tracking-wider hover:text-[#333] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[#666] uppercase tracking-wider hover:text-[#333] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-[#666] uppercase tracking-wider hover:text-[#333] transition-colors">
                Disclaimer
              </a>
              <a href="#" className="text-xs text-[#666] uppercase tracking-wider hover:text-[#333] transition-colors">
                Cookie Policy
              </a>
            </div>

            {/* Meta Disclaimer */}
            <div className="sm:col-span-2 md:col-span-1 text-center sm:text-left">
              <p className="text-xs text-[#888] uppercase tracking-wider leading-relaxed">
                This site is not part of the Facebook website, Instagram or Meta Inc. Additionally, this site is not endorsed by Meta in any way. Facebook and Instagram are trademarks of Meta, Inc.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
