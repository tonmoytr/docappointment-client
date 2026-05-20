// src/components/ui/PageTitleBanner.jsx
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";

export default function PageTitleBanner({ title }) {
  return (
    <section className="w-full relative bg-[#EAEAEA] dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-12 md:py-16 overflow-hidden antialiased font-sans">
      {/* Dynamic Background SVG Circles / Abstract Shapes */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 dark:opacity-5 pointer-events-none select-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <circle cx="200" cy="200" r="120" stroke="teal" strokeWidth="4" />
          <path d="M50,200 L350,200" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute left-10 -bottom-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Center Layout Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title and Accent Indicator Block */}
        <div className="space-y-2 text-left">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
            {title.split(" ")[0]}{" "}
            <span className="text-teal-500 font-bold">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <div className="w-16 h-[2px] bg-teal-500" />
        </div>

        {/* Dynamic Breadcrumb Navigation Links */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          <Link href="/" className="hover:text-teal-500 transition-colors">
            Home
          </Link>
          <HiOutlineChevronRight className="text-zinc-300 dark:text-zinc-700 text-sm shrink-0" />
          <span className="text-zinc-500 dark:text-zinc-300 cursor-default">
            {title}
          </span>
        </nav>
      </div>
    </section>
  );
}
