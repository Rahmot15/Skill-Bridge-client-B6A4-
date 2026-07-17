"use client";

import { useState } from "react";
import {
  Clock, CheckCircle2, XCircle, Calendar,
  BookOpen, MessageSquare, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Booking = {
  id: string;
  date: string;
  status: string;
  message?: string;
  createdAt: string;
  student: { id: string; name: string; email: string; image?: string | null };
  category: { id: string; title: string };
};

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string; dot: string }> = {
  PENDING:  { label: "Pending",  icon: Clock,        cls: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",  dot: "bg-yellow-400"  },
  APPROVED: { label: "Approved", icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-400" },
  REJECTED: { label: "Rejected", icon: XCircle,      cls: "bg-red-50 text-red-600 ring-1 ring-red-200",           dot: "bg-red-400"     },
};

export default function TutorBookings({ bookings: initial }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initial);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatus(id: string, status: "APPROVED" | "REJECTED") {
    setLoadingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );

      toast.success(status === "APPROVED" ? "Booking approved!" : "Booking rejected", {
        description: status === "APPROVED"
          ? "The student has been notified."
          : "The student has been notified.",
      });
    } catch {
      toast.error("Failed to update booking", { description: "Please try again." });
    } finally {
      setLoadingId(null);
    }
  }

  const pending = bookings.filter((b) => b.status === "PENDING");
  const processed = bookings.filter((b) => b.status !== "PENDING");

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-yellow-600">
            Tutor Portal
          </p>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
            Manage Bookings
          </h1>
          <p className="mt-1 text-[13px] text-zinc-400">
            {pending.length} pending request{pending.length !== 1 ? "s" : ""} awaiting your response
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex gap-3">
          {[
            { label: "Total", count: bookings.length, cls: "bg-zinc-100 text-zinc-600" },
            { label: "Pending", count: pending.length, cls: "bg-yellow-50 text-yellow-700" },
            { label: "Approved", count: bookings.filter((b) => b.status === "APPROVED").length, cls: "bg-emerald-50 text-emerald-700" },
            { label: "Rejected", count: bookings.filter((b) => b.status === "REJECTED").length, cls: "bg-red-50 text-red-600" },
          ].map(({ label, count, cls }) => (
            <span key={label} className={cn("inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold", cls)}>
              {count} {label}
            </span>
          ))}
        </div>

        {/* Pending bookings */}
        {pending.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-50">
                <Clock size={13} className="text-yellow-600" />
              </div>
              <h2 className="text-[14px] font-bold text-zinc-800">Pending Requests</h2>
            </div>
            {pending.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                isLoading={loadingId === b.id}
                onApprove={() => handleStatus(b.id, "APPROVED")}
                onReject={() => handleStatus(b.id, "REJECTED")}
                showActions
              />
            ))}
          </div>
        )}

        {/* Processed bookings */}
        {processed.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100">
                <Calendar size={13} className="text-zinc-500" />
              </div>
              <h2 className="text-[14px] font-bold text-zinc-800">History</h2>
            </div>
            {processed.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100">
              <BookOpen size={22} className="text-zinc-400" />
            </div>
            <p className="mt-4 text-[14px] font-semibold text-zinc-700">No bookings yet</p>
            <p className="mt-1 text-[12px] text-zinc-400">Booking requests from students will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Booking Card ──────────────────────────────────────────────────────────────

function BookingCard({
  booking,
  isLoading,
  onApprove,
  onReject,
  showActions,
}: {
  booking: Booking;
  isLoading?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}) {
  const status = statusConfig[booking.status] ?? {
    label: booking.status,
    icon: AlertCircle,
    cls: "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200",
    dot: "bg-zinc-400",
  };
  const StatusIcon = status.icon;

  const initials = booking.student?.name
    ?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Student avatar */}
        <div className="relative shrink-0">
          {booking.student?.image ? (
            <img
              src={booking.student.image}
              alt={booking.student.name}
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-100"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-400 text-[14px] font-bold text-white">
              {initials}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[14px] font-bold text-zinc-800">{booking.student?.name}</p>
              <p className="text-[12px] text-zinc-400">{booking.student?.email}</p>
            </div>
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold shrink-0",
              status.cls
            )}>
              <StatusIcon size={10} strokeWidth={2.5} />
              {status.label}
            </span>
          </div>

          {/* Details row */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <BookOpen size={11} />
              {booking.category?.title}
            </span>
            {booking.date && (
              <span className="inline-flex items-center gap-1">
                <Calendar size={11} />
                {new Date(booking.date).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Message */}
          {booking.message && (
            <div className="mt-3 rounded-xl bg-zinc-50 px-4 py-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 mb-1">
                <MessageSquare size={10} />
                Message
              </div>
              <p className="text-[12px] leading-relaxed text-zinc-600">{booking.message}</p>
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onApprove}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm shadow-emerald-100 hover:bg-emerald-700 disabled:opacity-60 transition"
              >
                {isLoading ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <CheckCircle2 size={14} />
                )}
                Approve
              </button>
              <button
                onClick={onReject}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-100 disabled:opacity-60 transition"
              >
                <XCircle size={14} />
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
