import { createHmac, timingSafeEqual } from "crypto";

// HMAC key for signing form tokens. Falls back to the Resend key so no new
// env var is required, but CONTACT_FORM_SECRET can be set to rotate independently.
const SECRET =
  process.env.CONTACT_FORM_SECRET ?? process.env.RESEND_API_KEY ?? "dev-only-secret";

const MIN_AGE_MS = 3_000; // real users take longer than 3s to fill a form
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // stale tokens can't be replayed forever

function sign(timestamp: string): string {
  return createHmac("sha256", SECRET).update(timestamp).digest("hex");
}

export function mintFormToken(): string {
  const ts = Date.now().toString();
  return `${ts}.${sign(ts)}`;
}

type GuardedFields = {
  /** Honeypot field — hidden from real users, so any value means a bot. */
  website?: string;
  /** Signed render-time token from /api/form-token. */
  token?: string;
};

export function isLikelyBot(data: GuardedFields): boolean {
  if (data.website) return true;
  if (!data.token) return true;

  const [ts, sig] = data.token.split(".");
  if (!ts || !sig) return true;

  const expected = sign(ts);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return true;
  }

  const age = Date.now() - Number(ts);
  return !(age >= MIN_AGE_MS && age <= MAX_AGE_MS);
}
