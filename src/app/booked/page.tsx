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
    persona: "mom" | "dad" | "individual";
    hasPartner: boolean;
  } | null>(null);

  useEffect(() => {
    const eventStartTime = searchParams.get("meeting_start") || searchParams.get("event_start_time") || searchParams.get("start_time");
    const timeZone = searchParams.get("timeZone") || searchParams.get("timezone") || searchParams.get("user_timezone") || "America/Chicago";
    const assignedToParam = searchParams.get("assigned_to");
    const inviteeFullName = searchParams.get("invitee_full_name") || searchParams.get("name") || searchParams.get("user_name");
    const email = searchParams.get("email") || searchParams.get("user_email") || "";
    const phone = searchParams.get("phone") || searchParams.get("user_phone") || "";
    const duration = searchParams.get("duration") || "";
    const personaRaw = searchParams.get("are_you_a_mom_or_dad") || "";
    const partnerRaw = searchParams.get("do_you_live_with_a_partner_or_spouse") || "";
    const persona: "mom" | "dad" | "individual" = personaRaw.includes("dad") ? "dad" : personaRaw.includes("mom") ? "mom" : "individual";
    const hasPartner = partnerRaw === "yes";

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
        persona,
        hasPartner,
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
        persona,
        hasPartner,
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
      persona,
      hasPartner,
    });
  }, [searchParams]);

  return details;
}

// Advisor data
const ADVISORS_LIST = [
  { fullName: "Edward Bertsch", name: "Edward", role: "HUM Family Advisor", initials: "EB" },
  { fullName: "Alyeria Faith", name: "Alyeria", role: "HUM Family Advisor", initials: "AF" },
];

function findAdvisor(assignedTo: string) {
  if (!assignedTo) return null;
  const normalized = assignedTo.toLowerCase().trim();
  return ADVISORS_LIST.find(a =>
    a.fullName.toLowerCase() === normalized ||
    a.name.toLowerCase() === normalized ||
    normalized.includes(a.name.toLowerCase())
  ) || null;
}

function AdvisorInitialAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#b8926b] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-[11px] font-semibold">{initials}</span>
    </div>
  );
}

