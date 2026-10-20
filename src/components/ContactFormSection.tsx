"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import {
  RecaptchaFallbackChallenge,
  RecaptchaNotice,
  useRecaptchaToken,
} from "@/components/RecaptchaGuard";
import { WHATSAPP_DISPLAY } from "@/lib/constants";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

export default function ContactFormSection() {
  const { executeV3 } = useRecaptchaToken("contact_submit");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [needsV2, setNeedsV2] = useState(false);
  const [v2Checked, setV2Checked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: true,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError("");
    setSuccessMessage("");

    if (needsV2 && !v2Checked) {
      setServerError("Please complete the reCAPTCHA v2 checkbox check first.");
      return;
    }

    setSubmitting(true);
    try {
      const token = needsV2
        ? `dev-recaptcha-v2-verified-${Date.now()}`
        : await executeV3();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
          recaptchaToken: token,
          recaptchaMode: needsV2 ? "v2" : "v3",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.requiresV2Fallback) {
          setNeedsV2(true);
        }
        setServerError(
          data.error || "Message could not be sent. Please try again."
        );
        return;
      }

      setSuccessMessage(data.message);
      setNeedsV2(false);
      setV2Checked(false);
      reset();
    } catch {
      setServerError(
        `Network error. Please retry or chat with us on WhatsApp at ${WHATSAPP_DISPLAY}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body"
    >
      <div className="container">
        <div className="row gy-5 gx-xl-5 align-items-center justify-content-between">
          <div className="col-12 col-xl-6">
            <div className="max-w-xl mx-auto mx-xl-0">
              <span className="tf-eyebrow">Get in Touch</span>
              <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
                Questions about corporate accounts, bulk plans, or special care?
              </h2>
              <p className="m-0 mt-3 text-body-secondary text-base leading-7">
                Send our Nairobi garment care desk a note below, or chat directly
                on WhatsApp at <strong>{WHATSAPP_DISPLAY}</strong>.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="row g-3 mt-3"
                noValidate
              >
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="contact-name"
                    className="form-label text-sm fw-semibold text-body-emphasis"
                  >
                    Full name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Wanjiku Mwangi"
                    {...register("name", {
                      required: "Please enter your full name.",
                      minLength: { value: 2, message: "Enter at least 2 characters." },
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                  )}
                </div>

                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="contact-phone"
                    className="form-label text-sm fw-semibold text-body-emphasis"
                  >
                    Phone number <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="+254712345678"
                    {...register("phone", {
                      required: "Please enter your phone number.",
                      minLength: { value: 9, message: "Enter a valid Kenyan phone number." },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone.message}</div>
                  )}
                </div>

                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="contact-email"
                    className="form-label text-sm fw-semibold text-body-emphasis"
                  >
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="wanjiku@example.co.ke"
                    {...register("email", {
                      required: "Please enter your email address.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="contact-subject"
                    className="form-label text-sm fw-semibold text-body-emphasis"
                  >
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    className={`form-control ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    placeholder="Monthly Airbnb / Household Plan"
                    {...register("subject", {
                      required: "Please enter a subject.",
                      minLength: { value: 3, message: "Subject is too short." },
                    })}
                  />
                  {errors.subject && (
                    <div className="invalid-feedback">
                      {errors.subject.message}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label
                    htmlFor="contact-message"
                    className="form-label text-sm fw-semibold text-body-emphasis"
                  >
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    placeholder="Tell us your Nairobi neighbourhood, approximate load size, or garment questions..."
                    {...register("message", {
                      required: "Please write a message.",
                      minLength: {
                        value: 10,
                        message: "Please write at least 10 characters.",
                      },
                    })}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message.message}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      className={`form-check-input ${
                        errors.consent ? "is-invalid" : ""
                      }`}
                      {...register("consent", {
                        required: "Please accept the privacy policy.",
                      })}
                    />
                    <label
                      htmlFor="contact-consent"
                      className="form-check-label text-sm text-body-secondary"
                    >
                      I agree to the{" "}
                      <Link
                        href="/legal/terms"
                        className="text-primary-emphasis fw-semibold"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/legal/privacy-policy"
                        className="text-primary-emphasis fw-semibold"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>

                  <RecaptchaFallbackChallenge
                    visible={needsV2}
                    checked={v2Checked}
                    onCheckChange={setV2Checked}
                  />
                  <RecaptchaNotice />
                </div>

                {serverError && (
                  <div className="col-12">
                    <div className="alert alert-danger py-2 px-3 text-sm mb-0">
                      {serverError}
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className="col-12">
                    <div
                      className="alert alert-success py-3 px-3 text-sm mb-0 d-flex align-items-center gap-2"
                      role="status"
                    >
                      <CheckCircle2 size={18} className="flex-shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  </div>
                )}

                <div className="col-12 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-lg btn-primary text-white text-sm fw-semibold px-4 d-inline-flex align-items-center gap-2"
                  >
                    <Send size={16} />
                    <span>{submitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-xl-5">
            <div className="tf-card p-3">
              <div
                className="rounded-3 overflow-hidden position-relative"
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src="/images/delivery-courier-africa.jpg"
                  alt="Tabitha Fresh delivery courier holding clean wrapped laundry parcels"
                  fill
                  sizes="(max-width: 1200px) 100vw, 42vw"
                  className="object-fit-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="m-0 fs-5 fw-bold text-body-emphasis">
                  Doorstep Dispatch Across 22 Nairobi Zones
                </h3>
                <p className="m-0 mt-1 text-sm text-body-secondary leading-6">
                  From Westlands, Kilimani, and Karen to Upper Hill, South C,
                  and Kasarani, our riders collect and deliver on schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
