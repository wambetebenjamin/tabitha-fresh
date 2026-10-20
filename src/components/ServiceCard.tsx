"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { LaundryServiceItem } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServiceCard({
  service,
}: {
  service: LaundryServiceItem;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="tf-card h-100 p-4 d-flex flex-column justify-content-between"
    >
      <div>
        <div
          className="rounded-3 overflow-hidden position-relative border"
          style={{ aspectRatio: "3 / 2" }}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-fit-cover"
          />
        </div>

        <div className="d-flex align-items-center justify-content-between gap-2 mt-4">
          <span className="p-2 rounded-3 bg-body-tertiary border text-primary d-inline-flex align-items-center justify-content-center">
            <ServiceIcon iconKey={service.iconKey} size={20} />
          </span>
          <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis px-3 py-2 fw-bold text-xs">
            {service.startingPriceLabel}
          </span>
        </div>

        <h3 className="m-0 mt-3 text-body-emphasis text-xl fw-bold">
          {service.name}
        </h3>

        <p className="m-0 mt-2 text-body-secondary text-sm leading-6">
          {service.shortTagline}
        </p>

        <div className="mt-3 d-inline-flex align-items-center gap-1 text-xs fw-semibold text-secondary">
          <Clock size={14} />
          <span>{service.turnaround}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-between gap-2">
        <Link
          href={`/booking?service=${service.slug}`}
          className="btn btn-primary text-white text-sm fw-semibold px-3 d-inline-flex align-items-center gap-1"
        >
          <span>Book</span>
          <ArrowRight size={15} />
        </Link>

        <Link
          href={`/services#${service.slug}`}
          className="btn btn-outline-secondary text-sm fw-semibold px-3"
        >
          Price Breakdown
        </Link>
      </div>
    </motion.article>
  );
}
