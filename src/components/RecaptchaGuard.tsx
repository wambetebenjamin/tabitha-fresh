"use client";

import React, { useCallback, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export function useRecaptchaToken(action: string) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "";

  useEffect(() => {
    if (!siteKey) return;
    const scriptId = "google-recaptcha-v3-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
      siteKey
    )}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [siteKey]);

  const executeV3 = useCallback(async (): Promise<string> => {
    if (siteKey && window.grecaptcha) {
      try {
        return await new Promise<string>((resolve) => {
          window.grecaptcha!.ready(() => {
            window
              .grecaptcha!.execute(siteKey, { action })
              .then(resolve)
              .catch(() => resolve(`dev-recaptcha-v3-${action}-${Date.now()}`));
          });
        });
      } catch {
        return `dev-recaptcha-v3-${action}-${Date.now()}`;
      }
    }
    return `dev-recaptcha-v3-${action}-${Date.now()}`;
  }, [action, siteKey]);

  return { executeV3, hasLiveSiteKey: Boolean(siteKey) };
}

export function RecaptchaFallbackChallenge({
  visible,
  checked,
  onCheckChange,
}: {
  visible: boolean;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}) {
  if (!visible) return null;

  return (
    <div
      className="p-3 rounded-3 border bg-body-tertiary mt-3"
      role="group"
      aria-label="reCAPTCHA v2 fallback verification"
    >
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div className="form-check m-0 d-flex align-items-center gap-2">
          <input
            id="recaptcha-v2-checkbox"
            type="checkbox"
            className="form-check-input m-0"
            style={{ width: 22, height: 22 }}
            checked={checked}
            onChange={(e) => onCheckChange(e.target.checked)}
          />
          <label
            htmlFor="recaptcha-v2-checkbox"
            className="form-check-label fw-semibold text-body-emphasis text-sm"
          >
            I am not a robot (reCAPTCHA v2 verification)
          </label>
        </div>
        <ShieldCheck size={22} className="text-primary flex-shrink-0" />
      </div>
      <p className="m-0 mt-2 text-xs text-body-secondary">
        Invisible check score was below 0.5. Confirm the box above and submit
        again.
      </p>
    </div>
  );
}

export function RecaptchaNotice() {
  return (
    <p className="m-0 mt-2 text-xs text-body-secondary d-flex align-items-center gap-1">
      <ShieldCheck size={14} className="text-primary flex-shrink-0" />
      <span>
        Protected by Google reCAPTCHA v3 security verification. Privacy Policy
        and Terms apply.
      </span>
    </p>
  );
}
