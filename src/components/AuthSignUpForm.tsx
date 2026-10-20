"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { User } from "lucide-react";
import {
  RecaptchaFallbackChallenge,
  RecaptchaNotice,
  useRecaptchaToken,
} from "@/components/RecaptchaGuard";

export default function AuthSignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/my-orders";
  const { executeV3 } = useRecaptchaToken("signup");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [needsV2, setNeedsV2] = useState(false);
  const [v2Checked, setV2Checked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (needsV2 && !v2Checked) {
      setErrorMsg("Please tick the reCAPTCHA v2 verification box first.");
      return;
    }

    setLoading(true);
    try {
      const token = needsV2
        ? `dev-recaptcha-v2-signup-${Date.now()}`
        : await executeV3();

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password,
          confirmPassword,
          recaptchaToken: token,
          recaptchaMode: needsV2 ? "v2" : "v3",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.requiresV2Fallback) {
          setNeedsV2(true);
        }
        setErrorMsg(data.error || "Unable to create account.");
        setLoading(false);
        return;
      }

      await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setErrorMsg("Registration encountered an error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="tf-card p-4 p-sm-5 mx-auto" style={{ maxWidth: 500 }}>
      <div className="text-center mb-4">
        <span className="tf-eyebrow">Join Tabitha Fresh</span>
        <h1 className="m-0 mt-3 fs-3 fw-bold text-body-emphasis">
          Create your Nairobi account
        </h1>
        <p className="m-0 mt-2 text-sm text-body-secondary">
          Save pickup addresses, track every load, and reorder in seconds.
        </p>
      </div>

      {/* Google OAuth Sign-Up */}
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="btn btn-outline-secondary w-100 py-2 fw-semibold text-sm d-flex align-items-center justify-content-center gap-2 bg-body text-body-emphasis"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M12 10.2v3.9h5.5c-.24 1.26-.97 2.33-2.06 3.05l3.33 2.58c1.94-1.79 3.06-4.43 3.06-7.56 0-.73-.07-1.43-.19-2.1H12Z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.77 0 5.1-.92 6.8-2.49l-3.33-2.58c-.92.62-2.1.99-3.47.99-2.67 0-4.93-1.8-5.74-4.22H2.82v2.66A10 10 0 0 0 12 22Z"
          />
          <path
            fill="#4A90E2"
            d="M6.26 13.7A6.02 6.02 0 0 1 5.94 12c0-.59.11-1.16.32-1.7V7.64H2.82A10 10 0 0 0 2 12c0 1.61.39 3.14 1.08 4.36l3.18-2.66Z"
          />
          <path
            fill="#FBBC05"
            d="M12 5.98c1.5 0 2.85.52 3.91 1.53l2.93-2.93C17.09 2.94 14.77 2 12 2A10 10 0 0 0 2.82 7.64l3.44 2.66C7.07 7.78 9.33 5.98 12 5.98Z"
          />
        </svg>
        <span>Sign up with Google</span>
      </button>

      <div className="d-flex align-items-center gap-3 my-4">
        <hr className="flex-grow-1 m-0 opacity-25" />
        <span className="text-xs text-body-secondary fw-semibold">
          OR REGISTER WITH EMAIL
        </span>
        <hr className="flex-grow-1 m-0 opacity-25" />
      </div>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12 col-sm-6">
          <label
            htmlFor="signup-name"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Wambui Njoroge"
          />
        </div>

        <div className="col-12 col-sm-6">
          <label
            htmlFor="signup-phone"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Phone number
          </label>
          <input
            id="signup-phone"
            type="tel"
            required
            minLength={9}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            placeholder="+254712345678"
          />
        </div>

        <div className="col-12">
          <label
            htmlFor="signup-email"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="wambui@example.co.ke"
          />
        </div>

        <div className="col-12 col-sm-6">
          <label
            htmlFor="signup-password"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Min 8 characters"
          />
        </div>

        <div className="col-12 col-sm-6">
          <label
            htmlFor="signup-confirm"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Confirm password
          </label>
          <input
            id="signup-confirm"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            placeholder="Repeat password"
          />
        </div>

        <div className="col-12">
          <RecaptchaFallbackChallenge
            visible={needsV2}
            checked={v2Checked}
            onCheckChange={setV2Checked}
          />
          <RecaptchaNotice />
        </div>

        {errorMsg && (
          <div className="col-12">
            <div className="alert alert-danger py-2 px-3 text-sm mb-0">
              {errorMsg}
            </div>
          </div>
        )}

        <div className="col-12 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-lg btn-primary text-white fw-semibold text-sm w-100 d-inline-flex align-items-center justify-content-center gap-2"
          >
            <User size={17} />
            <span>{loading ? "Creating account..." : "Create Account"}</span>
          </button>
        </div>
      </form>

      <p className="m-0 mt-4 text-center text-sm text-body-secondary">
        Already registered?{" "}
        <Link
          href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="fw-semibold text-primary-emphasis"
        >
          Sign in instead
        </Link>
      </p>
    </div>
  );
}
