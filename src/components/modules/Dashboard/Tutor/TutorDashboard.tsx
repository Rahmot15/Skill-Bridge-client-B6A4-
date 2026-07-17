"use client";

import {
  Users, Star, BookOpen, Calendar,
  Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Bar, BarChart, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tutor = {
  totalStudents: number;
  completedSessions: number;
  rating: number;
  totalReviews: number;
};

type Booking = {
  id: string;
  date: string;
  status: string;
  createdAt: string;
  student: { name: string; email: string };
  category: { title: string };
};

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string; dot: string }> = {
  PENDING:  { label: "Pending",  icon: Clock,         cls: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",  dot: "bg-yellow-400"  },
  ACCEPTED: { label: "Accepted", icon: CheckCircle2,  cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-400" },
  REJECTED: { label: "Rejected", icon: XCircle,       cls: "bg-red-50 text-red-600 ring-1 ring-red-200",           dot: "bg-red-400"     },
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  accent?: "emerald" | "yellow";
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border p-5 shadow-sm",
      accent === "emerald" ? "bg-emerald-50 border-emerald-100" :
      accent === "yellow"  ? "bg-yellow-50 border-yellow-100"  :
      "bg-white border-zinc-100"
    )}>
      <div className="absolute -right-3 -bottom-3 opacity-[0.07]">
        <Icon size={64} />
      </div>
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        accent === "emerald" ? "bg-emerald-100 text-emerald-600" :
        accent === "yellow"  ? "bg-yellow-100 text-yellow-600"  :
        "bg-zinc-100 text-zinc-500"
      )}>
        <Icon size={18} />
      </div>
      <div className="mt-3">
        <div className={cn(
          "text-[28px] font-bold leading-none",
          accent === "emerald" ? "text-emerald-700" :
          accent === "yellow"  ? "text-yellow-700"  :
          "text-zinc-800"
        )}>
          {value}
        </div>
        <div className="mt-1 text-[12px] font-medium text-zinc-400">{label}</div>
      </div>
    </div>
  );
}

// ─── Chart Tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-zinc-100 bg-white px-3 py-2 shadow-lg">
      <p className="text-[11px] font-semibold text-zinc-600">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-[12px] text-zinc-500">
          {entry.name}: <span className="font-semibold text-zinc-800">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Booking Row ──────────────────────────────────────────────────────────────

function BookingRow({ b }: { b: Booking }) {
  const status = statusConfig[b.status] ?? {
    label: b.status,
    icon: AlertCircle,
    cls: "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200",
    dot: "bg-zinc-400",
  };
  const StatusIcon = status.icon;

  const initials = b.student?.name
    ?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

  return (
    <div className="group flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-zinc-50 transition-colors">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[12px] font-bold text-zinc-800">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-zinc-800 truncate">
          {b.student?.name}
        </p>
        <p className="text-[11px] text-zinc-400 truncate">{b.category?.title}</p>
      </div>
      <div className="flex items-center gap-1.5 text-[12px] text-zinc-400 shrink-0">
        <Calendar size={11} />
        {new Date(b.date).toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        })}
      </div>
      <span className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold shrink-0",
        status.cls
      )}>
        <StatusIcon size={10} strokeWidth={2.5} />
        {status.label}
      </span>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyBookings() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
        <BookOpen size={20} className="text-zinc-400" />
      </div>
      <p className="mt-3 text-[13px] font-semibold text-zinc-700">No sessions yet</p>
      <p className="mt-1 text-[12px] text-zinc-400">Bookings from students will appear here.</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TutorDashboard({ tutor, bookings }: {
  tutor: Tutor;
  bookings: Booking[];
}) {
  const pending  = bookings.filter((b) => b.status === "PENDING").length;
  const accepted = bookings.filter((b) => b.status === "ACCEPTED").length;
  const rejected = bookings.filter((b) => b.status === "REJECTED").length;

  // Bar chart — booking statuses
  const statusData = [
    { name: "Pending", count: pending },
    { name: "Accepted", count: accepted },
    { name: "Rejected", count: rejected },
  ];

  // Line chart — bookings over last 6 months
  const now = new Date();
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const month = d.getMonth();
    const year = d.getFullYear();
    const count = bookings.filter((b) => {
      const bd = new Date(b.createdAt || b.date);
      return bd.getMonth() === month && bd.getFullYear() === year;
    }).length;
    return { name: monthLabels[month], bookings: count };
  });

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-yellow-600">
              Tutor Portal
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
              Dashboard
            </h1>
          </div>
          {bookings.length > 0 && (
            <div className="flex items-center gap-2">
              {pending > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-[12px] font-semibold text-yellow-700">
                  <Clock size={12} />
                  {pending} Pending
                </span>
              )}
              {accepted > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                  <CheckCircle2 size={12} />
                  {accepted} Accepted
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Users}    label="Total Students"     value={tutor.totalStudents}    accent="emerald" />
          <StatCard icon={BookOpen} label="Completed Sessions" value={tutor.completedSessions} />
          <StatCard icon={Star}     label="Rating"             value={tutor.rating || "—"}    accent="yellow" />
          <StatCard icon={TrendingUp} label="Total Reviews"    value={tutor.totalReviews} />
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Bar Chart — Booking Statuses */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-zinc-800">Booking Status</h2>
              <span className="text-[12px] text-zinc-400">{bookings.length} total</span>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} barSize={32}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#a1a1aa" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#a1a1aa" }}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" name="Bookings" radius={[6, 6, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === "Pending" ? "#facc15" : entry.name === "Accepted" ? "#34d399" : "#f87171"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart — Bookings Over Time */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-zinc-800">Bookings Trend</h2>
              <span className="text-[12px] text-zinc-400">Last 6 months</span>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#a1a1aa" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#a1a1aa" }}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    name="Bookings"
                    stroke="#eab308"
                    strokeWidth={2.5}
                    dot={{ fill: "#eab308", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ── Sessions table ── */}
        <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-50 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <Calendar size={13} className="text-emerald-600" />
              </div>
              <h2 className="text-[13px] font-bold text-zinc-800">Upcoming Sessions</h2>
            </div>
            {bookings.length > 0 && (
              <span className="text-[12px] text-zinc-400">{bookings.length} total</span>
            )}
          </div>
          <div className="px-3 py-2">
            {bookings.length === 0 ? (
              <EmptyBookings />
            ) : (
              <div className="divide-y divide-zinc-50">
                {bookings.slice(0, 8).map((b) => (
                  <BookingRow key={b.id} b={b} />
                ))}
              </div>
            )}
          </div>
          {bookings.length > 8 && (
            <div className="border-t border-zinc-50 px-5 py-3">
              <button className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition">
                View all {bookings.length} sessions →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
