import React from 'react';
import { Users, ListChecks, Award, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      id: 'f-1',
      title: 'দক্ষ ইন্সট্রাক্টর',
      description: 'স্কিল বৃদ্ধি থেকে শুরু করে ক্যারিয়ার ডেভেলপমেন্ট নিজেকে মানসম্পন্ন করে তোলার এ-টু-জেড সিলেবাস ও সার্বক্ষণিক মেন্টরশিপ।',
      icon: Users,
      iconBg: 'bg-lime-50 text-[#76c013] border border-lime-200/60',
    },
    {
      id: 'f-2',
      title: 'সহজ কোর্স মডিউল',
      description: 'দক্ষ প্রশিক্ষকগণ সবচেয়ে সহজ উপায়ে কোর্স মডিউল তৈরি ও বাস্তবধর্মী প্রজেক্টভিত্তিক লেকচার শীট ও রিসোর্স প্রদান করেন।',
      icon: ListChecks,
      iconBg: 'bg-lime-50 text-[#76c013] border border-lime-200/60',
    },
    {
      id: 'f-3',
      title: 'মেধা যাচাই',
      description: 'মেধা যাচাইয়ের জন্য নিয়মিত কুইজ ও এক্সামের ব্যবস্থা। কোর্স শেষে সরকার অনুমোদিত মানসম্মত সনদ প্রদান এবং লাইফ টাইম মেম্বারশীপ।',
      icon: Award,
      iconBg: 'bg-lime-50 text-[#76c013] border border-lime-200/60',
    },
  ];

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100 hover:border-lime-300/80 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Icon Box matching Screenshot 6 & 7 */}
                <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
