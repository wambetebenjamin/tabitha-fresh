import React, { Suspense } from "react";
import type { Metadata } from "next";
import AuthSignUpForm from "@/components/AuthSignUpForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Register for a free Tabitha Fresh account in Nairobi using Google OAuth or email and password.",
};

export default function SignUpPage() {
  return (
    <section className="py-7 py-md-8 bg-body-tertiary">
      <div className="container">
        <Suspense
          fallback={
            <div className="tf-card p-5 text-center mx-auto" style={{ maxWidth: 500 }}>
              <div className="spinner-border text-primary" />
            </div>
          }
        >
          <AuthSignUpForm />
        </Suspense>
      </div>
    </section>
  );
}
