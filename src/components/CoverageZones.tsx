"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { COVERAGE_ZONES } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function CoverageZones() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="d-flex flex-wrap justify-content-center gap-2 mt-4 pt-2"
    >
      {COVERAGE_ZONES.map((zone) => (
        <motion.div key={zone} variants={tagVariants}>
          <Link
            href={`/booking?zone=${encodeURIComponent(zone)}`}
            className="tf-zone-tag"
          >
            <MapPin size={14} className="text-primary flex-shrink-0" />
            <span>{zone}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
