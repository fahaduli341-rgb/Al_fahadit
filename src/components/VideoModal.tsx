import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen, content } = useSite();

  if (!isVideoModalOpen) return null;

  // Format embed url if youtube link given
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(content.videoInfo.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
          <div>
            <h3 className="text-white text-base font-bold tracking-wide uppercase font-english">
              {content.videoInfo.title}
            </h3>
            <p className="text-slate-400 text-xs">
              {content.videoInfo.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl.startsWith('http') ? (
            <iframe
              src={embedUrl}
              title={content.videoInfo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
              <p className="text-lg font-semibold text-white mb-2">ভিডিও লিংক কনফিগারেশন</p>
              <p className="text-sm max-w-md">
                এডমিন প্যানেল থেকে আপনার প্রাতিষ্ঠানিক ইউটিউব ভিডিওর লিংক বা ড্রাইভ লিংক যুক্ত করুন।
              </p>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-5 py-3 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>আল-ফাহাদ আইটি ইনস্টিটিউট ল্যাব ও ক্লাসরুম পরিচিতি</span>
          {content.videoInfo.videoUrl && (
            <a
              href={content.videoInfo.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#76c013] hover:underline font-semibold"
            >
              <span>ইউটিউবে সরাসরি দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
