"use client";

import { useState } from "react";
import {
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ChevronDown,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Tutor {
  userId?: string;
  user?: { name?: string };
  hourlyRate?: number;
}
interface Category {
  id: string;
  title: string;
  description?: string;
}

export default function TutorBookingTab({
  tutor,
  categories,
}: {
  tutor: Tutor;
  categories: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCat = categories.find((c) => c.id === selectedCategory);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Check login first
    try {
      const sessionRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/get-session`,
        { credentials: "include" },
      );

      const session = await sessionRes.json();

      if (!session?.user) {
        toast.error("Please login first", {
          description: "You must login to book a session.",
        });

        return;
      }
    } catch {
      toast.error("Please login first");
      return;
    }

    // Normal validation
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    if (!bookingDate) {
      toast.error("Please choose a date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tutorId: tutor?.userId,
            categoryId: selectedCategory,
            date: new Date(bookingDate).toISOString(),
            message: message || undefined,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed");

      toast.success("Booking request sent!", {
        description: `Your session with ${tutor?.user?.name || "the tutor"} has been requested.`,
      });

      setSelectedCategory("");
      setBookingDate("");
      setMessage("");
    } catch {
      toast.error("Booking failed", { description: "Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* ── Form (2/3) ── */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 border-b border-zinc-50 pb-5">
            <h2 className="text-[20px] font-black tracking-tight text-zinc-900">
              Book a Session
            </h2>
            <p className="mt-0.5 text-[13px] text-zinc-400">
              Schedule with {tutor?.user?.name || "this tutor"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <BookOpen size={10} /> Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                  className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pr-10 text-[13px] text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
                >
                  <option value="">Choose a category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <Calendar size={10} /> Preferred Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-[13px] text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Message{" "}
                <span className="normal-case tracking-normal font-normal text-zinc-300">
                  — optional
                </span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the tutor your goals, current level, or what you'd like to focus on..."
                rows={4}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
              />
            </div>

            {/* Price preview — shows when category is selected */}
            {selectedCat && (
              <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
                <div>
                  <p className="text-[11px] text-emerald-600 font-semibold uppercase tracking-wider">
                    Estimated Cost
                  </p>
                  <p className="mt-0.5 text-[14px] font-bold text-zinc-800">
                    {selectedCat.title}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[28px] font-black text-emerald-600 leading-none">
                    ${tutor?.hourlyRate ?? 0}
                  </div>
                  <div className="text-[11px] text-zinc-400">/hour</div>
                </div>
              </div>
            )}

            {/* Submit — emerald */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-[14px] font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 disabled:opacity-60 transition"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send size={15} />
              )}
              {isSubmitting ? "Sending..." : "Send Booking Request"}
            </button>
          </form>
        </div>
      </div>

      {/* ── Sidebar (1/3) ── */}
      <div className="space-y-5">
        {/* Booking info */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-[13px] font-bold text-zinc-800">
            Booking Info
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: DollarSign,
                label: "Flexible Pricing",
                desc: `$${tutor?.hourlyRate ?? 0}/hr. Discounts for bulk sessions.`,
                accent: "emerald",
              },
              {
                icon: CheckCircle2,
                label: "Quick Response",
                desc: "Tutors typically respond within 2 hours.",
                accent: "emerald",
              },
              {
                icon: Calendar,
                label: "Free Cancellation",
                desc: "Cancel up to 24 hours before session.",
                accent: "yellow",
              },
            ].map(({ icon: Icon, label, desc, accent }) => (
              <div key={label} className="flex gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    accent === "emerald"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-yellow-50 text-yellow-600",
                  )}
                >
                  <Icon size={14} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-zinc-700">
                    {label}
                  </p>
                  <p className="text-[11px] text-zinc-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-[13px] font-bold text-zinc-800">
            How It Works
          </h3>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Submit Request",
                desc: "Fill out the booking form",
                accent: "emerald",
              },
              {
                step: 2,
                title: "Get Confirmed",
                desc: "Tutor reviews and accepts",
                accent: "yellow",
              },
              {
                step: 3,
                title: "Start Learning",
                desc: "Join session and achieve goals",
                accent: "emerald",
              },
            ].map(({ step, title, desc, accent }) => (
              <div key={step} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-black",
                    accent === "emerald"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700",
                  )}
                >
                  {step}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-zinc-700">
                    {title}
                  </p>
                  <p className="text-[11px] text-zinc-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note — yellow */}
        <div className="flex gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-yellow-600" />
          <div>
            <p className="text-[12px] font-semibold text-yellow-800">Note</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-yellow-700">
              Payment is only required after the tutor confirms your session
              request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
