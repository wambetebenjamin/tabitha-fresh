"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  Smartphone,
  Truck,
  User,
} from "lucide-react";
import { COVERAGE_ZONES, LAUNDRY_SERVICES } from "@/lib/data";
import { DELIVERY_WINDOWS, PICKUP_TIME_SLOTS } from "@/lib/constants";
import { useBookingStore } from "@/lib/booking-store";
import { SelectedServiceLine } from "@/lib/schemas";
import ServiceIcon from "@/components/ServiceIcon";
import {
  RecaptchaFallbackChallenge,
  RecaptchaNotice,
  useRecaptchaToken,
} from "@/components/RecaptchaGuard";

const WIZARD_STEPS = [
  { num: 1, short: "Services", title: "Choose Services Needed" },
  { num: 2, short: "Pickup", title: "Pickup Date & Time Slot" },
  { num: 3, short: "Delivery", title: "Delivery Date Preference" },
  { num: 4, short: "Address", title: "Pickup & Delivery Address" },
  { num: 5, short: "Contact", title: "Contact & Special Care" },
  { num: 6, short: "Confirm", title: "Review & Confirm Order" },
] as const;

function buildUpcomingDates(startOffsetDays: number, count: number): string[] {
  const result: string[] = [];
  const base = new Date();
  for (let i = startOffsetDays; i < startOffsetDays + count; i += 1) {
    const d = new Date(base.getTime() + i * 86_400_000);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

function formatReadableDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T09:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { executeV3 } = useRecaptchaToken("booking_submit");

  const {
    step,
    selectedQuantities,
    pickupDate,
    pickupSlot,
    deliveryDate,
    deliveryWindow,
    pickupZone,
    pickupAddress,
    sameDeliveryAddress,
    deliveryZone,
    deliveryAddress,
    customerName,
    customerPhone,
    customerEmail,
    specialCareNotes,
    paymentMethod,
    setStep,
    toggleService,
    selectOnlyOrAddService,
    setServiceQuantity,
    updateFields,
    addConfirmedBooking,
    loadReorder,
  } = useBookingStore();

  const [stepError, setStepError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [needsV2, setNeedsV2] = useState(false);
  const [v2Checked, setV2Checked] = useState(false);

  // Hydrate query parameters (?service=..., ?zone=..., ?reorder=...)
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const zoneParam = searchParams.get("zone");
    const reorderRef = searchParams.get("reorder");

    if (serviceParam) {
      const matched = LAUNDRY_SERVICES.find((s) => s.slug === serviceParam);
      if (matched) {
        selectOnlyOrAddService(matched.slug, matched.defaultQuantity);
      }
    }

    if (zoneParam && COVERAGE_ZONES.includes(zoneParam)) {
      updateFields({
        pickupZone: zoneParam,
        deliveryZone: zoneParam,
      });
    }

    if (reorderRef) {
      fetch(`/api/booking/${encodeURIComponent(reorderRef)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.ok && data.booking) {
            loadReorder(data.booking);
          }
        })
        .catch(() => null);
    }
  }, [searchParams, selectOnlyOrAddService, updateFields, loadReorder]);

  // Pre-fill signed-in user name/email if empty
  useEffect(() => {
    if (session?.user) {
      const patch: { customerName?: string; customerEmail?: string } = {};
      if (!customerName && session.user.name) {
        patch.customerName = session.user.name;
      }
      if (!customerEmail && session.user.email) {
        patch.customerEmail = session.user.email;
      }
      if (Object.keys(patch).length > 0) {
        updateFields(patch);
      }
    }
  }, [session, customerName, customerEmail, updateFields]);

  const selectedLines: SelectedServiceLine[] = useMemo(() => {
    return LAUNDRY_SERVICES.filter((s) => Boolean(selectedQuantities[s.slug])).map(
      (s) => {
        const qty = selectedQuantities[s.slug] || s.defaultQuantity;
        return {
          slug: s.slug,
          name: s.name,
          quantity: qty,
          unit: s.unitLabel,
          unitPriceKes: s.startingPriceKes,
          lineTotalKes: qty * s.startingPriceKes,
        };
      }
    );
  }, [selectedQuantities]);

  const hasExpress = useMemo(
    () => selectedLines.some((s) => s.slug === "express-service"),
    [selectedLines]
  );

  const pickupDates = useMemo(() => buildUpcomingDates(0, 8), []);

  const availableDeliveryDates = useMemo(() => {
    const base = new Date(`${pickupDate}T00:00:00Z`);
    const validBase = Number.isNaN(base.getTime()) ? new Date() : base;
    const minOffset = hasExpress ? 0 : 1;
    const dates: string[] = [];
    for (let i = minOffset; i < minOffset + 7; i += 1) {
      const d = new Date(validBase.getTime() + i * 86_400_000);
      dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
  }, [pickupDate, hasExpress]);

  useEffect(() => {
    if (
      availableDeliveryDates.length > 0 &&
      !availableDeliveryDates.includes(deliveryDate)
    ) {
      updateFields({ deliveryDate: availableDeliveryDates[0] });
    }
  }, [availableDeliveryDates, deliveryDate, updateFields]);

  const pricingTotals = useMemo(() => {
    const rawSubtotal = selectedLines.reduce(
      (acc, l) => acc + l.lineTotalKes,
      0
    );
    const totalKg = selectedLines
      .filter((l) => l.unit === "kg")
      .reduce((acc, l) => acc + l.quantity, 0);
    const discount = totalKg >= 15 ? Math.round(rawSubtotal * 0.1) : 0;
    const afterDiscount = Math.max(rawSubtotal - discount, 0);
    const finalTotal = selectedLines.length > 0 ? Math.max(afterDiscount, 1000) : 0;
    return {
      rawSubtotal,
      discount,
      finalTotal,
      minimumApplied: selectedLines.length > 0 && afterDiscount < 1000,
    };
  }, [selectedLines]);

  const validateCurrentStep = (): boolean => {
    setStepError("");
    if (step === 1) {
      if (selectedLines.length === 0) {
        setStepError("Please choose at least one laundry service to continue.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!pickupDate || !pickupSlot) {
        setStepError("Please choose both a pickup date and a pickup time slot.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!deliveryDate || !deliveryWindow) {
        setStepError("Please select your preferred delivery date and window.");
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!pickupZone || pickupAddress.trim().length < 5) {
        setStepError(
          "Please enter your street, apartment, or office name for pickup (minimum 5 characters)."
        );
        return false;
      }
      if (!sameDeliveryAddress) {
        if (!deliveryZone || deliveryAddress.trim().length < 5) {
          setStepError(
            "Please enter the full delivery street or building address."
          );
          return false;
        }
      }
      return true;
    }
    if (step === 5) {
      if (customerName.trim().length < 2) {
        setStepError("Please enter your full name.");
        return false;
      }
      if (customerPhone.trim().length < 9) {
        setStepError("Please enter a valid Kenyan mobile number (e.g. +254712345678).");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
        setStepError("Please enter a valid email address for your receipt and tracking link.");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep(Math.min(6, step + 1));
    }
  };

  const handleBack = () => {
    setStepError("");
    setStep(Math.max(1, step - 1));
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    if (needsV2 && !v2Checked) {
      setStepError("Please tick the reCAPTCHA v2 verification box first.");
      return;
    }

    setSubmitting(true);
    setStepError("");

    try {
      const token = needsV2
        ? `dev-recaptcha-v2-booking-${Date.now()}`
        : await executeV3();

      // Verify token with /api/recaptcha/verify first
      const verifyRes = await fetch("/api/recaptcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          mode: needsV2 ? "v2" : "v3",
        }),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyRes.ok || !verifyJson.success) {
        if (verifyJson.requiresV2Fallback) {
          setNeedsV2(true);
        }
        setStepError(
          verifyJson.message || "Security verification failed. Please retry."
        );
        setSubmitting(false);
        return;
      }

      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedLines,
          pickupDate,
          pickupSlot,
          deliveryDate,
          deliveryWindow,
          pickupZone,
          pickupAddress: pickupAddress.trim(),
          sameDeliveryAddress,
          deliveryZone: sameDeliveryAddress ? pickupZone : deliveryZone,
          deliveryAddress: sameDeliveryAddress
            ? pickupAddress.trim()
            : deliveryAddress.trim(),
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim(),
          specialCareNotes: specialCareNotes.trim(),
          paymentMethod,
          recaptchaToken: token,
          recaptchaMode: needsV2 ? "v2" : "v3",
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.requiresV2Fallback) {
          setNeedsV2(true);
        }
        setStepError(
          data.error || "Could not complete your booking. Please review details."
        );
        setSubmitting(false);
        return;
      }

      addConfirmedBooking(data.booking);
      router.push(
        `/booking-confirmation?ref=${encodeURIComponent(data.reference)}`
      );
    } catch {
      setStepError(
        "Connection interrupted while creating your pickup. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="row gy-4 gx-xl-5 align-items-start">
      {/* Main 6-Step Form Column */}
      <div className="col-12 col-xl-8">
        {/* Horizontal Stepper Bar */}
        <div className="tf-card p-3 p-md-4 mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            {WIZARD_STEPS.map((item) => {
              const isDone = item.num < step;
              const isCurrent = item.num === step;
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => {
                    if (item.num <= step) {
                      setStepError("");
                      setStep(item.num);
                    }
                  }}
                  className={`btn btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold border ${
                    isCurrent
                      ? "btn-primary text-white border-primary"
                      : isDone
                      ? "bg-body-tertiary text-body-emphasis border-info"
                      : "bg-body text-body-secondary"
                  }`}
                >
                  <span
                    className={`rounded-circle d-inline-flex align-items-center justify-content-center text-xs fw-bold ${
                      isCurrent
                        ? "bg-white text-primary"
                        : isDone
                        ? "bg-primary text-white"
                        : "bg-body-secondary text-body-emphasis"
                    }`}
                    style={{ width: 22, height: 22 }}
                  >
                    {isDone ? <Check size={13} /> : item.num}
                  </span>
                  <span className="d-none d-sm-inline">{item.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Step Body (#2: Framer Motion AnimatePresence) */}
        <form onSubmit={handleConfirmBooking} className="tf-card p-4 p-md-5" noValidate>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <span className="text-xs fw-bold text-uppercase text-primary-emphasis">
                Step {step} of 6
              </span>
              <h2 className="m-0 mt-1 fs-3 fw-bold text-body-emphasis">
                {WIZARD_STEPS[step - 1].title}
              </h2>

              {/* STEP 1: Multi-select Services */}
              {step === 1 && (
                <div className="mt-4">
                  <p className="text-sm text-body-secondary mb-3">
                    Select one or more services. Our rider weighs and verifies
                    exact counts at your doorstep.
                  </p>
                  <div className="row row-cols-1 row-cols-md-2 g-3">
                    {LAUNDRY_SERVICES.map((svc) => {
                      const qty = selectedQuantities[svc.slug] || 0;
                      const isSelected = qty > 0;

                      return (
                        <div className="col" key={svc.slug}>
                          <div
                            className={`h-100 p-3 rounded-4 border transition ${
                              isSelected
                                ? "bg-body-tertiary border-primary shadow-sm"
                                : "bg-body"
                            }`}
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() =>
                                toggleService(svc.slug, svc.defaultQuantity)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  toggleService(svc.slug, svc.defaultQuantity);
                                }
                              }}
                              className="d-flex align-items-start justify-content-between gap-2 cursor-pointer"
                            >
                              <div className="d-flex align-items-start gap-2">
                                <span className="p-2 rounded-3 bg-body border text-primary d-inline-flex">
                                  <ServiceIcon
                                    iconKey={svc.iconKey}
                                    size={19}
                                  />
                                </span>
                                <div>
                                  <div className="fw-bold text-body-emphasis text-sm">
                                    {svc.name}
                                  </div>
                                  <div className="text-xs text-primary fw-semibold mt-1">
                                    {svc.startingPriceLabel}
                                  </div>
                                </div>
                              </div>

                              <span
                                className={`rounded-circle border d-inline-flex align-items-center justify-content-center flex-shrink-0 ${
                                  isSelected
                                    ? "bg-primary border-primary text-white"
                                    : "bg-body"
                                }`}
                                style={{ width: 24, height: 24 }}
                              >
                                {isSelected && <Check size={14} />}
                              </span>
                            </div>

                            <p className="m-0 mt-2 text-xs text-body-secondary">
                              {svc.turnaround}
                            </p>

                            {isSelected && (
                              <div className="mt-3 pt-2 border-top d-flex align-items-center justify-content-between">
                                <span className="text-xs fw-semibold text-body-emphasis">
                                  Estimated {svc.unitLabel}s:
                                </span>
                                <div className="d-inline-flex align-items-center gap-2">
                                  <button
                                    type="button"
                                    aria-label={`Decrease ${svc.name}`}
                                    onClick={() =>
                                      setServiceQuantity(svc.slug, qty - 1)
                                    }
                                    className="btn btn-sm btn-outline-secondary p-1"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="fw-bold text-sm px-2">
                                    {qty} {svc.unitLabel}
                                  </span>
                                  <button
                                    type="button"
                                    aria-label={`Increase ${svc.name}`}
                                    onClick={() =>
                                      setServiceQuantity(svc.slug, qty + 1)
                                    }
                                    className="btn btn-sm btn-outline-primary p-1"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Pickup Date and Time Slot */}
              {step === 2 && (
                <div className="mt-4">
                  <label className="form-label fw-bold text-body-emphasis text-sm d-flex align-items-center gap-2">
                    <Calendar size={17} className="text-primary" />
                    <span>Select Pickup Date</span>
                  </label>
                  <div className="row row-cols-2 row-cols-sm-4 g-2 mb-4">
                    {pickupDates.map((iso, idx) => {
                      const active = pickupDate === iso;
                      return (
                        <div className="col" key={iso}>
                          <button
                            type="button"
                            onClick={() => updateFields({ pickupDate: iso })}
                            className={`btn w-100 text-start p-3 rounded-3 border ${
                              active
                                ? "btn-primary text-white border-primary"
                                : "bg-body text-body-emphasis"
                            }`}
                          >
                            <div className="text-xs opacity-75">
                              {idx === 0
                                ? "Today"
                                : idx === 1
                                ? "Tomorrow"
                                : "Available"}
                            </div>
                            <div className="fw-bold text-sm mt-1">
                              {formatReadableDate(iso)}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <label className="form-label fw-bold text-body-emphasis text-sm">
                    Choose Doorstep Time Slot
                  </label>
                  <div className="row row-cols-1 row-cols-sm-2 g-2">
                    {PICKUP_TIME_SLOTS.map((slot) => {
                      const active = pickupSlot === slot;
                      return (
                        <div className="col" key={slot}>
                          <button
                            type="button"
                            onClick={() => updateFields({ pickupSlot: slot })}
                            className={`btn w-100 p-3 rounded-3 border fw-semibold text-sm ${
                              active
                                ? "btn-primary text-white border-primary"
                                : "bg-body text-body-emphasis"
                            }`}
                          >
                            {slot}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Delivery Date Preference */}
              {step === 3 && (
                <div className="mt-4">
                  <div className="p-3 rounded-3 bg-body-tertiary border mb-4 text-sm text-body-emphasis">
                    {hasExpress
                      ? "Express Same-Day Service selected: same-day return is unlocked for your booking."
                      : "Standard 24-hour turnaround included free: next-day return is ready starting tomorrow."}
                  </div>

                  <label className="form-label fw-bold text-body-emphasis text-sm">
                    Preferred Return Date
                  </label>
                  <div className="row row-cols-2 row-cols-sm-3 g-2 mb-4">
                    {availableDeliveryDates.map((iso, idx) => {
                      const active = deliveryDate === iso;
                      return (
                        <div className="col" key={iso}>
                          <button
                            type="button"
                            onClick={() => updateFields({ deliveryDate: iso })}
                            className={`btn w-100 text-start p-3 rounded-3 border ${
                              active
                                ? "btn-primary text-white border-primary"
                                : "bg-body text-body-emphasis"
                            }`}
                          >
                            <div className="text-xs opacity-75">
                              {idx === 0 ? "Earliest Return" : "Flexible"}
                            </div>
                            <div className="fw-bold text-sm mt-1">
                              {formatReadableDate(iso)}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <label className="form-label fw-bold text-body-emphasis text-sm">
                    Preferred Delivery Window
                  </label>
                  <div className="row row-cols-1 row-cols-md-3 g-2">
                    {DELIVERY_WINDOWS.map((win) => {
                      const active = deliveryWindow === win;
                      return (
                        <div className="col" key={win}>
                          <button
                            type="button"
                            onClick={() => updateFields({ deliveryWindow: win })}
                            className={`btn w-100 p-3 rounded-3 border fw-semibold text-sm ${
                              active
                                ? "btn-primary text-white border-primary"
                                : "bg-body text-body-emphasis"
                            }`}
                          >
                            {win}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Address (Pickup & Delivery, Same or Different) */}
              {step === 4 && (
                <div className="mt-4 row g-3">
                  <div className="col-12 col-md-5">
                    <label
                      htmlFor="pickup-zone"
                      className="form-label fw-semibold text-sm text-body-emphasis"
                    >
                      Nairobi Pickup Area <span className="text-danger">*</span>
                    </label>
                    <select
                      id="pickup-zone"
                      value={pickupZone}
                      onChange={(e) =>
                        updateFields({ pickupZone: e.target.value })
                      }
                      className="form-select"
                    >
                      {COVERAGE_ZONES.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-7">
                    <label
                      htmlFor="pickup-address"
                      className="form-label fw-semibold text-sm text-body-emphasis"
                    >
                      Street, Apartment / Office &amp; House No.{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      id="pickup-address"
                      type="text"
                      value={pickupAddress}
                      onChange={(e) =>
                        updateFields({ pickupAddress: e.target.value })
                      }
                      placeholder="e.g. Kindaruma Road, Cedar Court Apt B4"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 pt-2">
                    <div className="form-check p-3 rounded-3 bg-body-tertiary border d-flex align-items-center gap-2 m-0">
                      <input
                        id="same-address-toggle"
                        type="checkbox"
                        checked={sameDeliveryAddress}
                        onChange={(e) =>
                          updateFields({
                            sameDeliveryAddress: e.target.checked,
                          })
                        }
                        className="form-check-input m-0"
                      />
                      <label
                        htmlFor="same-address-toggle"
                        className="form-check-label fw-semibold text-sm text-body-emphasis"
                      >
                        Deliver clean clothes back to the same address as pickup
                      </label>
                    </div>
                  </div>

                  {!sameDeliveryAddress && (
                    <>
                      <div className="col-12 col-md-5">
                        <label
                          htmlFor="delivery-zone"
                          className="form-label fw-semibold text-sm text-body-emphasis"
                        >
                          Nairobi Delivery Area{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="delivery-zone"
                          value={deliveryZone}
                          onChange={(e) =>
                            updateFields({ deliveryZone: e.target.value })
                          }
                          className="form-select"
                        >
                          {COVERAGE_ZONES.map((z) => (
                            <option key={z} value={z}>
                              {z}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-md-7">
                        <label
                          htmlFor="delivery-address"
                          className="form-label fw-semibold text-sm text-body-emphasis"
                        >
                          Delivery Street, Building &amp; Unit{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          id="delivery-address"
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) =>
                            updateFields({ deliveryAddress: e.target.value })
                          }
                          placeholder="e.g. Hospital Road, Britam Tower 9th Floor"
                          className="form-control"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 5: Contact Details & Special Care Notes */}
              {step === 5 && (
                <div className="mt-4 row g-3">
                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="cust-name"
                      className="form-label fw-semibold text-sm text-body-emphasis"
                    >
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="cust-name"
                      type="text"
                      value={customerName}
                      onChange={(e) =>
                        updateFields({ customerName: e.target.value })
                      }
                      placeholder="Amina Wanjiku"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="cust-phone"
                      className="form-label fw-semibold text-sm text-body-emphasis"
                    >
                      Phone / M-Pesa Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      id="cust-phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) =>
                        updateFields({ customerPhone: e.target.value })
                      }
                      placeholder="+254712345678"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label
                      htmlFor="cust-email"
                      className="form-label fw-semibold text-sm text-body-emphasis"
                    >
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      id="cust-email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) =>
                        updateFields({ customerEmail: e.target.value })
                      }
                      placeholder="amina@example.co.ke"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label
                      htmlFor="care-notes"
                      className="form-label fw-semibold text-sm text-body-emphasis"
                    >
                      Special Care Instructions &amp; Gate Notes (Optional)
                    </label>
                    <textarea
                      id="care-notes"
                      rows={3}
                      value={specialCareNotes}
                      onChange={(e) =>
                        updateFields({ specialCareNotes: e.target.value })
                      }
                      placeholder="e.g. No starch on linen shirts, fragrance-free wash for baby clothes, call at gate B."
                      className="form-control"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: Review & Confirm + M-Pesa Payment + reCAPTCHA v3 */}
              {step === 6 && (
                <div className="mt-4">
                  <div className="p-4 rounded-4 bg-body-tertiary border mb-4">
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <div className="text-xs fw-bold text-uppercase text-secondary">
                          Pickup Schedule
                        </div>
                        <div className="fw-bold text-body-emphasis mt-1">
                          {formatReadableDate(pickupDate)}
                        </div>
                        <div className="text-sm text-body-secondary">
                          {pickupSlot}
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="text-xs fw-bold text-uppercase text-secondary">
                          Estimated Delivery
                        </div>
                        <div className="fw-bold text-body-emphasis mt-1">
                          {formatReadableDate(deliveryDate)}
                        </div>
                        <div className="text-sm text-body-secondary">
                          {deliveryWindow}
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="text-xs fw-bold text-uppercase text-secondary">
                          Pickup Location
                        </div>
                        <div className="fw-semibold text-sm text-body-emphasis mt-1 d-flex align-items-start gap-1">
                          <MapPin
                            size={15}
                            className="text-primary flex-shrink-0 mt-1"
                          />
                          <span>
                            {pickupAddress}, {pickupZone}
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="text-xs fw-bold text-uppercase text-secondary">
                          Contact Person
                        </div>
                        <div className="fw-semibold text-sm text-body-emphasis mt-1 d-flex align-items-start gap-1">
                          <User
                            size={15}
                            className="text-primary flex-shrink-0 mt-1"
                          />
                          <span>
                            {customerName} ({customerPhone})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="fs-6 fw-bold text-body-emphasis mb-3">
                    Select M-Pesa Payment Preference
                  </h3>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label
                        className={`p-3 rounded-4 border d-flex align-items-start gap-3 h-100 cursor-pointer ${
                          paymentMethod === "mpesa_on_delivery"
                            ? "bg-body-tertiary border-primary"
                            : "bg-body"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="form-check-input mt-1"
                          checked={paymentMethod === "mpesa_on_delivery"}
                          onChange={() =>
                            updateFields({ paymentMethod: "mpesa_on_delivery" })
                          }
                        />
                        <div>
                          <div className="fw-bold text-sm text-body-emphasis d-flex align-items-center gap-1">
                            <Truck size={16} className="text-primary" />
                            <span>M-Pesa on Delivery</span>
                          </div>
                          <p className="m-0 mt-1 text-xs text-body-secondary">
                            Pay via M-Pesa STK Push or Till when clean laundry
                            arrives at your door.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="col-12 col-md-6">
                      <label
                        className={`p-3 rounded-4 border d-flex align-items-start gap-3 h-100 cursor-pointer ${
                          paymentMethod === "mpesa_prepay"
                            ? "bg-body-tertiary border-primary"
                            : "bg-body"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="form-check-input mt-1"
                          checked={paymentMethod === "mpesa_prepay"}
                          onChange={() =>
                            updateFields({ paymentMethod: "mpesa_prepay" })
                          }
                        />
                        <div>
                          <div className="fw-bold text-sm text-body-emphasis d-flex align-items-center gap-1">
                            <Smartphone size={16} className="text-success" />
                            <span>Prepay via M-Pesa Now</span>
                          </div>
                          <p className="m-0 mt-1 text-xs text-body-secondary">
                            Receive an instant M-Pesa prompt on {customerPhone || "your phone"} right after confirmation.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <RecaptchaFallbackChallenge
                    visible={needsV2}
                    checked={v2Checked}
                    onCheckChange={setV2Checked}
                  />
                  <RecaptchaNotice />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {stepError && (
            <div className="alert alert-danger py-2 px-3 text-sm mt-4 mb-0">
              {stepError}
            </div>
          )}

          <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-between gap-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1 || submitting}
              className="btn btn-outline-secondary fw-semibold text-sm px-3 d-inline-flex align-items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-lg btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
              >
                <CheckCircle2 size={18} />
                <span>
                  {submitting
                    ? "Confirming Pickup..."
                    : "Confirm Pickup Booking"}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Live Order Summary Sidebar */}
      <div className="col-12 col-xl-4">
        <aside className="tf-card p-4 position-sticky" style={{ top: 96 }}>
          <h3 className="m-0 fs-5 fw-bold text-body-emphasis">
            Pickup Summary
          </h3>
          <p className="m-0 mt-1 text-xs text-body-secondary">
            Free doorstep collection &amp; return across Nairobi
          </p>

          <hr className="my-3 opacity-10" />

          {selectedLines.length === 0 ? (
            <p className="text-sm text-body-secondary my-3">
              No services selected yet. Choose at least one service to see your
              estimate.
            </p>
          ) : (
            <ul className="list-unstyled m-0 d-flex flex-column gap-2">
              {selectedLines.map((line) => (
                <li
                  key={line.slug}
                  className="d-flex align-items-center justify-content-between text-sm"
                >
                  <span className="text-body-emphasis fw-medium">
                    {line.name}{" "}
                    <span className="text-body-secondary">
                      ({line.quantity} {line.unit})
                    </span>
                  </span>
                  <span className="fw-bold text-body-emphasis">
                    KES {line.lineTotalKes.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <hr className="my-3 opacity-10" />

          {pricingTotals.discount > 0 && (
            <div className="d-flex justify-content-between text-sm text-success-emphasis mb-2">
              <span>Bulk 10% Discount (15kg+)</span>
              <span>- KES {pricingTotals.discount.toLocaleString()}</span>
            </div>
          )}

          <div className="d-flex justify-content-between text-sm mb-2">
            <span className="text-body-secondary">Nairobi Rider Fee</span>
            <span className="fw-bold text-success">FREE</span>
          </div>

          <div className="d-flex justify-content-between align-items-baseline pt-2 border-top">
            <span className="fw-bold text-body-emphasis">Estimated Total</span>
            <span className="fs-4 fw-bold text-primary">
              KES {pricingTotals.finalTotal.toLocaleString()}
            </span>
          </div>

          {pricingTotals.minimumApplied && (
            <p className="m-0 mt-2 text-xs text-body-secondary">
              Includes KES 1,000 minimum pickup threshold.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
