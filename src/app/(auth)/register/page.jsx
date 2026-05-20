// src/app/register/page.jsx
"use client";

import { authClient } from "@/utils/auth-client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineLink,
} from "react-icons/hi";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoUrl = formData.get("photoUrl");
    const password = formData.get("password");

    // console.log("Registering user:", { name, email, photoUrl, password });

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      image: photoUrl,
      password,
      callbackURL: "/login",
    });

    if (error) {
      toast.error(error.message || "Registration Failed");
    }
    if (data) {
      toast.success("Your account has been created successfully");
      router.push("/login");
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Triggering Google account initialization...");
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#F9F9F9] dark:bg-zinc-950 font-sans antialiased flex items-center justify-center py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(20,184,166,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[600px]">
        {/* ================= LEFT COLUMN: LOTTIE ANIMATION LAYER ================= */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-teal-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800/50 p-8 flex-col justify-center items-center relative border-r border-zinc-100 dark:border-zinc-800/40">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Lottie Animation Container Boundary Box */}
          <div className="w-full max-w-[340px] aspect-square flex flex-col items-center justify-center relative z-10">
            {/* 2. PLACE THE LOTTIE COMPONENT HERE */}
            <DotLottieReact src="/animation/Login-Lady.json" loop autoplay />

            {/* Elegant subtle typography context below the running animation */}
            <div className="text-center space-y-1 mt-6">
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">
                Join DocAppoint
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-[240px] font-light leading-relaxed">
                Unlock 24/7 online medical assistance.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE SIGN UP FORM ================= */}
        <div className="col-span-1 lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center text-left relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-500" />

          {/* Form Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
              CREATE <span className="text-teal-500 font-bold">ACCOUNT</span>
            </h2>
            <p className="text-sm text-zinc-400 font-light">
              Get registered in seconds to discover high-rated doctors near you.
            </p>
          </div>

          {/* Form Entry Field Loops */}
          <form
            onSubmit={handleRegisterSubmit}
            className="mt-8 flex flex-col gap-y-5 w-full"
          >
            {/* Full Name Input Box */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block text-left">
                Full Name
              </label>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-600">
                  <HiOutlineUser size={18} />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 rounded-none pl-11 pr-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Input Box */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block text-left">
                Email Address
              </label>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-600">
                  <HiOutlineMail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="johndoe@gmail.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 rounded-none pl-11 pr-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Photo URL Input Box */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block text-left">
                Photo URL
              </label>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-600">
                  <HiOutlineLink size={18} />
                </span>
                <input
                  type="url"
                  name="photoUrl"
                  required
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 rounded-none pl-11 pr-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Choose Password Input Box with Strict Regex Validation Rules */}
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block text-left">
                Choose Password
              </label>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-600">
                  <HiOutlineLockClosed size={18} />
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                  title="Password must contain at least 6 characters, including 1 uppercase letter and 1 lowercase letter."
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 rounded-none pl-11 pr-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2 w-full">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold tracking-widest text-xs uppercase py-3.5 shadow-sm hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 active:scale-98 cursor-pointer rounded-none"
              >
                Register Account
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
              <span className="px-3 text-zinc-400">Or Sign Up With</span>
            </div>
          </div>

          {/* Google SSO Option Trigger */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full border border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 font-bold tracking-wider text-xs uppercase py-3 flex items-center justify-center gap-3 transition-all duration-300 active:scale-98 cursor-pointer shadow-sm"
          >
            <FcGoogle size={18} className="shrink-0" />
            <span>Sign Up With Google</span>
          </button>

          {/* Account Redirect Link */}
          <p className="mt-8 text-center text-sm text-zinc-400 font-light">
            Already have a registered profile?{" "}
            <Link
              href="/login"
              className="font-bold text-teal-500 hover:text-teal-600 transition-colors underline underline-offset-4"
            >
              Login Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
