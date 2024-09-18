import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define matchers for public, ignored, and protected routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhooks", "/api/chatgpt"]);

const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);

export default clerkMiddleware((auth, req) => {
  // If the route is ignored, skip the middleware entirely
  if (isIgnoredRoute(req)) {
    console.log("Ignoring route:", req.url);
    return NextResponse.next(); // Continue without auth
  }

  // If the route is public, no authentication is required
  if (isPublicRoute(req)) {
    console.log("Allowing public route:", req.url);
    return NextResponse.next(); // Continue without auth
  }

  // If the route is protected, enforce authentication
  if (isProtectedRoute(req)) {
    console.log("Protecting route:", req.url);
    auth().protect(); // Enforce authentication and return a valid response
    return NextResponse.next();
  }

  // Default case: apply authentication for all other routes
  auth(); // Enforce authentication by default
  return NextResponse.next();
});

// Configure the matcher for which routes to apply the middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
