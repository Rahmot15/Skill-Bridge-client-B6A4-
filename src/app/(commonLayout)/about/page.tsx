import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Users, Award, Target, Heart, Globe,
  GraduationCap, Sparkles, Shield, TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - SkillBridge",
  description:
    "Learn about SkillBridge's mission to connect learners with expert tutors worldwide.",
};

const stats = [
  { icon: Users, value: "50,000+", label: "Active Learners" },
  { icon: GraduationCap, value: "1,200+", label: "Expert Tutors" },
  { icon: BookOpen, value: "10,000+", label: "Sessions Completed" },
  { icon: Globe, value: "30+", label: "Countries Reached" },
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "Every tutor on our platform is vetted through a rigorous selection process to ensure you receive world-class education.",
  },
  {
    icon: Heart,
    title: "Student-Centered",
    description:
      "Your learning journey is our priority. We tailor matches based on your goals, schedule, and preferred learning style.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Learn with confidence. Our secure platform and verified profiles create a safe environment for every session.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We leverage modern tools and methodologies to make learning engaging, interactive, and effective.",
  },
];

const team = [
  {
    name: "MD Rahmatullah",
    role: "Founder & CEO",
    bio: "Passionate about making quality education accessible to everyone, everywhere.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-bold text-4xl lg:text-5xl text-white mb-6">
            About SkillBridge
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            We connect learners with expert tutors worldwide, making quality
            education accessible to everyone.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mx-auto max-w-7xl px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <stat.icon size={20} className="text-emerald-600" />
              </div>
              <div className="mt-4 text-[28px] font-bold text-zinc-900">
                {stat.value}
              </div>
              <div className="mt-1 text-[13px] text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
              Our Mission
            </p>
            <h2 className="mt-2 text-[32px] font-bold text-zinc-900">
              Bridging the gap between learners and expertise
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
              SkillBridge was founded with a simple belief: everyone deserves
              access to quality education. We created a platform where students
              can find the perfect tutor for their learning needs, and tutors can
              share their knowledge with eager learners around the world.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
              Whether you&apos;re looking to master a new programming language, improve
              your academic performance, or develop professional skills, our
              community of verified tutors is here to guide you every step of the
              way.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-yellow-50 p-8">
              <div className="grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-xl border border-zinc-100 bg-white p-4"
                  >
                    <v.icon size={18} className="text-emerald-600" />
                    <p className="mt-2 text-[13px] font-semibold text-zinc-800">
                      {v.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
              Our Values
            </p>
            <h2 className="mt-2 text-[32px] font-bold text-zinc-900">
              What we stand for
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-zinc-100 p-6 transition-all hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <value.icon size={20} className="text-emerald-600" />
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-zinc-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
            Our Team
          </p>
          <h2 className="mt-2 text-[32px] font-bold text-zinc-900">
            Meet the people behind SkillBridge
          </h2>
        </div>
        <div className="mt-12 flex justify-center">
          {team.map((member) => (
            <div
              key={member.name}
              className="w-full max-w-sm rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[24px] font-bold text-white">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <h3 className="mt-4 text-[16px] font-bold text-zinc-900">
                {member.name}
              </h3>
              <p className="text-[13px] text-emerald-600 font-medium">
                {member.role}
              </p>
              <p className="mt-3 text-[13px] text-zinc-500">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-[32px] font-bold text-white">
            Ready to start learning?
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            Join thousands of learners who have transformed their careers with
            SkillBridge.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/find-tutors"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-4 font-semibold text-emerald-900 shadow-lg shadow-yellow-400/30 transition-all hover:-translate-y-1 hover:bg-yellow-500 hover:shadow-yellow-400/50"
            >
              Find a Tutor
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition-all hover:border-white/50 hover:bg-white/20"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
