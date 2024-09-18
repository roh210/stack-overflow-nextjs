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
  "/sign-in(.*)", // Make sign-in route catch-all
  "/sign-up(.*)", // Make sign-up route catch-all
]);

const ignoredRoutes = createRouteMatcher(["/api/webhooks", "/api/chatgpt"]);

const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // Additional logic for ignored routes or other conditions
  if (publicRoutes(req)) {
    // Allow access to public routes without authentication
    return;
  }

  if (ignoredRoutes(req)) {
    // Skip Clerk middleware for ignored routes
    return;
  }

  auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
