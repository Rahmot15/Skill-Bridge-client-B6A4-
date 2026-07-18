"use client";

import { useState, useEffect } from "react";
import {
  Clock, Plus, Trash2, Save, CheckCircle2, AlertCircle,
  Star, Users, BookOpen, DollarSign, GraduationCap,
  Globe, Mail, Calendar, Briefcase, CheckCircle, XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeSlot = {
  day: string;
  from: string;
  to: string;
};

type Tutor = {
  id: string;
  userId: string;
  title: string;
  bio: string;
  education: string;
  experienceYears: number;
  hourlyRate: number;
  availability: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  completedSessions: number;
  languages: string[];
  verified: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string;
    role: string;
    createdAt: string;
  };
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_OPTIONS = [
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00",
];

function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hr = parseInt(h);
  const ampm = hr >= 12 ? "PM" : "AM";
  const h12 = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
  return `${h12}:${m} ${ampm}`;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent?: "emerald" | "yellow";
}) {
  return (
    <div className={cn(
      "rounded-2xl border p-4 flex flex-col gap-2",
      accent === "emerald" ? "bg-emerald-50 border-emerald-100" :
      accent === "yellow"  ? "bg-yellow-50 border-yellow-100" :
      "bg-white border-zinc-100"
    )}>
      <div className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl",
        accent === "emerald" ? "bg-emerald-100 text-emerald-600" :
        accent === "yellow"  ? "bg-yellow-100 text-yellow-600" :
        "bg-zinc-100 text-zinc-500"
      )}>
        <Icon size={16} />
      </div>
      <div>
        <div className={cn(
          "text-[22px] font-bold leading-none",
          accent === "emerald" ? "text-emerald-700" :
          accent === "yellow"  ? "text-yellow-700" :
          "text-zinc-800"
        )}>
          {value}
        </div>
        <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({ icon: Icon, label, value }: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
          <Icon size={13} />
        </span>
        <span className="text-[13px] text-zinc-400">{label}</span>
      </div>
      <span className="text-[13px] font-semibold text-zinc-700">{value}</span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TutorAvailability({ tutor }: { tutor: Tutor }) {
  // Parse existing time slots from JSON availability string
  const existingSlots: TimeSlot[] = (() => {
    try {
      const parsed = JSON.parse(tutor.availability || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(existingSlots);
  const [legacyText, setLegacyText] = useState(() => {
    try {
      const parsed = JSON.parse(tutor.availability || "[]");
      return Array.isArray(parsed) ? "" : tutor.availability || "";
    } catch {
      return tutor.availability || "";
    }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const initials = tutor.user.name
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  function addSlot(day: string) {
    setTimeSlots((prev) => [...prev, { day, from: "09:00", to: "17:00" }]);
  }

  function removeSlot(index: number) {
    setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSlot(index: number, field: keyof TimeSlot, value: string) {
    setTimeSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  async function handleSave() {
    setLoading(true);
    setSuccess(false);
    setError(false);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/tutors/availability`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            availability: timeSlots.length > 0 ? JSON.stringify(timeSlots) : legacyText,
            timeSlots,
          }),
        }
      );
      const data = await res.json();
      if (data?.success) setSuccess(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  // Group slots by day
  const slotsByDay = DAYS.reduce((acc, day) => {
    acc[day] = timeSlots
      .map((s, i) => ({ ...s, index: i }))
      .filter((s) => s.day === day);
    return acc;
  }, {} as Record<string, (TimeSlot & { index: number })[]>);

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">

        {/* ── Page header ── */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-yellow-600">
            Tutor Portal
          </p>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
            My Dashboard
          </h1>
        </div>

        {/* ── Profile hero ── */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
          <div className="h-1.5 w-full bg-gradient-to-r from-yellow-300 to-yellow-500" />
          <div className="p-6 flex items-center gap-5">
            <div className="relative shrink-0">
              {tutor.user.image ? (
                <img src={tutor.user.image} alt={tutor.user.name}
                  className="h-20 w-20 rounded-2xl object-cover ring-2 ring-yellow-100" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-xl font-bold text-zinc-800">
                  {initials}
                </div>
              )}
              <div className={cn(
                "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white",
                tutor.verified ? "bg-emerald-400" : "bg-zinc-300"
              )}>
                {tutor.verified
                  ? <CheckCircle size={12} className="text-white" />
                  : <XCircle size={12} className="text-white" />
                }
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-[20px] font-bold text-zinc-900 capitalize">{tutor.user.name}</h2>
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold",
                  tutor.verified ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200"
                )}>
                  {tutor.verified ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                  {tutor.verified ? "Verified" : "Unverified"}
                </span>
                <span className="inline-flex items-center rounded-lg bg-yellow-50 px-2.5 py-1 text-[11px] font-semibold text-yellow-700 ring-1 ring-yellow-200">
                  Tutor
                </span>
              </div>
              <p className="mt-0.5 text-[13px] font-medium text-zinc-500">{tutor.title}</p>
              <p className="mt-0.5 text-[12px] text-zinc-400">{tutor.user.email}</p>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Star} label="Rating" value={tutor.rating || "—"} accent="yellow" />
          <StatCard icon={Users} label="Students" value={tutor.totalStudents} accent="emerald" />
          <StatCard icon={BookOpen} label="Sessions" value={tutor.completedSessions} />
          <StatCard icon={DollarSign} label="Hourly Rate" value={`$${tutor.hourlyRate}`} accent="yellow" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ── Profile details ── */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-50">
                <Briefcase size={13} className="text-yellow-600" />
              </div>
              <h3 className="text-[13px] font-bold text-zinc-800">Profile Details</h3>
            </div>
            <div className="divide-y divide-zinc-50">
              <InfoRow icon={GraduationCap} label="Education" value={tutor.education} />
              <InfoRow icon={Briefcase} label="Experience" value={`${tutor.experienceYears} years`} />
              <InfoRow icon={Star} label="Reviews" value={tutor.totalReviews} />
              <InfoRow icon={Mail} label="Email" value={tutor.user.email} />
              <InfoRow icon={Calendar} label="Member since"
                value={new Date(tutor.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} />
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
                    <Globe size={13} />
                  </span>
                  <span className="text-[13px] text-zinc-400">Languages</span>
                </div>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {tutor.languages.map((lang) => (
                    <span key={lang} className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Availability time slots ── */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <Clock size={13} className="text-emerald-600" />
              </div>
              <h3 className="text-[13px] font-bold text-zinc-800">Availability Schedule</h3>
            </div>

            <div className="space-y-3">
              {DAYS.map((day) => (
                <div key={day} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-zinc-700">{day}</span>
                    <button
                      onClick={() => addSlot(day)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-100 transition"
                    >
                      <Plus size={10} /> Add
                    </button>
                  </div>

                  {slotsByDay[day].length === 0 ? (
                    <p className="text-[11px] text-zinc-300 italic">No slots</p>
                  ) : (
                    <div className="space-y-2">
                      {slotsByDay[day].map((slot) => (
                        <div key={slot.index} className="flex items-center gap-2">
                          <select
                            value={slot.from}
                            onChange={(e) => updateSlot(slot.index, "from", e.target.value)}
                            className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-[12px] text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          >
                            {TIME_OPTIONS.map((t) => (
                              <option key={t} value={t}>{formatTime(t)}</option>
                            ))}
                          </select>
                          <span className="text-[11px] text-zinc-400">to</span>
                          <select
                            value={slot.to}
                            onChange={(e) => updateSlot(slot.index, "to", e.target.value)}
                            className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-[12px] text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          >
                            {TIME_OPTIONS.map((t) => (
                              <option key={t} value={t}>{formatTime(t)}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeSlot(slot.index)}
                            className="ml-auto rounded-lg p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-60 transition"
              >
                <Save size={14} />
                {loading ? "Saving..." : "Save Schedule"}
              </button>

              {success && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
                  <CheckCircle2 size={14} /> Saved!
                </span>
              )}
              {error && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-red-500">
                  <AlertCircle size={14} /> Failed. Try again.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
