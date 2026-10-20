import React from "react";
import type { Metadata } from "next";
import { BRAND_NAME, COOKIE_STORAGE_KEY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy explaining how Tabitha Fresh uses essential, preference, and analytics cookies under the Kenya Data Protection Act, 2019.",
};

export default function CookiePolicyPage() {
  return (
    <section className="py-6 py-md-8 bg-body">
      <div className="container">
        <div className="mx-auto max-w-3xl tf-card p-4 p-md-5">
          <span className="tf-eyebrow">Kenya Data Protection Act 2019</span>
          <h1 className="m-0 mt-3 text-body-emphasis fs-1 fw-bold">
            Cookie Policy
          </h1>
          <p className="m-0 mt-2 text-xs text-body-secondary">
            Last Updated: October 2026 &bull; Consent Key:{" "}
            <code>{COOKIE_STORAGE_KEY}</code>
          </p>

          <div className="mt-4 d-flex flex-column gap-4 text-body text-sm leading-7">
            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                1. How {BRAND_NAME} Uses Cookies &amp; Local Storage
              </h2>
              <p className="m-0 mt-2">
                We use small browser storage entries to keep your multi-step
                laundry pickup booking intact, maintain secure NextAuth
                sign-in sessions, verify bot protection via Google reCAPTCHA,
                and remember your cookie consent choices under the key{" "}
                <code>{COOKIE_STORAGE_KEY}</code>.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                2. Categories of Cookies
              </h2>
              <ul className="mt-2 d-flex flex-column gap-2">
                <li>
                  <strong>Essential Cookies (Always Active):</strong> Required
                  for authentication sessions, booking draft state, and
                  anti-abuse security checks.
                </li>
                <li>
                  <strong>Preference Cookies (Optional):</strong> Remember your
                  preferred Nairobi neighbourhood and scheduling convenience
                  settings.
                </li>
                <li>
                  <strong>Analytics Cookies (Optional):</strong> Help us measure
                  page load speed and route reliability so booking stays fast on
                  mobile networks across Kenya.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                3. Updating Your Consent Choices
              </h2>
              <p className="m-0 mt-2">
                You may update or withdraw optional cookie permissions at any
                time by clicking <strong>Cookie Settings</strong> in the website
                footer and choosing <strong>Accept All</strong>,{" "}
                <strong>Essential Only</strong>, or{" "}
                <strong>Manage Preferences</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
