import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaStethoscope } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { HiStar, HiOutlineHeart } from "react-icons/hi";
import { GiTooth, GiDna2 } from "react-icons/gi";
import { getAllDoctors } from "@/utils/api";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";

// Local Dictionary mapping specialties to matching reference layout colors and shapes
const specialtyConfig = {
  Cardiologist: { icon: HiOutlineHeart, color: "bg-teal-500" },
  Pediatrician: { icon: FaStethoscope, color: "bg-teal-500" },
  Neurologist: { icon: GiDna2, color: "bg-teal-500" },
  Dermatologist: { icon: FaStethoscope, color: "bg-teal-500" },
  fallback: { icon: FaStethoscope, color: "bg-teal-500" },
};

export default async function TopRatedDoctors() {
  const doctors = await getAllDoctors();
  const topRatedDoctors = doctors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  // Pulling Doctor 1 dynamically to populate the premium featured header segment
  const featuredDoctor = topRatedDoctors[0] || {
    name: "Dr. Stephanie Wosniack",
    specialty: "Chief Medical Officer",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    description:
      "Dr. Stephanie Wosniack is dedicated to providing her patients with the best possible care. We at MediCare are focused on helping you. After receiving successful care for various aches and pains over the years, Dr. Wosniack found her calling to help others get well.",
  };

  return (
    <section className="w-full font-sans antialiased bg-default-50 transition-colors duration-200">
      {/* --- PART 1: TOP FEATURED INTRO BANNER (EXACT PATTERN MATCH) --- */}
      <div className="w-full bg-[#EAEAEA] dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 pt-16 pb-0 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Descriptive Grid Typography Column */}
          <div className="md:col-span-7 space-y-5 pb-12 md:pb-16 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400 block">
                {featuredDoctor.name}
              </span>
              {/* Minimal line separation matching your screenshot precisely */}
              <div className="w-16 h-[2px] bg-teal-500 mt-1" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-extralight tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
              OUR <span className="text-teal-500 font-bold">TEAM</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-light">
              {featuredDoctor.description}
            </p>

            {/* Custom SVG/Cursive Design Emulation signature box */}
            <div className="pt-4 opacity-80">
              <span className="font-serif italic text-3xl text-zinc-700 dark:text-teal-400 select-none tracking-wider">
                {featuredDoctor.name.split(" ")[1]}
              </span>
            </div>
          </div>

          {/* Right Column: Grounded portrait layout composition */}
          <div className="hidden md:col-span-5 md:flex h-full items-end justify-center overflow-visible relative">
            <div className="relative w-full max-w-[340px] aspect-[4/5] self-end origin-bottom transform translate-y-[1px]">
              <Image
                unoptimized
                src={featuredDoctor.image}
                alt={featuredDoctor.name}
                fill
                priority
                sizes="340px"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>

        {/* --- DOCKING ELEMENT: The Intersecting Horizontal Center Button --- */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30">
          <Link
            href="/all-consultants"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold tracking-widest uppercase text-[11px] px-8 py-3.5 shadow-md hover:shadow-lg transition-all duration-300 block active:scale-95"
          >
            Find Out More
          </Link>
        </div>
      </div>

      {/* --- PART 2: BOTTOM GRID RECTANGULAR MEDICAL CARDS --- */}
      <section className="w-full bg-[#F9F9F9] dark:bg-zinc-950 py-16 font-sans antialiased">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* --- THE TEAM GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRatedDoctors.map((doctor) => {
              const spec =
                specialtyConfig[doctor.specialty] || specialtyConfig.fallback;
              const SpecIcon = spec.icon;

              return (
                <div
                  key={doctor._id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-300 rounded-none group flex flex-col h-full relative"
                >
                  {/* 1. Portrait Image Container */}
                  <div className="relative w-full aspect-[11/10] bg-[#F7F7F7] dark:bg-zinc-800 overflow-hidden shrink-0">
                    <Image
                      unoptimized
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-w-768px) 100vw, 380px"
                      className="object-cover object-top transition-transform duration-700"
                    />

                    {/* Rating Badge Overlay */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded flex items-center space-x-1 shadow-sm border border-zinc-100 z-20">
                      <HiStar className="text-amber-500 text-xs" />
                      <span className="text-[10px] font-bold text-zinc-800">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>

                  {/* 2. Overlapping Icon Floating Ribbon 
                    This absolute block sits exactly over the cut line with a thick white ring wrapper!
                */}
                  <div className="absolute top-[calc(57%-24px)] left-4 right-4 flex items-center space-x-1 z-30 pointer-events-auto">
                    {/* Specialty Medical Circle */}
                    <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-sm shrink-0">
                      <SpecIcon size={18} />
                    </div>

                    {/* Social Circles (Linked In, Twitter, Facebook colors) */}
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

                  {/* 3. Text Body Details Block */}
                  <div className="p-5 pt-10 flex flex-col justify-between flex-grow text-left">
                    <div className="space-y-2">
                      <span className="text-xs font-normal tracking-wide text-zinc-400 dark:text-zinc-500 block capitalize">
                        {doctor.specialty}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-3">
                        {doctor.description}
                      </p>
                    </div>

                    {/* 4. Bottom Row Action Footer */}
                    <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <Link
                        href={`/consultants/${doctor._id}`}
                        className="text-xs font-bold tracking-wider text-teal-500 hover:text-[#ff6b35] dark:hover:text-warning uppercase transition-colors "
                      >
                        Profile Details
                        <ArrowUpRightFromSquare className="inline ml-2 mb-1" />
                      </Link>

                      {/* Light gray static footer icons */}
                      <div className="flex items-center space-x-3 text-zinc-300 dark:text-zinc-600">
                        <a
                          href="#"
                          className="hover:text-zinc-500 transition-colors"
                        >
                          <FaFacebookF size={14} />
                        </a>
                        <a
                          href="#"
                          className="hover:text-zinc-500 transition-colors"
                        >
                          <FaXTwitter size={14} />
                        </a>
                        <a
                          href="#"
                          className="hover:text-zinc-500 transition-colors"
                        >
                          <FaLinkedinIn size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}
