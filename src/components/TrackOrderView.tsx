"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, RefreshCw, Search } from "lucide-react";
import OrderStatusTracker from "@/components/OrderStatusTracker";
import { OrderStage, OrderTimelineEvent, SelectedServiceLine } from "@/lib/schemas";
import { buildWhatsAppOrderUrl } from "@/lib/constants";
import { useBookingStore } from "@/lib/booking-store";

interface PublicTrackingPayload {
  reference: string;
  status: OrderStage;
  stageIndex: number;
  completedDelivered: boolean;
  pickupDate: string;
  pickupSlot: string;
  deliveryDate: string;
  deliveryWindow: string;
  pickupZone: string;
  deliveryZone: string;
  services: SelectedServiceLine[];
  totalEstimatedKes: number;
  paymentStatus: string;
  assignedRider: string;
  timeline: OrderTimelineEvent[];
}

const SAMPLE_REFERENCES = [
  { ref: "TF-NAI-1104", label: "Pickup Scheduled" },
  { ref: "TF-NAI-1042", label: "Being Cleaned" },
  { ref: "TF-NAI-1089", label: "Out for Delivery" },
];

export default function TrackOrderView() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";
  const recentBookings = useBookingStore((s) => s.recentBookings);

  const [inputRef, setInputRef] = useState(initialRef || "TF-NAI-1042");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tracking, setTracking] = useState<PublicTrackingPayload | null>(null);

  const lookupReference = useCallback(async (refToFetch: string) => {
    const cleaned = refToFetch.trim();
    if (!cleaned) {
      setErrorMsg("Please enter your Tabitha Fresh booking reference.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `/api/booking/track?ref=${encodeURIComponent(cleaned)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setTracking(null);
        setErrorMsg(
          data.error ||
            "No order found with that reference. Please check and try again."
        );
        return;
      }
      setTracking(data.tracking);
    } catch {
      setErrorMsg("Unable to reach live tracking service. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const startRef = initialRef || recentBookings[0]?.reference || "TF-NAI-1042";
    setInputRef(startRef);
    lookupReference(startRef);
  }, [initialRef, recentBookings, lookupReference]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupReference(inputRef);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="tf-card p-4 p-md-5">
        <form onSubmit={handleSubmit} className="row g-3 align-items-end">
          <div className="col-12 col-md-9">
            <label
              htmlFor="track-ref-input"
              className="form-label fw-bold text-body-emphasis text-sm"
            >
              Booking Reference Number
            </label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-body border-end-0 text-secondary">
                <Search size={19} />
              </span>
              <input
                id="track-ref-input"
                type="text"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value)}
                placeholder="Enter reference e.g. TF-NAI-1042"
                className="form-control border-start-0 text-base fw-semibold"
              />
            </div>
          </div>

          <div className="col-12 col-md-3">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-lg btn-primary text-white fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2"
            >
              <RefreshCw size={17} />
              <span>{loading ? "Checking..." : "Track Order"}</span>
            </button>
          </div>
        </form>

        <div className="mt-3 d-flex flex-wrap align-items-center gap-2">
          <span className="text-xs text-body-secondary fw-semibold">
            Sample live references:
          </span>
          {SAMPLE_REFERENCES.map((sample) => (
            <button
              key={sample.ref}
              type="button"
              onClick={() => {
                setInputRef(sample.ref);
                lookupReference(sample.ref);
              }}
              className="btn btn-sm btn-outline-secondary text-xs fw-semibold py-1 px-2"
            >
              {sample.ref} ({sample.label})
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="alert alert-warning mt-4 mb-0 text-sm fw-medium">
            {errorMsg}
          </div>
        )}
      </div>

      {tracking && (
        <>
          <OrderStatusTracker
            stageIndex={tracking.stageIndex}
            timeline={tracking.timeline}
            assignedRider={tracking.assignedRider}
          />

          <div className="tf-card p-4 p-md-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-3 border-bottom">
              <div>
                <span className="text-xs fw-bold text-uppercase text-secondary">
                  Reference
                </span>
                <h2 className="m-0 fs-4 fw-bold text-primary">
                  {tracking.reference}
                </h2>
              </div>
              <a
                href={buildWhatsAppOrderUrl(
                  `Hello Tabitha Fresh, please share an update on order reference ${tracking.reference}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm text-white fw-semibold px-3 py-2"
                style={{ backgroundColor: "#25D366" }}
              >
                Ask Dispatch on WhatsApp
              </a>
            </div>

            <div className="row gy-3 pt-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="text-xs fw-bold text-uppercase text-secondary">
                  Pickup Slot
                </div>
                <div className="fw-bold text-body-emphasis mt-1">
                  {tracking.pickupDate}
                </div>
                <div className="text-sm text-body-secondary">
                  {tracking.pickupSlot}
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="text-xs fw-bold text-uppercase text-secondary">
                  Estimated Return
                </div>
                <div className="fw-bold text-body-emphasis mt-1">
                  {tracking.deliveryDate}
                </div>
                <div className="text-sm text-body-secondary">
                  {tracking.deliveryWindow}
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="text-xs fw-bold text-uppercase text-secondary">
                  Nairobi Route
                </div>
                <div className="fw-bold text-body-emphasis mt-1 d-inline-flex align-items-center gap-1">
                  <MapPin size={15} className="text-primary" />
                  <span>
                    {tracking.pickupZone} &rarr; {tracking.deliveryZone}
                  </span>
                </div>
                <div className="text-sm text-body-secondary">
                  {tracking.paymentStatus}
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="text-xs fw-bold text-uppercase text-secondary">
                  Services &amp; Total
                </div>
                <div className="fw-bold text-primary fs-5 mt-1">
                  KES {tracking.totalEstimatedKes.toLocaleString()}
                </div>
                <div className="text-xs text-body-secondary">
                  {tracking.services
                    .map((s) => `${s.name} (${s.quantity} ${s.unit})`)
                    .join(", ")}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
