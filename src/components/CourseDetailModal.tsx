import React, { useState } from 'react';
import { X, Clock, CheckCircle2, Phone, Send, Check } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';
import { renderCourseIcon } from './CoursesSection.tsx';

export const CourseDetailModal: React.FC = () => {
  const { selectedCourseModal, setSelectedCourseModal, content } = useSite();
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!selectedCourseModal) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedCourseModal(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-100 text-[#548a0d] flex items-center justify-center">
              {renderCourseIcon(selectedCourseModal.iconName, 'w-5 h-5')}
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#548a0d] uppercase tracking-wider block font-english">
                {selectedCourseModal.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {selectedCourseModal.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setSelectedCourseModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Key metadata pills */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block">কোর্সের মেয়াদ</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-[#76c013]" />
                <strong className="text-slate-900">{selectedCourseModal.duration}</strong>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block">কোর্স ফি</span>
              <strong className="text-[#548a0d] text-base mt-1 block">
                {selectedCourseModal.fee || 'রেজিস্ট্রেশনের সময় প্রযোজ্য'}
              </strong>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">কোর্স সম্পর্কে:</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedCourseModal.description}
            </p>
          </div>

          {selectedCourseModal.features && selectedCourseModal.features.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">যা যা শিখবেন:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCourseModal.features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 p-2 bg-lime-50/60 rounded-lg border border-lime-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#76c013] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Apply / Contact Form */}
          <div className="pt-4 border-t border-slate-100">
            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 animate-in fade-in">
                <Check className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="font-bold text-sm">আবেদন সফল হয়েছে!</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  আমাদের অ্যাডমিশন প্রতিনিধি দ্রুত আপনার মোবাইল নাম্বারে যোগাযোগ করবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    কোর্সে ভর্তির জন্য প্রি-রেজিস্ট্রেশন করুন:
                  </span>
                  <a
                    href={`tel:${content.contact.phone1}`}
                    className="text-xs font-bold text-[#76c013] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{content.contact.phone1}</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="আপনার নাম"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#76c013] outline-hidden"
                  />
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="মোবাইল নাম্বার"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#76c013] hover:bg-[#68ac0e] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>আবেদন জমা দিন</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
