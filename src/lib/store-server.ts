import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { kv } from "@vercel/kv";
import {
  BookingCreateInput,
  BookingOrder,
  ORDER_STAGES,
  OrderStage,
  OrderTimelineEvent,
} from "@/lib/schemas";

export interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

interface LocalDatabaseShape {
  bookings: Record<string, BookingOrder>;
  users: Record<string, StoredUserAccount>;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "tabitha-store.json");

export function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`tabitha-fresh-ke:${password}`)
    .digest("hex");
}

function hasKvEnv(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL?.trim() && process.env.KV_REST_API_TOKEN?.trim()
  );
}

export function buildTimeline(activeStageIndex: number): OrderTimelineEvent[] {
  const baseNotes: Record<OrderStage, string> = {
    "Pickup Scheduled":
      "Booking confirmed and Nairobi rider assigned to your pickup slot.",
    Collected:
      "Laundry bag scanned, weighed, and sealed at your doorstep.",
    "Being Cleaned":
      "Garments sorted by care label, washed or dry cleaned, and steam pressed.",
    "Out for Delivery":
      "Freshly folded package with rider heading back to your address.",
  };

  return ORDER_STAGES.map((stage, idx) => ({
    stage,
    timestamp:
      idx <= activeStageIndex
        ? new Date(Date.now() - (activeStageIndex - idx) * 3_600_000).toISOString()
        : "",
    note: baseNotes[stage],
    completed: idx <= activeStageIndex,
    current: idx === activeStageIndex,
  }));
}

