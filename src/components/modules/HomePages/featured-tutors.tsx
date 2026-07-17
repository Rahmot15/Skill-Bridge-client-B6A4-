"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Users, ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tutor {
  id: string;
  title: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  completedSessions?: number;
  languages?: string[];
  availability?: string;
  user: { name: string; image: string | null };
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-zinc-100" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded-lg bg-zinc-100" />
          <div className="h-3 w-1/2 rounded-lg bg-zinc-100" />
          <div className="h-3 w-1/3 rounded-lg bg-zinc-100" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded-lg bg-zinc-100" />
        <div className="h-3 w-4/5 rounded-lg bg-zinc-100" />
      </div>
      <div className="mt-5 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-zinc-100" />
        <div className="h-6 w-16 rounded-full bg-zinc-100" />
      </div>
      <div className="mt-5 h-11 w-full rounded-xl bg-zinc-100" />
    </div>
  );
}

// ─── Tutor Card ───────────────────────────────────────────────────────────────

function TutorCard({ tutor, index }: { tutor: Tutor; index: number }) {
  const initials = tutor.user.name
    .split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const isEven = index % 2 === 0;

  return (
    <Link href={`/find-tutors/${tutor.id}`} className="group block h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-200/60 hover:border-zinc-200">

        {/* Colored top strip */}
        <div className={cn(
          "h-1.5 w-full transition-all duration-300",
          isEven
            ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
            : "bg-gradient-to-r from-yellow-300 to-yellow-500"
        )} />

        <div className="flex flex-1 flex-col p-6">

          {/* Avatar row */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              {tutor.user.image ? (
                <img
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-zinc-100 transition-all group-hover:ring-4 group-hover:ring-emerald-100"
                />
              ) : (
                <div className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-2xl text-[17px] font-black ring-2 transition-all group-hover:ring-4",
                  isEven
                    ? "bg-gradient-to-br from-emerald-300 to-emerald-500 text-white ring-emerald-100 group-hover:ring-emerald-200"
                    : "bg-gradient-to-br from-yellow-300 to-yellow-400 text-zinc-800 ring-yellow-100 group-hover:ring-yellow-200"
                )}>
                  {initials}
                </div>
              )}
              {/* Status dot */}
              <span className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white",
                isEven ? "bg-emerald-400" : "bg-yellow-400"
              )} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-bold text-zinc-900">{tutor.user.name}</h3>
              <p className="mt-0.5 truncate text-[12px] text-zinc-400">{tutor.title}</p>

              {/* Rating row */}
              <div className="mt-2 flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[13px] font-bold text-zinc-700">
                    {tutor.rating > 0 ? tutor.rating.toFixed(1) : "New"}
                  </span>
                  {tutor.totalReviews > 0 && (
                    <span className="text-[11px] text-zinc-400">({tutor.totalReviews})</span>
                  )}
                </div>
                {tutor.totalStudents > 0 && (
                  <>
                    <span className="h-3 w-px bg-zinc-200" />
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <Users size={11} /> {tutor.totalStudents}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Price badge */}
            <div className={cn(
              "shrink-0 rounded-2xl px-3 py-1.5 text-center",
              isEven ? "bg-emerald-50" : "bg-yellow-50"
            )}>
              <div className={cn(
                "text-[20px] font-black leading-none",
                isEven ? "text-emerald-600" : "text-yellow-600"
              )}>
                ${tutor.hourlyRate}
              </div>
              <div className="text-[10px] text-zinc-400">/hr</div>
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {tutor.completedSessions !== undefined && (
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-50 px-2.5 py-1.5">
                <BookOpen size={11} className="text-zinc-400" />
                <span className="text-[11px] font-medium text-zinc-500">
                  {tutor.completedSessions} sessions
                </span>
              </div>
            )}
            {tutor.availability && (
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-50 px-2.5 py-1.5">
                <Clock size={11} className="text-zinc-400" />
                <span className="text-[11px] font-medium text-zinc-500 truncate max-w-[100px]">
                  {tutor.availability}
                </span>
              </div>
            )}
          </div>

          {/* Language pills */}
          {tutor.languages && tutor.languages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tutor.languages.slice(0, 3).map((lang) => (
                <span key={lang} className={cn(
                  "rounded-lg px-2.5 py-1 text-[11px] font-semibold ring-1",
                  isEven
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-yellow-50 text-yellow-700 ring-yellow-100"
                )}>
                  {lang}
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA button */}
          <div className={cn(
            "mt-5 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200",
            isEven
              ? "bg-emerald-50 group-hover:bg-emerald-100"
              : "bg-yellow-50 group-hover:bg-yellow-100"
          )}>
            <span className={cn(
              "text-[13px] font-bold",
              isEven ? "text-emerald-700" : "text-yellow-700"
            )}>
              View Profile
            </span>
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all group-hover:translate-x-0.5",
              isEven ? "bg-emerald-200 text-emerald-700" : "bg-yellow-200 text-yellow-700"
            )}>
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/tutors`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setTutors(list.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Top Rated</span>
            </div>
            <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-4">Featured Tutors</h2>
            <p className="mt-1.5 text-[15px] text-zinc-400">Learn from our highest-rated experts</p>
          </div>

          <Link
            href="/find-tutors"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-zinc-600 shadow-sm hover:border-emerald-200 hover:text-emerald-600 transition"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {/* Grid — 2 col on md, 4 on xl */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : tutors.map((tutor, i) => <TutorCard key={tutor.id} tutor={tutor} index={i} />)
          }
        </div>

        {/* Bottom CTA */}
        {!loading && tutors.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/find-tutors"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-10 py-4 text-[15px] font-bold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition"
            >
              Browse All Tutors <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
