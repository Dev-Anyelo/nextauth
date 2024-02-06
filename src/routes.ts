/**
 * An array of routes that are accessible to the public,
 * these routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/", 
  "/auth/new-verification"
];

/**
 * An array of routes that are used for authentication,
 *  these routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/error",
  "/auth/reset",
  "/auth/register",
  "/auth/new-password",
];

/**
 * The prefix for API authenticatin routes
 * routes that start with prefix are used for API auth purposes
 * @type {string[]}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string[]}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
