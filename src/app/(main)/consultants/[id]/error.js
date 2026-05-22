"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function ConsultantErrorPage({ error, reset }) {
  useEffect(() => {
    // Log the error to your backend console or services like Sentry/LogRocket
    console.error("Caught Routing Boundary Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] w-full bg-[#F9F9F9] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-8 shadow-sm flex flex-col items-center">
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center mb-6">
          <HiOutlineExclamationTriangle size={32} />
        </div>

        {/* Text Context */}
        <h2 className="text-xl font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tight mb-2">
          Something Went Wrong
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-8">
          We encountered an error while retrieving this consultant&apos;s data
          credentials. The database server might be temporarily offline or
          restarting.
        </p>

        {/* Action Controls Button Array */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {/* 🚀 Try Again Recovery Trigger */}
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-teal-500 text-white text-xs font-bold uppercase hover:bg-teal-600 transition-colors cursor-pointer tracking-wider"
          >
            Try Again
          </button>

          {/* Fallback Escape Route Navigation Link */}
          <Link
            href="/consultants"
            className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-center tracking-wider"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
