import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partners = [
    {
      name: 'Aptech',
      sub: 'COMPUTER EDUCATION',
      tag: 'Unleash your potential',
      color: 'border-red-500 text-red-700',
    },
    {
      name: 'FM Method',
      sub: 'LANGUAGE & RESEARCH',
      tag: 'Language Excellence',
      color: 'border-indigo-600 text-indigo-700',
    },
    {
      name: 'eShikhon.com',
      sub: 'E-LEARNING PLATFORM',
      tag: 'Digital Education',
      color: 'border-emerald-600 text-emerald-700',
    },
    {
      name: 'AnchorPoint',
      sub: 'CREATIVE NETWORK',
      tag: 'Design & Tech',
      color: 'border-slate-800 text-slate-800',
    },
    {
      name: 'FREELANCING ACADEMY',
      sub: 'MARKETPLACE GUILD',
      tag: 'Global Career',
      color: 'border-lime-600 text-[#548a0d]',
    },
    {
      name: 'Guardian Network',
      sub: 'IT SECURITY & CLOUD',
      tag: 'Enterprise Alliance',
      color: 'border-orange-500 text-orange-700',
    },
  ];

  return (
    <section className="py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headline matching Screenshot 4 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            আমাদের <span className="text-[#76c013]">পার্টনারসমূহ</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            জাতীয় ও আন্তর্জাতিক মানের শিক্ষামূলক ও প্রযুক্তি পার্টনার নেটওয়ার্ক
          </p>
        </div>

        {/* 6 Partner Cards matching Screenshot 4 grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-lime-400 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all duration-300 group min-h-[110px]"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-lime-50 flex items-center justify-center mb-2 transition-colors">
                <ShieldCheck className="w-4 h-4 text-[#76c013]" />
              </div>
              <span className="font-english font-black text-sm sm:text-base text-slate-900 group-hover:text-[#548a0d] transition-colors leading-tight">
                {partner.name}
              </span>
              <span className="font-english text-[9px] uppercase tracking-wider text-slate-600 mt-0.5">
                {partner.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
