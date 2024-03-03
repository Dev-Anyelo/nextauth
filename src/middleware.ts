import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  adminRoute,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = adminRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  // if (isAdminRoute) {

  //   if (req.auth?.user.role !== "ADMIN") {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }

  //   return Response.redirect(new URL("dashboard", nextUrl));
  // }

  // If user is already logged redirect to the default login redirect
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // If user is not logged in and the route is not public, redirect to the login page
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
