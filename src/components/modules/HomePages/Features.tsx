"use client"
import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Shield,
  Users,
  Trophy,
  Smartphone,
  PlayCircle,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths adapted to your pace and goals using advanced AI algorithms.',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Zap,
    title: 'Learn at Your Pace',
    description: 'Access courses anytime, anywhere. Learn on your schedule with lifetime access to content.',
    gradient: 'from-yellow-400 to-yellow-500'
  },
  {
    icon: Shield,
    title: 'Industry Recognized',
    description: 'Earn certificates recognized by top companies worldwide. Boost your professional profile.',
    gradient: 'from-emerald-600 to-emerald-700'
  },
  {
    icon: Users,
    title: 'Expert Community',
    description: 'Join a vibrant community of learners. Connect, collaborate, and grow together.',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Trophy,
    title: 'Hands-on Projects',
    description: 'Build real-world portfolio projects that demonstrate your skills to employers.',
    gradient: 'from-yellow-400 to-yellow-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Learning',
    description: 'Seamless experience across all devices. Continue learning on the go with our app.',
    gradient: 'from-emerald-600 to-emerald-700'
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-poppins font-bold text-4xl text-slate-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-slate-600">
            Our platform combines cutting-edge technology with expert instruction to deliver
            an unparalleled learning experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-100"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
