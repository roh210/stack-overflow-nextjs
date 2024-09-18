import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/api/webhooks",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

const ignoredRoutes = createRouteMatcher(["/api/webhooks", "/api/chatgpt"]);

const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (publicRoutes(req)) {
    // Allow access to public routes without authentication
    return;
  }

  if (ignoredRoutes(req)) {
    // Skip Clerk middleware for ignored routes
    return;
  }

  if (isProtectedRoute(req)) {
    // Explicitly protect the /ask-question route
    auth().protect();
  }

  // For all other routes, you can decide whether to protect them or not
  // Uncomment the next line if you want to protect all other routes by default
  auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
