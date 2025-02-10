import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  console.log("hello middleware", req.cookies);

  const token = req.cookies?.get("Token")?.value || "";
  const state = req.cookies.get("state").value || "notauthenticated";
  // console.log("token", token);
  // console.log("state", state);
  const pathname = req.nextUrl.pathname;

  if (
    (token !== "" && pathname === "/Admin-Login") ||
    (pathname === "/Admin-Login" && state !== "notauthenticated")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/Pin-verification" && state !== "pinrecived") {
    console.log(state, pathname);
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (!token && pathname.startsWith("/Administration")) ||
    (pathname.startsWith("/Administration") && state !== "authenticated")
  ) {
    return NextResponse.redirect(new URL("/Admin-Login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin-Login", "/Pin-verification", "/Administration/:path*"],
};
