import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

export const ContactSection: React.FC = () => {
  const { content } = useSite();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', course: '', message: '' });
    }, 3500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#76c013] mb-2 block font-english">
            Direct Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            আমাদের সাথে <span className="text-[#76c013]">যোগাযোগ</span> করুন
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            কোর্সে ভর্তি, ক্যারিয়ার গাইডলাইন বা যে কোনো তথ্যের জন্য আমাদের কল করুন অথবা সরাসরি অফিসে চলে আসুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Cards: Contact Info matching Screenshot 3 */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-100 text-[#548a0d] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  ফোন নাম্বার (হটলাইন)
                </h4>
                <div className="space-y-1 text-base font-semibold text-slate-800 font-english">
                  <div>
                    <a href={`tel:${content.contact.phone1}`} className="hover:text-[#76c013] transition-colors">
                      {content.contact.phone1}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${content.contact.phone2}`} className="hover:text-[#76c013] transition-colors">
                      {content.contact.phone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-100 text-[#548a0d] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  ইমেইল এড্রেস
                </h4>
                <div className="space-y-1 text-sm font-semibold text-slate-800 font-english">
                  <div>
                    <a href={`mailto:${content.contact.email1}`} className="hover:text-[#76c013] transition-colors">
                      {content.contact.email1}
                    </a>
                  </div>
                  <div>
                    <a href={`mailto:${content.contact.email2}`} className="hover:text-[#76c013] transition-colors">
                      {content.contact.email2}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-100 text-[#548a0d] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  প্রতিষ্ঠানের ঠিকানা
                </h4>
                <p className="text-base text-slate-800 font-medium">
                  {content.contact.address}
                </p>
                <p className="text-sm text-slate-600 font-bold mt-0.5">
                  {content.contact.district}
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-100 text-[#548a0d] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  অফিস খোলা থাকার সময়
                </h4>
                <p className="text-sm text-slate-700 font-medium">
                  {content.contact.officeHours}
                </p>
              </div>
            </div>

          </div>

          {/* Right Form: Interactive Consultation Request */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              ফ্রি ক্যারিয়ার কাউন্সেলিং বা বার্তা পাঠান
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              আপনার নাম ও যোগাযোগের নাম্বার দিলে আমাদের ক্যারিয়ার অ্যাডভাইজার আপনাকে বিস্তারিত গাইডলাইন দেবে।
            </p>

            {formSent ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-xl font-bold mb-1">বার্তা সফলভাবে গৃহীত হয়েছে!</h4>
                <p className="text-sm text-emerald-700">
                  ধন্যবাদ! আল-ফাহাদ আইটি প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="পুরো নাম লিখুন"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">মোবাইল নাম্বার *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="০১৭xxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">আগ্রহী কোর্স</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden bg-white"
                  >
                    <option value="">কোর্স সিলেক্ট করুন...</option>
                    {content.courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">আপনার বার্তা বা প্রশ্ন</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="কোর্স সম্পর্কে আপনার কোনো প্রশ্ন থাকলে লিখুন..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full bg-[#76c013] hover:bg-[#68ac0e] text-white py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>বার্তা পাঠিয়ে দিন</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
