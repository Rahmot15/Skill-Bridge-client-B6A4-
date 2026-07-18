import { NextRequest, NextResponse } from "next/server";

type Role = "ADMIN" | "STUDENT" | "TUTOR";

const roleRedirectMap: Record<string, string> = {
  STUDENT: "/dashboard",
  TUTOR: "/tutor-dashboard",
  ADMIN: "/admin-dashboard",
};

// Role-based route access (more granular than just dashboard prefix)
const roleAllowedRoutes: Record<Role, string[]> = {
  ADMIN: [
    "/admin-dashboard",
    "/admin-dashboard/users",
    "/admin-dashboard/bookings",
    "/admin-dashboard/categories",
  ],
  STUDENT: [
    "/dashboard",
    "/dashboard/bookings",
    "/dashboard/profile",
  ],
  TUTOR: [
    "/tutor-dashboard",
    "/tutor-dashboard/bookings",
    "/tutor-dashboard/availability",
    "/tutor-dashboard/profile",
  ],
};

function isAllowedForRole(pathname: string, role: Role): boolean {
  const routes = roleAllowedRoutes[role] || [];
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — no protection needed
  const publicPrefixes = [
    "/find-tutors",
    "/about",
    "/contact",
    "/privacy",
    "/login",
    "/register",
    "/verify-email",
    "/check-email",
  ];

  if (
    publicPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  ) {
    return NextResponse.next();
  }

  // Get session from cookies (edge-safe, no server fetch)
  const token = request.cookies.get("better-auth.session_token")?.value;
  const role = request.cookies.get("role")?.value as Role | undefined;

  // Not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Dashboard role protection
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tutor-dashboard") ||
    pathname.startsWith("/admin-dashboard");

  if (isDashboardRoute) {
    // No role cookie → redirect to login
    if (!role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const correctDashboard = roleRedirectMap[role];

    // Wrong dashboard → redirect to correct one
    if (!pathname.startsWith(correctDashboard)) {
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }

    // Check granular route access
    if (!isAllowedForRole(pathname, role)) {
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
