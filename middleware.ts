import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Make all routes public by default.
  // We will protect routes on a case-by-case basis.
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/readers",
    "/shop",
    "/api/webhooks(.*)", // Stripe webhook needs to be public
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
