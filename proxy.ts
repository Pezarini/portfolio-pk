import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * English is the default locale and is served at `/` (rewritten to `/en`
 * internally). `/en` redirects back to `/` so there is a single canonical URL.
 * Other locales live under their own prefix (e.g. `/pt-br`).
 *
 * Kept free of shared imports on purpose: Proxy runs separately from the app.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/en".length) || "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and any path with a file extension (assets, icons, robots, sitemap, PDF…).
  matcher: ["/((?!_next|api|.*[.]).*)"],
};
