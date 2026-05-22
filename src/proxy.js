import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./utils/auth";

export async function proxy(request) {
  const requestedPath = request.nextUrl.pathname;

  // 🚀 THE ONLY NEW ADDITION:
  // If the browser is trying to log out or view the login page, stop here and let it happen!
  if (requestedPath.includes("sign-out") || requestedPath === "/login") {
    return NextResponse.next();
  }

  // --- YOUR EXACT ORIGINAL CODE RESUMES HERE ---
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return NextResponse.next();
  }

  // 1. Grab the exact sub-path the user was trying to access
  const loginUrl = new URL("/login", request.url);

  // 2. Append the requested path as a query parameter
  loginUrl.searchParams.set("callbackUrl", requestedPath);

  // 3. Redirect them to login safely
  return NextResponse.redirect(loginUrl);
}

// 🚀 YOUR EXACT ORIGINAL MATCHER: Clean, explicit, and easy to read!
export const config = {
  matcher: ["/consultants/:path+", "/dashboard/:path+"],
};

// // src/proxy.js
// import { NextResponse } from "next/server";

// export async function proxy(request) {
//   try {
//     const requestedPath = request.nextUrl.pathname;

//     // 🚀 THE FIX: Add explicit bypasses for the Homepage and Register routes!
//     if (
//       requestedPath.startsWith("/_next") ||
//       requestedPath.startsWith("/api/auth") ||
//       requestedPath.startsWith("/animation") ||
//       requestedPath.includes("sign-out") ||
//       requestedPath === "/" || // 🟢 Allows anyone to view the main homepage!
//       requestedPath === "/register" // 🟢 Allows anyone to view the sign up page!
//     ) {
//       return NextResponse.next();
//     }

//     // Safely look up cookies
//     const sessionCookie =
//       request.cookies.get("better-auth.session_token") ||
//       request.cookies.get("__Secure-better-auth.session_token");

//     // Allow logged-in users or anyone heading explicitly to /login
//     if (sessionCookie || requestedPath === "/login") {
//       return NextResponse.next();
//     }

//     // AUTH GATE: Redirect unauthorized users back to login
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", requestedPath);
//     return NextResponse.redirect(loginUrl);
//   } catch (error) {
//     console.error("Proxy Layer Error:", error);
//     return NextResponse.next();
//   }
// }

// export const config = {
//   // Catch-all net for global app protection
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// // import { headers } from "next/headers";
// // import { NextResponse } from "next/server";
// // import { auth } from "./utils/auth";

// // // This function can be marked `async` if using `await` inside
// // export async function proxy(request) {
// //   const session = await auth.api.getSession({
// //     headers: await headers(),
// //   });

// //   //   const isLoggedIn = true;

// //   if (session) {
// //     return NextResponse.next();
// //   }

// //   // 1. Grab the exact sub-path the user was trying to access
// //   const requestedPath = request.nextUrl.pathname;

// //   // 2. Build the new login URL
// //   const loginUrl = new URL("/login", request.url);

// //   // 3. 🚀 THE MAGIC: Append the requested path as a query parameter
// //   loginUrl.searchParams.set("callbackUrl", requestedPath);

// //   // This will now redirect to something like: /login?callbackUrl=/all-books/123
// //   return NextResponse.redirect(loginUrl);

// //   //   return NextResponse.redirect(new URL("/login", request.url));
// // }

// // export const config = {
// //   matcher: ["/consultants/:path+", "/dashboard/:path+"],
// // };
