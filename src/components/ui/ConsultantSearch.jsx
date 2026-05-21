"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FiSearch } from "react-icons/fi";

export default function ConsultantSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get current search value from URL to keep input synced on refresh
  const currentSearchValue = searchParams.get("search") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search"); // Clear parameter if input is empty
    }

    // 🚀 THE MAGIC TRICK: useTransition updates the URL and fetches server data
    // seamlessly without freezing the input typing experience.
    startTransition(() => {
      router.push(`/consultants?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-md mx-auto mb-12">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
        <FiSearch
          size={18}
          className={isPending ? "animate-pulse text-teal-500" : ""}
        />
      </div>
      <input
        type="text"
        defaultValue={currentSearchValue}
        onChange={handleSearchChange}
        placeholder="Search consultants by name or specialty..."
        className="w-full bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 pl-12 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-800/80 rounded-none text-sm shadow-sm focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 transition-colors"
      />
    </div>
  );
}