// Dynamic Calendar Card Component
function DynamicCalendarCard({ isGeneric = false }: { isGeneric?: boolean }) {
  const bookingDetails = useBookingDetails();

  const monthShort = bookingDetails?.monthShort || "TBD";
  const day = bookingDetails?.day || "";
  const weekdayShort = bookingDetails?.weekdayShort || "";
  const formattedDateTime = bookingDetails?.formattedDateTime || "Check your email for details";
  const assignedTo = bookingDetails?.assignedTo || "";
  const inviteeName = bookingDetails?.inviteeName || "";
  const duration = bookingDetails?.duration || "";

  const matchedAdvisor = findAdvisor(assignedTo);

  // Generic mode: hide the calendar card entirely
  if (isGeneric) {
    return null;
  }

  return (
    <div className="bg-[#f5f0e8] rounded-xl sm:rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden w-20 sm:w-24">
            <div className="bg-[#b8926b] text-white text-xs sm:text-sm font-medium py-1.5 text-center">
              {monthShort}
            </div>
            <div className="py-3 sm:py-4 text-center bg-white">
              <div className="text-3xl sm:text-4xl font-light text-[#323B46] leading-none">
                {day || "?"}
              </div>
              <div className="text-xs text-[#888] mt-1">{weekdayShort || "---"}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[14px] sm:text-[16px] text-[#323B46] mb-2">
            Your HUM Consultation
          </h4>
          <div className="space-y-1 sm:space-y-1.5 text-[13px] sm:text-[14px]">
            <div className="flex">
              <span className="text-[#888] w-14 flex-shrink-0">When</span>
              <span className="text-[#555]">{formattedDateTime}</span>
            </div>
            <div className="flex">
              <span className="text-[#888] w-14 flex-shrink-0">Where</span>
              <span className="text-[#555]">Zoom, link in your email</span>
            </div>
            {duration && (
              <div className="flex">
                <span className="text-[#888] w-14 flex-shrink-0">Length</span>
                <span className="text-[#555]">{duration} min. We&apos;ll stay on if there&apos;s more to cover</span>
              </div>
            )}
          </div>

          {matchedAdvisor && (
            <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-[#e5ddd0]">
              <AdvisorInitialAvatar initials={matchedAdvisor.initials} />
              <div>
                <p className="text-[13px] font-semibold text-[#323B46]">{matchedAdvisor.name}</p>
                <p className="text-[11px] text-[#888]">{matchedAdvisor.role}</p>
              </div>
            </div>
          )}
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
    <div className="bg-[#1a1a1a] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)]">
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

      {/* Album art + song info — cinematic layout */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-white/10">
          <img
            src="/audio/cover-photo.png"
            alt="Dancing With Your Daughters"
            className="w-full h-full object-cover object-[center_10%]" style={{ transform: 'scaleX(-1) scale(1.2)' }}
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#b8926b] mb-1">Unreleased</p>
          <h4 className="font-semibold text-[18px] sm:text-[22px] lg:text-[24px] text-white leading-tight mb-1">
            Dancing With Your Daughters
          </h4>
          <p className="text-[13px] sm:text-[14px] text-[#888]">The song behind the mission</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#b8926b] flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:bg-[#c9a37c] hover:scale-105 hover:shadow-lg hover:shadow-[#b8926b]/20 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8926b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="relative h-6 flex items-center group">
            <div className="absolute left-0 right-0 h-1.5 sm:h-2 bg-[#333] rounded-full" />
            <div
              className="absolute left-0 h-1.5 sm:h-2 bg-[#b8926b] rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#b8926b] rounded-full shadow-md pointer-events-none transform -translate-x-1/2 transition-transform group-hover:scale-110 ring-2 ring-[#1a1a1a]"
              style={{ left: `${progress}%` }}
            />
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
          <div className="flex justify-between mt-1">
            <span className="text-[11px] sm:text-[12px] text-[#666] tabular-nums">
              {formatTime(currentTime)}
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#666] tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <svg className="w-4 h-4 text-[#666]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <div className="relative w-20 h-5 flex items-center group">
            <div className="absolute left-0 right-0 h-1.5 bg-[#333] rounded-full" />
            <div
              className="absolute left-0 h-1.5 bg-[#666] rounded-full pointer-events-none"
              style={{ width: `${volume * 100}%` }}
            />
            <div
              className="absolute w-3 h-3 bg-[#888] rounded-full shadow-sm pointer-events-none transform -translate-x-1/2"
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

      <p className="text-[12px] sm:text-[13px] text-[#555] text-center mt-5 italic">
        This song is shared with you personally. Please don&apos;t distribute.
      </p>
    </div>
  );
}

// Section definitions for navigation
const SECTIONS = [
  { id: 'hero', label: 'Welcome' },
  { id: 'expect', label: 'What to Expect' },
  { id: 'checklist', label: 'Before the Call' },
  { id: 'families', label: 'From Families' },
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
            : 'bg-[#1a1a1a] text-white hover:bg-black hover:-translate-y-0.5 hover:shadow-lg'
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

// Pre-Call Guide Step (routes to persona-specific page)
function PreCallGuideStep() {
  const bookingDetails = useBookingDetails();
  const persona = bookingDetails?.persona || "mom";
  const guideHref = "https://slaw-floral-56242297.figma.site";

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#b8926b] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-sm sm:text-base font-semibold">3</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[16px] sm:text-[18px] text-[#323B46] mb-2">
            Read the pre-call guide
          </h3>
          <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed mb-4">
            A short guide covering what we&apos;ll discuss and a few questions worth bringing to the table. Share it with your partner so you&apos;re both on the same page.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={guideHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 bg-[#1a1a1a] text-white font-semibold rounded-xl text-[15px] sm:text-[16px] transition-all duration-200 hover:bg-black hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8926b] focus-visible:ring-offset-2"
        >
          Read the Pre-Call Guide
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// Personalized Hero Component — lean, focused confirmation + countdown
function PersonalizedHero({ isGeneric = false }: { isGeneric?: boolean }) {
  const bookingDetails = useBookingDetails();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timerStatus, setTimerStatus] = useState<"counting" | "now" | "passed" | "hidden">("hidden");

  const firstName = bookingDetails?.inviteeName
    ? bookingDetails.inviteeName.split(" ")[0]
    : "";

  useEffect(() => {
    if (!bookingDetails?.targetDate) {
      setTimerStatus("hidden");
      return;
    }

    const targetDate = bookingDetails.targetDate;

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0 && diff > -60000) {
        setTimerStatus("now");
      } else if (diff <= -60000) {
        setTimerStatus("passed");
      } else {
        setTimerStatus("counting");
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [bookingDetails]);

  return (
    <section id="hero" className="relative px-4 pt-8 pb-10 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 bg-[#fefdfb] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(184,146,107,0.04) 0%, transparent 70%)',
      }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-[#b8926b] mb-6 sm:mb-10 animate-on-load animate-fade-in-up">
          CALL SCHEDULED
        </p>

        <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold text-[#323B46] leading-[1.12] tracking-[-0.02em] mb-5 sm:mb-8 animate-on-load animate-fade-in-up animation-delay-100">
          {!isGeneric && firstName && <>{firstName}, </>}You Just Took the First Step Toward Bringing Your Family Closer&nbsp;Together
        </h1>

        <p className="text-[16px] sm:text-[20px] md:text-[22px] text-[#555] max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0 animate-on-load animate-fade-in-up animation-delay-200">
          You already know there&apos;s a better way to run your home. We&apos;re going to show you exactly what that looks like.
        </p>

        {/* Integrated Countdown Timer */}
        {timerStatus !== "hidden" && bookingDetails && (
          <div className="max-w-[560px] mx-auto mb-8 sm:mb-12 animate-on-load animate-fade-in-up animation-delay-300">
            <div className="relative bg-[#f5f0e8] noise-texture rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-10 sm:py-10 text-center transition-all duration-300 hover:shadow-lg">
              {timerStatus === "counting" && (
                <>
                  <p className="relative z-10 text-[14px] sm:text-[16px] text-[#555] mb-4 sm:mb-6">
                    Your consultation is in:
                  </p>
                  <div className="relative z-10 flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                    {[
                      { value: countdown.days, label: "days" },
                      { value: countdown.hours, label: "hours" },
                      { value: countdown.minutes, label: "minutes" },
                      { value: countdown.seconds, label: "seconds" },
                    ].map((unit) => (
                      <div key={unit.label} className="flex flex-col items-center">
                        <span className="text-[26px] sm:text-[46px] font-semibold text-[#323B46] leading-none">
                          {unit.value}
                        </span>
                        <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#888] mt-1">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {timerStatus === "now" && (
                <p className="relative z-10 text-[20px] sm:text-[28px] font-semibold text-[#b8926b] mb-4 sm:mb-6">
                  Your call is starting now!
                </p>
              )}
              {timerStatus === "passed" && (
                <p className="relative z-10 text-[16px] sm:text-[18px] text-[#555] mb-4 sm:mb-6">
                  Your call was scheduled for:
                </p>
              )}
              <p className="relative z-10 text-[16px] sm:text-[18px] text-[#323B46]">
                {bookingDetails.formattedDateTime}
              </p>
            </div>
          </div>
        )}

        <p className="text-[14px] sm:text-[16px] text-[#b8926b] max-w-md mx-auto mb-4 sm:mb-8 px-2 sm:px-0 animate-on-load animate-fade-in-up animation-delay-300 italic">
          P.S. There&apos;s something personal waiting for you at the end of this page. A gift we&apos;ve never shared publicly.
        </p>

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

export default function BookedPage({ isGeneric = false }: { isGeneric?: boolean } = {}) {
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
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        /* Safe area for iOS devices */
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 8px);
        }
        /* Noise texture overlay for premium tactile feel */
        .noise-texture::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          border-radius: inherit;
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
        <PersonalizedHero isGeneric={isGeneric} />
      </Suspense>

      {/* ===================================================================
          WHAT TO EXPECT ON YOUR CALL
      =================================================================== */}
      <section id="expect" className="relative px-4 py-12 sm:py-20 lg:py-24 bg-[#f5f0e8] noise-texture overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto scroll-reveal">
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-[#323B46] leading-tight tracking-[-0.01em] mb-3 sm:mb-4 text-center">
            What to Expect on Your Call
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#555] text-center mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
            A relaxed, honest 30-minute conversation about what&apos;s possible for your family.
          </p>

          {/* What to expect — checklist + how the call feels */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="text-[13px] sm:text-[14px] uppercase tracking-[0.15em] text-[#b8926b] font-semibold mb-3 sm:mb-4">
              By the end of your call, you&apos;ll know:
            </p>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b8926b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[14px] sm:text-[16px] text-[#555]">Exactly what a HUM house manager would handle in your home</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b8926b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[14px] sm:text-[16px] text-[#555]">How the process works from placement to your first Monday morning off</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b8926b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[14px] sm:text-[16px] text-[#555]">Whether this is the right fit for your family. And if it&apos;s not, we&apos;ll tell you</p>
              </div>
            </div>

            <div className="border-t border-[#f0ebe0] mt-6 pt-6">
              <p className="text-[14px] sm:text-[16px] text-[#555] leading-[1.8] sm:leading-[1.9]">
                We&apos;ll start by listening. You&apos;ll tell us about your family, your home, and what&apos;s not working. Then we&apos;ll walk through how HUM could help, tailored to your specific situation.
              </p>
            </div>
          </div>

          {/* Scarcity — authentic capacity limit */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 text-center shadow-sm max-w-2xl mx-auto">
            <p className="text-[13px] sm:text-[14px] text-[#555]">
              <span className="font-semibold text-[#323B46]">We&apos;re currently onboarding just 20 families per month.</span> We&apos;re a small, established team that never takes on more than we can deliver at the highest level. Your call slot is&nbsp;reserved.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          THREE THINGS BEFORE YOUR CALL — Condensed Checklist
      =================================================================== */}
      <section id="checklist" className="px-4 py-12 sm:py-20 lg:py-24 bg-[#fefdfb]">
        <div className="max-w-2xl mx-auto scroll-reveal">
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-[#323B46] leading-tight tracking-[-0.01em] mb-3 sm:mb-4 text-center">
            Three Things to Do<br className="hidden sm:inline" /> Before Your Call
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#555] text-center mb-10 sm:mb-14 max-w-lg mx-auto leading-relaxed">
            Takes about 3 minutes. Each one makes our time together more productive.
          </p>

          <div className="space-y-4 sm:space-y-5">
            {/* Step 1 — Accept Calendar Invite */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#b8926b] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm sm:text-base font-semibold">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[16px] sm:text-[18px] text-[#323B46] mb-2">
                    Accept your calendar invite
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed">
                    Open the confirmation email we just sent and click &ldquo;Yes&rdquo; on the calendar invite. It won&apos;t appear on your calendar until you do. We don&apos;t want you to miss this.
                  </p>
                </div>
              </div>
              <Suspense fallback={null}>
                <div className="mt-4">
                  <DynamicCalendarCard isGeneric={isGeneric} />
                </div>
              </Suspense>
            </div>

            {/* Step 2 — Bring Your Partner */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#b8926b] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm sm:text-base font-semibold">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[16px] sm:text-[18px] text-[#323B46] mb-2">
                    Invite your partner to join
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed mb-3">
                    Your call will be most productive with both decision-makers present. Families who do this together tell us it&apos;s the best conversation they&apos;ve had about their home in years.
                  </p>
                  <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed">
                    If you added their email when booking, they already have the invite. Make sure they accept it too. If not, forward the calendar event and add them directly.
                  </p>
                  <p className="text-[13px] text-[#888] mt-3 italic">
                    Flying solo or the only decision-maker? No problem. Skip this one.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 — Read the Pre-Call Guide */}
            <Suspense fallback={null}>
              <PreCallGuideStep />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FROM FAMILIES WHO'VE BEEN HERE — Social Proof
      =================================================================== */}
      <section id="families" className="relative px-4 py-12 sm:py-20 lg:py-24 bg-[#f5f0e8] noise-texture overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto scroll-reveal">
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-[#b8926b] mb-10 sm:mb-14 text-center">
            FROM FAMILIES WHO&apos;VE BEEN HERE
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">

            {/* Sandi — emotional connection */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[12px] font-semibold text-[#b8926b]">S</span>
                </div>
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#323B46]">Sandi</p>
              </div>
              <div className="space-y-2">
                <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                  <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">She&apos;s my person ❤️</p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                  <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">I&apos;d like her to be ours immediately. And forever.</p>
                </div>
              </div>
            </div>

            {/* Michael — excitement */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/testimonials/michael.png" alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#323B46]">Michael</p>
              </div>
              <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">Brianna is hired!!! She ROCKED it today, I told her on the spot</p>
              </div>
            </div>

            {/* Tommy & Suzi — outcome */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[12px] font-semibold text-[#b8926b]">T</span>
                </div>
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#323B46]">Tommy &amp; Suzi</p>
              </div>
              <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">Life now feels calmer, more organized, and honestly just easier. Having the right house manager in place has taken a huge weight off our shoulders.</p>
              </div>
            </div>

            {/* Mahti — quantifiable result */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/testimonials/mahti.png" alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#323B46]">Mahti</p>
              </div>
              <div className="space-y-2">
                <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                  <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">I&apos;ve reclaimed 10-15 hours per week of my time.</p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                  <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">I&apos;m not sure how I ever got by without the help of a home manager now.</p>
                </div>
              </div>
            </div>

            {/* Amy — family impact */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[12px] font-semibold text-[#b8926b]">A</span>
                </div>
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#323B46]">Amy</p>
              </div>
              <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">I told my kids last weekend how much happier and peaceful I feel with Patti&apos;s amazing support to&nbsp;us!</p>
              </div>
            </div>

            {/* Hugh — humor + quality */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                  <span className="text-[12px] font-semibold text-[#b8926b]">H</span>
                </div>
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#323B46]">Hugh</p>
              </div>
              <div className="space-y-2">
                <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                  <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">Matt was very good today</p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl rounded-tl-md px-4 py-2.5 inline-block">
                  <p className="text-[14px] sm:text-[16px] text-[#1a1a1a]">Annoyingly, Jennifer was also quite lovely 😂</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          PERSONAL NOTE - Message from Founder + Audio Player
      =================================================================== */}
      <section id="letter" className="px-4 py-12 sm:py-20 lg:py-24 bg-[#fefdfb]">
        <div className="max-w-3xl mx-auto scroll-reveal">
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
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-[#fefdfb] border-t border-[#f0ebe0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <img src="/hum-logo.png" alt="HUM" className="h-5 sm:h-6 w-auto opacity-60" />
            <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-2">
              <Link href="/privacy-policy" className="text-[12px] sm:text-[13px] text-[#999] hover:text-[#666] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-[12px] sm:text-[13px] text-[#999] hover:text-[#666] transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#bbb]">
              © {new Date().getFullYear()} HUM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
