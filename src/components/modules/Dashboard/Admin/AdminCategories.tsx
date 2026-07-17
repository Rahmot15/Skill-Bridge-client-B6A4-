"use client";

import { useState, useEffect } from "react";
import { Layers, Plus, Calendar, FileText, Tag, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

// ─── Type ─────────────────────────────────────────────────────────────────────

type Category = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminCategories({ categories }: { categories: Category[] }) {
  const [list, setList]           = useState(categories);
  const [title, setTitle]         = useState("");
  const [description, setDesc]    = useState("");
  const [loading, setLoading]     = useState(false);
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  async function handleCreate() {
    if (!title.trim()) {
      toast.error("Title required", { description: "Please enter a category title." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/categories`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setList([data.data, ...list]);
        setTitle("");
        setDesc("");
        toast.success("Category created!", {
          description: `"${data.data.title}" has been added.`,
        });
      } else {
        toast.error("Failed to create", { description: data?.message || "Please try again." });
      }
    } catch {
      toast.error("Network error", { description: "Could not reach the server." });
    } finally {
      setLoading(false);
    }
  }

  const filtered = list.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedCategories = filtered.slice(
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
              Manage Categories
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm">
            <Layers size={13} className="text-emerald-500" />
            {list.length} categories
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* ── Create form ── */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              {/* yellow icon → add/create action */}
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-50">
                <Plus size={14} className="text-yellow-600" />
              </div>
              <h2 className="text-[13px] font-bold text-zinc-800">New Category</h2>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Tag size={10} /> Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Web Development"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-[13px] text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <FileText size={10} /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Short description..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-[13px] text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
                />
              </div>

              {/* emerald save button */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-emerald-100 hover:bg-emerald-700 disabled:opacity-60 transition"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Plus size={15} />
                )}
                {loading ? "Creating..." : "Add Category"}
              </button>
            </div>
          </div>

          {/* ── Category list ── */}
          <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm md:col-span-2 overflow-hidden">

            {/* List header + search */}
            <div className="flex items-center gap-3 border-b border-zinc-50 px-5 py-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <Layers size={13} className="text-emerald-600" />
              </div>
              <h2 className="flex-1 text-[13px] font-bold text-zinc-800">All Categories</h2>
              {/* Search */}
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-40 rounded-xl border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-3 text-[12px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Table head */}
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 bg-zinc-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <span>Title</span>
              <span>Description</span>
              <span>Created</span>
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                  <Layers size={20} className="text-zinc-400" />
                </div>
                <p className="mt-3 text-[13px] font-semibold text-zinc-700">
                  {search ? "No results found" : "No categories yet"}
                </p>
                <p className="mt-1 text-[12px] text-zinc-400">
                  {search ? "Try a different search term." : "Add your first category using the form."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-50">
                {paginatedCategories.map((cat, i) => (
                  <div
                    key={cat.id}
                    className="group grid grid-cols-[2fr_2fr_1fr] items-center gap-4 px-5 py-3.5 hover:bg-zinc-50/80 transition-colors"
                  >
                    {/* Title */}
                    <div className="flex items-center gap-2.5">
                      {/* Color dot — cycles through emerald/yellow */}
                      <span className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        i % 2 === 0 ? "bg-emerald-400" : "bg-yellow-400"
                      )} />
                      <span className="text-[13px] font-semibold text-zinc-800">{cat.title}</span>
                    </div>

                    {/* Description */}
                    <p className="truncate text-[12px] text-zinc-500">{cat.description || "—"}</p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <Calendar size={11} className="text-zinc-300" />
                      {new Date(cat.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {list.length > 0 && (
              <div className="border-t border-zinc-50 px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-zinc-400">
                    Showing {paginatedCategories.length} of {filtered.length} categories
                    {search && ` · "${search}"`}
                  </p>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
