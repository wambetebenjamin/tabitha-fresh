"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/constants";

export interface CookiePreferencesState {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (!saved) {
        setShowBanner(true);
      } else {
        const parsed = JSON.parse(saved) as Partial<CookiePreferencesState>;
        if (typeof parsed.functional === "boolean") {
          setFunctional(parsed.functional);
        }
        if (typeof parsed.analytics === "boolean") {
          setAnalytics(parsed.analytics);
        }
        if (typeof parsed.marketing === "boolean") {
          setMarketing(parsed.marketing);
        }
      }
    } catch {
      setShowBanner(true);
    }

    const handleOpen = () => {
      setShowModal(true);
    };

    window.addEventListener("tabitha:open-cookie-modal", handleOpen);
    return () => {
      window.removeEventListener("tabitha:open-cookie-modal", handleOpen);
    };
  }, []);

  const persistChoice = (prefs: Omit<CookiePreferencesState, "updatedAt">) => {
    const payload: CookiePreferencesState = {
      ...prefs,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
    setFunctional(prefs.functional);
    setAnalytics(prefs.analytics);
    setMarketing(prefs.marketing);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    persistChoice({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleSaveCustom = () => {
    persistChoice({
      necessary: true,
      functional,
      analytics,
      marketing,
    });
  };

  return (
    <>
      {showBanner && !showModal && (
        <aside
          className="tf-cookie-banner py-3 px-3"
          role="region"
          aria-label="Cookie consent notice"
        >
          <div className="container">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
              <div className="d-flex align-items-start gap-2 max-w-4xl">
                <ShieldCheck
                  size={22}
                  className="text-primary flex-shrink-0 mt-1"
                />
                <p className="m-0 text-sm text-body-emphasis leading-6">
                  We use cookies to keep your laundry booking session secure,
                  remember your pickup preferences, and measure site performance
                  in accordance with the{" "}
                  <strong>Kenya Data Protection Act, 2019</strong>. Read our{" "}
                  <Link
                    href="/legal/cookie-policy"
                    className="fw-semibold text-primary-emphasis"
                  >
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="fw-semibold text-primary-emphasis"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="btn btn-outline-secondary text-sm fw-semibold d-inline-flex align-items-center gap-1"
                >
                  <SlidersHorizontal size={15} />
                  <span>Manage Preferences</span>
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn btn-primary text-white text-sm fw-semibold px-4"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {showModal && (
        <div
          className="position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(12, 74, 110, 0.55)",
            zIndex: 10000,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-heading"
        >
          <div
            className="bg-body rounded-4 border shadow-lg p-4 p-sm-5 w-100"
            style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2
                id="cookie-modal-heading"
                className="m-0 fs-4 fw-bold text-body-emphasis"
              >
                Cookie Preferences
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-outline-secondary p-1"
                aria-label="Close cookie preferences"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-body-secondary leading-6 mb-4">
              Under the Kenya Data Protection Act, 2019 (Act No. 24 of 2019),
              you control which non-essential cookies Tabitha Fresh stores on
              your browser.
            </p>

            <div className="d-flex flex-column gap-3">
              <div className="p-3 rounded-3 bg-body-tertiary border d-flex align-items-start justify-content-between gap-3">
                <div>
                  <div className="fw-semibold text-body-emphasis text-sm">
                    Necessary Cookies
                  </div>
                  <p className="m-0 mt-1 text-xs text-body-secondary">
                    Required for booking steps, authentication sessions, and
                    reCAPTCHA security protection. Cannot be switched off.
                  </p>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    disabled
                    aria-label="Necessary cookies always active"
                  />
                </div>
              </div>

              <label className="p-3 rounded-3 bg-body-tertiary border d-flex align-items-start justify-content-between gap-3 cursor-pointer">
                <div>
                  <div className="fw-semibold text-body-emphasis text-sm">
                    Functional Cookies
                  </div>
                  <p className="m-0 mt-1 text-xs text-body-secondary">
                    Remembers your Nairobi estate zone, preferred pickup slot,
                    and saved booking draft.
                  </p>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={functional}
                    onChange={(e) => setFunctional(e.target.checked)}
                  />
                </div>
              </label>

              <label className="p-3 rounded-3 bg-body-tertiary border d-flex align-items-start justify-content-between gap-3 cursor-pointer">
                <div>
                  <div className="fw-semibold text-body-emphasis text-sm">
                    Analytics Cookies
                  </div>
                  <p className="m-0 mt-1 text-xs text-body-secondary">
                    Helps us understand page speed and improve booking flow
                    reliability across mobile and desktop devices.
                  </p>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                </div>
              </label>

              <label className="p-3 rounded-3 bg-body-tertiary border d-flex align-items-start justify-content-between gap-3 cursor-pointer">
                <div>
                  <div className="fw-semibold text-body-emphasis text-sm">
                    Marketing Cookies
                  </div>
                  <p className="m-0 mt-1 text-xs text-body-secondary">
                    Used only for relevant seasonal duvet or household bulk
                    offers in Nairobi.
                  </p>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                </div>
              </label>
            </div>

            <div className="d-flex flex-wrap justify-content-end gap-2 mt-4 pt-2">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="btn btn-outline-primary text-sm fw-semibold px-3"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn btn-primary text-white text-sm fw-semibold px-4"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
