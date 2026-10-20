import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  LocateFixed,
  Quote,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import CoverageZones from "@/components/CoverageZones";
import ContactFormSection from "@/components/ContactFormSection";
import {
  CUSTOMER_TESTIMONIALS,
  HOME_PRICING_OVERVIEW,
  HOW_IT_WORKS_STEPS,
  LAUNDRY_SERVICES,
  WHY_TABITHA_FRESH,
} from "@/lib/data";

function PillarIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <Truck size={22} className="text-primary" />;
    case 1:
      return <Clock size={22} className="text-primary" />;
    case 2:
      return <ShieldCheck size={22} className="text-primary" />;
    case 3:
      return <Smartphone size={22} className="text-primary" />;
    default:
      return <LocateFixed size={22} className="text-primary" />;
  }
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Six Laundry Services */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="tf-eyebrow">Our Garment Care Menu</span>
            <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
              Six specialized services for every fabric in your wardrobe
            </h2>
            <p className="m-0 mt-3 text-body-secondary text-lg leading-8">
              Choose single care or combine services in one doorstep pickup bag.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 gy-4 gx-4 mt-4">
            {LAUNDRY_SERVICES.map((service) => (
              <div className="col" key={service.slug}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works: 4 Steps */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary border-top border-bottom">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="tf-eyebrow">Simple 4-Step Process</span>
            <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
              How Tabitha Fresh works
            </h2>
            <p className="m-0 mt-3 text-body-secondary text-lg leading-8">
              Zero sorting stress, zero traffic runs, and zero guesswork from
              collection to wardrobe-ready return.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 gy-4 gx-4 mt-4">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div className="col" key={item.stepNumber}>
                <div className="tf-card h-100 p-4 d-flex flex-column justify-content-between">
                  <div>
                    <span className="rounded-3 bg-primary text-white fw-bold px-3 py-2 d-inline-block text-sm">
                      Step {item.stepNumber}
                    </span>
                    <h3 className="m-0 mt-4 fs-5 fw-bold text-body-emphasis">
                      {item.title}
                    </h3>
                    <p className="m-0 mt-2 text-sm text-body-secondary leading-6">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Tabitha Fresh: 5 Pillars */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="tf-eyebrow">Why Tabitha Fresh</span>
            <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
              Five guarantees behind every clean load
            </h2>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-5 gy-4 gx-3 mt-4">
            {WHY_TABITHA_FRESH.map((pillar, idx) => (
              <div className="col" key={pillar.title}>
                <div className="tf-card h-100 p-4">
                  <div className="p-2 rounded-3 bg-body-tertiary border d-inline-flex">
                    <PillarIcon index={idx} />
                  </div>
                  <h3 className="m-0 mt-3 fs-6 fw-bold text-body-emphasis">
                    {pillar.title}
                  </h3>
                  <p className="m-0 mt-2 text-sm text-body-secondary leading-6">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing Table Summary (per kg, per item, per piece) */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary border-top border-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
                <div>
                  <span className="tf-eyebrow">Transparent Rates</span>
                  <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
                    Clear pricing per kg, per item, and per piece
                  </h2>
                </div>
                <Link
                  href="/pricing"
                  className="btn btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2 align-self-start"
                >
                  <span>Full Pricing Table</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="tf-card p-3 p-sm-4">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th className="text-xs text-uppercase text-secondary">
                          Service
                        </th>
                        <th className="text-xs text-uppercase text-secondary">
                          Billing Basis
                        </th>
                        <th className="text-xs text-uppercase text-secondary">
                          Turnaround &amp; Inclusion
                        </th>
                        <th className="text-end text-xs text-uppercase text-secondary">
                          Rate
                        </th>
                        <th className="text-end text-xs text-uppercase text-secondary">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {HOME_PRICING_OVERVIEW.map((row) => (
                        <tr key={row.category}>
                          <td className="py-3 fw-bold text-body-emphasis">
                            {row.category}
                          </td>
                          <td className="py-3">
                            <span className="badge bg-body-tertiary text-body-emphasis border fw-semibold">
                              {row.billingBasis}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-body-secondary">
                            <span className="d-inline-flex align-items-center gap-1">
                              <CheckCircle2
                                size={15}
                                className="text-success flex-shrink-0"
                              />
                              {row.includes}
                            </span>
                          </td>
                          <td className="py-3 text-end fw-bold text-primary">
                            {row.rate}
                          </td>
                          <td className="py-3 text-end">
                            <Link
                              href={`/booking?service=${row.serviceSlug}`}
                              className="btn btn-sm btn-outline-primary fw-semibold px-3"
                            >
                              Book
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Coverage Zones (Nairobi Areas as Tags) */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl">
            <span className="tf-eyebrow">Nairobi Dispatch Network</span>
            <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
              Serving 22 neighbourhoods across Nairobi
            </h2>
            <p className="m-0 mt-3 text-body-secondary text-base leading-7">
              Click your neighbourhood tag below to jump straight into a free
              doorstep pickup booking.
            </p>
          </div>

          <CoverageZones />
        </div>
      </section>

      {/* 7. Customer Testimonials (3 Cards) */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary border-top border-bottom">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="tf-eyebrow">Nairobi Households &amp; Offices</span>
            <h2 className="m-0 mt-3 text-body-emphasis text-4xl tracking-tight fw-bold">
              Trusted every week across the city
            </h2>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 gy-4 gx-4 mt-4">
            {CUSTOMER_TESTIMONIALS.map((item) => (
              <div className="col" key={item.id}>
                <article className="tf-card h-100 p-4 p-sm-5 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge bg-success-subtle text-success-emphasis fw-semibold px-3 py-1">
                        Verified Client
                      </span>
                      <Quote size={20} className="text-secondary opacity-50" />
                    </div>
                    <p className="m-0 mt-4 text-body-emphasis text-base leading-7">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-4 pt-3 border-top">
                    <div
                      className="rounded-circle overflow-hidden position-relative flex-shrink-0 border"
                      style={{ width: 52, height: 52 }}
                    >
                      <Image
                        src={item.avatar}
                        alt={item.avatarAlt}
                        fill
                        sizes="52px"
                        className="object-fit-cover"
                      />
                    </div>
                    <div>
                      <div className="fw-bold text-body-emphasis text-sm">
                        {item.name}
                      </div>
                      <div className="text-xs text-body-secondary">
                        {item.roleAndArea}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <ContactFormSection />
    </>
  );
}
