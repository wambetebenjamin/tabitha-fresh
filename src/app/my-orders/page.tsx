import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getOrdersForEmail } from "@/lib/store-server";
import MyOrdersClient from "@/components/MyOrdersClient";

export const metadata: Metadata = {
  title: "My Orders",
  description:
    "View your active and completed Tabitha Fresh laundry pickups, check live status, or reorder in one click.",
};

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/my-orders");
  }

  const orders = await getOrdersForEmail(session.user.email);

  return (
    <section className="py-6 py-md-8 bg-body">
      <div className="container">
        <MyOrdersClient
          serverOrders={orders}
          userName={session.user.name || "Valued Customer"}
          userEmail={session.user.email}
        />
      </div>
    </section>
  );
}
