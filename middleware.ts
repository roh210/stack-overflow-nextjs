import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define matchers for public and ignored routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/question/:id",
  "/tags",
  "/tags:id",
  "/profile:id",
  "/community",
  "/jobs",
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware((auth, req) => {
  // If the route is ignored, skip the auth check
  if (isIgnoredRoute(req)) {
    return;
  }

  // If the route is public, allow access without authentication
  if (isPublicRoute(req)) {
    return;
  }

  // For any other route, require authentication
  auth();
});

// Configure the matcher for which routes to apply the middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
