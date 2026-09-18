import React, { useState } from 'react';
import { Award, CheckCircle, ChevronDown, ChevronUp, ShieldCheck, MapPin } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const AboutSection: React.FC = () => {
  const { content } = useSite();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Curved Photo Collage matching Screenshot 9 */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative background circle */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-lime-300/60 animate-spin-slow pointer-events-none" />
              
              {/* Main large circular frame */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                <img
                  src={content.aboutImage}
                  alt="আল-ফাহাদ আইটি ক্লাসরুম"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating secondary student circular portrait */}
              <div className="absolute -bottom-4 -left-4 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="শিক্ষার্থী পোর্ট্রেট"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Award badge matching Screenshot 9 */}
              <div className="absolute top-2 left-6 bg-[#76c013] text-white p-3.5 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
                <Award className="w-8 h-8 stroke-[2.5]" />
              </div>

              {/* Floating Location Pill */}
              <div className="absolute bottom-6 right-2 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#76c013]" />
                <span className="text-xs font-bold text-slate-800 font-english">{content.contact.district}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Content matching Screenshot 9 */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-50 text-[#76c013] text-xs sm:text-sm font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{content.aboutBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              আমাদের <span className="text-[#76c013]">সম্পর্কে</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {content.aboutText1}
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {content.aboutText2}
            </p>

            {/* Expandable detailed story */}
            {isExpanded && (
              <div className="p-5 rounded-2xl bg-lime-50/70 border border-lime-200/80 space-y-3 animate-in fade-in duration-300">
                <h4 className="font-bold text-slate-900 text-base">আমাদের লক্ষ্য ও উদ্দেশ্য:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#76c013] shrink-0 mt-0.5" />
                    <span>প্রতিটি শিক্ষার্থীকে আধুনিক প্রযুক্তিতে দক্ষ ও সাবলম্বী করে গড়ে তোলা।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#76c013] shrink-0 mt-0.5" />
                    <span>আন্তর্জাতিক ফ্রিল্যান্সিং মার্কেটপ্লেস ও দেশীয় কর্পোরেট সেক্টরে সরাসরি কর্মসংস্থান তৈরি।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#76c013] shrink-0 mt-0.5" />
                    <span>কোর্স শেষে লাইফটাইম সাপোর্ট এবং রিয়েল ক্লায়েন্ট প্রজেক্ট হ্যান্ডলিং অভিজ্ঞতা প্রদান।</span>
                  </li>
                </ul>
              </div>
            )}

            {/* "আরো জানুন" Button matching Screenshot 9 */}
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                id="about-learn-more-btn"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#76c013] text-slate-800 hover:text-[#76c013] font-bold px-6 py-3 rounded-xl transition-all shadow-xs hover:shadow-md"
              >
                <span>{isExpanded ? 'সংক্ষিপ্ত করুন' : 'আরো জানুন'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
