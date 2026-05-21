"use client";

import { HiPlay } from "react-icons/hi";
import { FaUserMd, FaUsers, FaVideo } from "react-icons/fa";

export default function PlatformPulseMatrix() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* SECTION HEADER */}
      <div className="flex flex-col mb-10 text-left">
        <span className="text-xs font-bold tracking-widest text-teal-500 uppercase block mb-1">
          Platform Pulse
        </span>
        <h2 className="text-3xl font-black tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
          INSIGHTS & <span className="text-teal-500">EXPERIENCE</span>
        </h2>
        <div className="w-16 h-1 bg-teal-500 mt-3" />
      </div>

      {/* 🚀 FIXED BENTO GRID CONFIGURATION */}
      {/* Changing columns to a crisp 12-column template with standard integer layouts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[240px] md:auto-rows-[190px]">
        {/* ================= CARD 1: MAIN FEATURED PODCAST (YELLOW) ================= */}
        {/* Takes up 7 out of 12 columns, spans 2 rows deep */}
        <div className="md:col-span-7 md:row-span-2 bg-[#F6DE7A] text-zinc-900 p-8 flex flex-col justify-between relative group overflow-hidden border border-amber-200 text-left rounded-none shadow-sm">
          <div className="space-y-4 max-w-[85%] z-10">
            <div className="inline-flex items-center space-x-1.5 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E25A3E] animate-pulse" />
              <span>Podcast</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 leading-none">
              Nutrition and <br /> Mental Health
            </h3>
            <p className="text-xs md:text-sm text-zinc-800 font-light leading-relaxed max-w-md">
              The role of diet in preventing and managing mental health
              conditions such as depression, burnout, and daily anxiety.
            </p>
          </div>

          <button className="w-12 h-12 bg-white hover:bg-zinc-900 hover:text-white text-teal-600 transition-all duration-200 border border-amber-200 flex items-center justify-center shadow-md cursor-pointer group-hover:scale-105 z-10 rounded-none">
            <HiPlay size={20} className="ml-0.5" />
          </button>

          <div className="absolute right-4 bottom-2 opacity-15 text-zinc-900 pointer-events-none select-none z-0 group-hover:scale-105 transition-transform duration-500">
            <FaUserMd size={150} />
          </div>
        </div>

        {/* ================= CARD 2: LIVE BROADCAST EVENT (BLUE) ================= */}
        {/* Takes up the remaining 5 columns on the right side, spans 1 row deep */}
        <div className="md:col-span-5 md:row-span-1 bg-[#2C488F] text-white p-6 flex flex-col justify-between relative group overflow-hidden border border-blue-900/40 text-left rounded-none shadow-sm">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Live Event</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
              Healthy Habits for a Happy Heart
            </h3>
          </div>

          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] text-blue-200 font-medium tracking-wide">
              May 28, 2026 08:00 PM
            </span>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 text-white pointer-events-none select-none z-0">
            <FaVideo size={70} />
          </div>
        </div>

        {/* ================= CARD 3: REPUTATION COUNTER STAT (MINT GREEN) ================= */}
        {/* 🚀 FIXED: Set to md:col-span-2 to let them sit perfectly side by side with the pink card! */}
        <div className="md:col-span-2 bg-[#A4DFCB] text-zinc-900 p-5 flex flex-col justify-between relative group overflow-hidden border border-emerald-200 text-left rounded-none shadow-sm">
          <div className="z-10">
            <h4 className="text-4xl font-black tracking-tighter text-zinc-900 leading-none">
              08
            </h4>
          </div>
          <p className="text-[11px] font-bold tracking-wide uppercase text-zinc-800 leading-tight z-10">
            Years <br /> Experience
          </p>

          <div className="absolute right-2 bottom-2 opacity-10 text-zinc-900 pointer-events-none select-none z-0">
            <FaUserMd size={50} />
          </div>
        </div>

        {/* ================= CARD 4: SCALE METRIC COUNTER STAT (PINK) ================= */}
        {/* 🚀 FIXED: Set to md:col-span-3 to consume the rest of the 5-column space cleanly! */}
        <div className="md:col-span-3 bg-[#E8C4D6] text-zinc-900 p-5 flex flex-col justify-between relative group overflow-hidden border border-pink-200 text-left rounded-none shadow-sm">
          <div className="z-10">
            <h4 className="text-4xl font-black tracking-tighter text-zinc-900 leading-none">
              120k
            </h4>
          </div>
          <p className="text-[11px] font-bold tracking-wide uppercase text-zinc-800 leading-tight z-10">
            Happy <br /> Customers
          </p>

          <div className="absolute right-2 bottom-2 opacity-10 text-zinc-900 pointer-events-none select-none z-0">
            <FaUsers size={55} />
          </div>
        </div>
      </div>
    </section>
  );
}
