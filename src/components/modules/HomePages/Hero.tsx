"use client";
import { motion } from "framer-motion";
import { Play, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-100 mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">
                New: AI-Powered Learning Paths
              </span>
            </div>

            <h1 className="font-poppins font-bold text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
              Master skills that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                transform your future
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Join 50,000+ learners building expertise in technology, design,
              and business through expert-led courses with personalized learning
              paths.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href={'/find-tutors'} className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all hover:-translate-y-1">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={'/find-tutors'} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-700 font-semibold rounded-full border-2 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 transition-all">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Play className="w-4 h-4 text-emerald-600 ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[
                  "bg-emerald-200",
                  "bg-emerald-300",
                  "bg-yellow-200",
                  "bg-emerald-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white ${color}`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  Trusted by 50,000+ students
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-6 duration-700">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl" />

            <div className="relative w-full max-w-[650px] xl:max-w-[720px] aspect-[4/3] lg:aspect-square flex items-center justify-center lg:translate-x-10">
              {/* Platform */}
              <div className="absolute bottom-[8%] w-[92%] h-[38%] bg-white/40 backdrop-blur rounded-[42px] -z-10 shadow-xl border border-white/60" />

              {/* Image */}
              <img
                src="/asdf.svg"
                alt="SkillBridge Illustration"
                className="w-full h-auto object-contain drop-shadow-2xl scale-110 lg:scale-115 animate-float"
              />

              {/* Floating Card */}
              <div className="absolute top-[18%] -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-full bg-[#f0f7ff] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2f27ce]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#040316]">Live Now</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Class 101
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 p-6 border border-emerald-100/50">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl" />

              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-emerald-100 text-sm">Current Course</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">68% Complete</span>
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">Advanced React Patterns</h3>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-emerald-100">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> 12,340 enrolled
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" /> Certificate
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Courses Completed', value: '12' },
                  { label: 'Learning Hours', value: '48h' },
                  { label: 'Certificates', value: '5' },
                  { label: 'Current Streak', value: '7 days' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Certificate Earned!</p>
                  <p className="text-sm text-slate-500">UI/UX Design Fundamentals</p>
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
