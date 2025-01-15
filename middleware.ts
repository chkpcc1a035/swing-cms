import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(`[Middleware] Processing request for: ${req.nextUrl.pathname}`);

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

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/api", "/_next", "/static", "/favicon.ico"];
  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname.toLowerCase().startsWith(path)
  );

  // Handle authentication redirects
  if (!session && !isPublicPath) {
    console.log("[Middleware] No session, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && req.nextUrl.pathname === "/login") {
    console.log(
      "[Middleware] Session exists on login page, redirecting to home"
    );
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Update matcher to handle all routes except static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
