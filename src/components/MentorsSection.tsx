import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const MentorsSection: React.FC = () => {
  const { content } = useSite();
  const [currentIndex, setCurrentIndex] = useState(0);

  const mentors = content.mentors || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mentors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mentors.length - 1 ? 0 : prev + 1));
  };

  if (mentors.length === 0) return null;

  const currentMentor = mentors[currentIndex];

  return (
    <section id="mentors" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 5 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            আমাদের <span className="text-[#76c013]">শিক্ষক মণ্ডলী</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            আল-ফাহাদ আইটি ইনস্টিটিউট-এ আছেন ইন্ডাস্ট্রি সেরা এক্সপার্ট মেন্টর প্যানেল। যাদের তত্ত্বাবধানে থেকে শিক্ষার্থীরা নিজেকে দক্ষ করে গড়ে তোলে কর্মসংস্থানের সুযোগ তৈরী করছে।
          </p>
        </div>

        {/* Carousel Slider matching Screenshot 5 */}
        <div className="max-w-xl mx-auto relative px-12 sm:px-14">
          
          {/* Left arrow button */}
          <button
            onClick={handlePrev}
            id="mentor-prev-btn"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#76c013] hover:border-[#76c013] flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label="Previous mentor"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Mentor Profile Card matching Screenshot 5 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-lg text-center transition-all duration-300">
            {/* Circular Mentor Image */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-lime-100 shadow-md bg-slate-100 relative">
              <img
                src={currentMentor.photoUrl}
                alt={currentMentor.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Name */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight font-english">
              {currentMentor.name}
            </h3>

            {/* Designation (পদ) matching Screenshot 5 in green */}
            <p className="text-base sm:text-lg font-bold text-[#76c013] mb-3 font-english">
              {currentMentor.designation}
            </p>

            {/* Department */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600 mb-4">
              <Briefcase className="w-3.5 h-3.5 text-[#76c013]" />
              <span>{currentMentor.department}</span>
            </div>

            {/* Bio */}
            {currentMentor.bio && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                {currentMentor.bio}
              </p>
            )}
          </div>

          {/* Right arrow button */}
          <button
            onClick={handleNext}
            id="mentor-next-btn"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#76c013] hover:border-[#76c013] flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label="Next mentor"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator matching Screenshot 5 */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {mentors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-7 bg-[#76c013]'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to mentor ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
