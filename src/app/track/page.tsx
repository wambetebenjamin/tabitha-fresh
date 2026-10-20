import React, { Suspense } from "react";
import type { Metadata } from "next";
import TrackOrderView from "@/components/TrackOrderView";

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Enter your Tabitha Fresh booking reference to view real-time progress across Pickup Scheduled, Collected, Being Cleaned, and Out for Delivery.",
};

export default function TrackPage() {
  return (
    <div>
      <section className="py-6 bg-body-tertiary border-bottom">
        <div className="container">
          <div className="max-w-2xl">
            <span className="tf-eyebrow">Real-Time Garment Tracking</span>
            <h1 className="m-0 mt-3 text-body-emphasis display-6 fw-bold tracking-tight">
              Track your laundry order
            </h1>
            <p className="m-0 mt-2 text-body-secondary text-base leading-7">
              Enter your booking reference to check live status across Pickup
              Scheduled, Collected, Being Cleaned, and Out for Delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 py-md-7 bg-body">
        <div className="container">
          <Suspense
            fallback={
              <div className="tf-card p-5 text-center" role="status">
                <div className="spinner-border text-primary" />
                <p className="m-0 mt-3 fw-semibold text-body-emphasis">
                  Loading live order tracker...
                </p>
              </div>
            }
          >
            <TrackOrderView />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
