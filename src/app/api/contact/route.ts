import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { verifyRecaptchaServer } from "@/lib/recaptcha";
import { sendTransactionalEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ContactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please check the highlighted form fields.",
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
          error: captcha.message || "reCAPTCHA verification failed.",
          requiresV2Fallback: captcha.requiresV2Fallback,
          score: captcha.score,
        },
        { status: 403 }
      );
    }

    const recipient =
      process.env.SMTP_FROM?.trim() || "hello@tabithafresh.co.ke";

    const mailResult = await sendTransactionalEmail({
      to: recipient,
      replyTo: parsed.data.email,
      subject: `[Tabitha Fresh Inquiry] ${parsed.data.subject}`,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\nSubject: ${parsed.data.subject}\n\n${parsed.data.message}`,
      html: `<div style="font-family: sans-serif; color: #0c4a6e;">
        <h2>New Website Inquiry: ${parsed.data.subject}</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Phone:</strong> ${parsed.data.phone}</p>
        <hr />
        <p>${parsed.data.message.replace(/\n/g, "<br />")}</p>
      </div>`,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Thank you! Your message has been received and our Nairobi team will get back to you shortly.",
      messageId: mailResult.messageId,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your message right now. Please message us on WhatsApp at +254112272061.",
      },
      { status: 500 }
    );
  }
}
