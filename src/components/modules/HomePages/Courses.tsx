"use client"
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Advanced React & TypeScript',
    category: 'Development',
    instructor: 'Sarah Chen',
    image: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    rating: 4.9,
    students: 12450,
    duration: '24 hours',
    price: 89,
    level: 'Advanced'
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    category: 'Design',
    instructor: 'Marcus Johnson',
    image: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
    rating: 4.8,
    students: 8920,
    duration: '18 hours',
    price: 79,
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Data Science with Python',
    category: 'Data Science',
    instructor: 'Dr. Emily Watson',
    image: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    rating: 4.9,
    students: 15680,
    duration: '32 hours',
    price: 99,
    level: 'Intermediate'
  },
  {
    id: 4,
    title: 'Product Management Pro',
    category: 'Business',
    instructor: 'Alex Rivera',
    image: 'bg-gradient-to-br from-emerald-300 to-emerald-500',
    rating: 4.7,
    students: 5430,
    duration: '16 hours',
    price: 69,
    level: 'Beginner'
  },
];

const categories = ['All', 'Development', 'Design', 'Data Science', 'Business'];

export default function Courses() {
  return (
    <section id="courses" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
            Popular Courses
          </span>
          <h2 className="font-poppins font-bold text-4xl text-slate-900 mb-4">
            Start your learning journey
          </h2>
          <p className="text-lg text-slate-600">
            Explore our most popular courses across technology, design, and business.
            Each course is crafted by industry experts.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                category === 'All'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300"
            >
              <div className={`h-40 ${course.image} relative`}>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700">
                  {course.level}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-700">
                  ${course.price}
                </div>
              </div>

              <div className="p-6">
                <span className="text-sm text-emerald-600 font-medium">{course.category}</span>
                <h3 className="font-poppins font-semibold text-lg text-slate-900 mt-1 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                    {course.instructor[0]}
                  </div>
                  <span className="text-sm text-slate-500">{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-slate-900">{course.rating}</span>
                    <span className="text-slate-400 text-sm">({course.students.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:-translate-y-1">
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
