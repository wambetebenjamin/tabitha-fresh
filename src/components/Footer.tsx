"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_TAGLINE,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/constants";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail("");
  };

  const openCookieModal = () => {
    window.dispatchEvent(new CustomEvent("tabitha:open-cookie-modal"));
  };

  return (
    <footer className="overflow-hidden pt-6 pt-sm-7 pb-8 bg-body-tertiary border-top">
      <div className="container">
        <div className="row gy-5 justify-content-between">
          <div className="col-12 col-xl-5">
            <Link
              href="/"
              className="d-inline-flex align-items-center gap-2 text-decoration-none"
            >
              <Image
                src="/assets/logo/logo.png"
                width={38}
                height={38}
                alt={`${BRAND_NAME} logo`}
              />
              <div>
                <span className="fw-bold text-body-emphasis fs-4 d-block lh-1">
                  {BRAND_NAME}
                </span>
                <span className="text-primary-emphasis text-xs fw-semibold">
                  {BRAND_TAGLINE}
                </span>
              </div>
            </Link>

            <p className="m-0 mt-3 text-body-secondary text-base leading-7 max-w-lg">
              {BRAND_DESCRIPTION}
            </p>

            <div className="mt-4 d-flex flex-column gap-2 text-sm text-body-emphasis">
              <div className="d-flex align-items-center gap-2">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>Kindaruma Road Hub, Kilimani, Nairobi, Kenya</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-body-emphasis fw-semibold"
                >
                  WhatsApp &amp; Dispatch: {WHATSAPP_DISPLAY}
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@tabithafresh.co.ke"
                  className="text-decoration-none text-body-emphasis"
                >
                  hello@tabithafresh.co.ke
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span>Mon to Sun: 7:00 AM to 8:30 PM (Express before 11:00 AM)</span>
              </div>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="mt-4 pt-2 max-w-md"
              aria-label="Laundry care tips and seasonal offers"
            >
              <label
                htmlFor="footer-newsletter"
                className="form-label fw-semibold text-body-emphasis text-sm"
              >
                Get 10% off your first pickup &amp; garment care updates
              </label>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="form-control text-sm"
                  placeholder="you@example.co.ke"
                />
                <button
                  type="submit"
                  className="btn btn-primary text-white fw-semibold text-sm px-4"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p
                  className="m-0 mt-2 text-success-emphasis text-sm fw-medium"
                  role="status"
                >
                  Welcome aboard! Check your inbox for your first-order code.
                </p>
              )}
            </form>
          </div>

          <div className="col-12 col-xl-6">
            <div className="row row-cols-2 row-cols-sm-3 gy-4">
              <div>
                <h3 className="text-body-emphasis fw-bold text-sm text-uppercase tracking-wide mb-3">
                  Services
                </h3>
                <ul className="nav flex-column gap-2">
                  <li>
                    <Link
                      href="/services#wash-and-fold"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Wash and Fold
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#dry-cleaning"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Dry Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#ironing-only"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Ironing Only
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#duvet-and-bedding"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Duvet and Bedding
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#shoe-cleaning"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Shoe Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services#express-service"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Express Same Day
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-body-emphasis fw-bold text-sm text-uppercase tracking-wide mb-3">
                  Quick Links
                </h3>
                <ul className="nav flex-column gap-2">
                  <li>
                    <Link
                      href="/booking"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Schedule a Pickup
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Full Pricing Table
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/track"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Track My Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-orders"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      My Orders Portal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/signin"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Customer Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/signup"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Create Account
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-body-emphasis fw-bold text-sm text-uppercase tracking-wide mb-3">
                  Legal &amp; Privacy
                </h3>
                <ul className="nav flex-column gap-2">
                  <li>
                    <Link
                      href="/legal/privacy-policy"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal/terms"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal/cookie-policy"
                      className="p-0 nav-link text-body-secondary text-sm"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={openCookieModal}
                      className="btn btn-link p-0 nav-link text-start text-body-secondary text-sm text-decoration-none"
                    >
                      Cookie Preferences
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5 text-body-emphasis opacity-10" />

        <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center pb-4">
          <p className="mb-0 text-body-secondary text-sm">
            &copy; {new Date().getFullYear()} {BRAND_NAME} Kenya Ltd. All rights
            reserved. M-Pesa accepted on delivery and prepay.
          </p>
          <p className="mb-0 text-body-secondary text-sm">
            Compliant with the Kenya Data Protection Act, 2019.
          </p>
        </div>
      </div>
    </footer>
  );
}
