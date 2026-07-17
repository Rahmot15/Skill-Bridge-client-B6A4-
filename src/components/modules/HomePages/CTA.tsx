"use client"
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-white mb-6">
            Ready to transform your career?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join 50,000+ learners who have already taken the first step. Start learning today —
            no credit card required.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href={'/find-tutors'} className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all hover:-translate-y-1">
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={'/find-tutors'} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 transition-all">
              Talk to an Expert
            </Link>
          </div>

          <p className="mt-8 text-emerald-200 text-sm">
            No credit card required • Start free •  Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
