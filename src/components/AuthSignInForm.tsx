"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LogIn, Lock, Mail } from "lucide-react";
import {
  RecaptchaFallbackChallenge,
  RecaptchaNotice,
  useRecaptchaToken,
} from "@/components/RecaptchaGuard";

export default function AuthSignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/my-orders";
  const { executeV3 } = useRecaptchaToken("signin");

  const [email, setEmail] = useState("customer@tabithafresh.co.ke");
  const [password, setPassword] = useState("Tabitha2026!");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [needsV2, setNeedsV2] = useState(false);
  const [v2Checked, setV2Checked] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (needsV2 && !v2Checked) {
      setErrorMsg("Please tick the reCAPTCHA v2 verification box first.");
      return;
    }

    setLoading(true);
    try {
      const token = needsV2
        ? `dev-recaptcha-v2-signin-${Date.now()}`
        : await executeV3();

      const verifyRes = await fetch("/api/recaptcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          mode: needsV2 ? "v2" : "v3",
        }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        if (verifyData.requiresV2Fallback) {
          setNeedsV2(true);
        }
        setErrorMsg(
          verifyData.message || "reCAPTCHA verification failed. Please retry."
        );
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMsg("Invalid email or password. Please check and try again.");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setErrorMsg("Unable to sign in right now. Please retry.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="tf-card p-4 p-sm-5 mx-auto" style={{ maxWidth: 480 }}>
      <div className="text-center mb-4">
        <span className="tf-eyebrow">Customer Portal</span>
        <h1 className="m-0 mt-3 fs-3 fw-bold text-body-emphasis">
          Sign in to Tabitha Fresh
        </h1>
        <p className="m-0 mt-2 text-sm text-body-secondary">
          View active pickups, past receipts, and one-click reorders.
        </p>
      </div>

      {/* Google OAuth Sign-In */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
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
        <span>Continue with Google</span>
      </button>

      <div className="d-flex align-items-center gap-3 my-4">
        <hr className="flex-grow-1 m-0 opacity-25" />
        <span className="text-xs text-body-secondary fw-semibold">
          OR SIGN IN WITH EMAIL
        </span>
        <hr className="flex-grow-1 m-0 opacity-25" />
      </div>

      <form onSubmit={handleCredentialsSubmit} className="d-flex flex-column gap-3">
        <div>
          <label
            htmlFor="signin-email"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Email address
          </label>
          <div className="input-group">
            <span className="input-group-text bg-body text-secondary">
              <Mail size={16} />
            </span>
            <input
              id="signin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="you@example.co.ke"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="form-label text-sm fw-semibold text-body-emphasis"
          >
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text bg-body text-secondary">
              <Lock size={16} />
            </span>
            <input
              id="signin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <p className="m-0 mt-1 text-xs text-body-secondary">
            Demo account pre-filled: <code>customer@tabithafresh.co.ke</code> /{" "}
            <code>Tabitha2026!</code>
          </p>
        </div>

        <RecaptchaFallbackChallenge
          visible={needsV2}
          checked={v2Checked}
          onCheckChange={setV2Checked}
        />
        <RecaptchaNotice />

        {errorMsg && (
          <div className="alert alert-danger py-2 px-3 text-sm mb-0">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-lg btn-primary text-white fw-semibold text-sm d-inline-flex align-items-center justify-content-center gap-2 mt-1"
        >
          <LogIn size={17} />
          <span>{loading ? "Signing in..." : "Sign In"}</span>
        </button>
      </form>

      <p className="m-0 mt-4 text-center text-sm text-body-secondary">
        New to Tabitha Fresh?{" "}
        <Link
          href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="fw-semibold text-primary-emphasis"
        >
          Create a free account
        </Link>
      </p>
    </div>
  );
}
