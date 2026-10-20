import React, { Suspense } from "react";
import type { Metadata } from "next";
import BookingConfirmationView from "@/components/BookingConfirmationView";

export const metadata: Metadata = {
  title: "Booking Confirmation",
  description:
    "View your confirmed Tabitha Fresh booking reference, pickup and delivery schedule, live order status tracker, WhatsApp confirmation, and Google Calendar link.",
};

export default function BookingConfirmationPage() {
  return (
    <section className="py-6 py-md-8 bg-body-tertiary">
      <div className="container">
        <Suspense
          fallback={
            <div className="tf-card p-5 text-center" role="status">
              <div className="spinner-border text-primary" />
              <p className="m-0 mt-3 fw-semibold text-body-emphasis">
                Loading your booking confirmation...
              </p>
            </div>
          }
        >
          <BookingConfirmationView />
        </Suspense>
      </div>
    </section>
  );
}
