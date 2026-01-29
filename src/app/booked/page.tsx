// =============================================================================
// Booked Confirmation Page (/booked)
// =============================================================================
// This page is shown to users after they successfully book a consultation call.
// URL: humhome.co/booked
// =============================================================================

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// Helper function to get ordinal suffix for day
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

// Custom hook to parse booking details from URL parameters
function useBookingDetails() {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<{
    targetDate: Date | null;
    timeZone: string;
    assignedTo: string;
    inviteeName: string;
    month: string;
    monthShort: string;
    day: number;
    weekday: string;
    weekdayShort: string;
    time: string;
    tzAbbrev: string;
    formattedDateTime: string;
  } | null>(null);

  useEffect(() => {
    const eventStartTime = searchParams.get("event_start_time");
    const timeZone = searchParams.get("timeZone") || "America/Chicago";
    const assignedToParam = searchParams.get("assigned_to");
    const inviteeFullName = searchParams.get("invitee_full_name");

    if (!eventStartTime) {
      setDetails(null);
      return;
    }

    const decodedTime = decodeURIComponent(eventStartTime);
    const targetDate = new Date(decodedTime);

    if (isNaN(targetDate.getTime())) {
      setDetails(null);
      return;
    }

    const decodedTimeZone = decodeURIComponent(timeZone);
    const assignedTo = assignedToParam
      ? decodeURIComponent(assignedToParam).replace(/\+/g, " ").trim()
      : "";
    const inviteeName = inviteeFullName
      ? decodeURIComponent(inviteeFullName).replace(/\+/g, " ").trim()
      : "";

    const weekday = targetDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: decodedTimeZone,
    });

    const weekdayShort = targetDate.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: decodedTimeZone,
    });

    const month = targetDate.toLocaleDateString("en-US", {
      month: "long",
      timeZone: decodedTimeZone,
    });

    const monthShort = targetDate.toLocaleDateString("en-US", {
      month: "short",
      timeZone: decodedTimeZone,
    });

    const day = parseInt(targetDate.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: decodedTimeZone,
    }));

    const time = targetDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: decodedTimeZone,
    });

    const tzAbbrev = targetDate.toLocaleTimeString("en-US", {
      timeZoneName: "short",
      timeZone: decodedTimeZone,
    }).split(" ").pop() || "";

    const formattedDateTime = `${weekday}, ${month} ${day}${getOrdinalSuffix(day)} at ${time} ${tzAbbrev}`;

    setDetails({
      targetDate,
      timeZone: decodedTimeZone,
      assignedTo,
      inviteeName,
      month,
      monthShort,
      day,
      weekday,
      weekdayShort,
      time,
      tzAbbrev,
      formattedDateTime,
    });
  }, [searchParams]);

  return details;
}

// Countdown Timer Component
function CountdownTimer() {
  const bookingDetails = useBookingDetails();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState<"counting" | "now" | "passed" | "hidden">("hidden");

  useEffect(() => {
    if (!bookingDetails?.targetDate) {
      setStatus("hidden");
      return;
    }

    const targetDate = bookingDetails.targetDate;

    // Update countdown every second
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0 && diff > -60000) {
        // Within 1 minute of start time
        setStatus("now");
      } else if (diff <= -60000) {
        // Past the start time
        setStatus("passed");
      } else {
        setStatus("counting");
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    // Initial update
    updateCountdown();

    // Set interval
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [bookingDetails]);

  // Don't render if hidden
  if (status === "hidden" || !bookingDetails) return null;

  const { formattedDateTime, assignedTo } = bookingDetails;

  return (
    <section className="px-4 pt-2 pb-10 sm:pt-4 sm:pb-16 bg-[#fefdfb]">
      <div className="max-w-[560px] mx-auto">
        <div className="bg-[#ebe6df] rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-10 sm:py-10 text-center">
          {status === "counting" && (
            <>
              <p className="text-[14px] sm:text-[18px] text-[#555] mb-4 sm:mb-6">
                Your consultation is in:
              </p>

              {/* Countdown Display */}
              <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.days}
                  </span>
                  <span className="text-[10px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    days
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.hours}
                  </span>
                  <span className="text-[10px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    hours
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.minutes}
                  </span>
                  <span className="text-[10px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    minutes
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.seconds}
                  </span>
                  <span className="text-[10px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    seconds
                  </span>
                </div>
              </div>
            </>
          )}

          {status === "now" && (
            <p className="text-[20px] sm:text-[28px] font-semibold text-[#b8926b] mb-4 sm:mb-6">
              Your call is starting now!
            </p>
          )}

          {status === "passed" && (
            <p className="text-[14px] sm:text-[18px] text-[#555] mb-4 sm:mb-6">
              Your call was scheduled for:
            </p>
          )}

          {/* Date/Time Display */}
          <p className="text-[14px] sm:text-[18px] text-[#323B46]">
            {formattedDateTime}
          </p>
        </div>
      </div>
    </section>
  );
}

