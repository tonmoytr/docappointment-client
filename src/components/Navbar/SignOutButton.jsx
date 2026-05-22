"use client";

import { authClient } from "@/utils/auth-client"; // Adjust this to match your auth client instance path
import { toast } from "sonner";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged Out Successfully!!");
            // 🚀 Force a clean browser window refresh to wipe all stale client caches
            window.location.href = "/login";
          },
        },
      });
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Failed to sign out. Try again.");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      type="button"
      className="text-xs font-bold tracking-wider text-red-500 dark:text-gray-400 hover:text-white hover:bg-red-500 hover:px-4 hover:py-2 transition-all dark:hover:text-red-400 uppercase cursor-pointer bg-transparent border-none p-0"
    >
      Sign Out
    </button>
  );
}
