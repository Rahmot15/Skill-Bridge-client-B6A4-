import { BookOpen, Twitter, Linkedin, Github, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'Find Tutors', href: '/find-tutors' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'For Teams', href: '/about' },
    { label: 'For Enterprise', href: '/about' },
    { label: 'AI Learning', href: '/about' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/about' },
    { label: 'Blog', href: '/about' },
    { label: 'Press', href: '/about' },
    { label: 'Partners', href: '/about' },
  ],
  Resources: [
    { label: 'Help Center', href: '/contact' },
    { label: 'Community', href: '/find-tutors' },
    { label: 'Webinars', href: '/about' },
    { label: 'Documentation', href: '/about' },
    { label: 'API', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/privacy' },
    { label: 'Cookie Policy', href: '/privacy' },
    { label: 'Accessibility', href: '/privacy' },
    { label: 'GDPR', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/skillbridge', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/skillbridge', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Rahmot15', label: 'GitHub' },
  { icon: Youtube, href: 'https://youtube.com/@skillbridge', label: 'YouTube' },
];

export default function Footers() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl text-white">SkillBridge</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-xs">
              Empowering learners worldwide to achieve their full potential through
              expert-led online education.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 SkillBridge. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Mail className="w-4 h-4" />
              support@skillbridge.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
