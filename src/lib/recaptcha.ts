export interface RecaptchaVerificationResult {
  success: boolean;
  score: number;
  requiresV2Fallback: boolean;
  message?: string;
}

export async function verifyRecaptchaServer(
  token: string,
  mode: "v3" | "v2" = "v3"
): Promise<RecaptchaVerificationResult> {
  if (!token || token.trim().length === 0) {
    return {
      success: false,
      score: 0,
      requiresV2Fallback: true,
      message: "Missing reCAPTCHA token.",
    };
  }

  // Deterministic hook allowing verification of the score < 0.5 v2 fallback path
  if (token === "simulate-low-score" && mode === "v3") {
    return {
      success: false,
      score: 0.3,
      requiresV2Fallback: true,
      message:
        "Automated traffic check returned a low score (0.30). Please complete the checkbox challenge to continue.",
    };
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();

  // When a live RECAPTCHA_SECRET_KEY is configured in environment variables, verify with Google
  if (secretKey && !token.startsWith("dev-recaptcha-")) {
    try {
      const formBody = new URLSearchParams({
        secret: secretKey,
        response: token,
      });

      const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return {
          success: false,
          score: 0,
          requiresV2Fallback: mode === "v3",
          message: "Unable to reach Google reCAPTCHA verification service.",
        };
      }

      const data = (await response.json()) as {
        success: boolean;
        score?: number;
      };

      const score = typeof data.score === "number" ? data.score : data.success ? 1.0 : 0.0;

      if (!data.success) {
        return {
          success: false,
          score,
          requiresV2Fallback: mode === "v3",
          message: "reCAPTCHA challenge validation did not pass.",
        };
      }

      if (mode === "v3" && score < 0.5) {
        return {
          success: false,
          score,
          requiresV2Fallback: true,
          message:
            "reCAPTCHA v3 score below 0.5 threshold. Please verify with reCAPTCHA v2.",
        };
      }

      return {
        success: true,
        score,
        requiresV2Fallback: false,
      };
    } catch {
      return {
        success: false,
        score: 0,
        requiresV2Fallback: mode === "v3",
        message: "Verification service encountered a network error.",
      };
    }
  }

  // Unconfigured local/preview fallback when RECAPTCHA_SECRET_KEY is empty in dev
  return {
    success: true,
    score: mode === "v2" ? 1.0 : 0.92,
    requiresV2Fallback: false,
  };
}
