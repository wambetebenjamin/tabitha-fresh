import { NextRequest, NextResponse } from "next/server";
import { getBookingByReference } from "@/lib/store-server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ ref: string }> }
) {
  const { ref } = await context.params;
  const booking = await getBookingByReference(ref);

  if (!booking) {
    return NextResponse.json(
      {
        ok: false,
        error: `No booking found matching reference "${ref}".`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    booking,
  });
}
