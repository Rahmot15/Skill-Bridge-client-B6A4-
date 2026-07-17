"use client";

import {
  BookOpen, CheckCircle2, Clock, Calendar,
  GraduationCap, TrendingUp, UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── Type ─────────────────────────────────────────────────────────────────────

type Booking = {
  id: string;
  date: string;
  status: string;
  tutor: { name: string; image: string };
  category: { title: string };
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: number;
  accent?: "emerald" | "yellow";
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border p-5 shadow-sm",
      accent === "emerald" ? "bg-emerald-50 border-emerald-100" :
      accent === "yellow"  ? "bg-yellow-50  border-yellow-100"  :
      "bg-white border-zinc-100"
    )}>
      <div className="absolute -right-3 -bottom-3 opacity-[0.06]">
        <Icon size={72} />
      </div>
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        accent === "emerald" ? "bg-emerald-100 text-emerald-600" :
        accent === "yellow"  ? "bg-yellow-100  text-yellow-600"  :
        "bg-zinc-100 text-zinc-500"
      )}>
        <Icon size={18} />
      </div>
      <div className="mt-3">
        <div className={cn(
          "text-[30px] font-bold leading-none",
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

// ─── Session Row ──────────────────────────────────────────────────────────────

function SessionRow({ b }: { b: Booking }) {
  const initials = b.tutor.name
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const daysLeft = Math.ceil(
    (new Date(b.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="group flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-zinc-50 transition-colors">
      <div className="relative shrink-0">
        {b.tutor.image ? (
          <img
            src={b.tutor.image}
            alt={b.tutor.name}
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-yellow-100"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[12px] font-bold text-zinc-800">
            {initials}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-zinc-800 truncate">{b.tutor.name}</p>
        <p className="text-[11px] text-zinc-400 flex items-center gap-1 truncate">
          <BookOpen size={10} />{b.category.title}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
          <Calendar size={11} className="text-zinc-300" />
          {new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
        <span className={cn(
          "rounded-md px-2 py-0.5 text-[10px] font-semibold",
          daysLeft <= 2
            ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200"
            : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
        )}>
          {daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft}d left`}
        </span>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyUpcoming() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
        <GraduationCap size={20} className="text-emerald-500" />
      </div>
      <p className="mt-3 text-[13px] font-semibold text-zinc-700">No upcoming sessions</p>
      <p className="mt-1 text-[12px] text-zinc-400">Book a session with a tutor to get started.</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function StudentDashboard({ bookings }: { bookings: Booking[] }) {
  const total    = bookings.length;
  const accepted = bookings.filter((b) => b.status === "ACCEPTED").length;
  const pending  = bookings.filter((b) => b.status === "PENDING").length;
  const rejected = bookings.filter((b) => b.status === "REJECTED").length;

  const upcoming = bookings
    .filter((b) => new Date(b.date) >= new Date() && b.status === "ACCEPTED")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Pie chart — booking statuses
  const statusPieData = [
    { name: "Accepted", value: accepted, fill: "#34d399" },
    { name: "Pending", value: pending, fill: "#facc15" },
    { name: "Rejected", value: rejected, fill: "#f87171" },
  ].filter((d) => d.value > 0);

  // Bar chart — bookings by category
  const categoryMap = new Map<string, number>();
  bookings.forEach((b) => {
    const cat = b.category?.title || "Unknown";
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });
  const categoryData = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
              Student Portal
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
              Dashboard
            </h1>
          </div>
          {upcoming.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
              <CheckCircle2 size={13} />
              {upcoming.length} upcoming session{upcoming.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={BookOpen}     label="Total Bookings"    value={total} />
          <StatCard icon={UserCheck}    label="Accepted Sessions" value={accepted} accent="emerald" />
          <StatCard icon={Clock}        label="Pending Requests"  value={pending}  accent="yellow" />
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Pie Chart — Booking Status */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-zinc-800">My Bookings</h2>
              <span className="text-[12px] text-zinc-400">{total} total</span>
            </div>
            {statusPieData.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="h-[200px] w-[200px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {statusPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3">
                  {statusPieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <div>
                        <p className="text-[12px] font-semibold text-zinc-700">{item.name}</p>
                        <p className="text-[11px] text-zinc-400">{item.value} bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-[12px] text-zinc-400">No bookings yet</p>
              </div>
            )}
          </div>

          {/* Bar Chart — Bookings by Category */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-zinc-800">By Category</h2>
              <span className="text-[12px] text-zinc-400">{categoryData.length} categories</span>
            </div>
            {categoryData.length > 0 ? (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} barSize={32}>
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
                    <Bar dataKey="count" name="Bookings" radius={[6, 6, 0, 0]} fill="#34d399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-[12px] text-zinc-400">No data available</p>
              </div>
            )}
          </div>

        </div>

        {/* ── Upcoming sessions ── */}
        <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-50 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <TrendingUp size={13} className="text-emerald-600" />
              </div>
              <h2 className="text-[13px] font-bold text-zinc-800">Upcoming Sessions</h2>
            </div>
            {upcoming.length > 0 && (
              <span className="text-[12px] text-zinc-400">{upcoming.length} session{upcoming.length !== 1 ? "s" : ""}</span>
            )}
          </div>
          <div className="px-3 py-2">
            {upcoming.length === 0 ? (
              <EmptyUpcoming />
            ) : (
              <div className="divide-y divide-zinc-50">
                {upcoming.map((b) => (
                  <SessionRow key={b.id} b={b} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
