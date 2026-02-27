// =============================================================================
// Booked Confirmation Page (/booked)
// =============================================================================
// This page is shown to users after they successfully book a consultation call.
// URL: humhome.co/booked
// =============================================================================

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";

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
    email: string;
    phone: string;
    duration: string;
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
    // Support both old params and new Scheduler.ai params
    // Scheduler.ai now sends meeting_start in ISO format (e.g., 2026-02-13T17:30:00-06:00)
    const eventStartTime = searchParams.get("meeting_start") || searchParams.get("event_start_time") || searchParams.get("start_time");
    const timeZone = searchParams.get("timeZone") || searchParams.get("timezone") || searchParams.get("user_timezone") || "America/Chicago";
    const assignedToParam = searchParams.get("assigned_to");
    // Scheduler.ai uses "name" or "user_name" instead of "invitee_full_name"
    const inviteeFullName = searchParams.get("invitee_full_name") || searchParams.get("name") || searchParams.get("user_name");
    const email = searchParams.get("email") || searchParams.get("user_email") || "";
    const phone = searchParams.get("phone") || searchParams.get("user_phone") || "";
    const duration = searchParams.get("duration") || "";

    const decodedTimeZone = decodeURIComponent(timeZone);
    const assignedTo = assignedToParam
      ? decodeURIComponent(assignedToParam).replace(/\+/g, " ").trim()
      : "";
    const inviteeName = inviteeFullName
      ? decodeURIComponent(inviteeFullName).replace(/\+/g, " ").trim()
      : "";

    // If no event start time, still return details with what we have
    if (!eventStartTime) {
      setDetails({
        targetDate: null,
        timeZone: decodedTimeZone,
        assignedTo,
        inviteeName,
        email: decodeURIComponent(email),
        phone: decodeURIComponent(phone),
        duration,
        month: "",
        monthShort: "",
        day: 0,
        weekday: "",
        weekdayShort: "",
        time: "",
        tzAbbrev: "",
        formattedDateTime: "Check your email for details",
      });
      return;
    }

    const decodedTime = decodeURIComponent(eventStartTime);
    const targetDate = new Date(decodedTime);

    if (isNaN(targetDate.getTime())) {
      setDetails({
        targetDate: null,
        timeZone: decodedTimeZone,
        assignedTo,
        inviteeName,
        email: decodeURIComponent(email),
        phone: decodeURIComponent(phone),
        duration,
        month: "",
        monthShort: "",
        day: 0,
        weekday: "",
        weekdayShort: "",
        time: "",
        tzAbbrev: "",
        formattedDateTime: "Check your email for details",
      });
      return;
    }

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
      email: decodeURIComponent(email),
      phone: decodeURIComponent(phone),
      duration,
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
    <section id="countdown" className="px-4 pt-2 pb-10 sm:pt-4 sm:pb-16 bg-[#fefdfb]">
      <div className="max-w-[560px] mx-auto">
        <div className="bg-[#f5f0e8] rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-10 sm:py-10 text-center transition-all duration-300 hover:shadow-lg animate-on-load animate-fade-in-up animation-delay-300">
          {status === "counting" && (
            <>
              <p className="text-[16px] sm:text-[18px] text-[#555] mb-4 sm:mb-6">
                Your consultation is in:
              </p>

              {/* Countdown Display */}
              <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.days}
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    days
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.hours}
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    hours
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.minutes}
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                    minutes
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                    {countdown.seconds}
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
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
            <p className="text-[16px] sm:text-[18px] text-[#555] mb-4 sm:mb-6">
              Your call was scheduled for:
            </p>
          )}

          {/* Date/Time Display */}
          <p className="text-[16px] sm:text-[18px] text-[#323B46]">
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
    <div className="bg-[#fefdfb] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
          <div className="space-y-1 sm:space-y-1.5 text-[14px] sm:text-[15px]">
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
            <button className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#6b8e5e] text-white text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b8e5e] focus-visible:ring-offset-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Yes
            </button>
            <button className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#ddd] text-[#555] text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#bbb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8926b] focus-visible:ring-offset-2">
              Maybe
            </button>
            <button className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#ddd] text-[#555] text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#bbb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8926b] focus-visible:ring-offset-2">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Audio Player Component for "Dancing With Your Daughters"
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format time in mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      // Also update duration here as fallback for m4a files
      if (audioRef.current.duration && !isNaN(audioRef.current.duration) && audioRef.current.duration !== Infinity) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration) && audioRef.current.duration !== Infinity) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleCanPlay = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration) && audioRef.current.duration !== Infinity) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/dancing-with-your-daughters.m4a"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onDurationChange={handleCanPlay}
        onEnded={handleEnded}
      />

      {/* Song Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="/audio/cover-photo.png"
            alt="Dancing With Your Daughters"
            className="w-full h-full object-cover object-[center_10%]" style={{ transform: 'scaleX(-1) scale(1.2)' }}
          />
        </div>
        <div>
          <h4 className="font-semibold text-[14px] sm:text-[16px] text-[#1a1a1a]">
            Dancing With Your Daughters
          </h4>
          <p className="text-[12px] sm:text-[13px] text-[#666]">The song behind the mission</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:bg-[#333] hover:scale-110 hover:shadow-lg active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8926b] focus-visible:ring-offset-2"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress Section */}
        <div className="flex-1 min-w-0">
          {/* Progress Bar with visible scrubber */}
          <div className="relative h-6 flex items-center group">
            {/* Track background */}
            <div className="absolute left-0 right-0 h-1.5 sm:h-2 bg-[#e5e5e5] rounded-full" />
            {/* Progress fill */}
            <div
              className="absolute left-0 h-1.5 sm:h-2 bg-black rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            />
            {/* Scrubber thumb */}
            <div
              className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 bg-black rounded-full shadow-md pointer-events-none transform -translate-x-1/2 transition-transform group-hover:scale-110"
              style={{ left: `${progress}%` }}
            />
            {/* Invisible range input for interaction */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="absolute left-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Seek"
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between mt-1">
            <span className="text-[11px] sm:text-[12px] text-[#666] tabular-nums">
              {formatTime(currentTime)}
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#666] tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <div className="relative w-20 h-5 flex items-center group">
            <div className="absolute left-0 right-0 h-1.5 bg-[#e5e5e5] rounded-full" />
            <div
              className="absolute left-0 h-1.5 bg-[#666] rounded-full pointer-events-none"
              style={{ width: `${volume * 100}%` }}
            />
            <div
              className="absolute w-3 h-3 bg-[#666] rounded-full shadow-sm pointer-events-none transform -translate-x-1/2"
              style={{ left: `${volume * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute left-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <p className="text-[12px] sm:text-[13px] text-[#777] text-center mt-4 italic">
        This song is shared with you personally. Please don&apos;t distribute.
      </p>
    </div>
  );
}

// Section definitions for navigation
const SECTIONS = [
  { id: 'hero', label: 'Welcome' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'timeline', label: 'What\'s Next' },
  { id: 'step-1', label: 'Step 1' },
  { id: 'step-2', label: 'Step 2' },
  { id: 'letter', label: 'Personal Note' },
];

// Scroll Progress Indicator Component with completion celebration
function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [hasShownCompletion, setHasShownCompletion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Show completion message when reaching 95%+ for the first time
      if (progress >= 95 && !hasShownCompletion) {
        setShowCompletion(true);
        setHasShownCompletion(true);
        // Auto-hide after 3 seconds
        setTimeout(() => setShowCompletion(false), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownCompletion]);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#f5f0e8]">
        <div
          className="h-full bg-[#b8926b] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Completion celebration */}
      {showCompletion && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-down">
          <div className="bg-[#6b8e5e] text-white px-4 py-2 rounded-full text-[13px] font-medium shadow-lg flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&apos;ve seen everything!
          </div>
        </div>
      )}
    </>
  );
}

// Section Navigation Dots (desktop only)
function SectionNavDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dots after scrolling past hero
      setIsVisible(window.scrollY > 200);

      // Determine active section
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Go to ${section.label}`}
        >
          <span className={`text-[11px] uppercase tracking-wider transition-all duration-200 ${
            activeSection === section.id
              ? 'text-[#b8926b] opacity-100'
              : 'text-[#999] opacity-0 group-hover:opacity-100'
          }`}>
            {section.label}
          </span>
          <div className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-200 ${
            activeSection === section.id
              ? 'bg-[#b8926b] border-[#b8926b] scale-110'
              : 'bg-transparent border-[#ccc] group-hover:border-[#b8926b]'
          }`} />
        </button>
      ))}
    </div>
  );
}

// Mobile Section Indicator (shows current section on mobile)
function MobileSectionIndicator() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero, hide near bottom
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;

      setIsVisible(scrollY > 300 && scrollPercent < 90);

      // Determine active section
      const scrollPosition = scrollY + window.innerHeight / 2;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].label);
          setSectionIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const progress = ((sectionIndex + 1) / SECTIONS.length) * 100;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[#eee] px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <span className="text-[11px] uppercase tracking-wider text-[#888] font-medium truncate">
          {activeSection}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-20 h-1.5 bg-[#eee] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#b8926b] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-[#999] tabular-nums">
            {sectionIndex + 1}/{SECTIONS.length}
          </span>
        </div>
      </div>
    </div>
  );
}

// Back to Top Button
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-16 lg:bottom-6 right-4 lg:right-6 z-40 w-10 h-10 lg:w-11 lg:h-11 bg-[#323B46] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#1a1a1a] hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

// Scroll Reveal Animation Hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Expandable Letter Component
function ExpandableLetter() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl text-[15px] sm:text-[16px] font-semibold transition-all duration-200 ${
          isExpanded
            ? 'text-[#888] hover:text-[#666]'
            : 'bg-[#323B46] text-white hover:bg-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-lg'
        }`}
      >
        {isExpanded ? (
          <>
            <span>Close letter</span>
            <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            <span>Read Pedro&apos;s Full Letter</span>
            <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Expandable Content - continues after the mission statement */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-4 sm:pt-6 border-t border-[#e5ddd0]">
          <p className="text-[12px] sm:text-[13px] text-[#999] text-center mb-5 sm:mb-6">
            2 min read
          </p>

          {/* Rest of the letter content */}
          <div className="text-[16px] sm:text-[17px] text-[#3d3d3d] leading-[1.8] sm:leading-[1.9] space-y-5 sm:space-y-6">
            <p>
              That&apos;s not a tagline. That&apos;s what gets me out of bed when building a company is hard. It&apos;s what anchors me when the sacrifices pile up. And it&apos;s what makes every sacrifice worth it, because this mission is bigger than us.
            </p>

            <p>
              Since starting HUM, I&apos;ve talked to hundreds of families. And every single conversation has only deepened my belief in why this work matters.
            </p>

            <p>
              I hear about the morning chaos. Getting everyone fed, dressed, and out the door while simultaneously fielding the work email that can&apos;t wait.
            </p>

            <p>
              I hear about the evening scramble. Dinner, homework, baths, bedtime, while mentally running through tomorrow&apos;s logistics.
            </p>

            <p>
              I hear about the phone that never turns off. Because you never know when you&apos;ll get that call from school. Something happened. Someone forgot something. There&apos;s always something that needs your attention.
            </p>

            <p>
              I hear about the unexpected sick kid that throws the entire week off. The nanny canceling last minute. The work commitment that collides with the school event, the one that really means a lot to your child.
            </p>

            <p>
              I hear about the pressure of making sure everyone else is taken care of before you even think about taking care of yourself.
            </p>

            <p>
              And I hear about the spouse. The person you chose to build a life with, and how the weight of all of this gets in the way of the relationship with the person you love the most.
            </p>

            <p>
              I understand that pressure. I understand the absorption of it. And I understand what it feels like to not be able to turn it off.
            </p>

            <p>
              I want you to know that I see you. I see what you carry. I see the invisible work. I see the thousand decisions a day that nobody notices.
            </p>

            <p>
              And I want to say thank you. For being here. For trusting us enough to book this call. For even considering that there might be a different way.
            </p>

            <p>
              It is the honor of my life to come to work every single day and build something that gets to make your life a little easier. Or a lot easier.
            </p>

            <p>
              We&apos;re just getting started.
            </p>

            <p>
              In gratitude,<br />
              Pedro<br />
              Co-Founder
            </p>

            {/* Founder Photo */}
            <div className="pt-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
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
    <section id="hero" className="px-4 pt-4 pb-6 sm:pt-8 sm:pb-12 bg-[#fefdfb]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#b8926b] mb-4 sm:mb-6 animate-on-load animate-fade-in-up">
          CALL SCHEDULED
        </p>

        {/* Main Headline */}
        <h1 className="text-[28px] sm:text-[44px] md:text-[52px] font-semibold text-[#323B46] leading-[1.15] tracking-tight mb-3 sm:mb-5 animate-on-load animate-fade-in-up animation-delay-100">
          {firstName ? (
            <>Congratulations {firstName},<br />You&apos;re Booked!</>
          ) : (
            <>Congratulations,<br />You&apos;re Booked!</>
          )}
        </h1>

        {/* Description */}
        <p className="text-[16px] sm:text-[20px] text-[#555] max-w-xl mx-auto mb-3 sm:mb-5 leading-relaxed px-2 sm:px-0 animate-on-load animate-fade-in-up animation-delay-200">
          Your life is about to get a whole lot easier. Please take a moment now to read through everything on this page. It&apos;s essential to getting the most out of our time together. Be sure to check your email and phone for additional details.
        </p>

        {/* Open loop - creates curiosity */}
        <p className="text-[14px] sm:text-[15px] text-[#b8926b] max-w-md mx-auto mb-4 sm:mb-8 px-2 sm:px-0 animate-on-load animate-fade-in-up animation-delay-300 italic">
          P.S. There&apos;s something personal waiting for you at the end of this page. A gift we&apos;ve never shared publicly.
        </p>

        {/* Scroll indicator - mobile only */}
        <div className="sm:hidden flex flex-col items-center animate-bounce-subtle">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#999] mb-1">Scroll</span>
          <svg className="w-5 h-5 text-[#b8926b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default function BookedPage() {
  // Initialize scroll reveal animations
  useScrollReveal();

  return (
    <div className="bg-[#fefdfb] text-[#454545] min-h-screen">
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
        /* Scroll reveal animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        /* Safe area for iOS devices */
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 8px);
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Section Navigation Dots - Desktop */}
      <SectionNavDots />

      {/* Mobile Section Indicator */}
      <MobileSectionIndicator />

      {/* Back to Top Button */}
      <BackToTopButton />

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
      <section id="timeline" className="px-4 py-8 sm:py-16 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto scroll-reveal">
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
                  <div className="w-8 h-8 rounded-full bg-[#b8926b] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f5f0e8]">
                    <span className="text-white text-sm font-semibold">1</span>
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#b8926b] mb-2">
                    TODAY
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
                    Complete the two steps below, accept your calendar invite and read your pre-call guide
                  </p>
                </div>

                {/* Step 2 - Before Your Call */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f5f0e8]">
                    <span className="text-white text-sm font-semibold">2</span>
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-2">
                    BEFORE YOUR CALL
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
                    Review your pre-call guide thoroughly and share it with your spouse or partner so everyone&apos;s on the same page
                  </p>
                </div>

                {/* Step 3 - On The Call */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f5f0e8]">
                    <span className="text-white text-sm font-semibold">3</span>
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-2">
                    ON THE CALL
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
                    We&apos;ll talk through your situation and see if HUM is the right fit
                  </p>
                </div>

                {/* Step 4 - After */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center mb-4 relative z-10 ring-4 ring-[#f5f0e8]">
                    <span className="text-white text-sm font-semibold">4</span>
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-2">
                    AFTER
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
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
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#b8926b] flex items-center justify-center ring-4 ring-[#f5f0e8]">
                  <span className="text-white text-sm font-semibold">1</span>
                </div>
                <div className="pt-1">
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#b8926b] mb-1">
                    TODAY
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
                    Complete the two steps below, accept your calendar invite and read your pre-call guide
                  </p>
                </div>
              </div>

              {/* Step 2 - Before Your Call */}
              <div className="relative pb-8">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center ring-4 ring-[#f5f0e8]">
                  <span className="text-white text-sm font-semibold">2</span>
                </div>
                <div className="pt-1">
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-1">
                    BEFORE YOUR CALL
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
                    Review your pre-call guide thoroughly and share it with your spouse or partner so everyone&apos;s on the same page
                  </p>
                </div>
              </div>

              {/* Step 3 - On The Call */}
              <div className="relative pb-8">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center ring-4 ring-[#f5f0e8]">
                  <span className="text-white text-sm font-semibold">3</span>
                </div>
                <div className="pt-1">
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-1">
                    ON THE CALL
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
                    We&apos;ll talk through your situation and see if HUM is the right fit
                  </p>
                </div>
              </div>

              {/* Step 4 - After */}
              <div className="relative">
                <div className="absolute left-[-36px] w-8 h-8 rounded-full bg-[#d4ccc0] flex items-center justify-center ring-4 ring-[#f5f0e8]">
                  <span className="text-white text-sm font-semibold">4</span>
                </div>
                <div className="pt-1">
                  <p className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-1">
                    AFTER
                  </p>
                  <p className="text-[15px] sm:text-[15px] text-[#555] leading-relaxed">
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
      <section id="step-1" className="px-4 py-8 sm:py-16 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto scroll-reveal">
          {/* Section Header */}
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#b8926b] mb-2 sm:mb-3 text-center">
            STEP 1: ACCEPT YOUR CALENDAR INVITE
          </p>

          <h2 className="text-[26px] sm:text-[44px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-6 sm:mb-10 text-center">
            Confirm Your Call
          </h2>

          {/* Calendar Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-[15px] sm:text-[20px] font-semibold text-[#323B46] mb-2">
              Click yes on the calendar invite that was sent to your email.
            </h3>

            {/* Dynamic Calendar Invite Preview */}
            <Suspense fallback={null}>
              <DynamicCalendarCard />
            </Suspense>

            <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed">
              <span className="font-semibold">Why this matters:</span> Accepting your calendar invite ensures you have the appointment saved and you&apos;ll receive all the important details and reminders leading up to our call.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          STEP 2 - Download Pre-Call Guide
      =================================================================== */}
      <section id="step-2" className="px-4 py-8 sm:py-16 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto text-center scroll-reveal">
          {/* Section Header */}
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#b8926b] mb-2 sm:mb-3">
            STEP 2: EVERYTHING YOU NEED TO KNOW
          </p>

          <h2 className="text-[26px] sm:text-[44px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-6 sm:mb-10">
            Download Your<br />
            Pre-Call Guide
          </h2>

          {/* Download Card */}
          <div className="bg-[#f5f0e8] rounded-2xl sm:rounded-3xl p-6 sm:p-10 transition-all duration-300 hover:shadow-lg">
            <p className="text-[16px] sm:text-[20px] text-[#555] mb-4 sm:mb-6 leading-relaxed">
              This guide contains everything you need to know to get the absolute most value from our call.
            </p>

            <p className="text-[15px] sm:text-[17px] text-[#555] mb-5 sm:mb-8 leading-relaxed">
              <span className="font-medium text-[#323B46]">Important:</span> If you have a spouse or partner involved in household decisions, please share this guide with them too. Coming to the call aligned makes everything smoother.
            </p>

            <a
              href="https://slaw-floral-56242297.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 sm:px-10 py-3.5 sm:py-4 bg-[#1a1a1a] text-white font-medium rounded-full text-sm sm:text-base transition-all duration-200 hover:bg-black hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] active:translate-y-0 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8926b] focus-visible:ring-offset-2"
            >
              Download the Pre-Call PDF
            </a>
          </div>

          {/* Teaser for next section */}
          <div className="mt-10 sm:mt-14 flex flex-col items-center">
            <p className="text-[13px] sm:text-[14px] text-[#888] mb-2">One more thing...</p>
            <p className="text-[15px] sm:text-[17px] text-[#555] font-medium">We have a personal gift for you below</p>
            <svg className="w-5 h-5 text-[#b8926b] mt-3 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===================================================================
          PERSONAL NOTE - Message from Founder + Audio Player
      =================================================================== */}
      <section id="letter" className="px-4 py-8 sm:py-16 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto scroll-reveal">
          {/* SVG filter for deckle edge effect - only applied to background */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="deckle-edge" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03 0.03" numOctaves="4" result="noise" seed="2" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Wrapper for positioning */}
          <div className="relative" style={{ transform: 'rotate(-0.3deg)' }}>
            {/* Paper background with deckle edges - ONLY this layer gets the filter */}
            <div
              className="absolute inset-0"
              style={{
                background: '#f5f0e8',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05), inset 0 0 60px rgba(255,255,255,0.5)',
                borderRadius: '2px',
                filter: 'url(#deckle-edge)',
              }}
            />

            {/* Content container - NO filter, crisp text */}
            <div className="relative p-6 sm:p-10 md:p-12">
              {/* Subtle paper texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
              />

            <h2 className="relative text-[24px] sm:text-[36px] md:text-[42px] font-semibold text-[#323B46] leading-tight mb-3 sm:mb-4 text-center">
              A Personal Note From<br />
              Our Founder <span className="inline-block">❤️</span>
            </h2>

            {/* Intro - always visible */}
            <div className="relative text-[16px] sm:text-[17px] text-[#3d3d3d] leading-[1.8] sm:leading-[1.9] space-y-5 sm:space-y-6 mb-6 sm:mb-8">
              <p>
                I wanted to take a moment to personally thank you for booking this call. I know how valuable your time is, and I don&apos;t take it lightly.
              </p>

              <p>
                But before we talk, I want you to know something. Not about how HUM works. About <em>why</em> it exists.
              </p>

              <p>
                Before HUM was ever a company, before we had a single client or a team or a website, my life partner and best friend wrote a song. It&apos;s called &ldquo;Dancing With Your Daughters.&rdquo;
              </p>

              <p>
                It&apos;s still unreleased. But I&apos;m sharing it with you here because this song captures the heart behind why HUM exists better than anything I could ever say.
              </p>
            </div>

            {/* ===================================================================
                AUDIO PLAYER - Positioned after intro, before the hook
            =================================================================== */}
            <div id="audio-player" className="relative mb-6 sm:mb-8">
              <AudioPlayer />
            </div>

            {/* Post-audio hook - leads to mission statement */}
            <div className="relative text-[16px] sm:text-[17px] text-[#3d3d3d] leading-[1.8] sm:leading-[1.9] space-y-5 sm:space-y-6 mb-6 sm:mb-8">
              <p>
                It&apos;s a song about presence. About being here, fully here, with the people you love while you still can. About holding close the ones you hold dear, knowing that none of it lasts forever. And about softening enough to actually receive the beautiful, ordinary, sacred moments instead of running past them.
              </p>

              <p>
                When I first heard it, something clicked in my chest. Because that&apos;s exactly what I was watching families lose. Not because they didn&apos;t care. But because they were so buried in the logistics of life that they couldn&apos;t be present for the life itself.
              </p>

              <p>
                That song planted something deep in both of us. A conviction that became a mission. And that mission became HUM.
              </p>

              <p className="text-[18px] sm:text-[22px] font-semibold text-[#323B46] py-3 text-center">
                Bringing families closer together.
              </p>
            </div>

            {/* Expandable Full Letter - continues from here */}
            <ExpandableLetter />
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
              <Link href="/privacy-policy" className="text-[12px] sm:text-[13px] text-[#666] hover:text-[#444] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-[12px] sm:text-[13px] text-[#666] hover:text-[#444] transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-[12px] sm:text-[13px] text-[#666] hover:text-[#444] transition-colors">
                Disclaimer
              </Link>
              <Link href="/cookie-policy" className="text-[12px] sm:text-[13px] text-[#666] hover:text-[#444] transition-colors">
                Cookie Policy
              </Link>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#888]">
              © {new Date().getFullYear()} HUM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
