import React from 'react';
import { Phone, Mail, MapPin, Facebook, Globe, Twitter, ShieldCheck, Lock } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { useSite } from '../context/SiteContext.tsx';

interface FooterProps {
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminModal }) => {
  const { content, setSelectedCourseModal, setIsVerifyModalOpen, isAdminLoggedIn, setActiveTab } = useSite();

  const handleCourseClick = (courseTitle: string) => {
    const course = content.courses.find(c => c.title.toLowerCase() === courseTitle.toLowerCase());
    if (course) {
      setSelectedCourseModal(course);
    } else {
      const el = document.querySelector('#courses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group courses for footer display
  const col1Courses = content.courses.slice(0, 6);
  const col2Courses = content.courses.slice(6, 12);

  return (
    <footer className="bg-[#070e1b] text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          
          {/* Brand Col matching Screenshot 3 */}
          <div className="md:col-span-12 lg:col-span-4 space-y-5">
            <Logo
              instituteName={content.instituteName.toUpperCase()}
              subtitle={content.instituteSubtitle}
              theme="dark"
              size="md"
            />
            
            <p className="text-slate-400 text-sm font-english tracking-wide">
              {content.instituteTagline}
            </p>

            {/* Social Icons matching Screenshot 3 */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={content.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-[#76c013] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a
                href={`mailto:${content.contact.email1}`}
                className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-[#76c013] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Google Email"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href={content.contact.twitterUrl || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-[#76c013] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="X Twitter"
              >
                <Twitter className="w-5 h-5 fill-current" />
              </a>
            </div>

            {/* Quick Student Verification Callout */}
            <div className="pt-2">
              <button
                onClick={() => setIsVerifyModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-[#76c013] border border-slate-700 hover:border-[#76c013] px-3.5 py-2 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#76c013]" />
                <span>অনলাইন সার্টিফিকেট ভেরিফিকেশন</span>
              </button>
            </div>
          </div>

          {/* Courses Col matching Screenshot 3 */}
          <div className="md:col-span-7 lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              কোর্স সমূহ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-400">
              <div className="space-y-2.5">
                {col1Courses.map((c) => (
                  <div key={c.id}>
                    <button
                      onClick={() => handleCourseClick(c.title)}
                      className="hover:text-white hover:translate-x-1 transition-all text-left block"
                    >
                      {c.title}
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                {col2Courses.map((c) => (
                  <div key={c.id}>
                    <button
                      onClick={() => handleCourseClick(c.title)}
                      className="hover:text-white hover:translate-x-1 transition-all text-left block"
                    >
                      {c.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Col matching Screenshot 3 */}
          <div className="md:col-span-5 lg:col-span-3 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              যোগাযোগ
            </h3>

            <div className="space-y-4 text-sm text-slate-300">
              {/* Phone matching Screenshot 3 */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#76c013] shrink-0 mt-0.5" />
                <div className="space-y-1 font-english">
                  <p>
                    <a href={`tel:${content.contact.phone1}`} className="hover:text-white transition-colors">
                      {content.contact.phone1}
                    </a>
                  </p>
                  <p>
                    <a href={`tel:${content.contact.phone2}`} className="hover:text-white transition-colors">
                      {content.contact.phone2}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email matching Screenshot 3 */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#76c013] shrink-0 mt-0.5" />
                <div className="space-y-1 font-english">
                  <p>
                    <a href={`mailto:${content.contact.email1}`} className="hover:text-white transition-colors">
                      {content.contact.email1}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${content.contact.email2}`} className="hover:text-white transition-colors">
                      {content.contact.email2}
                    </a>
                  </p>
                </div>
              </div>

              {/* Address matching Screenshot 3 */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#76c013] shrink-0 mt-0.5" />
                <div>
                  <p className="leading-snug">{content.contact.address},</p>
                  <p className="text-slate-400 font-semibold">{content.contact.district}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with Admin Login button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {content.instituteName}. সর্বস্বত্ব সংরক্ষিত।</p>
          
          <div className="flex items-center gap-4">
            <span className="font-english">Developed for {content.instituteName}</span>
            <span className="text-slate-700">•</span>
            {/* Admin access trigger in footer */}
            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setActiveTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  onOpenAdminModal();
                }
              }}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#76c013] transition-colors py-1 px-2.5 rounded bg-slate-900 border border-slate-800 font-semibold"
              title="ইনস্টিটিউট এডমিন কন্ট্রোল প্যানেল"
            >
              <Lock className="w-3.5 h-3.5 text-[#76c013]" />
              <span>{isAdminLoggedIn ? 'এডমিন ড্যাশবোর্ড' : 'এডমিন প্যানেল'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
