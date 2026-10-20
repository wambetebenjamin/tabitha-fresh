import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PricingTabs from "@/components/PricingTabs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Full transparent KES pricing across Wash and Fold, Dry Cleaning, Ironing, Bedding, Shoes, and Same-Day Express Service with free Nairobi pickup and delivery.",
};

export default function PricingPage() {
  return (
    <div>
      <section className="py-6 py-md-7 bg-body-tertiary border-bottom">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl">
            <span className="tf-eyebrow">Full KES Rate Card</span>
            <h1 className="m-0 mt-3 text-body-emphasis display-5 fw-bold tracking-tight">
              Simple, honest laundry pricing
            </h1>
            <p className="m-0 mt-3 text-body-secondary text-lg leading-8">
              Zero hidden surcharges. Switch tabs below to inspect itemized KES
              rates for Wash and Fold, Dry Cleaning, Ironing, Bedding, Shoes,
              and Express Care.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 py-md-8 bg-body">
        <div className="container">
          <PricingTabs />

          <div className="mt-6 p-4 p-md-5 rounded-4 bg-body-tertiary border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
            <div>
              <h2 className="m-0 fs-3 fw-bold text-body-emphasis">
                Ready for effortless laundry day?
              </h2>
              <p className="m-0 mt-1 text-body-secondary text-sm">
                Book online in 60 seconds. Pay via M-Pesa on delivery or prepay.
              </p>
            </div>
            <Link
              href="/booking"
              className="btn btn-lg btn-primary text-white fw-semibold px-4 d-inline-flex align-items-center gap-2 align-self-start align-self-md-center"
            >
              <span>Schedule a Pickup</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
