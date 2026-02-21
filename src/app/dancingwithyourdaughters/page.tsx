"use client";

import { useState, useRef, useEffect } from "react";

export default function DancingWithYourDaughtersPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadedIn, setIsFadedIn] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsFadedIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable Cmd+S / Ctrl+S
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 15);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .page-container {
          min-height: 100vh;
          min-height: 100dvh;
          background-color: #f9f6f1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 48px 24px;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .page-container.faded-in {
          opacity: 1;
        }

        @media (min-width: 640px) {
          .page-container {
            justify-content: center;
            padding: 64px 32px;
          }
        }

        .content-wrapper {
          max-width: 520px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .context-line {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c4907c;
          text-align: center;
        }

        .song-title {
          font-family: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
          font-size: 32px;
          font-weight: 500;
          color: #1a1a1a;
          text-align: center;
          line-height: 1.2;
          margin: 0;
        }

        @media (min-width: 640px) {
          .song-title {
            font-size: 36px;
          }
        }

        .artist-credit {
          font-size: 14px;
          font-weight: 400;
          color: #6b6560;
          text-align: center;
          margin-top: -16px;
        }

        .personal-note {
          font-size: 15px;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          line-height: 1.7;
          max-width: 440px;
          margin: 0 auto;
        }

        /* Audio Player Styles */
        .audio-player {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 32px 0;
          user-select: none;
          -webkit-user-select: none;
        }

        .player-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .skip-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b6560;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .skip-button:hover {
          color: #1a1a1a;
        }

        .skip-button:active {
          transform: scale(0.95);
        }

        .play-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #1a1a1a;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, background-color 0.2s ease;
        }

        .play-button:hover {
          transform: scale(1.05);
          background: #333;
        }

        .play-button:active {
          transform: scale(0.97);
        }

        .play-button svg {
          color: white;
          width: 24px;
          height: 24px;
        }

        .play-button.playing svg {
          width: 20px;
          height: 20px;
        }

        /* Progress Bar */
        .progress-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .progress-bar-wrapper {
          position: relative;
          width: 100%;
          height: 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(0, 0, 0, 0.06);
          border-radius: 2px;
          overflow: visible;
          position: relative;
          transition: height 0.15s ease;
        }

        .progress-bar-wrapper:hover .progress-track {
          height: 5px;
        }

        .progress-fill {
          height: 100%;
          background: #c4907c;
          border-radius: 2px;
          position: relative;
          transition: background-color 0.2s ease;
        }

        .progress-bar-wrapper:hover .progress-fill {
          background: #b07a66;
        }

        .progress-thumb {
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          background: #c4907c;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .progress-bar-wrapper:hover .progress-thumb {
          opacity: 1;
          background: #b07a66;
        }

        .time-display {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          color: #6b6560;
        }

        /* Progress + Volume wrapper */
        .progress-volume-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          width: 100%;
          max-width: 400px;
        }

        .progress-container {
          flex: 1;
        }

        /* Volume Control - YouTube style */
        .volume-control {
          display: none;
          align-items: center;
          padding-top: 6px;
        }

        @media (min-width: 640px) {
          .volume-control {
            display: flex;
          }
        }

        .volume-icon {
          width: 18px;
          height: 18px;
          color: #6b6560;
          flex-shrink: 0;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .volume-control:hover .volume-icon {
          color: #c4907c;
        }

        .volume-slider-wrapper {
          width: 0;
          overflow: hidden;
          transition: width 0.2s ease;
        }

        .volume-control:hover .volume-slider-wrapper {
          width: 60px;
          margin-left: 8px;
        }

        .volume-slider {
          width: 60px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #c4907c;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #c4907c;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        /* Logo - Top Left */
        .logo-container {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 40;
          padding: 16px 16px;
        }

        @media (min-width: 640px) {
          .logo-container {
            padding: 20px 24px;
          }
        }

        .logo {
          height: 24px;
          width: auto;
        }

        @media (min-width: 640px) {
          .logo {
            height: 32px;
          }
        }

        /* Footer */
        .footer {
          padding: 32px 16px;
          background-color: #f9f6f1;
          color: #454545;
        }

        @media (min-width: 640px) {
          .footer {
            padding: 32px 24px;
          }
        }

        .footer-content {
          max-width: 1152px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer-logo {
          height: 24px;
          width: auto;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px 24px;
        }

        .footer-links a {
          font-size: 12px;
          color: #999;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #666;
        }

        .footer-copyright {
          font-size: 12px;
          color: #bbb;
          margin: 0;
        }
      `}</style>

      <audio
        ref={audioRef}
        src="/api/audio/dancing"
        preload="metadata"
      />

      <div className={`page-container ${isFadedIn ? "faded-in" : ""}`}>
        <div className="content-wrapper">
          {/* Context Line */}
          <p className="context-line">
            A Personal Share from Pedro, Co-Founder of HUM
          </p>

          {/* Song Title */}
          <h1 className="song-title">Dancing With Your Daughters</h1>

          {/* Artist Credit */}
          <p className="artist-credit">
            An unreleased song by my life partner and best friend
          </p>

          {/* Personal Note */}
          <p className="personal-note">
            This song was written before HUM existed. Before we had a name, a
            team, or a single client. It captures why we do what we do better
            than anything I could ever put into words. I hope it moves you the
            way it moved me.
          </p>

          {/* Audio Player */}
          <div className="audio-player">
            {/* Controls */}
            <div className="player-controls">
              {/* Skip Back 15s */}
              <button
                className="skip-button"
                onClick={skipBackward}
                aria-label="Skip back 15 seconds"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                  <text x="12" y="15" fontSize="6" textAnchor="middle" fontWeight="600">15</text>
                </svg>
              </button>

              {/* Play/Pause Button */}
              <button
                className={`play-button ${isPlaying ? "playing" : ""}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11-7.36a1 1 0 0 0 0-1.72l-11-7.36a1 1 0 0 0-1.5.86z" />
                  </svg>
                )}
              </button>

              {/* Skip Forward 15s */}
              <button
                className="skip-button"
                onClick={skipForward}
                aria-label="Skip forward 15 seconds"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
                  <text x="12" y="15" fontSize="6" textAnchor="middle" fontWeight="600">15</text>
                </svg>
              </button>
            </div>

            {/* Progress Bar with Volume */}
            <div className="progress-volume-wrapper">
              <div className="progress-container">
                <div
                  className="progress-bar-wrapper"
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                >
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="progress-thumb" />
                    </div>
                  </div>
                </div>
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>{isLoaded ? formatTime(duration) : "--:--"}</span>
                </div>
              </div>

              {/* Volume Control - YouTube style */}
              <div className="volume-control">
                <svg
                  className="volume-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {volume === 0 ? (
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  ) : volume < 0.5 ? (
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                  ) : (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  )}
                </svg>
                <div className="volume-slider-wrapper">
                  <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Logo - Top Left */}
      <div className="logo-container">
        <img src="/hum-logo-new.png" alt="HUM" className="logo" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <img src="/hum-logo-new.png" alt="HUM" className="footer-logo" />
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} HUM</p>
        </div>
      </footer>
    </>
  );
}
