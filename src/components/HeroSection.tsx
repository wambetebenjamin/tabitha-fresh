"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Search,
  Smartphone,
  Truck,
} from "lucide-react";
import { BRAND_TAGLINE } from "@/lib/constants";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [quickRef, setQuickRef] = useState("");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !heroRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-anim]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );

      gsap.fromTo(
        "[data-hero-photo]",
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          delay: 0.15,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickRef.trim();
    if (!trimmed) {
      router.push("/track");
      return;
    }
    router.push(`/track?ref=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section
      ref={heroRef}
      className="overflow-hidden py-6 py-md-7 py-xl-8 bg-body-tertiary border-bottom"
    >
      <div className="container">
        <div className="row gy-5 gx-xl-5 align-items-center justify-content-between">
          <div className="col-12 col-xl-6">
            <div className="max-w-2xl mx-auto mx-xl-0">
              <div data-hero-anim className="tf-eyebrow">
                <Truck size={15} />
                <span>Free Pickup &amp; Delivery Across Nairobi</span>
              </div>

              <h1
                data-hero-anim
                className="m-0 mt-3 text-body-emphasis tracking-tight fw-bold"
                style={{ fontSize: "clamp(2.35rem, 5vw, 3.65rem)", lineHeight: 1.08 }}
              >
                {BRAND_TAGLINE}{" "}
                <span className="text-primary">Fresh in 24 hours.</span>
              </h1>

              <p
                data-hero-anim
                className="m-0 mt-4 text-body text-lg leading-8"
              >
                Tabitha Fresh collects your laundry right from your home or
                office in Nairobi, washes, dry cleans, presses, and folds every
                item with care-label precision, then delivers everything back
                spotless.
              </p>

              <div
                data-hero-anim
                className="mt-4 pt-2 d-flex flex-wrap align-items-center gap-3"
              >
                <Link
                  href="/booking"
                  className="btn btn-lg btn-primary text-white fw-semibold px-4 d-inline-flex align-items-center gap-2 shadow-sm"
                >
                  <span>Schedule a Pickup</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/pricing"
                  className="btn btn-lg btn-outline-primary bg-body fw-semibold px-4"
                >
                  See Pricing
                </Link>
              </div>

              <form
                data-hero-anim
                onSubmit={handleQuickTrack}
                className="mt-4 pt-2 max-w-lg"
                aria-label="Quick order tracking lookup"
              >
                <div className="p-2 bg-body rounded-4 border d-flex flex-column flex-sm-row gap-2 shadow-sm">
                  <div className="d-flex align-items-center gap-2 ps-2 flex-grow-1">
                    <Search size={17} className="text-secondary flex-shrink-0" />
                    <input
                      type="text"
                      value={quickRef}
                      onChange={(e) => setQuickRef(e.target.value)}
                      placeholder="Already booked? Enter ref e.g. TF-NAI-1042"
                      aria-label="Booking reference"
                      className="form-control border-0 shadow-none p-1 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary text-white text-sm fw-semibold px-3 flex-shrink-0"
                  >
                    Track Order
                  </button>
                </div>
              </form>

              <div
                data-hero-anim
                className="mt-4 pt-2 d-flex flex-wrap gap-4 text-sm fw-medium text-body-emphasis"
              >
                <span className="d-inline-flex align-items-center gap-2">
                  <Clock size={17} className="text-primary" />
                  24-Hour Standard Return
                </span>
                <span className="d-inline-flex align-items-center gap-2">
                  <Smartphone size={17} className="text-primary" />
                  Pay via M-Pesa
                </span>
                <span className="d-inline-flex align-items-center gap-2">
                  <CheckCircle2 size={17} className="text-success" />
                  Care Label Guaranteed
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-6">
            <div
              data-hero-photo
              className="position-relative mx-auto max-w-2xl"
            >
              <div
                className="rounded-4 overflow-hidden border shadow-lg bg-body position-relative"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src="/images/hero-folded-laundry.jpg"
                  alt="Bright stack of neatly folded fresh white laundry"
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 50vw"
                  className="object-fit-cover"
                />
              </div>

              <div className="mt-3 p-3 bg-body rounded-4 border shadow-sm d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <span className="badge bg-success-subtle text-success-emphasis fw-semibold px-2 py-1">
                    Same-Day Express Available
                  </span>
                  <p className="m-0 mt-1 fw-bold text-body-emphasis text-sm">
                    Wash &amp; Fold from KES 350 / kg &bull; Dry Cleaning from
                    KES 500 / item
                  </p>
                </div>
                <Link
                  href="/booking?service=express-service"
                  className="btn btn-sm btn-primary text-white fw-semibold px-3"
                >
                  Book Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
