import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define matchers for public and ignored routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks",
  "/question/:id",
  "/tags",
  "/tags/:id", // Fixed typo
  "/profile/:id", // Fixed typo
  "/community",
  "/jobs",
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhooks", "/api/chatgpt"]);

export default clerkMiddleware((auth, req) => {
  // If the route is ignored, skip the auth check
  if (isIgnoredRoute(req)) {
    console.log("Ignoring route", req.url);
    return;
  }

  // If the route is public, allow access without authentication
  if (isPublicRoute(req)) {
    console.log("Allowing public route", req.url);
    return;
  }

  // For any other route, require authentication
  auth().protect();
});

// Configure the matcher for which routes to apply the middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
