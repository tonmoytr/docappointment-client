// src/components/ui/ThemeToggle.jsx
"use client";

import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
      className="p-2 rounded-lg bg-default-100 text-default-700 hover:text-accent transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
      aria-label="Toggle application theme"
    >
      {/* 
        This block uses theme-driven hidden classes.
        The block will natively hide or show icons based on the class listed on the HTML tag,
        completely avoiding React state updates during the render phase!
      */}
      <span className="inline block dark:hidden">
        <HiMoon size={20} />
      </span>
      <span className="hidden dark:block">
        <HiSun size={20} />
      </span>
    </button>
  );
}
