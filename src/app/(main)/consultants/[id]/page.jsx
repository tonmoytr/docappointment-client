import Image from "next/image";
import { notFound } from "next/navigation";
import PageTitleBanner from "@/components/ui/PageTitleBanner";
import { getDoctorById } from "@/utils/api";
import {
  HiStar,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { FaBookmark, FaRegClock } from "react-icons/fa";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import BookingController from "@/components/Booking/BookingController";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token;
  const doctor = await getDoctorById(id, token);
  if (!doctor) return { title: "Consultant Not Found" };
  return {
    title: `${doctor.name} | DocAppoint`,
    description: `Book an appointment with ${doctor.name} - ${doctor.specialty} based in ${doctor.location}.`,
  };
}

export default async function DoctorDetailsPage({ params }) {

  // throw new Error("Testing my beautiful new error page layout!");

  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const doctor = await getDoctorById(id, token);

  const user = session?.user;
  const currentUser = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
  };

  if (!doctor) {
    notFound();
  }

  return (
    <div className="w-full bg-[#F9F9F9] dark:bg-zinc-950 min-h-screen pb-24 font-sans antialiased">
      {/* 1. Reusable Top Section Title Banner Layout */}
      <PageTitleBanner title="CONSULTANT PROFILE" />

      {/* 2. Page Content View Split Context */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ================= LEFT SIDE COLUMN: PROFILE DOSSIER (8 Cols) ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* Lead Header Profile Info block */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left shadow-sm">
              {/* Doctor Headshot Wrapper */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 bg-[#F7F7F7] dark:bg-zinc-800 overflow-hidden shrink-0 border border-zinc-100 dark:border-zinc-800">
                <Image
                  unoptimized
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Identity & Basic Technical Info Block */}
              <div className="space-y-4 flex-grow">
                <div className="space-y-1">
                  <span className="text-xs font-semibold tracking-wider text-teal-500 uppercase block">
                    {doctor.specialty}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                    {doctor.name}
                  </h2>
                  <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500 flex items-center justify-center sm:justify-start gap-1.5">
                    <HiOutlineOfficeBuilding className="text-base shrink-0 text-zinc-300 dark:text-zinc-600" />
                    {doctor.hospital}
                  </p>
                </div>

                {/* Micro Meta Badges Strip */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-semibold rounded-md">
                    {doctor.experience} Experience
                  </div>
                  <div className="px-3 py-1 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 text-xs font-bold rounded-md flex items-center gap-1 shadow-sm">
                    <HiStar className="text-amber-500" />
                    {doctor.rating.toFixed(1)} Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Biography & Medical Background Context Box */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-6 md:p-8 space-y-4 text-left shadow-sm">
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-tight flex items-center gap-2">
                <span className="w-1 h-5 bg-teal-500 block rounded-full" />
                About Consultant
              </h3>
              <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {doctor.description} This medical specialist is dedicated to
                delivering advanced outpatient diagnostic services and clinical
                strategies. Committed to absolute transparency, persistent
                patient communication, and comprehensive clinical check-ups.
              </p>
            </div>

            {/* Physical Location Details Strip */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-6 md:p-8 space-y-4 text-left shadow-sm">
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-tight flex items-center gap-2">
                <span className="w-1 h-5 bg-teal-500 block rounded-full" />
                Practice Location
              </h3>
              <div className="flex items-start gap-3 text-zinc-500 dark:text-zinc-400">
                <HiOutlineLocationMarker className="text-xl text-teal-500 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    {doctor.hospital}
                  </p>
                  <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {doctor.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE COLUMN: STICKY BOOKING PANEL (4 Cols) ================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-6 shadow-[0_10px_30px_rgba(20,184,166,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)] text-left flex flex-col rounded-none relative overflow-hidden">
              {/* Premium top line subtle visual glow accent overlay */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-500" />

              {/* Consultation Fee Breakdown Header Row */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                  Consultation Fee
                </span>
                <span className="text-2xl font-black text-zinc-800 dark:text-zinc-100 flex items-center">
                  ৳ {doctor.fee}
                </span>
              </div>

              {/* Availability Slots Matrix Segment */}
              <div className="py-5 space-y-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <HiOutlineClock className="text-base text-teal-500" />
                  Available Time Slots
                </span>

                <div className="space-y-2">
                  {doctor.availability && doctor.availability.length > 0 ? (
                    doctor.availability.map((slot, index) => (
                      <div
                        key={index}
                        className="w-full text-center py-2.5 px-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 rounded-lg flex items-center justify-between"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        <span>{slot}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs font-medium text-zinc-400 italic">
                      No schedules specified for today.
                    </p>
                  )}
                </div>
              </div>

              {/* Interactive Dynamic Action Button Box (Critical Part!) */}
              <div className="pt-2 space-y-4">
                {/* <button
                  type="button"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold tracking-widest text-xs uppercase py-4 shadow-md hover:shadow-xl hover:shadow-teal-500/20 active:scale-[0.98] transition-all duration-300 cursor-pointer text-center block"
                >
                  Book Appointment Now
                </button> */}
                <BookingController doctor={doctor} currentUser={currentUser} />

                <button
                  type="button"
                  className="w-full bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-300 font-bold tracking-widest text-xs uppercase py-3 border border-zinc-200/60 dark:border-zinc-700/60 active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaBookmark className="text-[10px]" />
                  Save Consultant
                </button>
              </div>

              {/* Trust Indicators Footer Metadata Segment */}
              <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                <HiOutlineShieldCheck className="text-base text-teal-500 shrink-0" />
                <span>
                  Verified Specialist session listing context protection.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
