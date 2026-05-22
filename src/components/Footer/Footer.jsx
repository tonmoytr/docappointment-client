import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-800/80 transition-colors duration-200 mt-auto text-left">
      {/* 1. Main Structured Matrix Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Identity & Mission Branding Block (Span 5 for prominence) */}
          <div className="md:col-span-5 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 group focus:outline-none"
            >
              <div className="relative w-9 h-9 shrink-0 bg-zinc-100 dark:bg-zinc-800 overflow-hidden rounded-none">
                <Image
                  src="/images/logo.jpg"
                  alt="DocAppoint Medical Emblem Logo"
                  fill
                  className="object-cover rounded-none"
                />
              </div>
              <span className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
                Doc<span className="text-teal-500">Appoint</span>
              </span>
            </Link>

            <p className="text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
              Connecting patients with verified medical specialists seamlessly.
              Book certified clinical consultations, manage digital patient
              schedules, and prioritize your long-term diagnostic healthcare
              strategy effortlessly.
            </p>
          </div>

          {/* Quick Platform Services Navigation Matrix (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-5">
              Medical Platform
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/consultants"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 font-normal tracking-wide transition-colors focus:outline-none"
                >
                  Find Specialists
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 font-normal tracking-wide transition-colors focus:outline-none"
                >
                  Patient Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Support Links Block (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-5">
              Support Core
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 font-normal tracking-wide transition-colors focus:outline-none"
                >
                  Help Assistance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 font-normal tracking-wide transition-colors focus:outline-none"
                >
                  Clinical Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Syndication & Networks Matrix (Span 3) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-5">
              Connect Channels
            </h3>

            {/* 🚀 FIXED: Added mandatory explicit rounded-none layout flags across all active borders */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none"
                aria-label="Follow DocAppoint on X"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none"
                aria-label="Follow DocAppoint on Facebook"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none"
                aria-label="Follow DocAppoint on LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 hover:border-pink-500 dark:hover:border-pink-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none"
                aria-label="Follow DocAppoint on Instagram"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Sub-Footer Technical Copyright Strip */}
        <div className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-normal text-zinc-400 dark:text-zinc-500 tracking-wide">
            &copy; {currentYear} DocAppoint System. Engineered for medical
            compliance. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors focus:outline-none"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors focus:outline-none"
            >
              Terms of Medical Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
