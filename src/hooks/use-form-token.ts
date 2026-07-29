"use client";

import { useEffect, useState } from "react";

/**
 * Fetches a signed timestamp token on mount. The contact APIs reject
 * submissions without a valid token or made less than 3s after issue.
 */
export function useFormToken(): string {
  const [token, setToken] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/form-token")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.token) setToken(data.token);
      })
      .catch(() => {
        // Leave token empty; the API will treat the submission as suspect.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return token;
}
