import React from 'react';
import { Phone, Play, ArrowRight, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const HeroSection: React.FC = () => {
  const { content, setIsVideoModalOpen } = useSite();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 md:py-20 overflow-hidden bg-gradient-to-b from-lime-50/40 via-white to-white">
      {/* Subtle background ambient circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-lime-200/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-emerald-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge matching Screenshot 2 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#76c013]/40 bg-lime-50/80 text-[#548a0d] text-sm md:text-base font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#76c013] animate-pulse" />
              <span>{content.heroBadge}</span>
            </div>

            {/* Headline matching Screenshot 2 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.25] tracking-tight">
              {content.heroHeadline}{' '}
              <span className="text-[#76c013] inline-block relative">
                {content.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Subtitle text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {content.heroSubtext}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                onClick={scrollToContact}
                id="hero-contact-btn"
                className="inline-flex items-center justify-center gap-2.5 bg-[#76c013] hover:bg-[#68ac0e] text-white px-7 py-3.5 rounded-xl text-base font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-5 h-5" />
                <span>যোগাযোগ করুন</span>
              </a>

              <a
                href="#courses"
                onClick={scrollToCourses}
                id="hero-courses-btn"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 px-6 py-3.5 rounded-xl text-base font-bold transition-all shadow-xs"
              >
                <BookOpen className="w-5 h-5 text-[#76c013]" />
                <span>আমাদের কোর্স সমূহ</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Micro proof bullets */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#76c013] shrink-0" />
                <span>হাতে-কলমে প্র্যাকটিক্যাল ল্যাব</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#76c013] shrink-0" />
                <span>অনলাইন ও অফলাইন ব্যাচ</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCircle className="w-4 h-4 text-[#76c013] shrink-0" />
                <span>লাইফটাইম সাপোর্ট</span>
              </div>
            </div>
          </div>

          {/* Right Column: Video Tour Card matching Screenshot 10 & 11 */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#76c013]/30 to-emerald-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Main Card Container */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                {/* Image / Video Poster */}
                <div className="relative aspect-video sm:aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={content.videoInfo.thumbnailUrl}
                    alt={content.videoInfo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Dark overlay with filmic gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* Centered Play Button matching Screenshot 10/11 */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    id="hero-play-video-btn"
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#76c013] hover:bg-[#86d817] text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                    aria-label="Play introduction video"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-white transition-transform group-hover/btn:scale-110" />
                    {/* Ripple animation ring */}
                    <span className="absolute inset-0 rounded-full bg-[#76c013] animate-ping opacity-30 pointer-events-none" />
                  </button>

                  {/* Badge & Title overlay matching Screenshot 10 */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-[#76c013] text-xs font-bold uppercase tracking-wider mb-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{content.videoInfo.duration} মিনিট ট্যুর</span>
                    </div>
                    <h3 className="text-white font-extrabold text-base sm:text-lg tracking-wide uppercase font-english drop-shadow-md">
                      {content.videoInfo.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-1 mt-0.5">
                      {content.videoInfo.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom strip inside card */}
                <div className="bg-slate-900/95 px-4 py-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ভিডিওতে প্রতিষ্ঠান ও ক্লাস সম্পর্কে জানুন
                  </span>
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="text-[#76c013] hover:underline font-semibold"
                  >
                    ভিডিও প্লে করুন
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
