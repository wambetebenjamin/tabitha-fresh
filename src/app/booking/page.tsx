import React, { Suspense } from "react";
import type { Metadata } from "next";
import BookingWizard from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Schedule a Pickup",
  description:
    "Schedule your doorstep laundry pickup across Nairobi in 6 easy steps with free delivery and M-Pesa payment options.",
};

export default function BookingPage() {
  return (
    <div>
      <section className="py-6 bg-body-tertiary border-bottom">
        <div className="container">
          <div className="max-w-2xl">
            <span className="tf-eyebrow">Doorstep Scheduling</span>
            <h1 className="m-0 mt-3 text-body-emphasis display-6 fw-bold tracking-tight">
              Schedule your Nairobi laundry pickup
            </h1>
            <p className="m-0 mt-2 text-body-secondary text-base leading-7">
              Select services, choose a convenient collection slot, set pickup
              and delivery addresses, and confirm with M-Pesa on delivery or
              prepay.
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
                  Preparing booking scheduler...
                </p>
              </div>
            }
          >
            <BookingWizard />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
