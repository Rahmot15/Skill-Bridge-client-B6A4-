"use client";

import { useState } from "react";
import {
  Mail, Phone, MapPin, Send, Clock, MessageSquare,
  Loader2, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@skillbridge.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (555) 123-4567",
    sub: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "San Francisco, CA",
    sub: "United States",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Missing fields", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
  }

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
            Get in Touch
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Have a question or want to learn more? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="mx-auto max-w-7xl px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <info.icon size={20} className="text-emerald-600" />
              </div>
              <h3 className="mt-4 text-[15px] font-bold text-zinc-900">
                {info.title}
              </h3>
              <p className="mt-1 text-[14px] font-semibold text-emerald-600">
                {info.detail}
              </p>
              <p className="mt-1 text-[12px] text-zinc-400">{info.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                  <MessageSquare size={16} className="text-emerald-600" />
                </div>
                <h2 className="text-[18px] font-bold text-zinc-900">
                  Send a Message
                </h2>
              </div>

              {sent ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold text-zinc-900">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-[13px] text-zinc-500">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setEmail("");
                      setSubject("");
                      setMessage("");
                    }}
                    className="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-semibold text-zinc-600">
                        Name *
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-semibold text-zinc-600">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-zinc-600">
                      Subject
                    </label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-zinc-600">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us more..."
                      rows={5}
                      className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-[14px] font-semibold text-white shadow-sm shadow-emerald-100 hover:bg-emerald-700 disabled:opacity-60 transition sm:w-auto"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-600" />
                <h3 className="text-[14px] font-bold text-zinc-900">
                  Office Hours
                </h3>
              </div>
              <div className="mt-4 space-y-2 text-[13px] text-zinc-500">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-zinc-700">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-zinc-700">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-zinc-400">Closed</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-zinc-900">
                Frequently Asked
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { q: "How do I become a tutor?", a: "Apply through our tutor registration page." },
                  { q: "How are sessions conducted?", a: "All sessions happen online via our built-in video platform." },
                  { q: "Can I get a refund?", a: "Yes, within 24 hours of booking if unsatisfied." },
                ].map((faq) => (
                  <div key={faq.q}>
                    <p className="text-[13px] font-semibold text-zinc-700">{faq.q}</p>
                    <p className="text-[12px] text-zinc-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
