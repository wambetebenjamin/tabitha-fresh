"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { BookingOrder } from "@/lib/schemas";
import { useBookingStore } from "@/lib/booking-store";

export default function MyOrdersClient({
  serverOrders,
  userName,
  userEmail,
}: {
  serverOrders: BookingOrder[];
  userName: string;
  userEmail: string;
}) {
  const recentClientBookings = useBookingStore((s) => s.recentBookings);

  const mergedOrders = useMemo(() => {
    const map = new Map<string, BookingOrder>();
    for (const o of recentClientBookings) {
      map.set(o.reference, o);
    }
    for (const o of serverOrders) {
      if (!map.has(o.reference)) {
        map.set(o.reference, o);
      }
    }
    return [...map.values()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [recentClientBookings, serverOrders]);

  const activeOrders = mergedOrders.filter((o) => !o.completedDelivered);
  const pastOrders = mergedOrders.filter((o) => Boolean(o.completedDelivered));

  const renderOrderCard = (order: BookingOrder, isPast: boolean) => (
    <div key={order.reference} className="tf-card p-4">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 pb-3 border-bottom">
        <div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="fw-bold fs-5 text-body-emphasis">
              {order.reference}
            </span>
            <span
              className={`badge rounded-pill px-3 py-1 fw-bold ${
                isPast
                  ? "bg-success-subtle text-success-emphasis"
                  : "bg-primary-subtle text-primary-emphasis"
              }`}
            >
              {isPast ? "Completed & Delivered" : order.status}
            </span>
          </div>
          <p className="m-0 mt-1 text-sm text-body-secondary">
            {order.services
              .map((s) => `${s.name} (${s.quantity} ${s.unit})`)
              .join(", ")}
          </p>
        </div>

        <div className="text-md-end">
          <div className="fw-bold fs-5 text-primary">
            KES {order.totalEstimatedKes.toLocaleString()}
          </div>
          <div className="text-xs text-body-secondary">{order.paymentStatus}</div>
        </div>
      </div>

      <div className="row gy-3 pt-3 align-items-center justify-content-between">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="text-xs fw-bold text-uppercase text-secondary">
            Pickup Date
          </div>
          <div className="text-sm fw-semibold text-body-emphasis d-inline-flex align-items-center gap-1 mt-1">
            <Calendar size={14} className="text-primary" />
            <span>
              {order.pickupDate} ({order.pickupSlot})
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="text-xs fw-bold text-uppercase text-secondary">
            Delivery Date
          </div>
          <div className="text-sm fw-semibold text-body-emphasis d-inline-flex align-items-center gap-1 mt-1">
            <PackageCheck size={14} className="text-success" />
            <span>
              {order.deliveryDate} ({order.deliveryWindow})
            </span>
          </div>
        </div>

        <div className="col-12 col-lg-4 d-flex flex-wrap justify-content-lg-end gap-2">
          <Link
            href={`/track?ref=${encodeURIComponent(order.reference)}`}
            className="btn btn-outline-primary text-sm fw-semibold px-3 d-inline-flex align-items-center gap-1"
          >
            <Search size={15} />
            <span>Track</span>
          </Link>

          <Link
            href={`/booking?reorder=${encodeURIComponent(order.reference)}`}
            className="btn btn-primary text-white text-sm fw-semibold px-3 d-inline-flex align-items-center gap-1"
          >
            <RefreshCw size={15} />
            <span>Reorder</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column gap-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-4 rounded-4 bg-body-tertiary border">
        <div>
          <span className="text-xs fw-bold text-uppercase text-primary-emphasis">
            Signed in as {userEmail}
          </span>
          <h1 className="m-0 mt-1 fs-2 fw-bold text-body-emphasis">
            Welcome back, {userName}
          </h1>
          <p className="m-0 mt-1 text-sm text-body-secondary">
            Manage active Nairobi laundry pickups, check live rider status, or
            repeat a favourite order in one click.
          </p>
        </div>
        <Link
          href="/booking"
          className="btn btn-primary text-white fw-semibold px-4 py-2 d-inline-flex align-items-center gap-2 align-self-start align-self-md-center"
        >
          <Plus size={18} />
          <span>Book New Pickup</span>
        </Link>
      </div>

      <section>
        <h2 className="fs-4 fw-bold text-body-emphasis mb-3">
          Active Orders ({activeOrders.length})
        </h2>
        {activeOrders.length === 0 ? (
          <div className="tf-card p-4 text-sm text-body-secondary">
            No active pickups right now. Click Book New Pickup whenever your
            laundry basket is ready.
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {activeOrders.map((o) => renderOrderCard(o, false))}
          </div>
        )}
      </section>

      <section>
        <h2 className="fs-4 fw-bold text-body-emphasis mb-3">
          Past Orders ({pastOrders.length})
        </h2>
        {pastOrders.length === 0 ? (
          <div className="tf-card p-4 text-sm text-body-secondary">
            Completed pickups will appear here for one-click reordering.
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {pastOrders.map((o) => renderOrderCard(o, true))}
          </div>
        )}
      </section>
    </div>
  );
}
