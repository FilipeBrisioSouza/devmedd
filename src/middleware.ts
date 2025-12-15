import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const isAuth = !!token;
  const pathname = req.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 🔥 Executa middleware somente para páginas
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.svg).*)",
  ],
};
