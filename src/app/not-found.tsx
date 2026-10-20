import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-8 py-md-9 bg-body-tertiary">
      <div className="container">
        <div
          className="tf-card p-5 text-center mx-auto"
          style={{ maxWidth: 560 }}
        >
          {/* Clean Coat Hanger Icon */}
          <div
            className="mx-auto rounded-circle bg-body-tertiary border d-inline-flex align-items-center justify-content-center text-primary"
            style={{ width: 84, height: 84 }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9.5 6a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5V11" />
              <path d="M12 11 3.4 16.4A1.5 1.5 0 0 0 4.2 19h15.6a1.5 1.5 0 0 0 .8-2.6L12 11Z" />
            </svg>
          </div>

          <span className="d-block mt-4 text-xs fw-bold text-uppercase text-secondary">
            Error 404
          </span>

          <h1 className="m-0 mt-2 fs-2 fw-bold text-body-emphasis">
            This page has gone missing.
          </h1>

          <p className="m-0 mt-3 text-body-secondary text-sm leading-6">
            Unlike your socks with Tabitha Fresh, this link could not be found.
            Head back home to schedule a pickup or check live tracking.
          </p>

          <div className="mt-4 pt-2 d-flex flex-wrap justify-content-center gap-3">
            <Link
              href="/"
              className="btn btn-lg btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
            >
              <Home size={17} />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/booking"
              className="btn btn-lg btn-outline-primary fw-semibold text-sm px-4"
            >
              Schedule a Pickup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
