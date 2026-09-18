import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';
import { Logo } from './Logo.tsx';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin, content } = useSite();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setError(false);
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#76c013]" />
            <span className="text-xs font-bold uppercase tracking-wider font-english">
              Institute Admin Authentication
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <Logo
              instituteName={content.instituteName.toUpperCase()}
              subtitle="AUTHORIZED ACCESS ONLY"
              size="sm"
              className="justify-center mb-3"
            />
            <h3 className="text-xl font-bold text-slate-900">
              এডমিন ড্যাশবোর্ড লগইন
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              প্রতিষ্ঠানের তথ্য ও ডাটাবেস পরিবর্তনের জন্য এডমিন পাসওয়ার্ড দিন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-english">
                Admin Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                
                {/* Masked / Hidden Password Input with Eye Toggle */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  required
                  autoFocus
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-[#76c013] focus:ring-2 focus:ring-[#76c013]/20 outline-hidden bg-white"
                />

                {/* Eye toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-600 font-medium mt-2">
                  ভুল পাসওয়ার্ড! দয়া করে সঠিক পাসওয়ার্ড প্রদান করুন।
                </p>
              )}
            </div>

            <button
              type="submit"
              id="admin-login-submit-btn"
              className="w-full bg-[#76c013] hover:bg-[#68ac0e] text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>লগইন করুন</span>
            </button>
          </form>

        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400">
          <span>নিরাপদ ক্লাউড ডাটাবেস ও এডমিন অথেন্টিকেশন সক্রিয় রয়েছে</span>
        </div>

      </div>
    </div>
  );
};
