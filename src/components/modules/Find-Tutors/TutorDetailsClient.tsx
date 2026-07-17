"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Users,
  BookOpen,
  CheckCircle2,
  XCircle,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TutorDetailsTab from "../tutors/tutor-details-tab";
import TutorReviewsTab from "../tutors/tutor-reviews-tab";
import TutorBookingTab from "../tutors/tutor-booking-tab";
import RelatedTutors from "./RelatedTutors";

const Toaster = dynamic(
  () => import("sonner").then((m) => ({ default: m.Toaster })),
  { ssr: false },
);

const TABS = [
  { key: "details", label: "Details" },
  { key: "reviews", label: "Reviews" },
  { key: "booking", label: "Book Session" },
];

export default function TutorDetailsClient({
  tutor,
  reviews,
  categories,
  allTutors,
}: any) {
  const [tab, setTab] = useState("details");

  if (!tutor)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-400">Tutor not found.</p>
      </div>
    );

  const initials =
    tutor.user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "T";

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-zinc-50">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden bg-white border-b border-zinc-100">
          {/* Subtle emerald top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-yellow-400" />

          <div className="mx-auto max-w-6xl px-6 py-8">
            {/* Back button */}
            <Link
              href="/find-tutors"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-[13px] font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 transition mb-6"
            >
              <ArrowLeft size={14} />
              Back to Tutors
            </Link>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="relative shrink-0">
                {tutor.user?.image ? (
                  <img
                    src={tutor.user.image}
                    alt={tutor.user.name}
                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-emerald-100 shadow-lg"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[24px] font-black text-zinc-800 ring-4 ring-yellow-100 shadow-lg">
                    {initials}
                  </div>
                )}
                {/* Verified */}
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-sm",
                    tutor.verified ? "bg-emerald-400" : "bg-zinc-300",
                  )}
                >
                  {tutor.verified ? (
                    <CheckCircle2 size={14} className="text-white" />
                  ) : (
                    <XCircle size={14} className="text-white" />
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-[24px] font-black tracking-tight text-zinc-900 capitalize">
                    {tutor.user?.name}
                  </h1>
                  {tutor.verified && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[14px] text-zinc-500 font-medium">
                  {tutor.title}
                </p>

                {/* Quick stats row */}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {/* Rating — yellow */}
                  <div className="flex items-center gap-1.5">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-[13px] font-bold text-zinc-800">
                      {tutor.rating > 0 ? tutor.rating.toFixed(1) : "New"}
                    </span>
                    {tutor.totalReviews > 0 && (
                      <span className="text-[12px] text-zinc-400">
                        ({tutor.totalReviews} reviews)
                      </span>
                    )}
                  </div>
                  <div className="h-3 w-px bg-zinc-200" />
                  <div className="flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <Users size={13} />
                    {tutor.totalStudents} students
                  </div>
                  <div className="h-3 w-px bg-zinc-200" />
                  <div className="flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <BookOpen size={13} />
                    {tutor.completedSessions} sessions
                  </div>
                  <div className="h-3 w-px bg-zinc-200" />
                  {/* Price — emerald */}
                  <div className="flex items-center gap-1 text-[15px] font-black text-emerald-600">
                    <DollarSign size={14} />
                    {tutor.hourlyRate}
                    <span className="text-[11px] font-medium text-zinc-400">
                      /hr
                    </span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tutor.languages?.map((lang: string) => (
                    <span
                      key={lang}
                      className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <button
                  onClick={() => setTab("booking")}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-[14px] font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 transition"
                >
                  Book Session →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="sticky top-0 z-20 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex gap-0">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "relative px-5 py-4 text-[13px] font-semibold transition-colors",
                    tab === t.key
                      ? "text-emerald-600"
                      : "text-zinc-400 hover:text-zinc-600",
                  )}
                >
                  {t.key === "reviews"
                    ? `${t.label} (${reviews.length})`
                    : t.label}
                  {tab === t.key && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab content ── */}
        <div className="mx-auto max-w-6xl px-6 py-8">
          {tab === "details" && (
            <TutorDetailsTab tutor={tutor} categories={categories} />
          )}
          {tab === "reviews" && <TutorReviewsTab reviews={reviews} />}
          {tab === "booking" && (
            <TutorBookingTab tutor={tutor} categories={categories} />
          )}
        </div>

        {/* ── Related Tutors ── */}
        <div className="mx-auto max-w-6xl px-6 pb-12">
          <RelatedTutors currentTutorId={tutor.id} allTutors={allTutors} />
        </div>
      </div>
    </>
  );
}
