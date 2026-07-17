"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search, Star, Users, CheckCircle2, XCircle,
  BookOpen, Clock, DollarSign, SlidersHorizontal, X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 8;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TutorProfile {
  id: string;
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
  user: { id: string; name: string; email: string; image: string | null; role: string };
}

type SortOption = "rating" | "price_asc" | "price_desc" | "students";

// ─── TutorCard ────────────────────────────────────────────────────────────────

function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const initials = tutor.user.name
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Link href={`/find-tutors/${tutor.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-emerald-100 hover:-translate-y-0.5">

        {/* Top emerald strip on hover */}
        <div className="h-1 w-full bg-zinc-100 transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500" />

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              {tutor.user.image ? (
                <img
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  className="h-14 w-14 rounded-xl object-cover ring-2 ring-zinc-100 group-hover:ring-emerald-100 transition-all"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[15px] font-bold text-zinc-800 ring-2 ring-yellow-100">
                  {initials}
                </div>
              )}
              {/* Verified badge */}
              <div className={cn(
                "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white",
                tutor.verified ? "bg-emerald-400" : "bg-zinc-300"
              )}>
                {tutor.verified
                  ? <CheckCircle2 size={11} className="text-white" />
                  : <XCircle size={11} className="text-white" />
                }
              </div>
            </div>

            {/* Name + title */}
            <div className="flex-1 min-w-0">
              <h3 className="truncate text-[14px] font-bold text-zinc-900">{tutor.user.name}</h3>
              <p className="truncate text-[12px] text-zinc-400">{tutor.title}</p>

              {/* Rating */}
              <div className="mt-1.5 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {/* Star → yellow */}
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[12px] font-semibold text-zinc-700">
                    {tutor.rating > 0 ? tutor.rating.toFixed(1) : "New"}
                  </span>
                  {tutor.totalReviews > 0 && (
                    <span className="text-[11px] text-zinc-400">({tutor.totalReviews})</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Users size={11} />
                  {tutor.totalStudents} students
                </div>
              </div>
            </div>

            {/* Price — emerald */}
            <div className="shrink-0 text-right">
              <div className="text-[20px] font-black text-emerald-600">${tutor.hourlyRate}</div>
              <div className="text-[10px] text-zinc-400">/hour</div>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-3 text-[12px] leading-relaxed text-zinc-500 line-clamp-2">
            {tutor.bio}
          </p>

          {/* Language pills → emerald */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tutor.languages.slice(0, 3).map((lang) => (
              <span key={lang} className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                {lang}
              </span>
            ))}
          </div>

          {/* Footer row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <Clock size={11} />
              {tutor.availability || "Flexible"}
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-emerald-100 transition-colors group-hover:bg-emerald-700">
              View Profile →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FindTutorsClient({ tutors }: { tutors: TutorProfile[] }) {
  const [search, setSearch]         = useState("");
  const [sort, setSort]             = useState<SortOption>("rating");
  const [maxPrice, setMaxPrice]     = useState<number>(500);
  const [minRating, setMinRating]   = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage]             = useState(1);

  // All unique languages for filter
  const allLanguages = useMemo(() =>
    Array.from(new Set(tutors.flatMap((t) => t.languages))).sort(),
    [tutors]
  );
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = tutors.filter((t) => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        t.user.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.bio.toLowerCase().includes(q) ||
        t.languages.some((l) => l.toLowerCase().includes(q));

      const matchPrice    = t.hourlyRate <= maxPrice;
      const matchRating   = t.rating >= minRating;
      const matchVerified = !verifiedOnly || t.verified;
      const matchLang     = !selectedLang || t.languages.includes(selectedLang);

      return matchSearch && matchPrice && matchRating && matchVerified && matchLang;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === "rating")     return b.rating - a.rating;
      if (sort === "price_asc")  return a.hourlyRate - b.hourlyRate;
      if (sort === "price_desc") return b.hourlyRate - a.hourlyRate;
      if (sort === "students")   return b.totalStudents - a.totalStudents;
      return 0;
    });

    return result;
  }, [search, sort, maxPrice, minRating, verifiedOnly, selectedLang, tutors]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, sort, maxPrice, minRating, verifiedOnly, selectedLang]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedTutors = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const activeFilterCount = [
    maxPrice < 500, minRating > 0, verifiedOnly, !!selectedLang,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            {/* Title */}
            <div className="shrink-0">
              <h1 className="text-[18px] font-bold text-zinc-900">Find Tutors</h1>
              <p className="text-[12px] text-zinc-400">{filtered.length} tutors available</p>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, subject, language..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-9 pr-4 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-[13px] text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            >
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="students">Most Students</option>
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition",
                showFilters || activeFilterCount > 0
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              )}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-zinc-900">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* ── Filter panel ── */}
          {showFilters && (
            <div className="mt-3 flex flex-wrap items-end gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-4">

              {/* Max price */}
              <div className="space-y-1.5 min-w-[160px]">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <DollarSign size={10} /> Max Price: ${maxPrice}/hr
                </label>
                <input
                  type="range" min={10} max={500} step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Min rating */}
              <div className="space-y-1.5 min-w-[160px]">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Star size={10} /> Min Rating: {minRating > 0 ? `${minRating}★` : "Any"}
                </label>
                <input
                  type="range" min={0} max={5} step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full accent-yellow-400"
                />
              </div>

              {/* Language filter */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <BookOpen size={10} /> Language
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedLang(null)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-semibold transition",
                      !selectedLang
                        ? "bg-emerald-500 text-white"
                        : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300"
                    )}
                  >
                    All
                  </button>
                  {allLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(selectedLang === lang ? null : lang)}
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-[11px] font-semibold transition",
                        selectedLang === lang
                          ? "bg-emerald-500 text-white"
                          : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified only */}
              <label className="flex cursor-pointer items-center gap-2">
                <div
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-md border-2 transition",
                    verifiedOnly
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-zinc-300 bg-white"
                  )}
                >
                  {verifiedOnly && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className="text-[12px] font-medium text-zinc-600">Verified only</span>
              </label>

              {/* Reset */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setMaxPrice(500); setMinRating(0); setVerifiedOnly(false); setSelectedLang(null); }}
                  className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-zinc-400 hover:text-zinc-600 transition"
                >
                  <X size={12} /> Reset filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
              <Search size={24} className="text-zinc-400" />
            </div>
            <h3 className="mt-4 text-[16px] font-bold text-zinc-700">No tutors found</h3>
            <p className="mt-1 text-[13px] text-zinc-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
