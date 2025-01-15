import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Middleware Session:", !!session, "Path:", req.nextUrl.pathname);

  // Add more public paths
  const publicPaths = ["/Login", "/api", "/_next", "/static"];
  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!session && !isPublicPath) {
    console.log("Redirecting to Login - No session");
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  if (session && req.nextUrl.pathname === "/Login") {
    console.log("Redirecting to Home - Has session");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
