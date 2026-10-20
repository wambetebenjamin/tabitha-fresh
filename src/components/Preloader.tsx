"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("tf_preloader_done") === "1";
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReduced);

    if (alreadyShown) {
      setPercent(100);
      setVisible(false);
      return;
    }

    const totalDurationMs = 1500; // Strictly well under 3000ms max
    const start = performance.now();

    const skipTimer = window.setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    const hardMaxTimer = window.setTimeout(() => {
      setPercent(100);
      sessionStorage.setItem("tf_preloader_done", "1");
      setVisible(false);
    }, 2800);

    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const nextPct = Math.min(
        100,
        Math.round((elapsed / totalDurationMs) * 100)
      );
      setPercent(nextPct);
      if (nextPct >= 100) {
        sessionStorage.setItem("tf_preloader_done", "1");
        window.setTimeout(() => setVisible(false), 120);
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(hardMaxTimer);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem("tf_preloader_done", "1");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="loader-wrapper flex-column gap-3 text-center"
      role="status"
      aria-live="polite"
      aria-label={`Loading Tabitha Fresh website, ${percent} percent complete`}
    >
      {reducedMotion ? (
        <p className="m-0 fw-bold text-body-emphasis fs-4">
          Loading {percent}%
        </p>
      ) : (
        <>
          <svg
            width="96"
            height="104"
            viewBox="0 0 120 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="12"
              y="8"
              width="96"
              height="112"
              rx="18"
              fill="#ffffff"
              stroke="#ea580c"
              strokeWidth="5"
            />
            <line
              x1="14"
              y1="34"
              x2="106"
              y2="34"
              stroke="#7dd3fc"
              strokeWidth="3"
            />
            <rect x="24" y="17" width="24" height="9" rx="4.5" fill="#fed7aa" />
            <circle cx="82" cy="21.5" r="4" fill="#ea580c" />
            <circle cx="94" cy="21.5" r="4" fill="#0284c7" />
            <circle
              cx="60"
              cy="76"
              r="31"
              fill="#f0f9ff"
              stroke="#ea580c"
              strokeWidth="5"
            />
            <g className="tf-drum-rotor">
              <circle
                cx="60"
                cy="76"
                r="22"
                stroke="#0284c7"
                strokeWidth="3"
                strokeDasharray="16 8"
              />
              <path
                d="M42 76C47 69 55 69 60 76C65 83 73 83 78 76"
                stroke="#0ea5e9"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="60" cy="58" r="3" fill="#ea580c" />
              <circle cx="75" cy="85" r="3" fill="#ea580c" />
              <circle cx="45" cy="85" r="3" fill="#ea580c" />
            </g>
          </svg>
          <div>
            <p className="m-0 fw-bold text-body-emphasis fs-5">{percent}%</p>
            <p className="m-0 mt-1 text-body-secondary text-sm">
              Preparing fresh laundry care...
            </p>
          </div>
        </>
      )}

      {showSkip && (
        <button
          type="button"
          onClick={handleSkip}
          className="btn btn-sm btn-outline-primary fw-semibold px-3 mt-1"
        >
          Skip
        </button>
      )}
    </div>
  );
}
