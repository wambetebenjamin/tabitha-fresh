export const BRAND_NAME = "Tabitha Fresh";
export const BRAND_TAGLINE = "Clean clothes. Zero hassle.";
export const BRAND_EMAIL = "hello@tabithafresh.co.ke";
export const BRAND_DESCRIPTION =
  "Laundry pickup, washing, dry cleaning, and doorstep delivery service across Nairobi, Kenya. Sorted fresh and returned within 24 hours.";

export const WHATSAPP_DISPLAY = "+254112272061";
export const WHATSAPP_PHONE_HUMAN = "+254 112 272 061";
export const WHATSAPP_RAW =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254112272061";

export const WHATSAPP_PREFILLED_MESSAGE =
  "Hello Tabitha Fresh, I would like to schedule a laundry pickup or ask about pricing.";

export const WHATSAPP_URL =
  "https://wa.me/254112272061?text=Hello%20Tabitha%20Fresh%2C%20I%20would%20like%20to%20schedule%20a%20laundry%20pickup%20or%20ask%20about%20pricing.";

export function buildWhatsAppOrderUrl(customMessage: string): string {
  return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(customMessage)}`;
}

export const COOKIE_CONSENT_STORAGE_KEY = "tabitha_fresh_consent";
export const COOKIE_STORAGE_KEY = COOKIE_CONSENT_STORAGE_KEY;

export const VOICE_TOUR_SCRIPT =
  "Hey, welcome to Tabitha Fresh, your laundry sorted in 24 hours. We pick up your clothes from your door, wash, dry clean, fold, and deliver them back fresh. No trips to the laundromat, no waiting around. Just book online, pick your time, pay with M-Pesa, and relax. Track your order every step of the way. Try us today.";

export const VOICE_TOUR_CONFIG = {
  rate: 0.95,
  pitch: 1.1,
  lang: "en-KE",
} as const;

export const PICKUP_TIME_SLOTS = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 01:00 PM",
  "02:00 PM - 05:00 PM",
  "05:00 PM - 07:30 PM",
] as const;

export const DELIVERY_WINDOWS = [
  "Morning (08:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 04:00 PM)",
  "Evening (04:00 PM - 08:00 PM)",
] as const;
