"use client";

import { useState, useEffect } from "react";
import {
  BookOpen, Clock, CheckCircle2, XCircle,
  Calendar, Mail, GraduationCap, UserCheck, Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

// ─── Type ─────────────────────────────────────────────────────────────────────

type Booking = {
  id: string;
  date: string;
  status: string;
  message: string;
  student: { name: string; email: string };
  tutor:   { name: string; email: string };
  category: { title: string };
};

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<string, { icon: React.ElementType; cls: string; dot: string }> = {
  PENDING:  { icon: Clock,        cls: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",  dot: "bg-yellow-400"  },
  ACCEPTED: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-400" },
  REJECTED: { icon: XCircle,      cls: "bg-red-50 text-red-600 ring-1 ring-red-200",           dot: "bg-red-400"     },
};

const FILTERS = ["ALL", "PENDING", "ACCEPTED", "REJECTED"] as const;
type Filter = typeof FILTERS[number];

// ─── Avatar initials ──────────────────────────────────────────────────────────

function Avatar({ name, variant }: { name: string; variant: "student" | "tutor" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className={cn(
      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold",
      variant === "student"
        ? "bg-gradient-to-br from-emerald-300 to-emerald-400 text-white"
        : "bg-gradient-to-br from-yellow-300 to-yellow-400 text-zinc-800"
    )}>
      {initials}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminBookings({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  const filtered = bookings.filter((b) => {
    const matchStatus = filter === "ALL" || b.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      b.student.name.toLowerCase().includes(q) ||
      b.tutor.name.toLowerCase().includes(q)   ||
      b.category.title.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    ALL:      bookings.length,
    PENDING:  bookings.filter((b) => b.status === "PENDING").length,
    ACCEPTED: bookings.filter((b) => b.status === "ACCEPTED").length,
    REJECTED: bookings.filter((b) => b.status === "REJECTED").length,
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedBookings = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Admin Panel
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
              Manage Bookings
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm">
            <BookOpen size={13} className="text-emerald-500" />
            {bookings.length} total
          </span>
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, tutor or category..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-4 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
                  filter === f
                    ? f === "PENDING"  ? "bg-yellow-400 text-zinc-900 shadow-sm"
                    : f === "ACCEPTED" ? "bg-emerald-500 text-white shadow-sm"
                    : f === "REJECTED" ? "bg-red-500 text-white shadow-sm"
                    : "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {f === "ALL" ? `All (${counts.ALL})` : `${f[0] + f.slice(1).toLowerCase()} (${counts[f]})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">

          {/* Head */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] gap-4 border-b border-zinc-100 bg-zinc-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <span className="flex items-center gap-1.5"><GraduationCap size={11} /> Student</span>
            <span className="flex items-center gap-1.5"><UserCheck size={11} /> Tutor</span>
            <span className="flex items-center gap-1.5"><BookOpen size={11} /> Category</span>
            <span className="flex items-center gap-1.5"><Calendar size={11} /> Date</span>
            <span>Status</span>
          </div>

          {/* Body */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                <BookOpen size={20} className="text-zinc-400" />
              </div>
              <p className="mt-3 text-[13px] font-semibold text-zinc-700">No bookings found</p>
              <p className="mt-1 text-[12px] text-zinc-400">Try changing your search or filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-50">
              {paginatedBookings.map((b) => {
                const status    = statusConfig[b.status] ?? statusConfig.PENDING;
                const StatusIcon = status.icon;

                return (
                  <div
                    key={b.id}
                    className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] items-center gap-4 px-5 py-3.5 hover:bg-zinc-50/80 transition-colors"
                  >
                    {/* Student — emerald avatar */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar name={b.student.name} variant="student" />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-zinc-800">{b.student.name}</p>
                        <p className="truncate text-[11px] text-zinc-400 flex items-center gap-1">
                          <Mail size={9} />{b.student.email}
                        </p>
                      </div>
                    </div>

                    {/* Tutor — yellow avatar */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar name={b.tutor.name} variant="tutor" />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-zinc-800">{b.tutor.name}</p>
                        <p className="truncate text-[11px] text-zinc-400 flex items-center gap-1">
                          <Mail size={9} />{b.tutor.email}
                        </p>
                      </div>
                    </div>

                    {/* Category */}
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1 text-[12px] font-medium text-zinc-600">
                      <BookOpen size={10} />
                      {b.category.title}
                    </span>

                    {/* Date */}
                    <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                      <Calendar size={11} className="text-zinc-300" />
                      {new Date(b.date).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </span>

                    {/* Status */}
                    <span className={cn(
                      "inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold",
                      status.cls
                    )}>
                      <StatusIcon size={10} strokeWidth={2.5} />
                      {b.status[0] + b.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-zinc-50 px-5 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-zinc-400">
                Showing {paginatedBookings.length} of {filtered.length} bookings
                {filter !== "ALL" && ` · ${filter}`}
                {search && ` · "${search}"`}
              </p>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
