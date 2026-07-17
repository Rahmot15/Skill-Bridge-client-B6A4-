"use client"
import { motion } from 'framer-motion';
import { Search, Calendar, BookOpen, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Find Your Tutor',
    description: 'Browse through our curated list of expert tutors. Filter by subject, rating, price, and availability.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Calendar,
    step: '02',
    title: 'Book a Session',
    description: 'Choose a convenient time slot and book your session. Get instant confirmation and reminders.',
    gradient: 'from-yellow-400 to-yellow-500',
  },
  {
    icon: BookOpen,
    step: '03',
    title: 'Learn & Grow',
    description: 'Attend your personalized session. Ask questions, practice skills, and get expert feedback.',
    gradient: 'from-emerald-600 to-emerald-700',
  },
  {
    icon: Trophy,
    step: '04',
    title: 'Achieve Goals',
    description: 'Track your progress, earn certificates, and reach your learning milestones with confidence.',
    gradient: 'from-yellow-400 to-yellow-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-poppins font-bold text-4xl text-slate-900 mb-4">
            Start learning in 4 simple steps
          </h2>
          <p className="text-lg text-slate-600">
            Our streamlined process makes it easy to connect with expert tutors
            and begin your learning journey today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-100"
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {step.step}
              </div>

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="font-poppins font-semibold text-xl text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
