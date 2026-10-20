import React, { Suspense } from "react";
import type { Metadata } from "next";
import AuthSignInForm from "@/components/AuthSignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Tabitha Fresh account with Google OAuth or email and password.",
};

export default function SignInPage() {
  return (
    <section className="py-7 py-md-8 bg-body-tertiary">
      <div className="container">
        <Suspense
          fallback={
            <div className="tf-card p-5 text-center mx-auto" style={{ maxWidth: 480 }}>
              <div className="spinner-border text-primary" />
            </div>
          }
        >
          <AuthSignInForm />
        </Suspense>
      </div>
    </section>
  );
}
