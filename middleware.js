import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookies: false,
  });

  console.log(token)

  if (req.nextUrl.pathname.startsWith("/auth") && token) {
    console.log("AUTH");
    return NextResponse.redirect(
      new URL([req.nextUrl.origin, "/"].join("")),
      req.url
    );
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
    console.log("NOT AUTH");
    return NextResponse.redirect(
      new URL([req.nextUrl.origin, "auth/login"].join("/"))
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/auth/:path*", "/auth"],
};
