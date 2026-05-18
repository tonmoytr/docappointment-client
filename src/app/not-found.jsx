import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm h-64 md:h-80 mx-auto">
        <DotLottieReact src="/animation/404-error.json" loop autoplay />
      </div>

      <h1 className="text-3xl font-bold text-[#1e293b] mt-6">Page Not Found</h1>
      <p className="text-slate-500 mt-2 mb-8">
        The friend you are looking for is not here.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 bg-[#2d4f43] text-white px-6 py-3 rounded-lg font-medium"
      >
        <HiOutlineHome />
        Go Home
      </Link>
    </main>
  );
}
