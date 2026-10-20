"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { VOICE_TOUR_CONFIG, VOICE_TOUR_SCRIPT } from "@/lib/constants";

export default function VoiceTourButton() {
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const triggeredOnceRef = useRef(false);
  const mutedRef = useRef(false);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const startSpeech = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(VOICE_TOUR_SCRIPT);
    utterance.rate = VOICE_TOUR_CONFIG.rate;
    utterance.pitch = VOICE_TOUR_CONFIG.pitch;
    utterance.lang = VOICE_TOUR_CONFIG.lang;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.toLowerCase() === "en-ke") ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en-gb")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setSpeaking(true);
      setMuted(false);
      mutedRef.current = false;
    };

    utterance.onend = () => {
      setSpeaking(false);
      setHasCompleted(true);
      sessionStorage.setItem("tf_voice_tour_played", "1");
    };

    utterance.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("tf_voice_tour_played") === "1") {
      triggeredOnceRef.current = true;
      setHasCompleted(true);
      return;
    }

    const handleFirstInteraction = (event: Event) => {
      if (triggeredOnceRef.current || mutedRef.current) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && target.closest("#tf-voice-tour-btn")) {
        return;
      }
      triggeredOnceRef.current = true;
      sessionStorage.setItem("tf_voice_tour_played", "1");
      startSpeech();
    };

    window.addEventListener("scroll", handleFirstInteraction, {
      passive: true,
      once: true,
    });
    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [startSpeech]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = () => {
    triggeredOnceRef.current = true;
    if (speaking) {
      mutedRef.current = true;
      setMuted(true);
      stopSpeech();
    } else {
      mutedRef.current = false;
      setMuted(false);
      startSpeech();
    }
  };

  const tooltipLabel = hasCompleted && !speaking
    ? "Replay tour"
    : "Hear what this site is about";

  const accessibleName =
    hasCompleted && !speaking
      ? "Replay tour"
      : "Site voice tour, click to mute";

  return (
    <div className="tf-float-wrap">
      <button
        id="tf-voice-tour-btn"
        type="button"
        onClick={handleToggle}
        className="tf-floating-voice"
        aria-label={accessibleName}
        title={tooltipLabel}
      >
        {speaking && <span className="tf-voice-pulse-ring" aria-hidden="true" />}
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      <span
        className="tf-float-tooltip tf-float-tooltip-left"
        role="tooltip"
      >
        {tooltipLabel}
      </span>
    </div>
  );
}