// Dynamic Calendar Card Component
function DynamicCalendarCard() {
  const bookingDetails = useBookingDetails();

  // Fallback values if no URL params
  const monthShort = bookingDetails?.monthShort || "TBD";
  const day = bookingDetails?.day || "";
  const weekdayShort = bookingDetails?.weekdayShort || "";
  const formattedDateTime = bookingDetails?.formattedDateTime || "Check your email for details";
  const assignedTo = bookingDetails?.assignedTo || "";
  const inviteeName = bookingDetails?.inviteeName || "";

  return (
    <div className="bg-[#fefdfb] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Calendar Icon */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden w-20 sm:w-28">
            <div className="bg-[#b8926b] text-white text-xs sm:text-base font-medium py-1.5 sm:py-2 text-center">
              {monthShort}
            </div>
            <div className="py-3 sm:py-4 text-center bg-white">
              <div className="text-3xl sm:text-5xl font-light text-[#323B46] leading-none">
                {day || "?"}
              </div>
              <div className="text-xs sm:text-base text-[#888] mt-1">{weekdayShort || "---"}</div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[14px] sm:text-[17px] text-[#323B46] mb-2 sm:mb-3">
            Your HUM Consultation Is Booked
          </h4>
          <div className="space-y-1 sm:space-y-1.5 text-[12px] sm:text-[14px]">
            <div className="flex">
              <span className="text-[#888] w-12 sm:w-14 flex-shrink-0">When</span>
              <span className="text-[#555]">{formattedDateTime}</span>
            </div>
            <div className="flex">
              <span className="text-[#888] w-12 sm:w-14 flex-shrink-0">Where</span>
              <span className="text-[#555]">Zoom (check your email)</span>
            </div>
            {(inviteeName || assignedTo) && (
              <div className="flex">
                <span className="text-[#888] w-12 sm:w-14 flex-shrink-0">Who</span>
                <span className="text-[#555]">
                  {inviteeName && assignedTo
                    ? `${inviteeName} & ${assignedTo}`
                    : inviteeName || `You & ${assignedTo}`}
                </span>
              </div>
            )}
          </div>

          {/* RSVP Buttons */}
          <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            <button className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#6b8e5e] text-white text-[11px] sm:text-[13px] font-medium rounded-lg">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Yes
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#ddd] text-[#555] text-[11px] sm:text-[13px] font-medium rounded-lg">
              Maybe
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#ddd] text-[#555] text-[11px] sm:text-[13px] font-medium rounded-lg">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Personalized Hero Component
function PersonalizedHero() {
  const bookingDetails = useBookingDetails();

  // Extract first name from invitee name
  const firstName = bookingDetails?.inviteeName
    ? bookingDetails.inviteeName.split(" ")[0]
    : "";

  return (
    <section className="px-4 pt-4 pb-6 sm:pt-8 sm:pb-12 bg-[#fefdfb]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#b8926b] mb-4 sm:mb-6">
          CALL SCHEDULED
        </p>

        {/* Main Headline */}
        <h1 className="text-[28px] sm:text-[44px] md:text-[52px] font-semibold text-[#323B46] leading-[1.15] tracking-tight mb-3 sm:mb-5">
          {firstName ? (
            <>Congratulations {firstName},<br />You&apos;re Booked!</>
          ) : (
            <>Congratulations,<br />You&apos;re Booked!</>
          )}
        </h1>

        {/* Description */}
        <p className="text-[14px] sm:text-[20px] text-[#555] max-w-xl mx-auto mb-4 sm:mb-8 leading-relaxed px-2 sm:px-0">
          Your life is about to get a whole lot easier. All the details for your upcoming call are on their way to your inbox and phone. But first, please review the important materials below.
        </p>
      </div>
    </section>
  );
}

export default function BookedPage() {
  return (
    <div className="bg-[#fefdfb] text-[#454545] min-h-screen">

      {/* ===================================================================
          HEADER - Logo
      =================================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <img src="/hum-logo.png" alt="HUM" className="h-6 sm:h-8 w-auto" />
      </div>

      {/* ===================================================================
          HERO SECTION - Personalized Confirmation Message
      =================================================================== */}
      <Suspense fallback={null}>
        <PersonalizedHero />
      </Suspense>

      {/* ===================================================================
          COUNTDOWN TIMER - Time Until Consultation
      =================================================================== */}
      <Suspense fallback={null}>
        <CountdownTimer />
      </Suspense>

      {/* ===================================================================
          WHAT HAPPENS NEXT - Timeline Section
      =================================================================== */}
      <section className="px-4 py-8 sm:py-16 bg-[#f8f6f2]">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-8 sm:mb-12 text-center">
            What Happens Next
          </h2>

          {/* Timeline - Desktop (horizontal) */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connector Line */}
              <div className="absolute top-4 left-[12.5%] right-[12.5%] h-[2px] bg-[#e0d8cd]" />

              {/* Timeline Steps */}
              <div className="grid grid-cols-4 gap-4">
                {/* Step 1 - TODAY (highlighted) */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#b8926b] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f8f6f2]">
                    <span className="text-white text-sm font-semibold">1</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#b8926b] mb-2">
                    TODAY
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Complete the two steps below, accept your calendar invite and read your pre-call guide
                  </p>
                </div>

                {/* Step 2 - Before Your Call */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f8f6f2]">
                    <span className="text-white text-sm font-semibold">2</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-2">
                    BEFORE YOUR CALL
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Hope, our AI assistant, will call to ask a few questions so we&apos;re fully prepared and your time on the call is well spent
                  </p>
                </div>

                {/* Step 3 - On The Call */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f8f6f2]">
                    <span className="text-white text-sm font-semibold">3</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-2">
                    ON THE CALL
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    We&apos;ll talk through your situation and see if HUM is the right fit
                  </p>
                </div>

                {/* Step 4 - After */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f8f6f2]">
                    <span className="text-white text-sm font-semibold">4</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-2">
                    AFTER
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    If it makes sense, we&apos;ll show you exactly how to get started
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline - Mobile (vertical) */}
          <div className="md:hidden">
            <div className="relative pl-12">
              {/* Vertical Connector Line */}
              <div className="absolute left-[28px] top-4 bottom-4 w-[2px] bg-[#e0d8cd]" />

              {/* Step 1 - TODAY (highlighted) */}
              <div className="relative pb-8">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#b8926b] flex items-center justify-center ring-4 ring-[#f8f6f2]">
                  <span className="text-white text-sm font-semibold">1</span>
                </div>
                <div className="pt-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#b8926b] mb-1">
                    TODAY
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Complete the two steps below, accept your calendar invite and read your pre-call guide
                  </p>
                </div>
              </div>

              {/* Step 2 - Before Your Call */}
              <div className="relative pb-8">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center ring-4 ring-[#f8f6f2]">
                  <span className="text-white text-sm font-semibold">2</span>
                </div>
                <div className="pt-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-1">
                    BEFORE YOUR CALL
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Hope, our AI assistant, will call to ask a few questions so we&apos;re fully prepared and your time on the call is well spent
                  </p>
                </div>
              </div>

              {/* Step 3 - On The Call */}
              <div className="relative pb-8">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center ring-4 ring-[#f8f6f2]">
                  <span className="text-white text-sm font-semibold">3</span>
                </div>
                <div className="pt-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-1">
                    ON THE CALL
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    We&apos;ll talk through your situation and see if HUM is the right fit
                  </p>
                </div>
              </div>

              {/* Step 4 - After */}
              <div className="relative">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center ring-4 ring-[#f8f6f2]">
                  <span className="text-white text-sm font-semibold">4</span>
                </div>
                <div className="pt-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-1">
                    AFTER
                  </p>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    If it makes sense, we&apos;ll show you exactly how to get started
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          STEP 1 - Accept Calendar Invite
      =================================================================== */}
      <section className="px-4 py-8 sm:py-16 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#b8926b] mb-2 sm:mb-3 text-center">
            STEP 1: ACCEPT YOUR CALENDAR INVITE
          </p>

          <h2 className="text-[26px] sm:text-[44px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-6 sm:mb-10 text-center">
            Confirm Your Call
          </h2>

          {/* Calendar Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
            <h3 className="text-[15px] sm:text-[20px] font-semibold text-[#323B46] mb-2">
              Click yes on the calendar invite that was sent to your email.
            </h3>

            {/* Dynamic Calendar Invite Preview */}
            <Suspense fallback={null}>
              <DynamicCalendarCard />
            </Suspense>

            <p className="text-[12px] sm:text-[14px] text-[#555] leading-relaxed">
              <span className="font-semibold">Why this matters:</span> Accepting your calendar invite ensures you have the appointment saved and you&apos;ll receive all the important details and reminders leading up to our call.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          STEP 2 - Download Pre-Call Guide
      =================================================================== */}
      <section className="px-4 py-8 sm:py-16 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#b8926b] mb-2 sm:mb-3">
            STEP 2: EVERYTHING YOU NEED TO KNOW
          </p>

          <h2 className="text-[26px] sm:text-[44px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-6 sm:mb-10">
            Download Your<br />
            Pre-Call Guide
          </h2>

          {/* Download Card */}
          <div className="bg-[#ebe6df] rounded-2xl sm:rounded-3xl p-6 sm:p-10">
            <p className="text-[14px] sm:text-[20px] text-[#555] mb-5 sm:mb-8 leading-relaxed">
              This guide contains everything you need to know to get the absolute most value from our call.
            </p>

            <a
              href="https://slaw-floral-56242297.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 sm:px-10 py-3.5 sm:py-4 bg-[#1a1a1a] text-white hover:bg-black font-medium rounded-full transition-colors text-sm sm:text-base"
            >
              Download the Pre-Call PDF
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PERSONAL NOTE - Message from Founder
      =================================================================== */}
      <section className="px-4 py-8 sm:py-16 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#ebe6df] rounded-2xl sm:rounded-3xl p-5 sm:p-10">
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-5 sm:mb-8 text-center">
              A Personal Note From<br />
              Our Founder <span className="inline-block">❤️</span>
            </h2>

            <div className="text-[13px] sm:text-[20px] text-[#444] space-y-3 sm:space-y-4 leading-relaxed">
              <p>
                I wanted to take a moment to personally thank you for scheduling a call with us.
              </p>

              <p>
                I know how valuable your time is, and I&apos;m genuinely excited for the possibility of working together.
              </p>

              <p>
                My business partners and I started this company for a simple reason: to bring families closer together.
              </p>

              <p>
                We saw too many brilliant, driven moms, people managing everything for everyone, silently struggling at home.
              </p>

              <p>
                They were giving their all, but felt like they were losing themselves in the process.
              </p>

              <p>
                Our mission is to change that. We help busy moms bring calm and order to their homes so they can be truly present with what matters.
              </p>

              <p>
                This journey, however, is a partnership. Our system is the vehicle, but your commitment is the fuel.
              </p>

              <p>
                If you&apos;re a mom dedicated to your family, and ready to commit to a process that will bring your family closer together, then I believe we are the right fit for you.
              </p>

              <p>
                My team and I can&apos;t wait to speak with you.
              </p>

              <p className="pt-1 sm:pt-2">
                Warmly,
              </p>

              {/* Founder Signature */}
              <div className="pt-1">
                <p className="font-semibold text-[#323B46]">-Pedro</p>
                <p className="text-[#666]">Co-Founder</p>
              </div>

              {/* Founder Photo */}
              <div className="pt-1 sm:pt-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                  <img
                    src="/pedro-headshot.png"
                    alt="Pedro - Co-Founder"
                    className="w-full h-full object-cover object-top scale-125"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
