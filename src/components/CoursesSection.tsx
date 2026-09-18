import React, { useState } from 'react';
import { 
  Box, 
  TrendingUp, 
  Palette, 
  Code, 
  FileSpreadsheet, 
  Video, 
  MessageSquare, 
  BookOpen, 
  Award, 
  Cpu, 
  BarChart3, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Search
} from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';
import { Course } from '../types.ts';

// Map icon names to Lucide icons
export const renderCourseIcon = (iconName: string, className = "w-6 h-6") => {
  switch (iconName?.toLowerCase()) {
    case 'box':
      return <Box className={className} />;
    case 'trendingup':
    case 'marketing':
      return <TrendingUp className={className} />;
    case 'palette':
    case 'design':
      return <Palette className={className} />;
    case 'code':
    case 'web':
      return <Code className={className} />;
    case 'filespreadsheet':
    case 'excel':
      return <FileSpreadsheet className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'messagesquare':
    case 'english':
      return <MessageSquare className={className} />;
    case 'bookopen':
      return <BookOpen className={className} />;
    case 'award':
    case 'diploma':
      return <Award className={className} />;
    case 'cpu':
    case 'hardware':
      return <Cpu className={className} />;
    case 'barchart3':
      return <BarChart3 className={className} />;
    case 'laptop':
    default:
      return <Laptop className={className} />;
  }
};

export const CoursesSection: React.FC = () => {
  const { content, setSelectedCourseModal } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'সব কোর্স' },
    { id: 'creative', label: 'গ্রাফিক্স ও ভিডিও' },
    { id: 'web', label: 'ওয়েব ও প্রোগ্রামিং' },
    { id: 'marketing', label: 'ডিজিটাল মার্কেটিং' },
    { id: 'language', label: 'স্পোকেন ইংলিশ' },
    { id: 'office', label: 'অফিস ও ডিপ্লোমা' },
  ];

  const filteredCourses = content.courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'all') return true;
    if (activeCategory === 'creative') {
      return course.category.toLowerCase().includes('design') || course.category.toLowerCase().includes('multimedia');
    }
    if (activeCategory === 'web') {
      return course.category.toLowerCase().includes('programming') || course.category.toLowerCase().includes('web');
    }
    if (activeCategory === 'marketing') {
      return course.category.toLowerCase().includes('marketing');
    }
    if (activeCategory === 'language') {
      return course.category.toLowerCase().includes('language');
    }
    if (activeCategory === 'office') {
      return course.category.toLowerCase().includes('basic') || course.category.toLowerCase().includes('certification') || course.category.toLowerCase().includes('corporate');
    }
    return true;
  });

  return (
    <section id="courses" className="py-16 md:py-24 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 10 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#76c013] mb-2 block font-english">
            Industry Standard Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            আমাদের <span className="text-[#76c013]">কোর্স সমূহ</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            দক্ষ শিক্ষক ও বাস্তবধর্মী কারিকুলাম নিয়ে আপনার সুবিধামত সময়ে অনলাইন বা অফলাইনে পছন্দের কোর্সে যুক্ত হোন।
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="কোর্সের নাম লিখে খুঁজুন..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 text-slate-800 text-sm outline-hidden shadow-xs transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#76c013] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid matching Screenshot 10 card aesthetics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-lime-400 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon + Duration */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-lime-50 border border-lime-200/80 text-[#76c013] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#76c013] group-hover:text-white transition-all duration-300">
                    {renderCourseIcon(course.iconName, "w-6 h-6")}
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-[#76c013]" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Title matching Screenshot 10 */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#65a30d] transition-colors mb-2">
                  {course.title}
                </h3>

                {/* Short description */}
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Features Pill list */}
                {course.features && course.features.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 mb-5">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#76c013] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Fee & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-600 block uppercase font-medium">কোর্স ফি</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {course.fee || 'আলোচনা সাপেক্ষে'}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#76c013] hover:text-[#548a0d] bg-lime-50 hover:bg-lime-100 px-3.5 py-2 rounded-lg transition-colors"
                >
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 font-semibold">আপনার সার্চের সাথে মিল রয়েছে এমন কোনো কোর্স পাওয়া যায়নি।</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-sm text-[#76c013] hover:underline font-bold"
            >
              সব কোর্স দেখুন
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
