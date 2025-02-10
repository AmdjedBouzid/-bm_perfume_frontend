import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  console.log("hello middleware", req.cookies);
  const token = req.cookies.get("Token");
  if (token && req.nextUrl.pathname === "/Admin-Login") {
    return NextResponse.json(
      { message: "لا يمكنك الوصول إلى هذه الصفحة أثناء تسجيل الدخول" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin-Login", "/pin-verification"],
};
