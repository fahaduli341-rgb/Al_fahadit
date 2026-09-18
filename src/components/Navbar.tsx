import React, { useState } from 'react';
import { Menu, X, CheckCircle2, ShieldCheck, PhoneCall, Settings } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { useSite } from '../context/SiteContext.tsx';

interface NavbarProps {
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content, setIsVerifyModalOpen, activeTab, setActiveTab, isAdminLoggedIn } = useSite();

  const navLinks = [
    { name: 'হোম', id: 'home', target: '#hero' },
    { name: 'আমাদের সম্পর্কে', id: 'about', target: '#about' },
    { name: 'কোর্স সমূহ', id: 'courses', target: '#courses' },
    { name: 'শিক্ষক মণ্ডলী', id: 'mentors', target: '#mentors' },
    { name: 'গ্যালারি', id: 'gallery', target: '#gallery' },
    { name: 'যোগাযোগ', id: 'contact', target: '#contact' },
  ];

  const handleNavClick = (linkId: string, target: string) => {
    setActiveTab(linkId);
    setMobileMenuOpen(false);
    
    // If admin is open, switch back to home view
    if (activeTab === 'admin' || activeTab === 'verify-page') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top micro bar with contact hotline */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#76c013]" />
              হটলাইন: <strong className="text-white">{content.contact.phone1}</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-400">{content.contact.officeHours}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-english">{content.instituteTagline}</span>
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-2.5 py-0.5 rounded text-[11px]"
              title="এডমিন প্যানেল লগইন"
            >
              <Settings className="w-3 h-3 text-[#76c013]" />
              {isAdminLoggedIn ? 'এডমিন ড্যাশবোর্ড' : 'এডমিন লগইন'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', '#hero');
            }}
            className="group"
          >
            <Logo
              instituteName={content.instituteName.toUpperCase()}
              subtitle={content.instituteSubtitle}
              size="md"
            />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.target);
                }}
                className={`px-3.5 py-2 text-[15px] font-semibold transition-colors rounded-lg ${
                  activeTab === link.id
                    ? 'text-[#76c013] font-bold bg-lime-50/80'
                    : 'text-slate-700 hover:text-[#76c013] hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-verify-student-btn"
              onClick={() => setIsVerifyModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#76c013] hover:bg-[#68ac0e] text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Student</span>
            </button>

            {isAdminLoggedIn ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3.5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-4 h-4 text-[#76c013]" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Admin Login"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#76c013] text-white px-3 py-2 rounded-lg text-xs font-bold sm:hidden"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer matching Screenshot 2 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.target);
                }}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                  activeTab === link.id
                    ? 'text-[#76c013] bg-lime-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsVerifyModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#76c013] text-white py-3 rounded-lg text-base font-bold shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Verify Student</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdminLoggedIn) {
                  setActiveTab('admin');
                } else {
                  onOpenAdminModal();
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <Settings className="w-4 h-4 text-[#76c013]" />
              <span>{isAdminLoggedIn ? 'এডমিন ড্যাশবোর্ড' : 'এডমিন প্যানেল লগইন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
