"use client"
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for getting started',
    price: 0,
    period: 'forever',
    features: [
      'Access to 50+ free courses',
      'Community support',
      'Basic progress tracking',
      'Mobile app access',
      'Course completion certificates',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Best for serious learners',
    price: 29,
    period: 'month',
    features: [
      'Access to all 500+ courses',
      'Priority support',
      'AI-powered learning paths',
      'Advanced analytics',
      'Downloadable resources',
      'Offline viewing',
      'Career coaching sessions',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Team',
    description: 'For teams and organizations',
    price: 79,
    period: 'month',
    features: [
      'Everything in Pro',
      'Team management dashboard',
      'Custom learning paths',
      'Admin analytics',
      'SSO integration',
      'Dedicated account manager',
      'Custom certificates',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="font-poppins font-bold text-4xl text-slate-900 mb-4">
            Choose your plan
          </h2>
          <p className="text-lg text-slate-600">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-100 scale-105'
                  : 'border-slate-100 shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                  <Zap className="w-4 h-4" /> Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-emerald-500' : 'bg-emerald-100'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-emerald-600'}`} />
                    </div>
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-full font-semibold transition-all ${
                plan.popular
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-emerald-900 shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:-translate-y-1'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-2 border-emerald-200 hover:border-emerald-300'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
