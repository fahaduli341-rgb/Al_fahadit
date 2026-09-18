import React, { useState } from 'react';
import { Eye, MapPin, Monitor } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const LabGallerySection: React.FC = () => {
  const { content } = useSite();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const galleryItems = content.gallery || [];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headline matching Screenshot 5 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            অফিস এবং প্রশিক্ষণের <span className="text-[#76c013]">স্থান</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            শীতাতপ নিয়ন্ত্রিত আধুনিক কম্পিউটার ল্যাব, ব্রডব্যান্ড নেটওয়ার্ক ও মাল্টিমিডিয়া প্রজেক্টরের সুব্যবস্থা
          </p>
        </div>

        {/* Gallery Grid matching Screenshot 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item.url)}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-white border border-slate-200/80 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-[#76c013] font-bold mb-1 flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5" />
                  <span>আল-ফাহাদ আইটি ল্যাব</span>
                </span>
                <h4 className="font-bold text-sm sm:text-base leading-snug">
                  {item.title}
                </h4>
              </div>

              {/* Quick eye icon on hover */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox photo modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center animate-in fade-in cursor-zoom-out"
        >
          <div className="max-w-4xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={selectedPhoto}
              alt="Lab view"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