function createSeedDatabase(): LocalDatabaseShape {
  const demoEmail = "customer@tabithafresh.co.ke";
  const seededOrders: BookingOrder[] = [
    {
      reference: "TF-NAI-1042",
      createdAt: "2026-10-20T06:30:00.000Z",
      status: "Being Cleaned",
      stageIndex: 2,
      services: [
        {
          slug: "wash-and-fold",
          name: "Wash and Fold",
          quantity: 5,
          unit: "kg",
          unitPriceKes: 350,
          lineTotalKes: 1750,
        },
        {
          slug: "dry-cleaning",
          name: "Dry Cleaning",
          quantity: 2,
          unit: "item",
          unitPriceKes: 500,
          lineTotalKes: 1000,
        },
      ],
      subtotalKes: 2750,
      discountKes: 0,
      totalEstimatedKes: 2750,
      pickupDate: "2026-10-20",
      pickupSlot: "08:00 AM - 10:00 AM",
      deliveryDate: "2026-10-21",
      deliveryWindow: "Morning (08:00 AM - 12:00 PM)",
      pickupZone: "Kilimani",
      pickupAddress: "Kindaruma Road, Cedar Court Apt B4",
      sameDeliveryAddress: true,
      deliveryZone: "Kilimani",
      deliveryAddress: "Kindaruma Road, Cedar Court Apt B4",
      customerName: "Amina Wanjiku",
      customerPhone: "+254712345678",
      customerEmail: demoEmail,
      specialCareNotes: "Cold wash for dark knitwear, light press on shirts.",
      paymentMethod: "mpesa_on_delivery",
      paymentStatus: "Pay on Delivery (M-Pesa)",
      assignedRider: "Peter Mwangi (Zone Rider 04)",
      timeline: buildTimeline(2),
    },
    {
      reference: "TF-NAI-1089",
      createdAt: "2026-10-19T13:15:00.000Z",
      status: "Out for Delivery",
      stageIndex: 3,
      services: [
        {
          slug: "duvet-and-bedding",
          name: "Duvet and Bedding",
          quantity: 1,
          unit: "item",
          unitPriceKes: 1500,
          lineTotalKes: 1500,
        },
        {
          slug: "ironing-only",
          name: "Ironing Only",
          quantity: 6,
          unit: "piece",
          unitPriceKes: 120,
          lineTotalKes: 720,
        },
      ],
      subtotalKes: 2220,
      discountKes: 0,
      totalEstimatedKes: 2220,
      pickupDate: "2026-10-19",
      pickupSlot: "02:00 PM - 05:00 PM",
      deliveryDate: "2026-10-20",
      deliveryWindow: "Afternoon (12:00 PM - 04:00 PM)",
      pickupZone: "Westlands",
      pickupAddress: "Rhapta Road, Lantana Suites 3F",
      sameDeliveryAddress: true,
      deliveryZone: "Westlands",
      deliveryAddress: "Rhapta Road, Lantana Suites 3F",
      customerName: "Amina Wanjiku",
      customerPhone: "+254712345678",
      customerEmail: demoEmail,
      specialCareNotes: "Pack king duvet in zip carrier bag.",
      paymentMethod: "mpesa_prepay",
      paymentStatus: "M-Pesa Prompt Sent",
      assignedRider: "Grace Otieno (Zone Rider 02)",
      timeline: buildTimeline(3),
    },
    {
      reference: "TF-NAI-1104",
      createdAt: "2026-10-20T09:05:00.000Z",
      status: "Pickup Scheduled",
      stageIndex: 0,
      services: [
        {
          slug: "express-service",
          name: "Express Service (same day)",
          quantity: 3,
          unit: "kg",
          unitPriceKes: 550,
          lineTotalKes: 1650,
        },
      ],
      subtotalKes: 1650,
      discountKes: 0,
      totalEstimatedKes: 1650,
      pickupDate: "2026-10-20",
      pickupSlot: "10:00 AM - 01:00 PM",
      deliveryDate: "2026-10-20",
      deliveryWindow: "Evening (04:00 PM - 08:00 PM)",
      pickupZone: "Upper Hill",
      pickupAddress: "Hospital Road, Britam Tower Reception",
      sameDeliveryAddress: false,
      deliveryZone: "Kileleshwa",
      deliveryAddress: "Othaya Road, Othaya Residency Apt 12",
      customerName: "Daniel Kamau",
      customerPhone: "+254722987654",
      customerEmail: "daniel.kamau@example.co.ke",
      specialCareNotes: "Same-day evening return to Kileleshwa home address.",
      paymentMethod: "mpesa_prepay",
      paymentStatus: "M-Pesa Prompt Sent",
      assignedRider: "Kelvin Kiprotich (Express Dispatch 01)",
      timeline: buildTimeline(0),
    },
    {
      reference: "TF-NAI-0954",
      createdAt: "2026-10-12T08:20:00.000Z",
      status: "Out for Delivery",
      stageIndex: 3,
      completedDelivered: true,
      services: [
        {
          slug: "shoe-cleaning",
          name: "Shoe Cleaning",
          quantity: 2,
          unit: "pair",
          unitPriceKes: 600,
          lineTotalKes: 1200,
        },
        {
          slug: "wash-and-fold",
          name: "Wash and Fold",
          quantity: 4,
          unit: "kg",
          unitPriceKes: 350,
          lineTotalKes: 1400,
        },
      ],
      subtotalKes: 2600,
      discountKes: 0,
      totalEstimatedKes: 2600,
      pickupDate: "2026-10-12",
      pickupSlot: "10:00 AM - 01:00 PM",
      deliveryDate: "2026-10-13",
      deliveryWindow: "Morning (08:00 AM - 12:00 PM)",
      pickupZone: "Kilimani",
      pickupAddress: "Kindaruma Road, Cedar Court Apt B4",
      sameDeliveryAddress: true,
      deliveryZone: "Kilimani",
      deliveryAddress: "Kindaruma Road, Cedar Court Apt B4",
      customerName: "Amina Wanjiku",
      customerPhone: "+254712345678",
      customerEmail: demoEmail,
      specialCareNotes: "Air dry white canvas sneakers.",
      paymentMethod: "mpesa_on_delivery",
      paymentStatus: "Pay on Delivery (M-Pesa)",
      assignedRider: "Peter Mwangi (Zone Rider 04)",
      timeline: buildTimeline(3),
    },
  ];

  const bookings: Record<string, BookingOrder> = {};
  for (const order of seededOrders) {
    bookings[order.reference] = order;
  }

  return {
    bookings,
    users: {
      [demoEmail]: {
        id: "usr-amina-nairobi",
        name: "Amina Wanjiku",
        email: demoEmail,
        phone: "+254712345678",
        passwordHash: hashPassword("Tabitha2026!"),
        createdAt: "2026-09-01T08:00:00.000Z",
      },
    },
  };
}

function readLocalDb(): LocalDatabaseShape {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const seeded = createSeedDatabase();
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(seeded, null, 2), "utf8");
      return seeded;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as LocalDatabaseShape;
    if (!parsed.bookings || !parsed.users) {
      return createSeedDatabase();
    }
    return parsed;
  } catch {
    return createSeedDatabase();
  }
}

function writeLocalDb(db: LocalDatabaseShape): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // Non-fatal in read-only serverless fs when @vercel/kv handles persistence
  }
}

