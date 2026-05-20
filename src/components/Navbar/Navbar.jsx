import Link from "next/link";
import { navLinks } from "@/config/navigation";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
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

          <span className="text-xl font-bold tracking-tight text-foreground">
            Doc<span className="text-accent">Appoint</span>
          </span>
        </Link>

        {/* Server passes data to performance isolated Active Links component */}
        <NavbarDesktopLinks links={navLinks} />

        {/* Action Controls Area */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0A7C6E] dark:hover:text-[#F59E0B] transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-white bg-[#0A7C6E] hover:bg-[#0A7C6E]/90 dark:bg-[#F59E0B] dark:text-black dark:hover:bg-[#F59E0B]/90 px-4 py-2 shadow-sm transition-all"
          >
            Register
          </Link>
        </div>

        {/* Mobile View Controller Wrapper */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <NavbarMobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
