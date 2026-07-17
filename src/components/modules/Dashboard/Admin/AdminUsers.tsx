"use client";

import { useState, useEffect } from "react";
import {
  Users, Search, GraduationCap, UserCheck,
  Shield, CheckCircle2, XCircle, Ban, RotateCcw, Mail,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

// ─── Type ─────────────────────────────────────────────────────────────────────

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
};

// ─── Config ───────────────────────────────────────────────────────────────────

const roleConfig: Record<string, { cls: string; icon: React.ElementType }> = {
  STUDENT: { cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", icon: GraduationCap },
  TUTOR:   { cls: "bg-yellow-50  text-yellow-700  ring-1 ring-yellow-200",  icon: UserCheck    },
  ADMIN:   { cls: "bg-zinc-100   text-zinc-600    ring-1 ring-zinc-200",    icon: Shield       },
};

const FILTERS = ["ALL", "STUDENT", "TUTOR", "ADMIN"] as const;
type Filter = typeof FILTERS[number];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminUsers({ users }: { users: User[] }) {
  const [list, setList]           = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter]       = useState<Filter>("ALL");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  async function toggleStatus(userId: string, current: boolean) {
    setLoadingId(userId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailVerified: !current }),
      }
    );
    const data = await res.json();
    setLoadingId(null);

    if (data.success) {
      setList((prev) =>
        prev.map((u) => u.id === userId ? { ...u, emailVerified: !current } : u)
      );
      const user = list.find((u) => u.id === userId);
      toast.success(current ? "User banned" : "User unbanned", {
        description: `${user?.name} has been ${current ? "banned" : "unbanned"}.`,
      });
    } else {
      toast.error("Action failed", { description: "Please try again." });
    }
  }

  const filtered = list.filter((u) => {
    const matchRole   = filter === "ALL" || u.role === filter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const counts = {
    ALL:     list.length,
    STUDENT: list.filter((u) => u.role === "STUDENT").length,
    TUTOR:   list.filter((u) => u.role === "TUTOR").length,
    ADMIN:   list.filter((u) => u.role === "ADMIN").length,
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedUsers = filtered.slice(
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
              Manage Users
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm">
            <Users size={13} className="text-emerald-500" />
            {list.length} total
          </span>
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-4 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          {/* Role tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all",
                  filter === f
                    ? f === "STUDENT" ? "bg-emerald-500 text-white shadow-sm"
                    : f === "TUTOR"   ? "bg-yellow-400 text-zinc-900 shadow-sm"
                    : "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {f === "ALL"     ? `All (${counts.ALL})`          :
                 f === "STUDENT" ? `Students (${counts.STUDENT})` :
                 f === "TUTOR"   ? `Tutors (${counts.TUTOR})`     :
                 `Admin (${counts.ADMIN})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">

          {/* Head */}
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 border-b border-zinc-100 bg-zinc-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {/* Body */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                <Users size={20} className="text-zinc-400" />
              </div>
              <p className="mt-3 text-[13px] font-semibold text-zinc-700">No users found</p>
              <p className="mt-1 text-[12px] text-zinc-400">Try changing your search or filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-50">
              {paginatedUsers.map((user) => {
                const role      = roleConfig[user.role] ?? roleConfig.ADMIN;
                const RoleIcon  = role.icon;
                const isLoading = loadingId === user.id;
                const isBanned  = !user.emailVerified;
                const initials  = user.name
                  .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

                return (
                  <div
                    key={user.id}
                    className={cn(
                      "grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 transition-colors",
                      isBanned ? "bg-red-50/40 hover:bg-red-50" : "hover:bg-zinc-50/80"
                    )}
                  >
                    {/* User */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold",
                        user.role === "STUDENT" ? "bg-gradient-to-br from-emerald-300 to-emerald-400 text-white"   :
                        user.role === "TUTOR"   ? "bg-gradient-to-br from-yellow-300  to-yellow-400  text-zinc-800" :
                        "bg-gradient-to-br from-zinc-200 to-zinc-300 text-zinc-700"
                      )}>
                        {isBanned ? <Ban size={13} className="text-red-400" /> : initials}
                      </div>
                      <span className={cn(
                        "text-[13px] font-semibold truncate",
                        isBanned ? "text-zinc-400 line-through" : "text-zinc-800"
                      )}>
                        {user.name}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Mail size={11} className="shrink-0 text-zinc-300" />
                      <span className="truncate text-[12px] text-zinc-500">{user.email}</span>
                    </div>

                    {/* Role badge */}
                    <span className={cn(
                      "inline-flex w-fit items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold",
                      role.cls
                    )}>
                      <RoleIcon size={10} />
                      {user.role}
                    </span>

                    {/* Status badge */}
                    <span className={cn(
                      "inline-flex w-fit items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold",
                      isBanned
                        ? "bg-red-50 text-red-600 ring-1 ring-red-200"
                        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    )}>
                      {isBanned
                        ? <><XCircle size={10} /> Banned</>
                        : <><CheckCircle2 size={10} /> Active</>
                      }
                    </span>

                    {/* Action button */}
                    <button
                      onClick={() => toggleStatus(user.id, user.emailVerified)}
                      disabled={isLoading}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all disabled:opacity-50 whitespace-nowrap",
                        isBanned
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                          : "bg-red-500 text-white hover:bg-red-600 shadow-sm"
                      )}
                    >
                      {isLoading ? (
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : isBanned ? (
                        <><RotateCcw size={11} /> Unban</>
                      ) : (
                        <><Ban size={11} /> Ban</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-zinc-50 px-5 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-zinc-400">
                Showing {paginatedUsers.length} of {filtered.length} users
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
