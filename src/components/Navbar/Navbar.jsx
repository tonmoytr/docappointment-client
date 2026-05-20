// src/components/shared/Navbar.jsx
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/config/navigation";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import ThemeToggle from "../ui/ThemeToggle";
import { authClient } from "@/utils/auth-client";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export default async function Navbar() {
  // 2. RETRIEVE THE ACTIVE USER SESSION ON THE SERVER
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  console.log("userrrrrrrrr", user);

  // Mock data placeholder for development layout inspection - uncomment lines above and remove this when live
  // const user = {
  //   name: "Tonmoy",
  //   image:
  //     "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100",
  // };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Branding/Logo Area */}
        <Link
          href="/"
          className="flex items-center space-x-2 focus:outline-none"
        >
          <span className="w-8 h-8 rounded-lg bg-[#0A7C6E] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            D
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground dark:text-white">
            Doc
            <span className="text-[#0A7C6E] dark:text-[#F59E0B]">Appoint</span>
          </span>
        </Link>

        {/* Server passes data to performance isolated Active Links component */}
        <NavbarDesktopLinks links={navLinks} />

        {/* Action Controls Area */}
        <div className="hidden md:flex items-center space-x-5">
          <ThemeToggle />

          {/* 3. DYNAMIC CONDITION MATCHING SYSTEM */}
          {user ? (
            /* ================= AUTHENTICATED USER SESSION STATE VIEW ================= */
            <div className="flex items-center space-x-4">
              {/* Professional User Profile Identity Tag Container */}
              <div className="flex items-center space-x-2.5 border-r border-gray-200 dark:border-gray-800 pr-4">
                {/* Premium Sharp Outlined Avatar Border Frame Container */}
                <div className="relative w-10 h-10 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 rounded-full dark:border-zinc-700 overflow-hidden shrink-0">
                  <Image
                    unoptimized
                    src={
                      user.image ||
                      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
                    }
                    alt={user.name || "User Avatar"}
                    fill
                    sizes="32px"
                    className="object-cover object-center"
                  />
                </div>
                {/* Displaying User Display Name */}
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {user.name}
                </span>
              </div>

              {/* Server-Side Form Trigger to handle secure logout requests cleanly */}

              <form
                action={async () => {
                  "use server";
                  // 1. Tell Better Auth on the server to clear the session cookies
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                  // 2. Perform a native, instant server-side redirect
                  revalidatePath("/");
                  redirect("/login");
                }}
              >
                <button
                  type="submit"
                  className="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 uppercase transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            /* ================= UNKNOWN GUEST STATE VIEW ================= */
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0A7C6E] dark:hover:text-[#F59E0B] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-[#0A7C6E] hover:bg-[#0A7C6E]/90 dark:bg-[#F59E0B] dark:text-black dark:hover:bg-[#F59E0B]/90 px-4 py-2 shadow-sm transition-all rounded-none"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile View Controller Wrapper */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <NavbarMobileMenu links={navLinks} user={user} />
        </div>
      </div>
    </header>
  );
}
