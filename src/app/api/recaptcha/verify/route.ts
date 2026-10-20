import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyRecaptchaServer } from "@/lib/recaptcha";

const VerifyBodySchema = z.object({
  token: z.string().min(1, "Token is required."),
  mode: z.enum(["v3", "v2"]).optional().default("v3"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = VerifyBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          score: 0,
          requiresV2Fallback: true,
          message: "Invalid verification payload.",
        },
        { status: 400 }
      );
    }

    const result = await verifyRecaptchaServer(
      parsed.data.token,
      parsed.data.mode
    );

    return NextResponse.json(result, {
      status: result.success ? 200 : 403,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        score: 0,
        requiresV2Fallback: true,
        message: "Verification request failed.",
      },
      { status: 500 }
    );
  }
}
