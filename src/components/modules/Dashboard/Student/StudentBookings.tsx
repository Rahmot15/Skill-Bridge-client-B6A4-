"use client";

import { useState } from "react";
import { Calendar, BookOpen, Clock, CheckCircle2, XCircle, AlertCircle, GraduationCap, MessageSquare, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewForm from "./ReviewForm";

type Booking = {
  id: string;
  message: string;
  date: string;
  status: string;
  tutor: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
  category: {
    title: string;
  };
};

const statusConfig: Record<string, {
  label: string;
  icon: React.ElementType;
  badge: string;
  dot: string;
  strip: string;
  line: string;
}> = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    badge: "bg-yellow-400/15 text-yellow-700 ring-1 ring-yellow-300",
    dot: "bg-yellow-400 ring-4 ring-yellow-100",
    strip: "from-yellow-300 to-yellow-400",
    line: "border-yellow-200",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    badge: "bg-emerald-400/15 text-emerald-700 ring-1 ring-emerald-300",
    dot: "bg-emerald-500 ring-4 ring-emerald-100",
    strip: "from-emerald-400 to-emerald-500",
    line: "border-emerald-200",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    badge: "bg-red-400/15 text-red-600 ring-1 ring-red-200",
    dot: "bg-red-400 ring-4 ring-red-100",
    strip: "from-red-300 to-red-400",
    line: "border-red-100",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: Ban,
    badge: "bg-zinc-400/15 text-zinc-600 ring-1 ring-zinc-200",
    dot: "bg-zinc-400 ring-4 ring-zinc-100",
    strip: "from-zinc-300 to-zinc-400",
    line: "border-zinc-200",
  },
};

const fallbackStatus = {
  label: "Unknown",
  icon: AlertCircle,
  badge: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200",
  dot: "bg-zinc-400 ring-4 ring-zinc-100",
  strip: "from-zinc-300 to-zinc-400",
  line: "border-zinc-200",
};

function groupByDate(bookings: Booking[]) {
  const groups: Record<string, Booking[]> = {};
  const sorted = [...bookings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  sorted.forEach((b) => {
    const key = new Date(b.date).toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(b);
  });
  return groups;
}

function formatGroupDate(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

function StatsBar({ bookings }: { bookings: Booking[] }) {
  const total     = bookings.length;
  const pending   = bookings.filter((b) => b.status === "PENDING").length;
  const accepted  = bookings.filter((b) => b.status === "ACCEPTED").length;
  const rejected  = bookings.filter((b) => b.status === "REJECTED").length;

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="rounded-xl bg-zinc-100 px-4 py-3">
        <div className="text-xl font-bold text-zinc-800">{total}</div>
        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Total</div>
      </div>
      <div className="rounded-xl bg-yellow-50 ring-1 ring-yellow-200 px-4 py-3">
        <div className="text-xl font-bold text-yellow-700">{pending}</div>
        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-yellow-500">Pending</div>
      </div>
      <div className="rounded-xl bg-emerald-50 ring-1 ring-emerald-200 px-4 py-3">
        <div className="text-xl font-bold text-emerald-700">{accepted}</div>
        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-500">Accepted</div>
      </div>
      <div className="rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3">
        <div className="text-xl font-bold text-red-600">{rejected}</div>
        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-red-400">Rejected</div>
      </div>
    </div>
  );
}

function TimelineCard({ b, isLast }: { b: Booking; isLast: boolean }) {
  const status = statusConfig[b.status] ?? fallbackStatus;
  const StatusIcon = status.icon;
  const [showReview, setShowReview] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  async function handleCancel() {
    setCancelling(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/${b.id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.success) window.location.reload();
    } catch {
      // ignore
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center pt-1.5">
        <div className={cn("h-3 w-3 rounded-full shrink-0", status.dot)} />
        {!isLast && (
          <div className={cn("mt-1.5 w-px flex-1 border-l-2 border-dashed min-h-[48px]", status.line)} />
        )}
      </div>

      <div className="group mb-4 flex-1 overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-200">
        <div className={cn("h-1 w-full bg-gradient-to-r", status.strip)} />

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {b.tutor.image ? (
                <img
                  src={b.tutor.image}
                  alt={b.tutor.name}
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-zinc-100 group-hover:ring-emerald-100 transition-all"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[12px] font-bold text-zinc-800">
                  {b.tutor.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] font-semibold text-zinc-800">{b.tutor.name}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                    <BookOpen size={9} />
                    {b.category.title}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">{b.tutor.email}</span>
              </div>
            </div>

            <span className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold",
              status.badge
            )}>
              <StatusIcon size={10} strokeWidth={2.5} />
              {status.label}
            </span>
          </div>

          <p className="mt-3 rounded-lg bg-zinc-50 px-3 py-2 text-[13px] leading-relaxed text-zinc-600 line-clamp-2">
            {b.message}
          </p>

          {/* Cancel button for pending bookings */}
          {b.status === "PENDING" && (
            <div className="mt-3">
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-[12px] font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-100 disabled:opacity-60 transition"
              >
                <Ban size={11} />
                {cancelling ? "Cancelling..." : "Cancel Booking"}
              </button>
            </div>
          )}

          {/* Review button for accepted bookings */}
          {b.status === "ACCEPTED" && (
            <div className="mt-3">
              {!showReview ? (
                <button
                  onClick={() => setShowReview(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-50 px-3 py-1.5 text-[12px] font-semibold text-yellow-700 ring-1 ring-yellow-200 hover:bg-yellow-100 transition"
                >
                  <MessageSquare size={11} />
                  Leave a Review
                </button>
              ) : (
                <ReviewForm
                  tutorId={b.tutor.id}
                  tutorName={b.tutor.name}
                  bookingId={b.id}
                  onSuccess={() => setShowReview(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-100">
        <GraduationCap size={28} className="text-white" />
      </div>
      <h3 className="mt-5 text-[16px] font-bold text-zinc-800">No sessions booked</h3>
      <p className="mt-1.5 max-w-xs text-[13px] text-zinc-400">
        Book a session with a tutor to get started on your learning journey.
      </p>
    </div>
  );
}

export default function StudentBookings({ bookings }: { bookings: Booking[] }) {
  const groups = groupByDate(bookings);
  const groupKeys = Object.keys(groups);

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
              Student Portal
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
              My Sessions
            </h1>
          </div>
          {bookings.length > 0 && (
            <span className="text-[12px] text-zinc-400">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {bookings.length > 0 && <StatsBar bookings={bookings} />}

        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {groupKeys.map((dateKey) => {
              const items = groups[dateKey];
              return (
                <div key={dateKey}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-lg border border-zinc-100 bg-white px-3 py-1.5 shadow-sm">
                      <Calendar size={11} className="text-emerald-500" />
                      <span className="text-[11px] font-semibold text-zinc-600">
                        {formatGroupDate(dateKey)}
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-zinc-200" />
                  </div>

                  <div>
                    {items.map((b, i) => (
                      <TimelineCard key={b.id} b={b} isLast={i === items.length - 1} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
