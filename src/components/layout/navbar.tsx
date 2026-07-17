"use client";

import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  User,
  BookOpen,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  title: string;
  url: string;
}
interface NavbarProps {
  className?: string;
  menu?: MenuItem[];
}

const roleMeta: Record<string, { cls: string; label: string }> = {
  STUDENT: {
    cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    label: "Student",
  },
  TUTOR: {
    cls: "bg-yellow-50  text-yellow-700  ring-1 ring-yellow-200",
    label: "Tutor",
  },
  ADMIN: {
    cls: "bg-zinc-100   text-zinc-600    ring-1 ring-zinc-200",
    label: "Admin",
  },
};

export const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/find-tutors" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ],
  className,
}: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const userName = session?.user?.name ?? "User";
  const userEmail = session?.user?.email ?? "";
  const userImage = (session?.user as any)?.image ?? null;
  const userRole = (session?.user as any)?.role ?? "STUDENT";
  const meta = roleMeta[userRole] ?? roleMeta.STUDENT;

  const dashboardPath =
    userRole === "TUTOR"
      ? "/tutor-dashboard"
      : userRole === "ADMIN"
        ? "/admin-dashboard"
        : "/dashboard";

  const profilePath =
    userRole === "TUTOR"
      ? "/tutor-dashboard/profile"
      : userRole === "ADMIN"
        ? "/admin-dashboard"
        : "/dashboard/profile";

  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-md shadow-sm",
        className,
      )}
    >
      {/* Thin top gradient bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-yellow-400" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex h-15 items-center justify-between py-3">
          {/* ── Logo ── */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm shadow-emerald-200 transition-shadow group-hover:shadow-md group-hover:shadow-emerald-300">
              <Zap size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[18px] font-extrabold tracking-tight text-zinc-900 select-none">
              Skill<span className="text-emerald-500">Bridge</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="rounded-xl px-4 py-2 text-[13px] font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* ── Desktop auth ── */}
          <div className="hidden items-center gap-3 lg:flex">
            {isPending ? (
              <div className="h-9 w-32 animate-pulse rounded-full bg-zinc-100" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-1.5 pr-3 hover:border-zinc-300 hover:bg-zinc-100 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                    {/* Avatar */}
                    <div className="relative">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
                        />
                      ) : (
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold",
                            userRole === "TUTOR"
                              ? "bg-gradient-to-br from-yellow-300 to-yellow-400 text-zinc-800"
                              : "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white",
                          )}
                        >
                          {initials}
                        </div>
                      )}
                      {/* Online dot */}
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                    </div>

                    <span className="max-w-[100px] truncate text-[13px] font-semibold text-zinc-700">
                      {userName}
                    </span>
                    <ChevronDown
                      size={12}
                      className="text-zinc-400"
                      strokeWidth={2.5}
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-60 rounded-2xl border border-zinc-100 bg-white p-1.5 shadow-xl shadow-zinc-100"
                >
                  {/* User card */}
                  <div className="mb-1 flex items-center gap-3 rounded-xl border border-zinc-50 bg-zinc-50 px-3 py-3">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt={userName}
                        className="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                      />
                    ) : (
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl text-[13px] font-bold",
                          userRole === "TUTOR"
                            ? "bg-gradient-to-br from-yellow-300 to-yellow-400 text-zinc-800"
                            : "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white",
                        )}
                      >
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-bold text-zinc-800">
                        {userName}
                      </p>
                      <p className="truncate text-[11px] text-zinc-400">
                        {userEmail}
                      </p>
                      {/* Role badge */}
                      <span
                        className={cn(
                          "mt-1 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                          meta.cls,
                        )}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-1 bg-zinc-50" />

                  <DropdownMenuItem asChild>
                    <Link
                      href={profilePath}
                      className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 focus:bg-zinc-50 transition-colors"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                        <User size={13} />
                      </div>
                      <span className="text-[13px] font-medium">
                        My Profile
                      </span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href={dashboardPath}
                      className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 focus:text-emerald-700 transition-colors"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <LayoutDashboard size={13} />
                      </div>
                      <span className="text-[13px] font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-zinc-50" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 transition-colors"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-400">
                      <LogOut size={13} />
                    </div>
                    <span className="text-[13px] font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-emerald-100 hover:bg-emerald-700 transition active:scale-[0.98]"
              >
                Login
              </Link>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="border-t border-zinc-100 pb-4 pt-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                >
                  {item.title}
                </Link>
              ))}

              <div className="mt-3 space-y-1 border-t border-zinc-100 pt-3">
                {session?.user ? (
                  <>
                    {/* Mobile profile card */}
                    <div className="mb-2 flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-3">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          className="h-10 w-10 rounded-xl object-cover ring-2 ring-white"
                        />
                      ) : (
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl text-[13px] font-bold",
                            userRole === "TUTOR"
                              ? "bg-gradient-to-br from-yellow-300 to-yellow-400 text-zinc-800"
                              : "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white",
                          )}
                        >
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-zinc-800">
                          {userName}
                        </p>
                        <p className="truncate text-[11px] text-zinc-400">
                          {userEmail}
                        </p>
                        <span
                          className={cn(
                            "mt-1 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                            meta.cls,
                          )}
                        >
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={profilePath}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
                    >
                      <User size={15} className="text-zinc-400" /> My Profile
                    </Link>

                    <Link
                      href={dashboardPath}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <LayoutDashboard size={15} className="text-emerald-500" />{" "}
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-emerald-600 py-3 text-[13px] font-semibold text-white shadow-sm shadow-emerald-100 transition active:scale-[0.98]"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
