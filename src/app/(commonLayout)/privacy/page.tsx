import type { Metadata } from "next";
import { Shield, Lock, Eye, UserCheck, Database, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - SkillBridge",
  description:
    "Learn how SkillBridge collects, uses, and protects your personal information.",
};

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Account information (name, email, password) when you register.",
      "Profile data (bio, education, skills) if you create a tutor profile.",
      "Payment information processed securely through our payment providers.",
      "Usage data (pages visited, features used) to improve our platform.",
      "Communication data when you contact us or interact with other users.",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our tutoring platform services.",
      "To match students with appropriate tutors based on preferences.",
      "To process bookings, payments, and deliver session notifications.",
      "To communicate important updates about your account or our services.",
      "To improve our platform through analytics and user feedback.",
    ],
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    content: [
      "All data is encrypted in transit using TLS/SSL certificates.",
      "We use industry-standard encryption for stored sensitive information.",
      "Regular security audits and vulnerability assessments are performed.",
      "Access to personal data is restricted to authorized personnel only.",
      "We never sell your personal information to third parties.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access and download your personal data at any time.",
      "Request correction of inaccurate personal information.",
      "Request deletion of your account and associated data.",
      "Opt out of non-essential communications and marketing emails.",
      "Control your privacy settings through your dashboard.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="font-bold text-4xl lg:text-5xl text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
          <p className="mt-4 text-[13px] text-emerald-200">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        {/* Intro */}
        <div className="mb-12 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <p className="text-[14px] leading-relaxed text-zinc-600">
            At SkillBridge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to
            protecting your privacy. This Privacy Policy describes how we
            collect, use, disclose, and safeguard your information when you use
            our platform. By using SkillBridge, you agree to the collection and
            use of information in accordance with this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <section.icon size={18} className="text-emerald-600" />
                </div>
                <h2 className="text-[18px] font-bold text-zinc-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3 pl-[52px]">
                {section.content.map((item, i) => (
                  <li
                    key={i}
                    className="text-[13px] leading-relaxed text-zinc-500"
                  >
                    <span className="mr-2 text-emerald-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookies */}
        <div className="mt-6 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-[18px] font-bold text-zinc-900">
            Cookies Policy
          </h2>
          <p className="text-[13px] leading-relaxed text-zinc-500">
            We use cookies and similar tracking technologies to maintain your
            session, remember your preferences, and analyze platform usage.
            Essential cookies are required for authentication and security. You
            can control optional cookies through your browser settings.
          </p>
        </div>

        {/* Third Party */}
        <div className="mt-6 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-[18px] font-bold text-zinc-900">
            Third-Party Services
          </h2>
          <p className="text-[13px] leading-relaxed text-zinc-500">
            We may use third-party services such as Google Analytics, payment
            processors, and OAuth providers (Google, GitHub). These services
            have their own privacy policies governing the use of your
            information. We encourage you to review their policies.
          </p>
        </div>

        {/* Children */}
        <div className="mt-6 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-[18px] font-bold text-zinc-900">
            Children&apos;s Privacy
          </h2>
          <p className="text-[13px] leading-relaxed text-zinc-500">
            SkillBridge is not intended for users under the age of 13. We do not
            knowingly collect personal information from children. If we become
            aware that a child has provided us with personal data, we will take
            steps to remove that information promptly.
          </p>
        </div>

        {/* Changes */}
        <div className="mt-6 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-[18px] font-bold text-zinc-900">
            Changes to This Policy
          </h2>
          <p className="text-[13px] leading-relaxed text-zinc-500">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &quot;Last updated&quot; date.
            We encourage you to review this policy periodically for any changes.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail size={18} className="text-emerald-600" />
            <h2 className="text-[18px] font-bold text-zinc-900">
              Questions About Privacy?
            </h2>
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-600">
            If you have any questions about this Privacy Policy or how we
            handle your data, please contact us at{" "}
            <span className="font-semibold text-emerald-700">
              privacy@skillbridge.com
            </span>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
