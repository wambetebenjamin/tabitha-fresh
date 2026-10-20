import React from "react";
import type { Metadata } from "next";
import { BRAND_EMAIL, BRAND_NAME, WHATSAPP_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Tabitha Fresh in compliance with the Kenya Data Protection Act, 2019.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-6 py-md-8 bg-body">
      <div className="container">
        <div className="mx-auto max-w-3xl tf-card p-4 p-md-5">
          <span className="tf-eyebrow">Kenya Data Protection Act 2019</span>
          <h1 className="m-0 mt-3 text-body-emphasis fs-1 fw-bold">
            Privacy Policy
          </h1>
          <p className="m-0 mt-2 text-xs text-body-secondary">
            Effective Date: October 2026 &bull; Data Controller: {BRAND_NAME},
            Nairobi, Kenya
          </p>

          <div className="mt-4 d-flex flex-column gap-4 text-body text-sm leading-7">
            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                1. Personal Data We Collect
              </h2>
              <p className="m-0 mt-2">
                When you schedule a laundry pickup, create an account, or
                contact us, {BRAND_NAME} collects only the information necessary
                to collect, clean, and return your garments safely: your full
                name, Kenyan phone number, email address, Nairobi pickup and
                delivery street addresses, garment care notes, and M-Pesa
                transaction confirmation references.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                2. Lawful Purpose &amp; Processing
              </h2>
              <p className="m-0 mt-2">
                In accordance with Section 30 of the Kenya Data Protection Act,
                2019, we process your personal data strictly to perform your
                requested pickup and delivery contract, dispatch riders in
                Nairobi, send order status updates, and maintain tax and
                accounting records required under Kenyan law.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                3. Data Sharing &amp; Storage Security
              </h2>
              <p className="m-0 mt-2">
                We never sell or rent customer personal data. Rider dispatch
                sheets display only your pickup/delivery address, time window,
                and contact number. All web traffic is protected via HTTPS with
                HSTS, strict content security headers, and encrypted session
                cookies.
              </p>
            </section>

            <section>
              <h2 className="fs-5 fw-bold text-body-emphasis">
                4. Your Rights Under Kenyan Law
              </h2>
              <p className="m-0 mt-2">
                Under Section 26 of the Kenya Data Protection Act, 2019, you
                have the right to be informed, access your personal data,
                rectify inaccurate details, object to processing, and request
                deletion of your account data. Contact our Data Protection Desk
                at <strong>{BRAND_EMAIL}</strong> or WhatsApp{" "}
                <strong>{WHATSAPP_DISPLAY}</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
