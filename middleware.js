import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  console.log("hello middleware");
}
export const config = {
  matcher: ["/Admin-Login", "/pin-verification"],
};
