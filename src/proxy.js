import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./utils/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //   const isLoggedIn = true;

  if (session) {
    return NextResponse.next();
  }

  // 1. Grab the exact sub-path the user was trying to access
  const requestedPath = request.nextUrl.pathname;

  // 2. Build the new login URL
  const loginUrl = new URL("/login", request.url);

  // 3. 🚀 THE MAGIC: Append the requested path as a query parameter
  loginUrl.searchParams.set("callbackUrl", requestedPath);

  // This will now redirect to something like: /login?callbackUrl=/all-books/123
  return NextResponse.redirect(loginUrl);

  //   return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/consultants/:path+", "/dashboard/:path+"],
};
