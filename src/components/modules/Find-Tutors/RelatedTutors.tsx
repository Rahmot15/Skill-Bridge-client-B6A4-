"use client";

import Link from "next/link";
import { Star, Users, CheckCircle2, XCircle } from "lucide-react";

interface TutorProfile {
  id: string;
  title: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  verified: boolean;
  user: { id: string; name: string; image: string | null };
}

export default function RelatedTutors({
  currentTutorId,
  allTutors,
}: {
  currentTutorId: string;
  allTutors: TutorProfile[];
}) {
  const related = allTutors
    .filter((t) => t.id !== currentTutorId)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-zinc-900">Related Tutors</h2>
          <p className="text-[12px] text-zinc-400">You might also like these tutors</p>
        </div>
        <Link
          href="/find-tutors"
          className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((t) => {
          const initials = t.user?.name
            ?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

          return (
            <Link
              key={t.id}
              href={`/find-tutors/${t.id}`}
              className="group block"
            >
              <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-emerald-100 hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  {t.user?.image ? (
                    <img
                      src={t.user.image}
                      alt={t.user.name}
                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-zinc-100 group-hover:ring-emerald-100 transition-all"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[14px] font-bold text-zinc-800 ring-2 ring-yellow-100">
                      {initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-[13px] font-bold text-zinc-900">
                        {t.user?.name}
                      </h3>
                      {t.verified ? (
                        <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                      ) : (
                        <XCircle size={12} className="shrink-0 text-zinc-300" />
                      )}
                    </div>
                    <p className="truncate text-[11px] text-zinc-400">{t.title}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[12px] font-semibold text-zinc-700">
                      {t.rating > 0 ? t.rating.toFixed(1) : "New"}
                    </span>
                    {t.totalReviews > 0 && (
                      <span className="text-[10px] text-zinc-400">({t.totalReviews})</span>
                    )}
                  </div>
                  <div className="text-[14px] font-black text-emerald-600">
                    ${t.hourlyRate}
                    <span className="text-[10px] font-medium text-zinc-400">/hr</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-400">
                  <Users size={10} />
                  {t.totalStudents} students
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
