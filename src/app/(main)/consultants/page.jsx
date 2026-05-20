// src/app/consultants/page.jsx
import Image from "next/image";
import Link from "next/link";
import PageTitleBanner from "@/components/ui/PageTitleBanner"; // Import title banner component
import { getAllDoctors } from "@/utils/api";
import { FaFacebookF, FaLinkedinIn, FaStethoscope } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { HiStar, HiOutlineHeart } from "react-icons/hi";
import { GiDna2 } from "react-icons/gi";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";

// Map specialized graphic tags to their icon representations
const specialtyConfig = {
  Cardiologist: { icon: HiOutlineHeart },
  Pediatrician: { icon: FaStethoscope },
  Neurologist: { icon: GiDna2 },
  Psychiatrist: { icon: FaStethoscope },
  fallback: { icon: FaStethoscope },
};

export const metadata = {
  title: "All Consultants | DocAppoint",
  description:
    "Browse our comprehensive panel of 12 top-tier medical specialists.",
};

export default async function AllConsultantsPage() {
  // Fetch your live array payload data right here on the server
  const consultants = await getAllDoctors();

  return (
    <div className="w-full bg-[#F9F9F9] dark:bg-zinc-950 min-h-screen pb-24 space-y-12">
      {/* 1. Reuse your pixel-perfect Title Banner Section */}
      <PageTitleBanner title="ALL CONSULTANTS" />

      {/* 2. Main Responsive Cards Matrix Container Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {consultants.map((doctor) => {
            const spec =
              specialtyConfig[doctor.specialty] || specialtyConfig.fallback;
            const SpecIcon = spec.icon;

            return (
              <div
                key={doctor.id}
                className=" border border-zinc-200/60 dark:border-zinc-800 shadow-[0_10px_30px_rgba(20,184,166,0.12)] hover:shadow-[0_15px_40px_rgba(20,184,166,0.25)] hover:-translate-y-2 transition-all duration-300 rounded-none group flex flex-col h-full relative"
              >
                {/* Portrait Picture Box Frame */}
                <div className="relative w-full aspect-[11/10] bg-[#F7F7F7] dark:bg-zinc-800 overflow-hidden shrink-0">
                  <Image
                    unoptimized
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-w-768px) 100vw, 380px"
                    className="object-cover object-top transition-transform duration-700"
                  />

                  {/* Rating Overlay Container */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded flex items-center space-x-1 shadow-sm border border-zinc-100 z-20">
                    <HiStar className="text-amber-500 text-xs" />
                    <span className="text-[10px] font-bold text-zinc-800">
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                {/* Overlapping Identity Circles & Social Ribbon (Exact Match!) */}
                <div className="absolute top-[calc(57%-24px)] left-4 right-4 flex items-center space-x-1 z-30">
                  {/* Medical Specialty Indicator Bubble */}
                  <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-sm shrink-0">
                    <SpecIcon size={18} />
                  </div>

                  {/* Interactive Social Media Ribbons */}
                  <div className="flex items-center space-x-1">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#E25A3E] text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-sm hover:scale-105 transition-transform"
                    >
                      <FaInstagram size={12} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-sm hover:scale-105 transition-transform"
                    >
                      <FaLinkedinIn size={12} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#000000] text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-sm hover:scale-105 transition-transform"
                    >
                      <FaXTwitter size={10} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#3B5998] text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-sm hover:scale-105 transition-transform"
                    >
                      <FaFacebookF size={12} />
                    </a>
                  </div>
                </div>

                {/* Profile Details Content Box Area */}
                <div className="p-5 pt-10 flex flex-col justify-between flex-grow bg-white dark:bg-zinc-900 text-left">
                  <div className="space-y-2">
                    <span className="text-xs font-normal tracking-wide text-zinc-400 dark:text-zinc-500 block capitalize">
                      {doctor.specialty.toLowerCase()}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-3">
                      {doctor.description}
                    </p>
                  </div>

                  {/* Structural Card Navigation Actions Footer Strip */}
                  <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <Link
                      href={`/consultants/${doctor._id}`}
                      className="text-xs font-bold tracking-wider text-teal-500 hover:text-[#ff6b35] dark:hover:text-warning uppercase transition-colors"
                    >
                      Profile Details{" "}
                      <ArrowUpRightFromSquare className="inline ml-2 mb-1" />
                    </Link>

                    <div className="flex items-center space-x-3 text-[#ff6b35] dark:text-[#ff6b35]/80">
                      <strong className=""> ৳ {doctor?.fee}</strong>
                      {/* <a
                        href="#"
                        className="hover:text-zinc-500 transition-colors"
                      >
                        <FaFacebookF size={12} />
                      </a>
                      <a
                        href="#"
                        className="hover:text-zinc-500 transition-colors"
                      >
                        <FaXTwitter size={12} />
                      </a>
                      <a
                        href="#"
                        className="hover:text-zinc-500 transition-colors"
                      >
                        <FaLinkedinIn size={12} />
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
