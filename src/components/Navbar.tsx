"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, User, X } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/booking", label: "Book Pickup" },
  { href: "/track", label: "Track Order" },
  { href: "/my-orders", label: "My Orders" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="tf-header navigation w-100 shadow-sm">
      <nav className="navbar navbar-expand-xl py-2" aria-label="Main navigation">
        <div className="container">
          <Link
            href="/"
            className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/assets/logo/logo.png"
              width={40}
              height={40}
              alt={`${BRAND_NAME} logo`}
              priority
            />
            <div className="d-flex flex-column">
              <span className="fw-bold text-body-emphasis fs-5 lh-1">
                {BRAND_NAME}
              </span>
              <span
                className="text-body-secondary fw-medium"
                style={{ fontSize: "0.72rem" }}
              >
                Nairobi, Kenya
              </span>
            </div>
          </Link>

          <button
            type="button"
            className="btn btn-outline-primary d-xl-none d-inline-flex align-items-center justify-content-center p-2"
            aria-expanded={mobileOpen}
            aria-controls="tf-mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div
            id="tf-mobile-menu"
            className={`${
              mobileOpen ? "d-block pt-3 pb-2" : "d-none"
            } d-xl-flex align-items-xl-center justify-content-xl-between flex-grow-1 ms-xl-4`}
          >
            <ul className="navbar-nav align-items-xl-center gap-1 gap-xl-2 mx-xl-auto">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : !item.href.startsWith("/#") &&
                      pathname.startsWith(item.href);

                return (
                  <li className="nav-item" key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`px-3 py-2 nav-link rounded-3 text-sm fw-semibold ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-body-emphasis bg-body-secondary-hover"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="d-flex flex-column flex-xl-row align-items-xl-center gap-2 mt-3 mt-xl-0">
              {session?.user ? (
                <div className="d-flex align-items-center gap-2">
                  <Link
                    href="/my-orders"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 fw-semibold"
                  >
                    <User size={15} />
                    <span className="text-truncate" style={{ maxWidth: 120 }}>
                      {session.user.name || session.user.email}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 fw-semibold"
                    aria-label="Sign out"
                  >
                    <LogOut size={14} />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-outline-primary text-sm fw-semibold px-3"
                >
                  Sign In
                </Link>
              )}

              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary text-white text-sm fw-semibold px-3"
              >
                Schedule a Pickup
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
