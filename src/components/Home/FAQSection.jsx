"use client";

import { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

export default function FAQSection() {
  // Track which accordion item is currently expanded (null means all closed)
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqData = [
    {
      id: "1",
      question: "How do I reschedule or cancel an appointment?",
      answer:
        "You can easily manage your active bookings directly from your personal dashboard. Navigate to the 'Appointments' tab, where you will find options to either select a new date and time slot using the 'Reschedule' modal or cancel the session completely.",
    },
    {
      id: "2",
      question: "Is there a penalty or fee for cancelling an appointment?",
      answer:
        "No, there are no structural penalties or hidden fees for cancelling or moving a slot. However, we highly recommend updating your schedule at least 2 hours prior to your preferred slot out of courtesy to the medical consultant.",
    },
    {
      id: "3",
      question: "What happens if a doctor cancels my requested slot?",
      answer:
        "If a specialist needs to cancel an appointment due to an emergency or routing shift, you will receive an immediate notification alert on your dashboard, and your booking status will change to 'cancelled'. You can then request a new slot immediately.",
    },
    {
      id: "4",
      question: "Can I update my contact number after booking a session?",
      answer:
        "Yes. When you open the 'Reschedule' modal on any active dashboard card, the phone number field remains fully editable. Updating your contact mobile number there ensures the consultant can reach you effortlessly.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
      {/* ==================== STRUCTURAL HEADER SECTION ==================== */}
      <div className="flex items-center space-x-3 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-5 text-left">
        <div className="p-2.5 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900/40 rounded-none">
          <HiOutlineQuestionMarkCircle size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
            Frequently Asked <span className="text-teal-500">Questions</span>
          </h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 font-light">
            Everything you need to know about managing your consultation logs
            and platform schedules.
          </p>
        </div>
      </div>

      {/* ==================== CUSTOM ACCORDION MATRIX ==================== */}
      <div className="flex flex-col gap-y-4 w-full">
        {faqData.map((item) => {
          const isOpen = activeId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-zinc-900 border transition-all duration-200 rounded-none overflow-hidden ${
                isOpen
                  ? "border-teal-500 dark:border-teal-500 shadow-md"
                  : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
              }`}
            >
              {/* Clickable Header Trigger Row */}
              <button
                onClick={() => toggleAccordion(item.id)}
                type="button"
                aria-expanded={isOpen}
                className="w-full py-4 px-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group select-none"
              >
                <span
                  className={`text-sm font-bold tracking-wide transition-colors duration-150 uppercase ${
                    isOpen
                      ? "text-teal-500"
                      : "text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white"
                  }`}
                >
                  {item.question}
                </span>

                {/* Micro-Interaction Icon Indicator Toggle */}
                <div
                  className={`p-1 shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "text-teal-500 rotate-180"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {isOpen ? <HiMinus size={16} /> : <HiPlus size={16} />}
                </div>
              </button>

              {/* Collapsible Panel Content Wrapper Area */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "max-h-[500px] border-t border-zinc-100 dark:border-zinc-800/60"
                    : "max-h-0"
                }`}
              >
                <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light p-5 bg-zinc-50/20 dark:bg-zinc-950/10 text-left">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
