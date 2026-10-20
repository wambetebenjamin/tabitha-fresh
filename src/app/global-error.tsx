"use client";

import React from "react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

export default function RootGlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" dir="ltr" data-bs-theme="light">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f9ff",
          color: "#0c4a6e",
          fontFamily: "'Inter var', sans-serif",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            width: "100%",
            backgroundColor: "#ffffff",
            border: "1px solid #bae6fd",
            borderRadius: 16,
            padding: 36,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#0284c7",
            }}
          >
            Error 500
          </p>
          <h1 style={{ margin: "10px 0 0", fontSize: 28 }}>
            Something went wrong on our side.
          </h1>
          <p style={{ margin: "12px 0 24px", fontSize: 15, color: "#0369a1" }}>
            Please try again, or contact Tabitha Fresh support on WhatsApp at{" "}
            <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                backgroundColor: "#ea580c",
                color: "#ffffff",
                border: "none",
                borderRadius: 10,
                padding: "12px 22px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "#ffffff",
                borderRadius: 10,
                padding: "12px 22px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
