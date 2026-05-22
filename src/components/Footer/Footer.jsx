import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Standardized corporate rebranding replacement

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    /* 
      We use bg-content1 (HeroUI's card/surface layer token) and border-divider.
      This gives a subtle, perfect off-white/zinc-900 color swap instantly!
    */
    <footer className="bg-content1 border-t border-divider transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Info Box */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 group focus:outline-none"
            >
              {/* Added a smooth scale and shadow effect on hover */}
              <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-lg shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
                D
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Doc<span className="text-accent">Appoint</span>
              </span>
            </Link>
            <p className="text-sm text-default-500 max-w-sm leading-relaxed">
              Connecting patients with trusted medical specialists seamlessly.
              Book appointments, manage schedules, and prioritize wellness
              effortlessly.
            </p>
          </div>

          {/* Quick Nav Options */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-default-400 mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/consultants"
                  className="text-sm text-default-600 hover:text-accent dark:hover:text-warning font-medium transition-colors focus:outline-none"
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-default-600 hover:text-accent dark:hover:text-warning font-medium transition-colors focus:outline-none"
                >
                  Your Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Profiles Mapping */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-default-400 mb-4">
              Connect With Us
            </h3>
            <div className="flex items-center space-x-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-divider flex items-center justify-center text-default-600 hover:text-foreground hover:border-foreground dark:hover:border-warning hover:bg-default-50 dark:hover:bg-zinc-800 hover:shadow-sm transition-all focus:outline-none"
                aria-label="Follow us on X"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-divider flex items-center justify-center text-default-600 hover:text-accent hover:border-accent hover:bg-default-50 dark:hover:bg-zinc-800 hover:shadow-sm transition-all focus:outline-none"
                aria-label="Follow us on Facebook"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-divider flex items-center justify-center text-default-600 hover:text-accent hover:border-accent hover:bg-default-50 dark:hover:bg-zinc-800 hover:shadow-sm transition-all focus:outline-none"
                aria-label="Follow us on LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Divider Strip */}
        <div className="mt-12 pt-6 border-t border-divider flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-default-400">
            &copy; {currentYear} DocAppoint. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-xs text-default-400 hover:text-default-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-default-400 hover:text-default-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
