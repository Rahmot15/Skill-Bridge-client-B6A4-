"use client";

import { Users, GraduationCap, BookOpen, Layers, ShieldCheck, TrendingUp, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

// ─── Type ─────────────────────────────────────────────────────────────────────

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type Booking = {
  id: string;
  status: string;
  createdAt: string;
  student: { name: string };
  tutor: { name: string };
  category: { title: string };
};

type Category = {
  id: string;
  title: string;
};

// ─── Chart Config ─────────────────────────────────────────────────────────────

const roleChartConfig = {
  students: {
    label: "Students",
    color: "var(--chart-2)",
  },
  tutors: {
    label: "Tutors",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const bookingChartConfig = {
  pending: {
    label: "Pending",
    color: "var(--chart-4)",
  },
  approved: {
    label: "Approved",
    color: "var(--chart-2)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent, note }: {
  icon: React.ElementType;
  label: string;
  value: number;
  accent?: "emerald" | "yellow" | "zinc";
  note?: string;
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
        {note && (
          <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-white/60 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
            <TrendingUp size={9} />
            {note}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Quick action button ──────────────────────────────────────────────────────

function QuickAction({ icon: Icon, label, href, accent }: {
  icon: React.ElementType;
  label: string;
  href: string;
  accent?: "emerald" | "yellow";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md",
        accent === "emerald" ? "border-emerald-100 bg-emerald-50 hover:border-emerald-200" :
        accent === "yellow"  ? "border-yellow-100  bg-yellow-50  hover:border-yellow-200"  :
        "border-zinc-100 bg-white hover:border-zinc-200"
      )}
    >
      <div className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
        accent === "emerald" ? "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200" :
        accent === "yellow"  ? "bg-yellow-100  text-yellow-600  group-hover:bg-yellow-200"  :
        "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"
      )}>
        <Icon size={16} />
      </div>
      <span className="text-[13px] font-semibold text-zinc-700">{label}</span>
      <span className="ml-auto text-zinc-300 transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard({ users, bookings, categories }: {
  users: User[];
  bookings: Booking[];
  categories: Category[];
}) {
  const totalUsers = users.length;
  const totalTutors = users.filter((u) => u.role === "TUTOR").length;
  const totalStudents = users.filter((u) => u.role === "STUDENT").length;
  const totalBookings = bookings.length;
  const totalCategories = categories.length;

  const tutorPct = totalUsers > 0 ? Math.round((totalTutors / totalUsers) * 100) : 0;
  const studentPct = totalUsers > 0 ? Math.round((totalStudents / totalUsers) * 100) : 0;

  // Pie chart data — user roles
  const roleData = [
    { name: "Students", value: totalStudents, fill: "var(--color-students)" },
    { name: "Tutors", value: totalTutors, fill: "var(--color-tutors)" },
  ];

  // Bar chart data — booking statuses
  const bookingStatusData = [
    { name: "Pending", count: bookings.filter((b) => b.status === "PENDING").length, fill: "var(--color-pending)" },
    { name: "Approved", count: bookings.filter((b) => b.status === "APPROVED").length, fill: "var(--color-approved)" },
    { name: "Rejected", count: bookings.filter((b) => b.status === "REJECTED").length, fill: "var(--color-rejected)" },
  ];

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
              Dashboard
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm">
            <ShieldCheck size={13} className="text-emerald-500" />
            Admin
          </span>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard icon={Users}         label="Total Users"   value={totalUsers}      accent="emerald" />
          <StatCard icon={GraduationCap} label="Students"      value={totalStudents}   accent="emerald"
            note={`${studentPct}% of users`} />
          <StatCard icon={UserCheck}     label="Tutors"        value={totalTutors}     accent="yellow"
            note={`${tutorPct}% of users`} />
          <StatCard icon={BookOpen}      label="Bookings"      value={totalBookings} />
          <StatCard icon={Layers}        label="Categories"    value={totalCategories} />
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Pie Chart — User Roles */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-zinc-800">User Distribution</h2>
              <span className="text-[12px] text-zinc-400">{totalUsers} total</span>
            </div>
            <div className="flex items-center gap-6">
              <ChartContainer config={roleChartConfig} className="h-[200px] w-[200px]">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-students)]" />
                  <div>
                    <p className="text-[12px] font-semibold text-zinc-700">Students</p>
                    <p className="text-[11px] text-zinc-400">{totalStudents} users</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-tutors)]" />
                  <div>
                    <p className="text-[12px] font-semibold text-zinc-700">Tutors</p>
                    <p className="text-[11px] text-zinc-400">{totalTutors} users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart — Booking Statuses */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-zinc-800">Bookings by Status</h2>
              <span className="text-[12px] text-zinc-400">{totalBookings} total</span>
            </div>
            <ChartContainer config={bookingChartConfig} className="h-[200px] w-full">
              <BarChart data={bookingStatusData} barSize={32}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>

        </div>

        {/* ── User breakdown bar ── */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-zinc-800">User Breakdown</h2>
            <span className="text-[12px] text-zinc-400">{totalUsers} total</span>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${studentPct}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 transition-all duration-500"
              style={{ width: `${tutorPct}%` }}
            />
          </div>
          <div className="mt-3 flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-[12px] text-zinc-500">
                Students <span className="font-semibold text-zinc-700">{totalStudents}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="text-[12px] text-zinc-500">
                Tutors <span className="font-semibold text-zinc-700">{totalTutors}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Quick actions ── */}
        <div>
          <h2 className="mb-3 text-[13px] font-bold text-zinc-800">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickAction icon={Users}         label="Manage Users"      href="/admin-dashboard/users"      accent="emerald" />
            <QuickAction icon={BookOpen}      label="All Bookings"      href="/admin-dashboard/bookings"   accent="emerald" />
            <QuickAction icon={Layers}        label="Categories"        href="/admin-dashboard/categories" accent="yellow" />
            <QuickAction icon={ShieldCheck}   label="Moderation"        href="/admin-dashboard/moderation" />
          </div>
        </div>

      </div>
    </div>
  );
}
