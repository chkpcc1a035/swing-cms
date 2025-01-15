import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(`[Middleware] Processing request for: ${req.nextUrl.pathname}`);

  // Create a response object that we can modify
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(
    `[Middleware] Session status: ${
      session ? "Authenticated" : "Not authenticated"
    }`
  );

  // Define static paths that should be ignored
  const staticPaths = ["/_next", "/static", "/api", "/favicon.ico"];
  if (staticPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return res;
  }

  // Handle authentication redirects
  if (!session) {
    if (req.nextUrl.pathname !== "/login") {
      console.log("[Middleware] No session, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (req.nextUrl.pathname === "/login") {
    console.log(
      "[Middleware] Session exists on login page, redirecting to inventory"
    );
    return NextResponse.redirect(new URL("/inventory", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