export function generateBookingReference(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TF-${y}${m}${d}-${rand}`;
}

const RIDER_POOL = [
  "Peter Mwangi (Zone Rider 04)",
  "Grace Otieno (Zone Rider 02)",
  "Kelvin Kiprotich (Express Dispatch 01)",
  "Faith Mutua (Zone Rider 07)",
];

export async function createBookingRecord(
  input: BookingCreateInput
): Promise<BookingOrder> {
  const reference = generateBookingReference();
  const rawSubtotal = input.services.reduce(
    (sum, item) => sum + item.lineTotalKes,
    0
  );
  const totalKg = input.services
    .filter((s) => s.unit === "kg")
    .reduce((sum, item) => sum + item.quantity, 0);

  const discountKes = totalKg >= 15 ? Math.round(rawSubtotal * 0.1) : 0;
  const afterDiscount = Math.max(rawSubtotal - discountKes, 0);
  const totalEstimatedKes = Math.max(afterDiscount, 1000);

  const finalDeliveryZone = input.sameDeliveryAddress
    ? input.pickupZone
    : input.deliveryZone || input.pickupZone;
  const finalDeliveryAddress = input.sameDeliveryAddress
    ? input.pickupAddress
    : input.deliveryAddress || input.pickupAddress;

  const order: BookingOrder = {
    reference,
    createdAt: new Date().toISOString(),
    status: "Pickup Scheduled",
    stageIndex: 0,
    services: input.services,
    subtotalKes: rawSubtotal,
    discountKes,
    totalEstimatedKes,
    pickupDate: input.pickupDate,
    pickupSlot: input.pickupSlot,
    deliveryDate: input.deliveryDate,
    deliveryWindow: input.deliveryWindow,
    pickupZone: input.pickupZone,
    pickupAddress: input.pickupAddress,
    sameDeliveryAddress: input.sameDeliveryAddress,
    deliveryZone: finalDeliveryZone,
    deliveryAddress: finalDeliveryAddress,
    customerName: input.customerName.trim(),
    customerPhone: input.customerPhone.trim(),
    customerEmail: input.customerEmail.trim().toLowerCase(),
    specialCareNotes: (input.specialCareNotes || "").trim(),
    paymentMethod: input.paymentMethod,
    paymentStatus:
      input.paymentMethod === "mpesa_prepay"
        ? "M-Pesa Prompt Sent"
        : "Pay on Delivery (M-Pesa)",
    assignedRider: RIDER_POOL[Math.floor(Math.random() * RIDER_POOL.length)],
    timeline: buildTimeline(0),
  };

  const db = readLocalDb();
  db.bookings[reference] = order;
  writeLocalDb(db);

  if (hasKvEnv()) {
    try {
      await kv.set(`booking:${reference}`, order);
      await kv.sadd(`user-bookings:${order.customerEmail}`, reference);
    } catch {
      // Local JSON store remains authoritative fallback
    }
  }

  return order;
}

export async function getBookingByReference(
  rawRef: string
): Promise<BookingOrder | null> {
  const ref = rawRef.trim().toUpperCase();
  if (!ref) return null;

  if (hasKvEnv()) {
    try {
      const fromKv = await kv.get<BookingOrder>(`booking:${ref}`);
      if (fromKv) return fromKv;
    } catch {
      // Fall through to local store
    }
  }

  const db = readLocalDb();
  return db.bookings[ref] || null;
}

export async function getOrdersForEmail(email: string): Promise<BookingOrder[]> {
  const normalized = email.trim().toLowerCase();
  const db = readLocalDb();
  const all = Object.values(db.bookings);
  const matching = all.filter(
    (b) => b.customerEmail.toLowerCase() === normalized
  );

  // Always include realistic sample orders if a newly registered user has none yet
  const demoOrders =
    matching.length > 0
      ? matching
      : all.filter(
          (b) => b.customerEmail.toLowerCase() === "customer@tabithafresh.co.ke"
        );

  return demoOrders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function findUserByEmail(
  email: string
): Promise<StoredUserAccount | null> {
  const normalized = email.trim().toLowerCase();
  if (hasKvEnv()) {
    try {
      const kvUser = await kv.get<StoredUserAccount>(`user:${normalized}`);
      if (kvUser) return kvUser;
    } catch {
      // Fallback to local file db
    }
  }
  const db = readLocalDb();
  return db.users[normalized] || null;
}

export async function registerUserAccount(params: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ ok: true; user: StoredUserAccount } | { ok: false; error: string }> {
  const normalized = params.email.trim().toLowerCase();
  const existing = await findUserByEmail(normalized);
  if (existing) {
    return {
      ok: false,
      error: "An account with this email address already exists. Please sign in.",
    };
  }

  const user: StoredUserAccount = {
    id: `usr-${crypto.randomUUID().slice(0, 8)}`,
    name: params.name.trim(),
    email: normalized,
    phone: params.phone.trim(),
    passwordHash: hashPassword(params.password),
    createdAt: new Date().toISOString(),
  };

  const db = readLocalDb();
  db.users[normalized] = user;
  writeLocalDb(db);

  if (hasKvEnv()) {
    try {
      await kv.set(`user:${normalized}`, user);
    } catch {
      // Local store written above
    }
  }

  return { ok: true, user };
}
