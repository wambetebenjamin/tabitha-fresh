"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  PackageCheck,
  Truck,
  WashingMachine,
} from "lucide-react";
import { ORDER_STAGES, OrderTimelineEvent } from "@/lib/schemas";

export default function OrderStatusTracker({
  stageIndex,
  timeline,
  assignedRider,
}: {
  stageIndex: number;
  timeline?: OrderTimelineEvent[];
  assignedRider?: string;
}) {
  const clamped = Math.max(0, Math.min(ORDER_STAGES.length - 1, stageIndex));
  const progressPercent = ((clamped + 1) / ORDER_STAGES.length) * 100;

  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Calendar size={18} />;
      case 1:
        return <PackageCheck size={18} />;
      case 2:
        return <WashingMachine size={18} />;
      default:
        return <Truck size={18} />;
    }
  };

  return (
    <div className="tf-card p-4 p-md-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <div>
          <span className="text-xs fw-bold text-uppercase text-primary-emphasis">
            Live Order Status
          </span>
          <h3 className="m-0 mt-1 fs-4 fw-bold text-body-emphasis">
            {ORDER_STAGES[clamped]}
          </h3>
        </div>
        {assignedRider && (
          <span className="badge bg-body-tertiary text-body-emphasis border px-3 py-2 text-xs fw-semibold">
            {assignedRider}
          </span>
        )}
      </div>

      {/* Horizontal Step Progress Bar with Framer Motion Fill (#3) */}
      <div
        className="position-relative rounded-pill bg-body-secondary overflow-hidden mb-4"
        style={{ height: 12 }}
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Order progress: ${ORDER_STAGES[clamped]}`}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="h-100 rounded-pill"
          style={{ backgroundColor: "var(--bs-primary)" }}
        />
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-3 gx-3">
        {ORDER_STAGES.map((stageLabel, idx) => {
          const isCompleted = idx <= clamped;
          const isCurrent = idx === clamped;
          const eventInfo = timeline?.[idx];

          return (
            <div className="col" key={stageLabel}>
              <div
                className={`h-100 p-3 rounded-3 border ${
                  isCurrent
                    ? "bg-primary-subtle border-primary"
                    : isCompleted
                    ? "bg-body-tertiary border-info"
                    : "bg-body border"
                }`}
              >
                <div className="d-flex align-items-center gap-2">
                  <span
                    className={`rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 ${
                      isCompleted
                        ? "bg-primary text-white"
                        : "bg-body-secondary text-body-secondary"
                    }`}
                    style={{ width: 34, height: 34 }}
                  >
                    {idx < clamped ? <Check size={16} /> : getStageIcon(idx)}
                  </span>
                  <div>
                    <div className="text-xs fw-bold text-secondary">
                      Stage {idx + 1}
                    </div>
                    <div className="fw-bold text-body-emphasis text-sm">
                      {stageLabel}
                    </div>
                  </div>
                </div>

                {eventInfo?.note && (
                  <p className="m-0 mt-2 text-xs text-body-secondary leading-5">
                    {eventInfo.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
