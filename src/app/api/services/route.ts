import { NextResponse } from "next/server";
import {
  BULK_DISCOUNT_NOTE,
  COVERAGE_ZONES,
  LAUNDRY_SERVICES,
  MINIMUM_ORDER_NOTE,
  PRICING_TABS,
} from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    ok: true,
    brand: "Tabitha Fresh",
    currency: "KES",
    services: LAUNDRY_SERVICES,
    pricingTabs: PRICING_TABS,
    coverageZones: COVERAGE_ZONES,
    minimumOrderKes: 1000,
    minimumOrderNote: MINIMUM_ORDER_NOTE,
    bulkDiscountNote: BULK_DISCOUNT_NOTE,
  });
}
