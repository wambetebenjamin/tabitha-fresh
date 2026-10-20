"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, PackageCheck } from "lucide-react";
import {
  BULK_DISCOUNT_NOTE,
  MINIMUM_ORDER_NOTE,
  PRICING_TABS,
} from "@/lib/data";

export default function PricingTabs() {
  const [activeKey, setActiveKey] = useState<string>(PRICING_TABS[0].key);
  const currentTab =
    PRICING_TABS.find((t) => t.key === activeKey) || PRICING_TABS[0];

  return (
    <div>
      {/* Animated Tab Switcher (#6: Framer Motion layoutId) */}
      <div
        role="tablist"
        aria-label="Laundry service pricing categories"
        className="d-flex flex-wrap justify-content-center gap-2 p-2 rounded-4 bg-body-tertiary border"
      >
        {PRICING_TABS.map((tab) => {
          const isSelected = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => setActiveKey(tab.key)}
              className="btn position-relative px-3 px-sm-4 py-2 rounded-3 fw-semibold text-sm border-0"
              style={{
                color: isSelected ? "#ffffff" : "var(--bs-emphasis-color)",
                zIndex: 1,
              }}
            >
              {isSelected && (
                <motion.span
                  layoutId="activePricingTabPill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="position-absolute top-0 start-0 end-0 bottom-0 rounded-3"
                  style={{
                    backgroundColor: "var(--bs-primary)",
                    zIndex: -1,
                  }}
                />
              )}
              <span className="position-relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24 }}
          className="tf-card p-4 p-md-5 mt-4"
        >
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 pb-4 border-bottom">
            <div>
              <h2 className="m-0 fs-3 fw-bold text-body-emphasis">
                {currentTab.label} Pricing
              </h2>
              <p className="m-0 mt-1 text-body-secondary text-sm">
                {currentTab.subtitle}
              </p>
            </div>
            <Link
              href={`/booking?service=${currentTab.serviceSlug}`}
              className="btn btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2 align-self-start align-self-md-center"
            >
              <span>Book {currentTab.label}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="table-responsive mt-3">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col" className="text-xs text-uppercase text-secondary">
                    Item / Service Tier
                  </th>
                  <th scope="col" className="text-xs text-uppercase text-secondary">
                    Billing Unit
                  </th>
                  <th scope="col" className="text-xs text-uppercase text-secondary">
                    What is Included
                  </th>
                  <th
                    scope="col"
                    className="text-end text-xs text-uppercase text-secondary"
                  >
                    Price (KES)
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTab.rows.map((row) => (
                  <tr key={row.item}>
                    <td className="py-3 fw-bold text-body-emphasis">
                      {row.item}
                    </td>
                    <td className="py-3 text-sm text-body-secondary">
                      {row.unit}
                    </td>
                    <td className="py-3 text-sm text-body-secondary">
                      <span className="d-inline-flex align-items-center gap-1">
                        <CheckCircle2
                          size={15}
                          className="text-success flex-shrink-0"
                        />
                        {row.notes}
                      </span>
                    </td>
                    <td className="py-3 text-end fw-bold text-primary fs-6">
                      KES {row.priceKes.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Minimum Order Note & Bulk Discount Note */}
      <div className="row g-4 mt-2">
        <div className="col-12 col-md-6">
          <div className="p-4 rounded-4 bg-body-tertiary border h-100 d-flex align-items-start gap-3">
            <Info size={22} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="m-0 fs-6 fw-bold text-body-emphasis">
                Minimum Order Note
              </h3>
              <p className="m-0 mt-2 text-sm text-body-secondary leading-6">
                {MINIMUM_ORDER_NOTE}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-4 rounded-4 bg-body-tertiary border h-100 d-flex align-items-start gap-3">
            <PackageCheck
              size={22}
              className="text-success flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="m-0 fs-6 fw-bold text-body-emphasis">
                Bulk Discount Note
              </h3>
              <p className="m-0 mt-2 text-sm text-body-secondary leading-6">
                {BULK_DISCOUNT_NOTE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
