import { NextRequest, NextResponse } from "next/server";
import { SignUpSchema } from "@/lib/schemas";
import { verifyRecaptchaServer } from "@/lib/recaptcha";
import { registerUserAccount } from "@/lib/store-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SignUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please review your registration details.",
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
          error: captcha.message || "Security verification failed.",
          requiresV2Fallback: captcha.requiresV2Fallback,
          score: captcha.score,
        },
        { status: 403 }
      );
    }

    const created = await registerUserAccount({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      password: parsed.data.password,
    });

    if (!created.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: created.error,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: created.user.id,
          name: created.user.name,
          email: created.user.email,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Account creation failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
