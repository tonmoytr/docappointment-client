"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarDesktopLinks({ links }) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => {
        // Strict active check or sub-route match for dashboard variants
        const isActive =
          pathname === link.path ||
          (link.path !== "/" && pathname.startsWith(link.path));

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`text-sm font-medium transition-all relative py-1 focus:outline-none group ${
              isActive
                ? "text-[#0A7C6E] dark:text-[#F59E0B]"
                : "text-gray-600 dark:text-gray-300 hover:text-[#0A7C6E] dark:hover:text-[#F59E0B]"
            }`}
          >
            {link.label}
            {/* Elegant active link indicator underline */}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#0A7C6E] dark:bg-[#F59E0B] transform transition-transform duration-200 ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
