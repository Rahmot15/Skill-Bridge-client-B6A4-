"use client";

import { useState } from "react";
import { Mail, Shield, Calendar, CheckCircle2, GraduationCap, Camera, Save, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  role: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

const roleMeta: Record<string, { cls: string; label: string }> = {
  STUDENT: { cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", label: "Student" },
  TUTOR:   { cls: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",   label: "Tutor"   },
  ADMIN:   { cls: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200",        label: "Admin"   },
};

function InfoRow({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-emerald-50 text-emerald-500" : "bg-zinc-100 text-zinc-400"}`}>
          <Icon size={14} />
        </span>
        <span className="text-[13px] text-zinc-400 font-medium">{label}</span>
      </div>
      <span className="text-[13px] font-semibold text-zinc-700">{value}</span>
    </div>
  );
}

export default function StudentProfile({ user }: { user: UserType }) {
  const meta = roleMeta[user.role] ?? roleMeta.STUDENT;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image || "");
  const [isSaving, setIsSaving] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleSave() {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/update-user`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            image: image.trim() || undefined,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Update failed");
      }

      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Please try again.";
      toast.error("Failed to update profile", {
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-5">

        {/* Page header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
              Student Portal
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
              My Profile
            </h1>
          </div>
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={isSaving}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold transition",
              isEditing
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-100 hover:bg-emerald-700"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
            )}
          >
            {isSaving ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isEditing ? (
              <Save size={14} />
            ) : (
              <User size={14} />
            )}
            {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Hero card */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-500" />

          <div className="p-6">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative shrink-0">
                {(isEditing ? image : user.image) ? (
                  <img
                    src={isEditing ? image : user.image}
                    alt={user.name}
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-emerald-100"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-xl font-bold text-zinc-800 ring-2 ring-yellow-100">
                    {initials}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  {isEditing ? (
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-[20px] font-bold text-zinc-900 border-b-2 border-emerald-400 focus:outline-none bg-transparent px-1"
                    />
                  ) : (
                    <h2 className="text-[20px] font-bold text-zinc-900 capitalize">{user.name}</h2>
                  )}
                  <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold ${meta.cls}`}>
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-zinc-400">{user.email}</p>

                {user.emailVerified && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600">
                    <CheckCircle2 size={11} />
                    Email Verified
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit form - only when editing */}
        {isEditing && (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <h3 className="text-[13px] font-bold text-emerald-800 mb-3">Edit Profile</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-[13px] text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                  Image URL <span className="normal-case tracking-normal font-normal text-emerald-400">— optional</span>
                </label>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                />
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Account info card */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <GraduationCap size={14} className="text-emerald-600" />
              </div>
              <h3 className="text-[13px] font-bold text-zinc-800">Account Info</h3>
            </div>
            <div className="mt-3 divide-y divide-zinc-50">
              <InfoRow icon={Mail}     label="Email"   value={user.email}   accent />
              <InfoRow icon={Shield}   label="Role"    value={
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${meta.cls}`}>
                  {meta.label}
                </span>
              } />
              {user.createdAt && (
                <InfoRow icon={Calendar} label="Joined" accent
                  value={new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                />
              )}
              {user.updatedAt && (
                <InfoRow icon={Calendar} label="Last updated"
                  value={new Date(user.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                />
              )}
            </div>
          </div>

          {/* Account settings card */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-50">
                <Shield size={14} className="text-yellow-600" />
              </div>
              <h3 className="text-[13px] font-bold text-zinc-800">Account Settings</h3>
            </div>

            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 hover:bg-zinc-100 transition-colors cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Camera size={14} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-zinc-700">Profile Photo</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Update your profile picture via URL.</p>
                </div>
                <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 hover:bg-zinc-100 transition-colors cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Shield size={14} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-zinc-700">Security</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Manage password & authentication.</p>
                </div>
                <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
