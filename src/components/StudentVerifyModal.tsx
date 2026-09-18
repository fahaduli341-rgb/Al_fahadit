import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, Award, Printer, User, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';
import { StudentRecord } from '../types.ts';
import { Logo } from './Logo.tsx';

export const StudentVerifyModal: React.FC = () => {
  const { isVerifyModalOpen, setIsVerifyModalOpen, verifyStudent, content } = useSite();
  const [studentId, setStudentId] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<StudentRecord | null>(null);

  if (!isVerifyModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    const res = verifyStudent(studentId, batchNumber);
    setResult(res);
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#76c013]" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-english">
              Official Student Verification System
            </span>
          </div>

          <button
            onClick={() => {
              setIsVerifyModalOpen(false);
              setSearched(false);
              setResult(null);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Header matching Screenshot 1 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              আমাদের শিক্ষার্থী <span className="text-[#76c013]">অনুসন্ধান</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              সার্টিফিকেট ও শিক্ষার্থী ডাটাবেস যাচাই করার জন্য স্টুডেন্ট আইডি ও ব্যাচ নাম্বার দিন
            </p>
          </div>

          {/* Form Card matching Screenshot 1 */}
          <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-english">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID (e.g. AFIT-2024-101)"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-english">
                Batch Number
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Enter Batch Number (e.g. Batch-42)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden transition-all bg-white"
              />
            </div>

            <button
              type="submit"
              id="verify-submit-btn"
              className="w-full bg-[#76c013] hover:bg-[#68ac0e] text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 font-english"
            >
              <Search className="w-5 h-5" />
              <span>Verify Student</span>
            </button>
          </form>

          {/* Result Area */}
          {searched && (
            <div className="mt-8 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {result ? (
                <div className="bg-gradient-to-b from-lime-50/50 to-white rounded-2xl border-2 border-[#76c013]/40 p-6 shadow-md relative overflow-hidden">
                  
                  {/* Verified Watermark Badge */}
                  <div className="flex items-center justify-between border-b border-lime-200/80 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#76c013] text-white flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#548a0d] bg-lime-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Officially Verified Student
                        </span>
                        <h4 className="text-lg font-black text-slate-900 mt-0.5">
                          {result.studentName}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={handlePrint}
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg hover:shadow-xs transition-all"
                    >
                      <Printer className="w-4 h-4 text-slate-600" />
                      <span>প্রিন্ট ভেরিফিকেশন</span>
                    </button>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 block">স্টুডেন্ট আইডি (Student ID)</span>
                      <strong className="text-slate-900 font-mono font-bold">{result.studentId}</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 block">ব্যাচ নাম্বার (Batch Number)</span>
                      <strong className="text-slate-900 font-bold">{result.batchNumber}</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100 sm:col-span-2">
                      <span className="text-xs text-slate-600 block">কোর্সের নাম (Course Name)</span>
                      <strong className="text-[#548a0d] font-bold text-base">{result.courseName}</strong>
                    </div>

                    {result.fatherName && (
                      <div className="p-3 bg-white rounded-xl border border-slate-100">
                        <span className="text-xs text-slate-600 block">পিতার নাম (Father's Name)</span>
                        <strong className="text-slate-800">{result.fatherName}</strong>
                      </div>
                    )}

                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 block">ফলাফল / গ্রেড (Result)</span>
                      <strong className="text-emerald-700 font-bold">{result.grade}</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 block">কোর্স সময়কাল (Duration)</span>
                      <strong className="text-slate-800">{result.duration}</strong>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 block">সনদ ইস্যু তারিখ (Issue Date)</span>
                      <strong className="text-slate-800">{result.issueDate}</strong>
                    </div>
                  </div>

                  {result.certificateNumber && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>সনদ নং: {result.certificateNumber}</span>
                      <span className="text-emerald-600 font-bold">STATUS: VALID</span>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-800">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base mb-1">কোনো রেকর্ড পাওয়া যায়নি</h4>
                  <p className="text-xs sm:text-sm text-red-700 max-w-md mx-auto">
                    প্রদত্ত স্টুডেন্ট আইডি: <strong className="font-mono">{studentId}</strong> এবং ব্যাচ: <strong className="font-mono">{batchNumber || 'N/A'}</strong> এর সাথে মিল রেখে কোনো সনদ বা রেকর্ড ডাটাবেসে পাওয়া যায়নি। দয়া করে সঠিক তথ্য দিন।
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>আল-ফাহাদ আইটি ইনস্টিটিউট — ডিজিটাল সনদ ভেরিফিকেশন পোর্টাল</span>
        </div>

      </div>
    </div>
  );
};
