import { NextRequest, NextResponse } from "next/server";
import { BookingCreateSchema } from "@/lib/schemas";
import { verifyRecaptchaServer } from "@/lib/recaptcha";
import { createBookingRecord } from "@/lib/store-server";
import { sendTransactionalEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = BookingCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed. Please check all booking steps.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const captcha = await verifyRecaptchaServer(
      parsed.data.recaptchaToken,
      parsed.data.recaptchaMode
    );

    if (!captcha.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            captcha.message || "Security verification failed. Please retry.",
          requiresV2Fallback: captcha.requiresV2Fallback,
          score: captcha.score,
        },
        { status: 403 }
      );
    }

    const booking = await createBookingRecord(parsed.data);

    await sendTransactionalEmail({
      to: booking.customerEmail,
      subject: `Tabitha Fresh Booking Confirmed (${booking.reference})`,
      text: `Hello ${booking.customerName}, your Tabitha Fresh laundry pickup (${booking.reference}) is scheduled for ${booking.pickupDate} (${booking.pickupSlot}) at ${booking.pickupAddress}, ${booking.pickupZone}. Estimated return: ${booking.deliveryDate} (${booking.deliveryWindow}). Track anytime at /track?ref=${booking.reference}.`,
      html: `<div style="font-family: sans-serif; color: #0c4a6e;">
        <h2>Tabitha Fresh Pickup Confirmed</h2>
        <p>Hello <strong>${booking.customerName}</strong>,</p>
        <p>Your laundry pickup is booked under reference <strong>${booking.reference}</strong>.</p>
        <ul>
          <li><strong>Pickup:</strong> ${booking.pickupDate} (${booking.pickupSlot})</li>
          <li><strong>Pickup Address:</strong> ${booking.pickupAddress}, ${booking.pickupZone}</li>
          <li><strong>Estimated Delivery:</strong> ${booking.deliveryDate} (${booking.deliveryWindow})</li>
          <li><strong>Estimated Total:</strong> KES ${booking.totalEstimatedKes.toLocaleString()}</li>
        </ul>
      </div>`,
    }).catch(() => null);

    return NextResponse.json(
      {
        ok: true,
        reference: booking.reference,
        booking,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process booking right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
