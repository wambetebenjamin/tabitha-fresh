import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { LAUNDRY_SERVICES } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Detailed garment care processes, turnaround times, and KES price breakdowns for Wash and Fold, Dry Cleaning, Ironing Only, Duvet and Bedding, Shoe Cleaning, and Same-Day Express Service.",
};

export default function ServicesPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="py-6 py-md-7 bg-body-tertiary border-bottom">
        <div className="container">
          <div className="max-w-3xl">
            <span className="tf-eyebrow">All 6 Garment &amp; Home Care Services</span>
            <h1 className="m-0 mt-3 text-body-emphasis display-5 fw-bold tracking-tight">
              Professional laundry, pressing, bedding, and shoe care
            </h1>
            <p className="m-0 mt-3 text-body-secondary text-lg leading-8">
              Explore our exact care process, turnaround window, and transparent
              itemized pricing for every service before scheduling your free
              Nairobi pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Sections for Each of the 6 Services */}
      <section className="py-6 py-md-8 bg-body">
        <div className="container d-flex flex-column gap-6">
          {LAUNDRY_SERVICES.map((service, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <article
                id={service.slug}
                key={service.slug}
                className="tf-card p-4 p-md-5 scroll-mt-5"
              >
                <div className="row gy-4 gx-xl-5 align-items-center">
                  <div
                    className={`col-12 col-lg-5 ${
                      imageFirst ? "order-lg-1" : "order-lg-2"
                    }`}
                  >
                    <div
                      className="rounded-4 overflow-hidden position-relative border"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 992px) 100vw, 42vw"
                        className="object-fit-cover"
                      />
                    </div>
                  </div>

                  <div
                    className={`col-12 col-lg-7 ${
                      imageFirst ? "order-lg-2" : "order-lg-1"
                    }`}
                  >
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <span className="p-2 rounded-3 bg-body-tertiary border text-primary d-inline-flex">
                        <ServiceIcon iconKey={service.iconKey} size={22} />
                      </span>
                      <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis px-3 py-2 fw-bold text-xs">
                        {service.startingPriceLabel}
                      </span>
                      <span className="badge rounded-pill bg-body-tertiary text-body-emphasis border px-3 py-2 fw-semibold text-xs d-inline-flex align-items-center gap-1">
                        <Clock size={13} className="text-primary" />
                        <span>Turnaround: {service.turnaround}</span>
                      </span>
                    </div>

                    <h2 className="m-0 mt-3 fs-2 fw-bold text-body-emphasis">
                      {service.name}
                    </h2>

                    <p className="m-0 mt-3 text-body-secondary text-base leading-7">
                      {service.description}
                    </p>

                    {/* 4-Step Care Process */}
                    <div className="mt-4">
                      <h3 className="fs-6 fw-bold text-body-emphasis mb-2">
                        Our 4-Step Care Process
                      </h3>
                      <div className="row row-cols-1 row-cols-sm-2 g-2">
                        {service.processSteps.map((stepText) => (
                          <div className="col" key={stepText}>
                            <div className="p-2 px-3 rounded-3 bg-body-tertiary border text-sm text-body-emphasis d-flex align-items-start gap-2 h-100">
                              <CheckCircle2
                                size={16}
                                className="text-success flex-shrink-0 mt-1"
                              />
                              <span>{stepText}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Breakdown Table */}
                    <div className="mt-4">
                      <h3 className="fs-6 fw-bold text-body-emphasis mb-2">
                        Price Breakdown
                      </h3>
                      <div className="table-responsive rounded-3 border">
                        <table className="table table-sm align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th className="ps-3 py-2 text-xs text-uppercase text-secondary">
                                Item / Tier
                              </th>
                              <th className="py-2 text-xs text-uppercase text-secondary">
                                Unit
                              </th>
                              <th className="pe-3 py-2 text-end text-xs text-uppercase text-secondary">
                                Rate (KES)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {service.priceBreakdown.map((row) => (
                              <tr key={row.item}>
                                <td className="ps-3 py-2 fw-semibold text-sm text-body-emphasis">
                                  {row.item}
                                </td>
                                <td className="py-2 text-xs text-body-secondary">
                                  {row.unit}
                                </td>
                                <td className="pe-3 py-2 text-end fw-bold text-sm text-primary">
                                  KES {row.priceKes.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <Link
                        href={`/booking?service=${service.slug}`}
                        className="btn btn-lg btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
                      >
                        <span>Book This Service</span>
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
