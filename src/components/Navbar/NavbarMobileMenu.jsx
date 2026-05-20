"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi"; // Responsive fallback icon pack

export default function NavbarMobileMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-600 hover:text-[#0A7C6E] focus:outline-none transition-colors"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
      </button>

      {/* Mobile Sidebar Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden z-50 animate-fadeIn">
          <nav className="flex flex-col p-4 space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#0A7C6E]/10 text-[#0A7C6E]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#0A7C6E]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <hr className="border-gray-100 my-2" />

            <div className="flex flex-col space-y-2 px-4 pb-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-gray-700 hover:text-[#0A7C6E] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-white bg-[#0A7C6E] hover:bg-[#0A7C6E]/90 shadow-sm transition-all"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
