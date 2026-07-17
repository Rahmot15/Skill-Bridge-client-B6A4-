"use client";

import * as React from "react";
import {
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import { Zap } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Role menus ───────────────────────────────────────────────────────────────

const roleMenus = {
  STUDENT: [
    { title: "Dashboard",  url: "/dashboard",          icon: IconDashboard  },
    { title: "Bookings",   url: "/dashboard/bookings", icon: IconListDetails },
    { title: "Profile",    url: "/dashboard/profile",  icon: IconUsers      },
  ],
  TUTOR: [
    { title: "Dashboard",    url: "/tutor-dashboard",              icon: IconDashboard   },
    { title: "Bookings",     url: "/tutor-dashboard/bookings",     icon: IconListDetails },
    { title: "Availability", url: "/tutor-dashboard/availability", icon: IconListDetails },
    { title: "Profile",      url: "/tutor-dashboard/profile",      icon: IconUsers       },
  ],
  ADMIN: [
    { title: "Dashboard",  url: "/admin-dashboard",            icon: IconDashboard   },
    { title: "Users",      url: "/admin-dashboard/users",      icon: IconUsers       },
    { title: "Bookings",   url: "/admin-dashboard/bookings",   icon: IconListDetails },
    { title: "Categories", url: "/admin-dashboard/categories", icon: IconFolder      },
  ],
};

// ─── Role badge ───────────────────────────────────────────────────────────────
// STUDENT → emerald (main brand color)
// TUTOR   → yellow  (accent color)
// ADMIN   → zinc    (neutral)

const roleMeta = {
  STUDENT: { label: "Student", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  TUTOR:   { label: "Tutor",   cls: "border-yellow-200  bg-yellow-50  text-yellow-700"  },
  ADMIN:   { label: "Admin",   cls: "border-zinc-200    bg-zinc-100   text-zinc-600"    },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type User = {
  name: string;
  email: string;
  image?: string;
  role: "ADMIN" | "STUDENT" | "TUTOR";
};

type Props = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

// ─── AppSidebar ───────────────────────────────────────────────────────────────

export function AppSidebar({ user, ...props }: Props) {
  const navItems = roleMenus[user.role] || [];
  const meta     = roleMeta[user.role];

  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* ── Header ── */}
      <SidebarHeader className="border-b border-zinc-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/" className="flex items-center gap-3">
                {/* Logo → emerald gradient, brand এর main color */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm shadow-emerald-200">
                  <Zap size={15} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[14px] font-bold tracking-tight text-zinc-900">SkillBridge</span>
                  <span className="text-[10px] text-zinc-400">Learning Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Role badge */}
        <div className="px-2 pb-2">
          <span className={cn(
            "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
            meta.cls
          )}>
            {meta.label} Menu
          </span>
        </div>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent>
        <NavMain items={navItems} />
        <NavSecondary
          items={[{ title: "Settings", url: "/settings", icon: IconSettings }]}
          className="mt-auto"
        />
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="border-t border-zinc-100">
        <NavUser user={user} />
      </SidebarFooter>

    </Sidebar>
  );
}
