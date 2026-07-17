"use client"

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "LearnFlow completely transformed my career. The AI-powered learning path helped me transition from marketing to software engineering in just 8 months. I landed my dream job at a top tech company!",
    name: "Jessica Martinez",
    role: "Software Engineer at Google",
    avatar: "bg-emerald-200",
    rating: 5
  },
  {
    id: 2,
    quote: "The quality of instruction is unmatched. I've taken courses on other platforms, but LearnFlow's project-based approach gave me the practical skills I needed to succeed in my role.",
    name: "David Kim",
    role: "Product Designer at Airbnb",
    avatar: "bg-yellow-200",
    rating: 5
  },
  {
    id: 3,
    quote: "As a busy professional, I needed flexibility. LearnFlow's mobile app and lifetime access meant I could learn at my own pace. The certificate helped me get promoted!",
    name: "Priya Sharma",
    role: "Data Analyst at Deloitte",
    avatar: "bg-emerald-300",
    rating: 5
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="font-poppins font-bold text-4xl text-slate-900 mb-4">
            Loved by learners worldwide
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of satisfied students who have transformed their careers through LearnFlow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-100" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 relative z-10">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-lg font-semibold text-slate-700`}>
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
