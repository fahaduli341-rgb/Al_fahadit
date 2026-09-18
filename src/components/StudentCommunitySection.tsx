import React from 'react';
import { Users, ExternalLink } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const StudentCommunitySection: React.FC = () => {
  const { content } = useSite();

  const handleJoinClick = () => {
    // Open facebook community group or contact
    if (content.contact.facebookUrl) {
      window.open(content.contact.facebookUrl, '_blank');
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container matching Screenshot 4 */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          
          {/* Top Community Photo */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-900 overflow-hidden">
            <img
              src={content.communityImage}
              alt="আল-ফাহাদ আইটি শিক্ষার্থী কমিউনিটি"
              className="w-full h-full object-cover object-center brightness-95 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Green CTA Banner matching Screenshot 4 */}
          <div className="bg-[#76c013] px-6 py-8 sm:py-10 text-center text-white flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-english">
              {content.communityTitle}
            </h3>
            <p className="text-white/90 text-sm sm:text-base max-w-xl font-medium font-english">
              {content.communitySubtitle}
            </p>

            <button
              onClick={handleJoinClick}
              id="community-join-now-btn"
              className="mt-2 bg-white hover:bg-slate-50 text-[#548a0d] hover:text-[#416e09] font-extrabold px-8 py-3.5 rounded-xl text-base shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 font-english"
            >
              <span>Join Now</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
