import nodemailer from "nodemailer";

export interface SendMailPayload {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendTransactionalEmail(
  payload: SendMailPayload
): Promise<{ delivered: boolean; messageId: string }> {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from =
    process.env.SMTP_FROM?.trim() || "Tabitha Fresh <hello@tabithafresh.co.ke>";

  const transporter =
    host && user && pass
      ? nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        })
      : nodemailer.createTransport({
          jsonTransport: true,
        });

  const info = await transporter.sendMail({
    from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  return {
    delivered: Boolean(host && user && pass),
    messageId: info.messageId || `tf-${Date.now()}`,
  };
}
