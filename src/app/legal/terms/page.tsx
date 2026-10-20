import React from "react";
import type { Metadata } from "next";
import { BRAND_EMAIL, BRAND_NAME, WHATSAPP_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing laundry pickup, garment care, pricing, and delivery by Tabitha Fresh in Nairobi, Kenya.",
};

export default function TermsPage() {
  return (
    <section className="py-6 py-md-8 bg-body">
      <div className="container">
        <div className="mx-auto max-w-3xl tf-card p-4 p-md-5">
          <span className="tf-eyebrow">Service Agreement</span>
          <h1 className="m-0 mt-3 text-body-emphasis fs-1 fw-bold">
            Terms of Service
          </h1>
          <p className="m-0 mt-2 text-xs text-body-secondary">
            Last Updated: October 2026 &bull; {BRAND_NAME}, Nairobi, Kenya
          </p>

          <div className="mt-4 d-flex flex-column gap-4 text-body text-sm leading-7">
            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                1. Pickup, Inspection &amp; Weight Verification
              </h2>
              <p className="m-0 mt-2">
                Please empty all garment pockets prior to handover. Per-kilogram
                orders are weighed on calibrated digital scales upon collection
                or intake at our Nairobi facility, and itemized counts are
                shared with your booking reference.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                2. Garment Care Labels &amp; Special Instructions
              </h2>
              <p className="m-0 mt-2">
                Every item is cleaned strictly according to manufacturer care
                labels and any special instructions noted during booking. If a
                garment lacks a care label or shows pre-existing colour bleed or
                fabric wear, our specialist will contact you before treatment.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                3. Minimum Order, Turnaround &amp; M-Pesa Payments
              </h2>
              <p className="m-0 mt-2">
                Standard pickup orders carry a KES 1,000 minimum threshold,
                which includes complimentary collection and return across our 22
                Nairobi coverage zones. Payments may be completed either on
                delivery or in advance via M-Pesa.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                4. Customer Support &amp; Re-Clean Guarantee
              </h2>
              <p className="m-0 mt-2">
                If you are unsatisfied with the finish of any item, notify{" "}
                {BRAND_NAME} within 48 hours of delivery via WhatsApp at{" "}
                <strong>{WHATSAPP_DISPLAY}</strong> or{" "}
                <strong>{BRAND_EMAIL}</strong> and we will collect and re-clean
                the item free of charge.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
