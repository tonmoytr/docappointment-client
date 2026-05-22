// src/app/dashboard/page.jsx
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageTitleBanner from "@/components/ui/PageTitleBanner";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineIdentification,
} from "react-icons/hi";
import { FiSliders, FiUser, FiTrash2, FiEdit3 } from "react-icons/fi";
import { PersonPencil } from "@gravity-ui/icons";
import EditAppointmentModal from "@/components/Booking/EditAppointment";
import { DeleteAlert } from "@/components/ui/DeleteAlert";
import EditProfileModal from "@/components/ui/EditProfileModal";

export async function generateMetadata() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userName = session?.user?.name;

    if (userName) {
      return {
        title: `${userName}'s Dashboard | DocAppoint`,
        description: `Manage your personal medical consultations, update booking schedules, and modify your profile credentials.`,
      };
    }
  } catch (error) {
    console.error("Failed to generate dynamic dashboard metadata:", error);
  }

  // Fallback title in case the session hasn't loaded or user is guest
  return {
    title: "Patient Dashboard | DocAppoint",
    description:
      "Manage your medical consultations, update booking schedules, and modify your profile credentials.",
  };
}

// Server side data fetching agent
async function getUserAppointments(userId) {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${userId}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return data;
}

export default async function DashboardPage({ searchParams }) {
  // 1. Authenticate session on the Server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = session?.user;

  if (!session?.user) {
    redirect("/login");
  }

  // Determine current active tab via URL query parameter (default to appointments)
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "appointments";

  const appointments = await getUserAppointments(session?.user?.id);

  // Premium flat badge styles matching medical theme context
  const statusBadges = {
    pending:
      "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40",
    confirmed:
      "bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-900/40",
    cancelled:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/40",
  };

  return (
    <div className="w-full bg-[#F9F9F9] dark:bg-zinc-950 min-h-screen pb-24 space-y-8">
      <PageTitleBanner title="PATIENT DASHBOARD" />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
        {/* ==================== PREMIUM TAB STRIP NAVIGATION ==================== */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-x-8">
          <Link
            href="?tab=appointments"
            className={`pb-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex items-center gap-x-2 ${
              activeTab === "appointments"
                ? "border-teal-500 text-teal-600 dark:text-teal-400 font-black"
                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            <FiSliders size={14} /> My Appointments ({appointments.length})
          </Link>
          <Link
            href="?tab=profile"
            className={`pb-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex items-center gap-x-2 ${
              activeTab === "tab=profile" || activeTab === "profile"
                ? "border-teal-500 text-teal-600 dark:text-teal-400 font-black"
                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            <FiUser size={14} /> Profile Settings
          </Link>
        </div>

        {/* ==================== TAB CONTENT CONTEXT SWITCHER ==================== */}
        {activeTab === "appointments" ? (
          /* ==================== VIEW A: APPOINTMENTS GRID LAYOUT ==================== */
          appointments.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 py-20 text-center">
              <p className="text-sm text-zinc-400 dark:text-zinc-500 font-light">
                No active medical sessions registered yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-y-5 w-full">
              {appointments.map((appt) => {
                // Dynamic status border matching your medical theme
                const statusBorderColor =
                  appt.status === "confirmed"
                    ? "border-teal-500"
                    : appt.status === "cancelled"
                      ? "border-red-500"
                      : "border-amber-500";

                return (
                  <div
                    key={appt._id}
                    className={`bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 border-l-4 ${statusBorderColor} rounded-none shadow-sm flex flex-col md:flex-row items-stretch justify-between group relative overflow-hidden text-left transition-all duration-200 hover:shadow-md`}
                  >
                    {/* ================= LEFT SECTION: MAIN APPOINTMENT INFO ================= */}
                    <div className="p-6 flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Doctor Info Block (Columns 1-5) */}
                      <div className="md:col-span-5 space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase block">
                          {appt.doctorSpeciality}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight group-hover:text-teal-500 transition-colors">
                          {appt.doctorName}
                        </h3>
                        <div className="pt-1.5 flex items-center gap-x-2">
                          <span
                            className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border rounded-none ${statusBadges[appt.status] || statusBadges.pending}`}
                          >
                            {appt.status}
                          </span>
                        </div>
                      </div>

                      {/* Vertical Divider for wide viewports */}
                      <div className="hidden md:block h-10 w-[1px] bg-zinc-200/60 dark:bg-zinc-800/60" />

                      {/* Core Metadata Parameters (Columns 6-12) */}
                      <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-light">
                        <div className="space-y-2">
                          <div className="flex items-center gap-x-2.5">
                            <HiOutlineCalendar
                              className="text-teal-500 shrink-0"
                              size={16}
                            />
                            <span>
                              Date:{" "}
                              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                                {appt.appointmentDate}
                              </strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-x-2.5">
                            <HiOutlineClock
                              className="text-teal-500 shrink-0"
                              size={16}
                            />
                            <span>
                              Slot:{" "}
                              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                                {appt.appointmentTime}
                              </strong>
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-x-2.5">
                            <HiOutlinePhone
                              className="text-teal-500 shrink-0"
                              size={16}
                            />
                            <span>
                              Callback:{" "}
                              <span className="font-mono">
                                {appt.userPhone}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-x-2.5">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                              Fee:
                            </span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                              ৳ {appt.fee}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= RIGHT SECTION: CONTEXT MANAGEMENT CTAs ================= */}
                    <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800/80 w-full md:w-48 text-center text-xs uppercase font-bold tracking-wider shrink-0 bg-zinc-50/40 dark:bg-zinc-900/20">
                      {/* Action 1: Reschedule Trigger */}
                      {/* <button className="flex-1 py-4 md:py-0 md:h-1/2 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors border-r md:border-r-0 md:border-b border-zinc-100 dark:border-zinc-800/80 cursor-pointer flex items-center justify-center gap-x-2">
                        <FiEdit3
                          size={13}
                          className="text-zinc-400 dark:text-zinc-500"
                        />
                        <span>Reschedule</span>
                      </button> */}
                      <EditAppointmentModal appointment={appt} />

                      {/* Action 2: Cancel Trigger */}
                      {/* <button className="flex-1 py-4 md:py-0 md:h-1/2 hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer flex items-center justify-center gap-x-2">
                        <FiTrash2 size={13} />
                        <span>Cancel</span>
                      </button> */}
                      <DeleteAlert appointment={appt} />
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* ==================== VIEW B: MY PROFILE ACCOUNT PANEL ==================== */
          <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-none shadow-sm overflow-hidden text-left grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-800">
            {/* Left Column Profile Avatar Frame Meta */}
            <div className="p-8 md:col-span-4 flex flex-col items-center justify-center bg-zinc-50/30 dark:bg-zinc-900/20 text-center space-y-4">
              <div className="relative w-28 h-28 border border-zinc-200 dark:border-zinc-700 p-1.5 bg-white dark:bg-zinc-800 rounded-none shadow-sm">
                <div className="relative w-full h-full overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                  <Image
                    unoptimized
                    src={
                      session.user.image ||
                      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120"
                    }
                    alt={session.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 tracking-tight">
                  {session.user.name}
                </h4>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/40 px-2 py-0.5">
                  Verified Patient
                </span>
              </div>
            </div>

            {/* Right Column Fields Metadata Grid */}
            <div className="p-8 md:col-span-8 flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
                  Personal <span className="text-teal-500">Credentials</span>
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-light">
                  Manage your platform identity configurations and verified
                  details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Field Line item 1: Name */}
                <div className="space-y-1.5 p-3.5 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/40">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-x-1.5">
                    <FiUser size={11} className="text-teal-500" /> Full Display
                    Name
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    {session.user.name}
                  </p>
                </div>

                {/* Field Line item 2: Email */}
                <div className="space-y-1.5 p-3.5 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/40">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-x-1.5">
                    <HiOutlineMail size={12} className="text-teal-500" />{" "}
                    Account Identity Email
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                    {session.user.email}
                  </p>
                </div>

                {/* Field Line item 3: Unique Secure User Token ID */}
                <div className="space-y-1.5 p-3.5 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/40 sm:col-span-2">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-x-1.5">
                    <HiOutlineIdentification
                      size={13}
                      className="text-teal-500"
                    />{" "}
                    Secure Patient Token (UID)
                  </span>
                  <p className="text-sm font-mono font-medium text-zinc-500 dark:text-zinc-400 break-all select-all">
                    {session.user.id}
                  </p>
                </div>
              </div>

              {/* Action Update Profile Trigger */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-end">
                {/* <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold uppercase tracking-widest text-xs py-3 px-6 transition-all shadow-sm rounded-none cursor-pointer active:scale-98">
                  Update Profile Information{" "}
                  <PersonPencil className="w-6 h-6 ml-2 inline " />
                </button> */}
                <EditProfileModal user={currentUser} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
