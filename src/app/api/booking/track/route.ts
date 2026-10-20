import { NextRequest, NextResponse } from "next/server";
import { getBookingByReference } from "@/lib/store-server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ref =
    searchParams.get("ref") ||
    searchParams.get("reference") ||
    searchParams.get("q") ||
    "";

  if (!ref.trim()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please provide a booking reference parameter (?ref=TF-...).",
      },
      { status: 400 }
    );
  }

  const booking = await getBookingByReference(ref);
  if (!booking) {
    return NextResponse.json(
      {
        ok: false,
        error: `We could not find an order matching "${ref.trim().toUpperCase()}". Please double-check your booking reference.`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    tracking: {
      reference: booking.reference,
      status: booking.status,
      stageIndex: booking.stageIndex,
      completedDelivered: Boolean(booking.completedDelivered),
      pickupDate: booking.pickupDate,
      pickupSlot: booking.pickupSlot,
      deliveryDate: booking.deliveryDate,
      deliveryWindow: booking.deliveryWindow,
      pickupZone: booking.pickupZone,
      deliveryZone: booking.deliveryZone,
      services: booking.services,
      totalEstimatedKes: booking.totalEstimatedKes,
      paymentStatus: booking.paymentStatus,
      assignedRider: booking.assignedRider,
      timeline: booking.timeline,
    },
  });
}
