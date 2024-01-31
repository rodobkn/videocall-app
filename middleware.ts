import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  videoCallRoomPrefix,
  apiLivekitPrefix
} from "@/routes";

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiLivekitRoute = nextUrl.pathname.startsWith(apiLivekitPrefix);
  const isGoingToVideoRoom = nextUrl.pathname.startsWith(videoCallRoomPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isApiLivekitRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isGoingToVideoRoom) {
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}