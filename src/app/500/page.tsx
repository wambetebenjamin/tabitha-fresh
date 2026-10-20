"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

export default function ServerErrorPreviewPage() {
  return (
    <section className="py-8 py-md-9 bg-body-tertiary">
      <div className="container">
        <div
          className="tf-card p-5 text-center mx-auto"
          style={{ maxWidth: 560 }}
        >
          <div
            className="mx-auto rounded-circle bg-danger-subtle text-danger d-inline-flex align-items-center justify-content-center"
            style={{ width: 76, height: 76 }}
          >
            <AlertCircle size={38} />
          </div>

          <span className="d-block mt-4 text-xs fw-bold text-uppercase text-secondary">
            Error 500
          </span>

          <h1 className="m-0 mt-2 fs-2 fw-bold text-body-emphasis">
            Temporary Server Interruption
          </h1>

          <p className="m-0 mt-3 text-body-secondary text-sm leading-6">
            We hit an unexpected snag processing your request. Click Try Again
            below or message our Nairobi team directly on WhatsApp at{" "}
            <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>

          <div className="mt-4 pt-2 d-flex flex-wrap justify-content-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-lg btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
            >
              <RefreshCw size={17} />
              <span>Try Again</span>
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
              style={{ backgroundColor: "#25D366" }}
            >
              <span>WhatsApp {WHATSAPP_DISPLAY}</span>
            </a>
          </div>

          <div className="mt-3">
            <Link
              href="/"
              className="text-sm fw-semibold text-primary-emphasis text-decoration-none"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
