import { z } from "zod";

export const ORDER_STAGES = [
  "Pickup Scheduled",
  "Collected",
  "Being Cleaned",
  "Out for Delivery",
] as const;

export type OrderStage = (typeof ORDER_STAGES)[number];

export interface SelectedServiceLine {
  slug: string;
  name: string;
  quantity: number;
  unit: string;
  unitPriceKes: number;
  lineTotalKes: number;
}

export const SelectedServiceLineSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().min(1).max(200),
  unit: z.string().min(1),
  unitPriceKes: z.number().nonnegative(),
  lineTotalKes: z.number().nonnegative(),
});

export const BookingCreateSchema = z
  .object({
    services: z
      .array(SelectedServiceLineSchema)
      .min(1, "Please select at least one laundry service."),
    pickupDate: z.string().min(8, "Please select a valid pickup date."),
    pickupSlot: z.string().min(3, "Please select a pickup time slot."),
    deliveryDate: z.string().min(8, "Please select a preferred delivery date."),
    deliveryWindow: z.string().min(3, "Please select a delivery window."),
    pickupZone: z.string().min(2, "Please select your pickup area in Nairobi."),
    pickupAddress: z
      .string()
      .min(5, "Please enter your street, apartment, or office details."),
    sameDeliveryAddress: z.boolean(),
    deliveryZone: z.string().optional(),
    deliveryAddress: z.string().optional(),
    customerName: z
      .string()
      .min(2, "Please enter your full name.")
      .max(100, "Name is too long."),
    customerPhone: z
      .string()
      .min(9, "Please enter a valid Kenyan phone number.")
      .max(20, "Phone number is too long."),
    customerEmail: z.string().email("Please enter a valid email address."),
    specialCareNotes: z.string().max(800).optional().default(""),
    paymentMethod: z.enum(["mpesa_on_delivery", "mpesa_prepay"]),
    recaptchaToken: z.string().min(1, "Security verification is required."),
    recaptchaMode: z.enum(["v3", "v2"]).optional().default("v3"),
  })
  .superRefine((val, ctx) => {
    if (!val.sameDeliveryAddress) {
      if (!val.deliveryZone || val.deliveryZone.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["deliveryZone"],
          message: "Please select your delivery area in Nairobi.",
        });
      }
      if (!val.deliveryAddress || val.deliveryAddress.trim().length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["deliveryAddress"],
          message: "Please enter the delivery street or building address.",
        });
      }
    }
  });

export type BookingCreateInput = z.infer<typeof BookingCreateSchema>;

export interface OrderTimelineEvent {
  stage: OrderStage;
  timestamp: string;
  note: string;
  completed: boolean;
  current: boolean;
}

export interface BookingOrder {
  reference: string;
  createdAt: string;
  status: OrderStage;
  stageIndex: number;
  completedDelivered?: boolean;
  services: SelectedServiceLine[];
  subtotalKes: number;
  discountKes: number;
  totalEstimatedKes: number;
  pickupDate: string;
  pickupSlot: string;
  deliveryDate: string;
  deliveryWindow: string;
  pickupZone: string;
  pickupAddress: string;
  sameDeliveryAddress: boolean;
  deliveryZone: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialCareNotes: string;
  paymentMethod: "mpesa_on_delivery" | "mpesa_prepay";
  paymentStatus: "Pay on Delivery (M-Pesa)" | "M-Pesa Prompt Sent";
  assignedRider: string;
  timeline: OrderTimelineEvent[];
}

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(100),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(9, "Please enter a valid phone number.").max(20),
  subject: z.string().min(3, "Please enter a subject.").max(140),
  message: z.string().min(10, "Please share a few details in your message.").max(2000),
  recaptchaToken: z.string().min(1, "Security check required."),
  recaptchaMode: z.enum(["v3", "v2"]).optional().default("v3"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const SignUpSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name.").max(80),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().min(9, "Please enter your phone number.").max(20),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(100),
    confirmPassword: z.string().min(8, "Please confirm your password."),
    recaptchaToken: z.string().min(1, "Security check required."),
    recaptchaMode: z.enum(["v3", "v2"]).optional().default("v3"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
