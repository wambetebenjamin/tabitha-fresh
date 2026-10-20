"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import {
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  Download,
  MapPin,
  Search,
} from "lucide-react";
import { BookingOrder } from "@/lib/schemas";
import { useBookingStore } from "@/lib/booking-store";
import OrderStatusTracker from "@/components/OrderStatusTracker";
import { buildWhatsAppOrderUrl } from "@/lib/constants";

function buildGoogleCalendarUrl(order: BookingOrder): string {
  const cleanDate = order.pickupDate.replace(/-/g, "");
  let startHourEat = 8;
  if (order.pickupSlot.startsWith("10:")) startHourEat = 10;
  if (order.pickupSlot.startsWith("02:")) startHourEat = 14;
  if (order.pickupSlot.startsWith("05:")) startHourEat = 17;

  // Convert EAT (UTC+3) to UTC
  const startUtcHour = String(Math.max(0, startHourEat - 3)).padStart(2, "0");
  const endUtcHour = String(Math.max(1, startHourEat - 1)).padStart(2, "0");

  const datesParam = `${cleanDate}T${startUtcHour}0000Z/${cleanDate}T${endUtcHour}0000Z`;
  const title = `Tabitha Fresh Laundry Pickup (${order.reference})`;
  const details = `Booking Reference: ${order.reference}\nServices: ${order.services
    .map((s) => `${s.name} (${s.quantity} ${s.unit})`)
    .join(", ")}\nEstimated Return: ${order.deliveryDate} (${order.deliveryWindow})`;
  const location = `${order.pickupAddress}, ${order.pickupZone}, Nairobi, Kenya`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: datesParam,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function BookingConfirmationView() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref") || "";
  const recentBookings = useBookingStore((s) => s.recentBookings);
  const receiptRef = useRef<HTMLDivElement | null>(null);

  const [order, setOrder] = useState<BookingOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    let active = true;
    const targetRef =
      refParam.trim() || recentBookings[0]?.reference || "TF-NAI-1042";

    fetch(`/api/booking/${encodeURIComponent(targetRef)}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        if (data?.ok && data.booking) {
          setOrder(data.booking);
        } else if (recentBookings[0]) {
          setOrder(recentBookings[0]);
        }
      })
      .catch(() => {
        if (active && recentBookings[0]) {
          setOrder(recentBookings[0]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refParam, recentBookings]);

  useEffect(() => {
    if (!order) return;
    const trackUrl = `${window.location.origin}/track?ref=${encodeURIComponent(
      order.reference
    )}`;
    QRCode.toDataURL(trackUrl, {
      width: 128,
      margin: 1,
      color: { dark: "#0c4a6e", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => null);
  }, [order]);

  const calendarUrl = useMemo(
    () => (order ? buildGoogleCalendarUrl(order) : "#"),
    [order]
  );

  const whatsappConfirmUrl = useMemo(() => {
    if (!order) return "#";
    return buildWhatsAppOrderUrl(
      `Hello Tabitha Fresh, I have just scheduled laundry pickup ref ${order.reference} for ${order.pickupDate} (${order.pickupSlot}) at ${order.pickupAddress}, ${order.pickupZone}.`
    );
  }, [order]);

  const handleCopyRef = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.reference).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = async () => {
    if (!order || !receiptRef.current) return;
    setDownloadingPdf(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth() - 48;
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 24, 24, pageWidth, pageHeight);
      pdf.save(`Tabitha-Fresh-${order.reference}.pdf`);
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="tf-card p-5 text-center" role="status">
        <div className="spinner-border text-primary" />
        <p className="m-0 mt-3 fw-semibold text-body-emphasis">
          Loading your booking confirmation...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="tf-card p-5 text-center">
        <h2 className="fs-3 fw-bold text-body-emphasis">
          No Active Booking Found
        </h2>
        <p className="text-body-secondary mt-2">
          Schedule a fresh pickup in under two minutes or look up an order
          reference on our tracking page.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link
            href="/booking"
            className="btn btn-primary text-white fw-semibold px-4"
          >
            Schedule a Pickup
          </Link>
          <Link href="/track" className="btn btn-outline-primary fw-semibold px-4">
            Track Existing Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      {/* Animation #7: Framer Motion Scale Reveal */}
      <motion.div
        ref={receiptRef}
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="tf-card p-4 p-md-5"
      >
        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4 pb-4 border-bottom">
          <div className="d-flex align-items-start gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 360, damping: 20, delay: 0.12 }}
              className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 52, height: 52 }}
            >
              <CheckCircle2 size={28} />
            </motion.span>
            <div>
              <span className="badge bg-success-subtle text-success-emphasis fw-bold px-2 py-1">
                Pickup Confirmed
              </span>
              <h1 className="m-0 mt-2 fs-2 fw-bold text-body-emphasis">
                Thank you, {order.customerName}!
              </h1>
              <p className="m-0 mt-1 text-body-secondary text-sm">
                Your Nairobi rider has been scheduled. Keep your booking
                reference handy below.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 bg-body-tertiary p-3 rounded-4 border">
            <div>
              <div className="text-xs fw-bold text-uppercase text-secondary">
                Booking Reference
              </div>
              <div className="fs-4 fw-bold text-primary">{order.reference}</div>
              <button
                type="button"
                onClick={handleCopyRef}
                className="btn btn-sm btn-outline-primary mt-1 d-inline-flex align-items-center gap-1 text-xs fw-semibold"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied!" : "Copy Reference"}</span>
              </button>
            </div>
            {qrDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                width={84}
                height={84}
                alt={`QR code for order ${order.reference}`}
                className="rounded-2 border bg-white p-1"
              />
            )}
          </div>
        </div>

        <div className="row gy-4 py-4 border-bottom">
          <div className="col-12 col-md-4">
            <div className="text-xs fw-bold text-uppercase text-secondary">
              Pickup Date &amp; Time
            </div>
            <div className="fw-bold text-body-emphasis mt-1">
              {order.pickupDate}
            </div>
            <div className="text-sm text-body-secondary">{order.pickupSlot}</div>
          </div>

          <div className="col-12 col-md-4">
            <div className="text-xs fw-bold text-uppercase text-secondary">
              Estimated Delivery
            </div>
            <div className="fw-bold text-body-emphasis mt-1">
              {order.deliveryDate}
            </div>
            <div className="text-sm text-body-secondary">
              {order.deliveryWindow}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="text-xs fw-bold text-uppercase text-secondary">
              Addresses
            </div>
            <div className="fw-semibold text-sm text-body-emphasis mt-1 d-flex align-items-start gap-1">
              <MapPin size={15} className="text-primary flex-shrink-0 mt-1" />
              <span>
                {order.pickupAddress}, {order.pickupZone}
                {!order.sameDeliveryAddress &&
                  ` (Return: ${order.deliveryAddress}, ${order.deliveryZone})`}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h2 className="fs-6 fw-bold text-body-emphasis mb-3">
            Booked Services &amp; Estimate
          </h2>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <tbody>
                {order.services.map((line) => (
                  <tr key={line.slug}>
                    <td className="fw-semibold text-body-emphasis">
                      {line.name}
                    </td>
                    <td className="text-sm text-body-secondary">
                      {line.quantity} {line.unit} &times; KES{" "}
                      {line.unitPriceKes.toLocaleString()}
                    </td>
                    <td className="text-end fw-bold text-body-emphasis">
                      KES {line.lineTotalKes.toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="fw-bold text-body-emphasis pt-3">
                    Estimated Total ({order.paymentStatus})
                  </td>
                  <td className="text-end fw-bold text-primary fs-5 pt-3">
                    KES {order.totalEstimatedKes.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 pt-3 border-top d-flex flex-wrap align-items-center gap-3">
          <a
            href={whatsappConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: "#25D366" }}
          >
            <span>Send Confirmation on WhatsApp</span>
          </a>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-white fw-semibold text-sm px-4 d-inline-flex align-items-center gap-2"
          >
            <Calendar size={16} />
            <span>Add to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="btn btn-outline-primary fw-semibold text-sm px-3 d-inline-flex align-items-center gap-2"
          >
            <Download size={16} />
            <span>{downloadingPdf ? "Preparing PDF..." : "Download Receipt PDF"}</span>
          </button>

          <Link
            href={`/track?ref=${encodeURIComponent(order.reference)}`}
            className="btn btn-outline-secondary fw-semibold text-sm px-3 d-inline-flex align-items-center gap-1"
          >
            <Search size={15} />
            <span>Open Live Tracker</span>
          </Link>
        </div>
      </motion.div>

      {/* Live 4-Stage Order Status Tracker */}
      <OrderStatusTracker
        stageIndex={order.stageIndex}
        timeline={order.timeline}
        assignedRider={order.assignedRider}
      />
    </div>
  );
}
