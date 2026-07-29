import { NextResponse } from "next/server";
import { mintFormToken } from "@/lib/form-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ token: mintFormToken() });
}
