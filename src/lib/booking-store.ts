"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BookingOrder } from "@/lib/schemas";
import { DELIVERY_WINDOWS, PICKUP_TIME_SLOTS } from "@/lib/constants";

export interface BookingDraftState {
  step: number;
  selectedQuantities: Record<string, number>;
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
  recentBookings: BookingOrder[];
  setStep: (step: number) => void;
  toggleService: (slug: string, defaultQty: number) => void;
  selectOnlyOrAddService: (slug: string, defaultQty: number) => void;
  setServiceQuantity: (slug: string, qty: number) => void;
  updateFields: (
    patch: Partial<
      Omit<
        BookingDraftState,
        | "setStep"
        | "toggleService"
        | "selectOnlyOrAddService"
        | "setServiceQuantity"
        | "updateFields"
        | "addConfirmedBooking"
        | "loadReorder"
        | "resetDraft"
        | "recentBookings"
      >
    >
  ) => void;
  addConfirmedBooking: (order: BookingOrder) => void;
  loadReorder: (order: BookingOrder) => void;
  resetDraft: () => void;
}

function getDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86_400_000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    pickupDate: fmt(today),
    deliveryDate: fmt(tomorrow),
  };
}

const defaults = getDefaultDates();

export const useBookingStore = create<BookingDraftState>()(
  persist(
    (set) => ({
      step: 1,
      selectedQuantities: {
        "wash-and-fold": 4,
      },
      pickupDate: defaults.pickupDate,
      pickupSlot: PICKUP_TIME_SLOTS[0],
      deliveryDate: defaults.deliveryDate,
      deliveryWindow: DELIVERY_WINDOWS[0],
      pickupZone: "Kilimani",
      pickupAddress: "",
      sameDeliveryAddress: true,
      deliveryZone: "Kilimani",
      deliveryAddress: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      specialCareNotes: "",
      paymentMethod: "mpesa_on_delivery",
      recentBookings: [],
      setStep: (step) => set({ step }),
      toggleService: (slug, defaultQty) =>
        set((state) => {
          const next = { ...state.selectedQuantities };
          if (next[slug]) {
            delete next[slug];
          } else {
            next[slug] = defaultQty;
          }
          return { selectedQuantities: next };
        }),
      selectOnlyOrAddService: (slug, defaultQty) =>
        set((state) => ({
          selectedQuantities: {
            ...state.selectedQuantities,
            [slug]: state.selectedQuantities[slug] || defaultQty,
          },
        })),
      setServiceQuantity: (slug, qty) =>
        set((state) => ({
          selectedQuantities: {
            ...state.selectedQuantities,
            [slug]: Math.max(1, Math.min(200, Math.round(qty))),
          },
        })),
      updateFields: (patch) => set((state) => ({ ...state, ...patch })),
      addConfirmedBooking: (order) =>
        set((state) => ({
          recentBookings: [
            order,
            ...state.recentBookings.filter(
              (existing) => existing.reference !== order.reference
            ),
          ].slice(0, 15),
        })),
      loadReorder: (order) =>
        set(() => {
          const nextQuantities: Record<string, number> = {};
          for (const item of order.services) {
            nextQuantities[item.slug] = item.quantity;
          }
          const freshDates = getDefaultDates();
          return {
            step: 1,
            selectedQuantities: nextQuantities,
            pickupDate: freshDates.pickupDate,
            pickupSlot: order.pickupSlot,
            deliveryDate: freshDates.deliveryDate,
            deliveryWindow: order.deliveryWindow,
            pickupZone: order.pickupZone,
            pickupAddress: order.pickupAddress,
            sameDeliveryAddress: order.sameDeliveryAddress,
            deliveryZone: order.deliveryZone,
            deliveryAddress: order.deliveryAddress,
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            customerEmail: order.customerEmail,
            specialCareNotes: order.specialCareNotes,
            paymentMethod: order.paymentMethod,
          };
        }),
      resetDraft: () => {
        const fresh = getDefaultDates();
        set({
          step: 1,
          selectedQuantities: { "wash-and-fold": 4 },
          pickupDate: fresh.pickupDate,
          pickupSlot: PICKUP_TIME_SLOTS[0],
          deliveryDate: fresh.deliveryDate,
          deliveryWindow: DELIVERY_WINDOWS[0],
          specialCareNotes: "",
        });
      },
    }),
    {
      name: "tabitha_fresh_booking_draft",
    }
  )
);
