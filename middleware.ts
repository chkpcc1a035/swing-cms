// middleware.ts

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// middleware.ts
export async function middleware(req: NextRequest) {
  try {
    console.log(`[Middleware] Processing request for: ${req.nextUrl.pathname}`);

    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("[Middleware] Auth error:", error);
    }

    console.log(
      `[Middleware] Session status: ${
        session ? "Authenticated" : "Not authenticated"
      }`
    );

    // Ignore static paths
    const staticPaths = ["/_next", "/static", "/api", "/favicon.ico"];
    if (staticPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      return res;
    }

    const baseUrl = req.nextUrl.origin;

    if (!session) {
      if (req.nextUrl.pathname !== "/login") {
        console.log("[Middleware] No session, redirecting to login");
        return NextResponse.redirect(new URL("/login", baseUrl));
      }
    } else if (req.nextUrl.pathname === "/login") {
      console.log(
        "[Middleware] Session exists on login page, redirecting to inventory"
      );
      return NextResponse.redirect(new URL("/inventory", baseUrl));
    }

    return res;
  } catch (error) {
    console.error("[Middleware] Unexpected error:", error);
    return NextResponse.next();
  }
}
