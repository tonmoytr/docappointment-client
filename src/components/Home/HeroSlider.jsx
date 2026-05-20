"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import {
  HiArrowRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineCalendar,
} from "react-icons/hi";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Local Dictionary mapping slide configurations to avoid serialization errors
const slideMeta = {
  1: { icon: HiOutlineUserGroup, text: "500+ Verified Doctors" },
  2: { icon: HiOutlineCalendar, text: "Instant Real-Time Slots" },
  3: { icon: HiOutlineShieldCheck, text: "100% Secured Sessions" },
};

export default function HeroSlider({ slides }) {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect={"fade"}
        speed={1000}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-hero-pagination" }}
        className="w-full h-[850px] md:h-[85vh] overflow-hidden shadow-2xl dark:shadow-none"
      >
        {slides.map((slide) => {
          const meta = slideMeta[slide.id] || slideMeta[1];
          const MetaIcon = meta.icon;

          return (
            <SwiperSlide
              key={slide.id}
              className="relative w-full h-full select-none"
            >
              {/* 1. Base Studio Background Immersive Blur Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] scale-105"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
              {/* Premium dark gradient overlay to ensure readable typography text in light/dark transitions */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-zinc-950/30 dark:from-zinc-950/95 dark:via-zinc-950/75 dark:to-transparent" />

              {/* 2. Main Interative Split Content Layout */}
              <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full z-10 text-white">
                {/* --- LEFT COLUMN: Typography Text & Actions --- */}
                <div className="md:col-span-7 space-y-6 max-w-xl animate-fadeIn">
                  {/* Floating Action Micro Badge */}
                  <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 dark:bg-warning/20 dark:border-warning/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent dark:text-warning shadow-sm">
                    <MetaIcon className="text-sm" />
                    <span>{slide.badge || "Verified Healthcare"}</span>
                  </div>

                  {/* Primary Geometric Title Header */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                    {slide.title}
                  </h1>

                  {/* Body Subtitle Description */}
                  <p className="text-sm sm:text-base md:text-lg text-default-200 dark:text-default-300 font-medium leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Buttons Action Matrix Row */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="/appointments"
                      className="inline-flex items-center space-x-2.5 bg-accent hover:bg-accent/90 dark:bg-warning dark:text-black dark:hover:bg-warning/90 text-white font-semibold px-6 py-3 shadow-lg shadow-accent/20 transition-all transform active:scale-98 group cursor-pointer"
                    >
                      <span>Browse Doctors</span>
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/dashboard/my-bookings"
                      className="inline-flex items-center space-x-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-semibold px-6 py-3 transition-all transform active:scale-98 cursor-pointer"
                    >
                      <span>My Bookings</span>
                    </Link>
                  </div>

                  {/* Quick Dynamic Highlight Indicator Strip */}
                  <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-default-400 dark:text-default-500 pt-4 uppercase">
                    <span className="w-2 h-2 rounded-full bg-accent dark:bg-warning animate-ping" />
                    <span>{meta.text}</span>
                  </div>
                </div>

                {/* --- RIGHT COLUMN: Advanced Character Backdrops --- */}
                <div className=" md:col-span-5 flex flex-col items-center justify-end h-full relative overflow-visible">
                  {/* Neon Cyan Diamond Backdrop Ring Geometry */}
                  <div className="absolute bottom-[10%] w-[110%] aspect-square border-2 border-accent/40 dark:border-warning/30 rounded-[35%] rotate-[45deg] scale-95 blur-[1px] animate-pulse z-0" />

                  {/* Diffuse Cyan Background Radial Glow Mask */}
                  <div className="absolute bottom-[20%] w-80 h-80 bg-accent/25 dark:bg-warning/15 rounded-full blur-[90px] z-0 pointer-events-none" />

                  {/* Character Realistic Drop Shadow (Matches your image modification exactly!) */}
                  <div
                    className="absolute bottom-0 right-[-15%] w-[85%] h-[80%] bg-black/45 dark:bg-black/60 blur-2xl z-10 origin-bottom pointer-events-none transform skew-x-[-22deg] scale-y-[0.42]"
                    style={{
                      maskImage:
                        "linear-gradient(to top, black 20%, transparent 90%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, black 20%, transparent 90%)",
                    }}
                  />

                  {/* Performance-Optimized Next.js Doctor Image Component */}
                  <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] z-20 flex justify-center items-end transform translate-y-4 scale-105 lg:scale-115 xl:scale-120 origin-bottom transition-transform duration-500">
                    <Image
                      src={`/images/${slide.id}.png`}
                      alt="DocAppoint Specialist Presentation"
                      width={480}
                      height={640}
                      priority
                      className="object-contain object-bottom drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Static Custom Pagination Anchor Panel */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex justify-center custom-hero-pagination" />
    </div>
  );
}
