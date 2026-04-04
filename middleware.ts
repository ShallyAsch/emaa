import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth) => {
  // Don't block any routes — let the app handle auth via useUser() hook
  // Clerk modals handle login/signup, middleware doesn't protect routes
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!x)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/(.*)',
  ],
};
