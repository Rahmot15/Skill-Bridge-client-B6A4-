"use client"
import { motion } from 'framer-motion';
import { Users, GraduationCap, BookOpen, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Active Students',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: GraduationCap,
    value: '1,200+',
    label: 'Expert Tutors',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: BookOpen,
    value: '10,000+',
    label: 'Sessions Completed',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    icon: Globe,
    value: '30+',
    label: 'Countries Reached',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="font-poppins font-bold text-4xl text-slate-900 mb-4">
            Trusted by thousands worldwide
          </h2>
          <p className="text-lg text-slate-600">
            Join a growing community of learners and tutors achieving their goals together.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-slate-50 rounded-3xl p-8 border border-slate-100"
            >
              <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-6`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="font-poppins font-bold text-4xl lg:text-5xl text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
