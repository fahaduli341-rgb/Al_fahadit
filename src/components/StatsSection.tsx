import React from 'react';
import { GraduationCap, Banknote, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const StatsSection: React.FC = () => {
  const { content } = useSite();

  const statItems = [
    {
      id: 'stat-students',
      value: content.stats.totalStudents,
      label: 'সর্বমোট শিক্ষার্থী ট্রেনিং নিয়েছেন',
      icon: GraduationCap,
      color: 'text-[#76c013]',
    },
    {
      id: 'stat-freelancers',
      value: content.stats.successfulFreelancers,
      label: 'সফল ফ্রিল্যান্সার ও উদ্যোক্তা',
      icon: Banknote,
      color: 'text-[#76c013]',
    },
    {
      id: 'stat-trainers',
      value: content.stats.trainersCount,
      label: 'শিক্ষক ট্রেনিং দিচ্ছেন',
      icon: Users,
      color: 'text-[#76c013]',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-lime-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching Screenshot 8 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            সফলতার <span className="text-[#76c013]">{content.stats.yearsExperience} বছর</span>
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            দক্ষতা অর্জন ও স্বাবলম্বী হওয়ার বিশ্বস্ত প্রতিষ্ঠান
          </p>
        </div>

        {/* 3 Stat Cards matching Screenshot 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Soft decorative background tint */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-lime-100/40 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none" />

                <div>
                  {/* Icon in soft green container */}
                  <div className="w-14 h-14 rounded-2xl bg-lime-50 border border-lime-200/70 text-[#76c013] flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Stat Big Number matching Screenshot 8 in lime green */}
                  <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#76c013] tracking-tight mb-2 font-english">
                    {item.value}
                  </div>
                </div>

                {/* Stat Label */}
                <p className="text-slate-700 font-semibold text-base sm:text-lg leading-snug">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: "কেন আমরা সবার চেয়ে এগিয়ে" matching Screenshot 8 */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              কেন আমরা সবার চেয়ে <span className="text-[#76c013]">এগিয়ে</span>
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              দেশ ও দেশের বাইরে বর্তমানে যে স্কিলগুলোর চাহিদা সবচেয়ে বেশি, সেসব দিয়েই সাজানো হয়েছে আমাদের কোর্স লিস্ট। এখান থেকে আপনার সুবিধামত অনলাইন বা অফলাইনে কোর্সে এনরোল করতে পারবেন যেকোনো সময়।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76c013]" />
                <span>১০০% প্র্যাকটিক্যাল ল্যাব অ্যাসাইনমেন্ট</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76c013]" />
                <span>ফ্রি ক্লাস রিপিট ও মেকআপ সাপোর্ট</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76c013]" />
                <span>আন্তর্জাতিক ফ্রিল্যান্সিং একাউন্ট ভেরিফিকেশন</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#76c013]" />
                <span>সরকারি ও প্রাতিষ্ঠানিক সনদ প্রদান</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
