import React, { useState, useRef } from 'react';
import { 
  Settings, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Users, 
  BookOpen, 
  UserCheck, 
  BarChart3, 
  Save, 
  ArrowLeft, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Upload,
  Database,
  Key,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';
import { Course, Mentor, StudentRecord, GalleryPhoto } from '../types.ts';
import { Logo } from './Logo.tsx';
import { renderCourseIcon } from './CoursesSection.tsx';
import { processGalleryImage } from '../utils/imageUtils.ts';

export const AdminPanel: React.FC = () => {
  const { 
    content, 
    updateContent, 
    addCourse, 
    updateCourse, 
    deleteCourse,
    addMentor,
    updateMentor,
    deleteMentor,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
    addGalleryPhoto,
    deleteGalleryPhoto,
    resetToDefaults,
    logoutAdmin,
    updateAdminPassword,
    isLiveSyncing,
    lastSyncedAt,
    setActiveTab
  } = useSite();

  const [currentTab, setCurrentTab] = useState<
    'general' | 'contact' | 'video' | 'photos' | 'mentors' | 'courses' | 'students' | 'stats'
  >('general');

  const [savedNotice, setSavedNotice] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // In-app Delete Confirmation Modal state (prevents window.confirm iframe blocks)
  interface DeleteTarget {
    type: 'student' | 'all-students' | 'course' | 'mentor' | 'gallery' | 'reset';
    id?: string;
    name: string;
    subtitle?: string;
  }
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // Admin password change states
  const [newPassInput, setNewPassInput] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [passChangedNotice, setPassChangedNotice] = useState(false);

  // Form states for adding items
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Creative Design',
    duration: '৩ মাস',
    fee: '৮,০০০ ৳',
    description: '',
    iconName: 'Palette',
    popular: true,
  });

  const [showAddMentor, setShowAddMentor] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [newMentor, setNewMentor] = useState({
    name: '',
    designation: '',
    department: '',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
    bio: '',
    experienceYears: '৫+ বছর',
  });

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [newStudent, setNewStudent] = useState<Omit<StudentRecord, 'id'>>({
    studentId: '',
    batchNumber: '',
    studentName: '',
    fatherName: '',
    courseName: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট',
    duration: '৩ মাস (১২০ ঘণ্টা)',
    grade: 'A+ (Outstanding)',
    issueDate: '১৫ মে ২০২৪',
    status: 'Verified',
    certificateNumber: 'AFIT-CERT-' + Math.floor(10000 + Math.random() * 90000),
  });

  const [newGalleryPhoto, setNewGalleryPhoto] = useState({
    title: '',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    category: 'lab' as const,
  });

  const triggerSaveNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Safe deletion execution without window.confirm
  const handleExecuteDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === 'student' && deleteTarget.id) {
        await deleteStudent(deleteTarget.id);
        setDeleteNotice(`"${deleteTarget.name}" শিক্ষার্থী রেকর্ডটি ডিলিট হয়েছে`);
      } else if (deleteTarget.type === 'all-students') {
        await deleteAllStudents();
        setDeleteNotice('সকল শিক্ষার্থী রেকর্ড সফলভাবে ডিলিট করা হয়েছে');
      } else if (deleteTarget.type === 'course' && deleteTarget.id) {
        await deleteCourse(deleteTarget.id);
        setDeleteNotice(`"${deleteTarget.name}" কোর্স মুছে ফেলা হয়েছে`);
      } else if (deleteTarget.type === 'mentor' && deleteTarget.id) {
        await deleteMentor(deleteTarget.id);
        setDeleteNotice(`"${deleteTarget.name}" মেন্টর মুছে ফেলা হয়েছে`);
      } else if (deleteTarget.type === 'gallery' && deleteTarget.id) {
        await deleteGalleryPhoto(deleteTarget.id);
        setDeleteNotice('ছবিটি গ্যালারি থেকে মুছে ফেলা হয়েছে');
      } else if (deleteTarget.type === 'reset') {
        await resetToDefaults();
        setDeleteNotice('সকল তথ্য ফ্যাক্টরি ডিফল্টে রিসেট করা হয়েছে');
      }
      triggerSaveNotice();
    } catch (err) {
      console.error('Delete execution error:', err);
    } finally {
      setDeleteTarget(null);
      setTimeout(() => setDeleteNotice(null), 3500);
    }
  };

  // Generic Gallery/Device Image Picker
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const dataUrl = await processGalleryImage(files[0]);
      onSuccess(dataUrl);
      triggerSaveNotice();
    } catch (err) {
      console.error('Image process error:', err);
      setDeleteNotice('ছবি প্রসেস করতে সমস্যা হয়েছে। অনুগ্রহ করে অন্য ছবি নির্বাচন করুন।');
      setTimeout(() => setDeleteNotice(null), 4000);
    }
  };

  // Handlers for Courses
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      await updateCourse({
        ...editingCourse,
        ...newCourse,
      });
      setEditingCourse(null);
    } else {
      await addCourse({
        ...newCourse,
        features: ['প্র্যাকটিক্যাল ল্যাব ক্লাস', 'লাইভ প্রজেক্ট সাপোর্ট', 'মার্কেটপ্লেস গাইডলাইন'],
      });
    }
    setShowAddCourse(false);
    setNewCourse({
      title: '',
      category: 'Creative Design',
      duration: '৩ মাস',
      fee: '৮,০০০ ৳',
      description: '',
      iconName: 'Palette',
      popular: true,
    });
    triggerSaveNotice();
  };

  // Handlers for Mentors
  const handleSaveMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMentor) {
      await updateMentor({
        ...editingMentor,
        ...newMentor,
      });
      setEditingMentor(null);
    } else {
      await addMentor(newMentor);
    }
    setShowAddMentor(false);
    setNewMentor({
      name: '',
      designation: '',
      department: '',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
      bio: '',
      experienceYears: '৫+ বছর',
    });
    triggerSaveNotice();
  };

  // Handlers for Students
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      await updateStudent({
        ...editingStudent,
        ...newStudent,
      });
      setEditingStudent(null);
    } else {
      await addStudent(newStudent);
    }
    setShowAddStudent(false);
    setNewStudent({
      studentId: '',
      batchNumber: '',
      studentName: '',
      fatherName: '',
      courseName: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট',
      duration: '৩ মাস (১২০ ঘণ্টা)',
      grade: 'A+ (Outstanding)',
      issueDate: '১৫ মে ২০২৪',
      status: 'Verified',
      certificateNumber: 'AFIT-CERT-' + Math.floor(10000 + Math.random() * 90000),
    });
    triggerSaveNotice();
  };

  // Handler for Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassInput.trim()) return;
    await updateAdminPassword(newPassInput.trim());
    setNewPassInput('');
    setPassChangedNotice(true);
    setTimeout(() => setPassChangedNotice(false), 3000);
  };

  // Quick Photo Presets for easy picking
  const photoPresets = [
    { label: 'কম্পিউটার ল্যাব ১', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
    { label: 'কম্পিউটার ল্যাব ২', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
    { label: 'ক্লাসরুম ও লেকচার', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80' },
    { label: 'শিক্ষার্থী আলোচনা', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
    { label: 'অফিস ও রিসেপশন', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    { label: 'কমিউনিটি গেটটুগেদার', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center gap-3">
              <Logo
                instituteName={content.instituteName.toUpperCase()}
                subtitle="ADMIN CONTROL PANEL"
                theme="dark"
                size="sm"
              />
              
              {/* Live Firebase Firestore Status Indicator */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-english">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FIRESTORE LIVE</span>
                {lastSyncedAt && (
                  <span className="text-[10px] text-emerald-300 font-normal">
                    (Sync: {lastSyncedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {deleteNotice && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-lg text-xs font-bold animate-in fade-in">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{deleteNotice}</span>
                </div>
              )}

              {savedNotice && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-bold animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>লাইভ সেভ হয়েছে!</span>
                </div>
              )}

              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">লাইভ সাইটে ফিরে যান</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-900/60 px-3 py-2 rounded-lg transition-colors"
                title="লগআউট"
              >
                <LogOut className="w-4 h-4" />
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* IN-APP CUSTOM CONFIRMATION MODAL (100% RELIABLE IN IFRAMES, NO WINDOW.CONFIRM) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-red-100 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-xs">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900">রেকর্ড মুছে ফেলার নিশ্চিতকরণ</h4>
              <p className="text-xs text-slate-500 mt-1">
                আপনি কি নিশ্চিত যে আপনি এটি স্থায়ীভাবে ডিলিট করতে চান?
              </p>
            </div>

            <div className="p-3.5 bg-red-50/80 rounded-2xl border border-red-100 text-slate-800">
              <p className="text-sm font-bold text-red-900">{deleteTarget.name}</p>
              {deleteTarget.subtitle && (
                <p className="text-xs text-red-700 mt-0.5">{deleteTarget.subtitle}</p>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              * ডিলিট নিশ্চিত করলে ডাটাবেস ও লাইভ ওয়েবসাইট থেকে সাথে সাথে মুছে যাবে।
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>

              <button
                type="button"
                onClick={handleExecuteDelete}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Admin Dashboard Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200/80 mb-8 overflow-x-auto flex gap-1 scrollbar-none">
          <button
            onClick={() => setCurrentTab('general')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'general' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সাধারণ ও সিকিউরিটি</span>
          </button>

          <button
            onClick={() => setCurrentTab('contact')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'contact' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>যোগাযোগ তথ্য (Phone/Mail)</span>
          </button>

          <button
            onClick={() => setCurrentTab('video')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'video' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>ভিডিও পরিবর্তন</span>
          </button>

          <button
            onClick={() => setCurrentTab('photos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'photos' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>ছবি ও গ্যালারি আপলোড</span>
          </button>

          <button
            onClick={() => setCurrentTab('mentors')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'mentors' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>শিক্ষক ও পদবী (Mentors)</span>
          </button>

          <button
            onClick={() => setCurrentTab('courses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'courses' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>কোর্স সমূহ</span>
          </button>

          <button
            onClick={() => setCurrentTab('students')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'students' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>শিক্ষার্থী ডাটাবেস (Verify/Delete)</span>
          </button>

          <button
            onClick={() => setCurrentTab('stats')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              currentTab === 'stats' ? 'bg-[#76c013] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>পরিসংখ্যান</span>
          </button>
        </div>

        {/* TAB 1: GENERAL & BRANDING & PASSWORD */}
        {currentTab === 'general' && (
          <div className="space-y-6">
            
            {/* Password Management Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90">
              <div className="flex items-center gap-2 mb-1">
                <Key className="w-5 h-5 text-[#76c013]" />
                <h3 className="text-lg font-bold text-slate-900">এডমিন পাসওয়ার্ড পরিবর্তন (Admin Password)</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                এডমিন প্যানেলের পাসওয়ার্ড আপনার সুবিধামতো পরিবর্তন করে গোপন রাখুন (পাসওয়ার্ডটি হাইড থাকবে)
              </p>

              <form onSubmit={handleChangePassword} className="max-w-md space-y-3">
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="নতুন গোপন পাসওয়ার্ড লিখুন..."
                    required
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                    title={showNewPass ? "লুকান" : "দেখুন"}
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    পাসওয়ার্ড আপডেট করুন
                  </button>

                  {passChangedNotice && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                      <Check className="w-3.5 h-3.5" />
                      <span>নতুন পাসওয়ার্ড লাইভ সংরক্ষিত হয়েছে!</span>
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Institute text & Branding */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">ইনস্টিটিউটের নাম ও সাধারণ তথ্য</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  প্রতিষ্ঠানের নাম পরিবর্তন (আল-ফাহাদ আইটি), ট্যাগলাইন ও ব্যানার টেক্সট কনফিগার করুন
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম (বাংলায়)</label>
                  <input
                    type="text"
                    value={content.instituteName}
                    onChange={(e) => updateContent({ instituteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সাবটাইটেল (ইংরেজি)</label>
                  <input
                    type="text"
                    value={content.instituteSubtitle}
                    onChange={(e) => updateContent({ instituteSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">ট্যাগলাইন / অবস্থান</label>
                  <input
                    type="text"
                    value={content.instituteTagline}
                    onChange={(e) => updateContent({ instituteTagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো ব্যাজ টেক্সট</label>
                  <input
                    type="text"
                    value={content.heroBadge}
                    onChange={(e) => updateContent({ heroBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো শিরোনাম (প্রথম অংশ)</label>
                  <input
                    type="text"
                    value={content.heroHeadline}
                    onChange={(e) => updateContent({ heroHeadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো শিরোনাম (হাইলাইট অংশ - সবুজ)</label>
                  <input
                    type="text"
                    value={content.heroHeadlineHighlight}
                    onChange={(e) => updateContent({ heroHeadlineHighlight: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden text-[#548a0d] font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">হিরো উপ-বিবরণ (Subtext)</label>
                  <textarea
                    rows={3}
                    value={content.heroSubtext}
                    onChange={(e) => updateContent({ heroSubtext: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">আমাদের সম্পর্কে টেক্সট ১</label>
                  <textarea
                    rows={3}
                    value={content.aboutText1}
                    onChange={(e) => updateContent({ aboutText1: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">আমাদের সম্পর্কে টেক্সট ২</label>
                  <textarea
                    rows={3}
                    value={content.aboutText2}
                    onChange={(e) => updateContent({ aboutText2: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={triggerSaveNotice}
                  className="bg-[#76c013] hover:bg-[#68ac0e] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>লাইভ সেভ করুন</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CONTACT INFORMATION */}
        {currentTab === 'contact' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">যোগাযোগ তথ্য পরিবর্তন (Contact Info)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                হটলাইন ফোন নাম্বার, ইমেইল, ঠিকানা ও সোশ্যাল লিংক আপডেট করুন — সাথে সাথে ক্লাউডে সেভ হবে
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">হটলাইন ফোন ১ *</label>
                <input
                  type="text"
                  value={content.contact.phone1}
                  onChange={(e) => updateContent({ contact: { ...content.contact, phone1: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">হটলাইন ফোন ২</label>
                <input
                  type="text"
                  value={content.contact.phone2}
                  onChange={(e) => updateContent({ contact: { ...content.contact, phone2: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল ইমেইল ১ *</label>
                <input
                  type="email"
                  value={content.contact.email1}
                  onChange={(e) => updateContent({ contact: { ...content.contact, email1: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">বিকল্প ইমেইল ২</label>
                <input
                  type="email"
                  value={content.contact.email2}
                  onChange={(e) => updateContent({ contact: { ...content.contact, email2: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">রাস্তা ও এলাকার ঠিকানা</label>
                <input
                  type="text"
                  value={content.contact.address}
                  onChange={(e) => updateContent({ contact: { ...content.contact, address: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">জেলা ও পোস্টাল কোড</label>
                <input
                  type="text"
                  value={content.contact.district}
                  onChange={(e) => updateContent({ contact: { ...content.contact, district: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">অফিস সময়সূচী</label>
                <input
                  type="text"
                  value={content.contact.officeHours}
                  onChange={(e) => updateContent({ contact: { ...content.contact, officeHours: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ফেসবুক পেজ লিংক</label>
                <input
                  type="url"
                  value={content.contact.facebookUrl}
                  onChange={(e) => updateContent({ contact: { ...content.contact, facebookUrl: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={triggerSaveNotice}
                className="bg-[#76c013] hover:bg-[#68ac0e] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>যোগাযোগ তথ্য সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: VIDEO TOUR */}
        {currentTab === 'video' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">পরিচিতি ভিডিও পরিবর্তন</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                প্রতিষ্ঠানের পরিচিতি ভিডিওর ইউটিউব লিংক এবং থাম্বনেইল ছবি (গ্যালারি বা URL দিয়ে) পরিবর্তন করুন
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিও টাইটেল (Title)</label>
                <input
                  type="text"
                  value={content.videoInfo.title}
                  onChange={(e) => updateContent({ videoInfo: { ...content.videoInfo, title: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিও সময়কাল (Duration Badge)</label>
                <input
                  type="text"
                  value={content.videoInfo.duration}
                  onChange={(e) => updateContent({ videoInfo: { ...content.videoInfo, duration: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিও লিংক (YouTube Embed/Watch URL বা ডিরেক্ট লিংক) *</label>
                <input
                  type="text"
                  value={content.videoInfo.videoUrl}
                  onChange={(e) => updateContent({ videoInfo: { ...content.videoInfo, videoUrl: e.target.value } })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <label className="block text-xs font-bold text-slate-700">ভিডিও থাম্বনেইল ছবি (Thumbnail Image)</label>
                  {/* Direct Gallery/Device File Upload Button */}
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-50 hover:bg-lime-100 text-[#548a0d] border border-lime-300 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>📁 গ্যালারি / ফাইল থেকে সিলেক্ট করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleGalleryUpload(e, (dataUrl) => updateContent({ videoInfo: { ...content.videoInfo, thumbnailUrl: dataUrl } }))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={content.videoInfo.thumbnailUrl}
                  onChange={(e) => updateContent({ videoInfo: { ...content.videoInfo, thumbnailUrl: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিও সাবটাইটেল / বর্ণনা</label>
                <input
                  type="text"
                  value={content.videoInfo.subtitle}
                  onChange={(e) => updateContent({ videoInfo: { ...content.videoInfo, subtitle: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-slate-700 mb-2">বর্তমান থাম্বনেইল প্রিভিউ:</span>
              <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                <img
                  src={content.videoInfo.thumbnailUrl}
                  alt="Video thumbnail preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={triggerSaveNotice}
                className="bg-[#76c013] hover:bg-[#68ac0e] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>ভিডিও তথ্য সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PICTURES & GALLERY UPLOAD FROM DEVICE */}
        {currentTab === 'photos' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">ছবি পরিবর্তন ও গ্যালারি আপলোড ("pik gellary theke deoa")</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                আপনার মোবাইল বা কম্পিউটারের গ্যালারি / ফাইল থেকে সরাসরি যেকোনো ছবি সিলেক্ট করে আপলোড করতে পারবেন
              </p>
            </div>

            {/* Main Section Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              
              {/* About Us Photo */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    আমাদের সম্পর্কে (About Us) প্রধান বৃত্তাকার ছবি
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-50 hover:bg-lime-100 text-[#548a0d] border border-lime-300 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>📁 গ্যালারি থেকে দিন</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleGalleryUpload(e, (dataUrl) => updateContent({ aboutImage: dataUrl }))}
                    />
                  </label>
                </div>
                
                <input
                  type="text"
                  value={content.aboutImage}
                  onChange={(e) => updateContent({ aboutImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#76c013] outline-hidden font-english"
                />

                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-lime-400 shadow-sm">
                  <img src={content.aboutImage} alt="About" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Community Banner Photo */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    স্টুডেন্ট কমিউনিটি ব্যানার ছবি
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-50 hover:bg-lime-100 text-[#548a0d] border border-lime-300 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>📁 গ্যালারি থেকে দিন</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleGalleryUpload(e, (dataUrl) => updateContent({ communityImage: dataUrl }))}
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={content.communityImage}
                  onChange={(e) => updateContent({ communityImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#76c013] outline-hidden font-english"
                />

                <div className="w-40 h-20 rounded-xl overflow-hidden border border-slate-300 shadow-sm">
                  <img src={content.communityImage} alt="Community" className="w-full h-full object-cover" />
                </div>
              </div>

            </div>

            {/* Quick Pick Presets */}
            <div>
              <span className="block text-xs font-bold text-slate-700 mb-2">
                রেডিমেড প্রফেশনাল ল্যাব ছবি থেকেও ১-ক্লিকে গ্যালারিতে যোগ করতে পারেন:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {photoPresets.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={async () => {
                      await addGalleryPhoto({ title: preset.label, url: preset.url, category: 'lab' });
                      triggerSaveNotice();
                    }}
                    className="p-2 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 hover:border-lime-400 cursor-pointer text-center group transition-all"
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-16 object-cover rounded-lg mb-1" />
                    <span className="text-[11px] font-semibold text-slate-700 block truncate">{preset.label}</span>
                    <span className="text-[10px] text-[#548a0d] font-bold group-hover:underline">+ যোগ করুন</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Custom Gallery Photo with Direct Gallery Picker */}
            <div className="p-6 bg-lime-50/60 rounded-3xl border border-lime-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#76c013]" />
                  <span>নতুন ল্যাব / ক্লাসরুম ছবি যুক্ত করুন</span>
                </h4>

                {/* Direct Gallery Pick for New Gallery Photo */}
                <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-[#548a0d] border border-lime-400 rounded-xl text-xs font-bold cursor-pointer shadow-xs transition-all">
                  <Upload className="w-4 h-4" />
                  <span>📁 সরাসরি গ্যালারি থেকে ছবি সিলেক্ট করুন</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleGalleryUpload(e, (dataUrl) => setNewGalleryPhoto({ ...newGalleryPhoto, url: dataUrl }))}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="ছবির বিবরণ বা টাইটেল (যেমন: আধুনিক কম্পিউটার ল্যাব)"
                    value={newGalleryPhoto.title}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                  />
                </div>
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="ছবির সরাসরি লিংক (বা উপরের বাটন দিয়ে গ্যালারি থেকে নিন)"
                    value={newGalleryPhoto.url}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden font-english"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    onClick={async () => {
                      const titleToUse = newGalleryPhoto.title.trim() || 'ল্যাব ও ক্লাসরুম ছবি';
                      await addGalleryPhoto({ ...newGalleryPhoto, title: titleToUse });
                      setNewGalleryPhoto({ ...newGalleryPhoto, title: '' });
                      triggerSaveNotice();
                    }}
                    className="w-full bg-[#76c013] hover:bg-[#68ac0e] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>গ্যালারিতে যুক্ত করুন</span>
                  </button>
                </div>
              </div>

              {/* Preview of chosen photo */}
              {newGalleryPhoto.url && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-slate-500">সিলেক্ট করা ছবির প্রিভিউ:</span>
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-300">
                    <img src={newGalleryPhoto.url} alt="Selected preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* Current Gallery List */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">বর্তমান গ্যালারি আইটেম ({content.gallery.length} টি):</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.gallery.map((photo) => (
                  <div key={photo.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                    <img src={photo.url} alt={photo.title} className="w-16 h-14 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{photo.title}</p>
                      <span className="text-[10px] text-slate-400 uppercase font-english">{photo.category}</span>
                    </div>
                    <button
                      onClick={() => setDeleteTarget({
                        type: 'gallery',
                        id: photo.id,
                        name: photo.title,
                        subtitle: 'গ্যালারি ফটো'
                      })}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: MENTORS & DESIGNATIONS */}
        {currentTab === 'mentors' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">শিক্ষক ও মেন্টর প্যানেল ("mentor jh ase pod jh ase")</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  প্রতিটি শিক্ষকের নাম, পদবী (Designation), ছবি ও ডিপার্টমেন্ট নিয়ন্ত্রণ করুন
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMentor(null);
                  setShowAddMentor(!showAddMentor);
                }}
                className="inline-flex items-center gap-1.5 bg-[#76c013] hover:bg-[#68ac0e] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন মেন্টর যুক্ত করুন</span>
              </button>
            </div>

            {/* Mentor Add/Edit Form */}
            {showAddMentor && (
              <form onSubmit={handleSaveMentor} className="p-6 bg-lime-50/50 rounded-2xl border border-lime-200 space-y-4 animate-in fade-in">
                <h4 className="font-bold text-sm text-slate-900">
                  {editingMentor ? 'মেন্টর তথ্য এডিট করুন' : 'নতুন মেন্টর ফরম'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষকের নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: Adv. Burhan Uddin"
                      value={newMentor.name}
                      onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">পদবী / পদ (Designation) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: Head of Faculty English"
                      value={newMentor.designation}
                      onChange={(e) => setNewMentor({ ...newMentor, designation: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden font-english"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ডিপার্টমেন্ট (বিভাগ)</label>
                    <input
                      type="text"
                      placeholder="যেমন: English & Language"
                      value={newMentor.department}
                      onChange={(e) => setNewMentor({ ...newMentor, department: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">অভিজ্ঞতা</label>
                    <input
                      type="text"
                      placeholder="যেমন: ১০+ বছর"
                      value={newMentor.experienceYears}
                      onChange={(e) => setNewMentor({ ...newMentor, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">ছবির লিংক বা সরাসরি ফাইল আপলোড</label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-[#548a0d] border border-lime-400 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>📁 গ্যালারি থেকে ছবি নিন</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleGalleryUpload(e, (dataUrl) => setNewMentor({ ...newMentor, photoUrl: dataUrl }))}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={newMentor.photoUrl}
                      onChange={(e) => setNewMentor({ ...newMentor, photoUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden font-english"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">সংক্ষিপ্ত পরিচিতি (Bio)</label>
                    <textarea
                      rows={2}
                      placeholder="শিক্ষকের অভিজ্ঞতা ও স্পেশালিটি সম্পর্কে..."
                      value={newMentor.bio}
                      onChange={(e) => setNewMentor({ ...newMentor, bio: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMentor(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#76c013] text-white shadow-xs"
                  >
                    {editingMentor ? 'আপডেট করুন' : 'মেন্টর সেভ করুন'}
                  </button>
                </div>
              </form>
            )}

            {/* Mentors Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.mentors.map((mentor) => (
                <div key={mentor.id} className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={mentor.photoUrl}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-lime-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{mentor.name}</h4>
                        <span className="text-xs font-bold text-[#548a0d] block font-english">{mentor.designation}</span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{mentor.department}</span>
                      </div>
                    </div>
                    {mentor.bio && (
                      <p className="text-xs text-slate-600 line-clamp-2">{mentor.bio}</p>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingMentor(mentor);
                        setNewMentor({
                          name: mentor.name,
                          designation: mentor.designation,
                          department: mentor.department,
                          photoUrl: mentor.photoUrl,
                          bio: mentor.bio || '',
                          experienceYears: mentor.experienceYears || '৫+ বছর',
                        });
                        setShowAddMentor(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget({
                        type: 'mentor',
                        id: mentor.id,
                        name: mentor.name,
                        subtitle: `${mentor.designation} (${mentor.department})`
                      })}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ডিলিট</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 6: COURSES MANAGEMENT */}
        {currentTab === 'courses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">কোর্স সমূহ পরিচালনা (Courses Management)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  নতুন কোর্স যুক্ত করুন, কোর্স ফি, সময়সীমা ও বিবরণ পরিবর্তন করুন
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCourse(null);
                  setShowAddCourse(!showAddCourse);
                }}
                className="inline-flex items-center gap-1.5 bg-[#76c013] hover:bg-[#68ac0e] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন কোর্স যোগ করুন</span>
              </button>
            </div>

            {/* Course Form */}
            {showAddCourse && (
              <form onSubmit={handleSaveCourse} className="p-6 bg-lime-50/50 rounded-2xl border border-lime-200 space-y-4 animate-in fade-in">
                <h4 className="font-bold text-sm text-slate-900">
                  {editingCourse ? 'কোর্স এডিট করুন' : 'নতুন কোর্স তৈরি ফরম'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                    <input
                      type="text"
                      placeholder="যেমন: Programming / Design / Marketing"
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের মেয়াদ *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ৩ মাস (২৪টি ক্লাস)"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কোর্স ফি</label>
                    <input
                      type="text"
                      placeholder="যেমন: ৮,০০০ ৳"
                      value={newCourse.fee}
                      onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">আইকন টাইপ</label>
                    <select
                      value={newCourse.iconName}
                      onChange={(e) => setNewCourse({ ...newCourse, iconName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    >
                      <option value="Palette">ডিজাইন (Palette)</option>
                      <option value="Code">ওয়েব কোড (Code)</option>
                      <option value="TrendingUp">মার্কেটিং (TrendingUp)</option>
                      <option value="Box">অটোক্যাড / থ্রিডি (Box)</option>
                      <option value="FileSpreadsheet">এক্সেল / অফিস (FileSpreadsheet)</option>
                      <option value="Video">ভিডিও এডিটিং (Video)</option>
                      <option value="MessageSquare">স্পোকেন ইংলিশ (MessageSquare)</option>
                      <option value="Award">ডিপ্লোমা (Award)</option>
                      <option value="Cpu">হার্ডওয়্যার (Cpu)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের বিবরণ *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="কোর্সের মূল বিষয়বস্তু ও ক্যারিয়ার সম্ভাবনা..."
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCourse(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#76c013] text-white shadow-xs"
                  >
                    {editingCourse ? 'আপডেট করুন' : 'কোর্স সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            )}

            {/* Courses Table / List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.courses.map((course) => (
                <div key={course.id} className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-lime-100 text-[#548a0d] flex items-center justify-center">
                        {renderCourseIcon(course.iconName, 'w-4 h-4')}
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase font-english">{course.category}</span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 mb-1">{course.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                      <span>মেয়াদ: <strong>{course.duration}</strong></span>
                      <span>ফি: <strong className="text-[#548a0d]">{course.fee}</strong></span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setNewCourse({
                          title: course.title,
                          category: course.category,
                          duration: course.duration,
                          fee: course.fee || '',
                          description: course.description,
                          iconName: course.iconName,
                          popular: course.popular || false,
                        });
                        setShowAddCourse(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget({
                        type: 'course',
                        id: course.id,
                        name: course.title,
                        subtitle: `ক্যাটাগরি: ${course.category} | ফি: ${course.fee}`
                      })}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ডিলিট</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 7: STUDENT VERIFICATION & DELETION DATABASE */}
        {currentTab === 'students' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">শিক্ষার্থী ডাটাবেস ও সনদ ভেরিফিকেশন সিস্টেম</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  যেসব শিক্ষার্থী ওয়েবসাইটের "Verify Student" পোর্টাল থেকে সনদ যাচাই করবে তাদের আইডি যুক্ত ও ডিলিট করুন
                </p>
              </div>

              <div className="flex items-center gap-2">
                {content.students.length > 0 && (
                  <button
                    onClick={() => setDeleteTarget({
                      type: 'all-students',
                      name: 'সকল শিক্ষার্থী রেকর্ড',
                      subtitle: `মোট ${content.students.length} জন শিক্ষার্থীর সব ডাটা এক ক্লিকে মুছে ডাটাবেস খালি করা হবে`
                    })}
                    className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
                    title="সব ডিলিট করুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>সব শিক্ষার্থী ডিলিট করুন</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setEditingStudent(null);
                    setShowAddStudent(!showAddStudent);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#76c013] hover:bg-[#68ac0e] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন শিক্ষার্থী যুক্ত করুন</span>
                </button>
              </div>
            </div>

            {/* Student Add/Edit Form */}
            {showAddStudent && (
              <form onSubmit={handleSaveStudent} className="p-6 bg-lime-50/50 rounded-2xl border border-lime-200 space-y-4 animate-in fade-in">
                <h4 className="font-bold text-sm text-slate-900">
                  {editingStudent ? 'শিক্ষার্থীর তথ্য আপডেট' : 'নতুন শিক্ষার্থী ও সনদ ভেরিফিকেশন এন্ট্রি'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">স্টুডেন্ট আইডি (Student ID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: AFIT-2024-106"
                      value={newStudent.studentId}
                      onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ব্যাচ নাম্বার (Batch Number) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: Batch-45"
                      value={newStudent.batchNumber}
                      onChange={(e) => setNewStudent({ ...newStudent, batchNumber: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থীর নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মো. আল আমিন"
                      value={newStudent.studentName}
                      onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">পিতার নাম</label>
                    <input
                      type="text"
                      placeholder="যেমন: মো. আবুল কাশেম"
                      value={newStudent.fatherName}
                      onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: গ্রাফিক্স ডিজাইন ও ফ্রিল্যান্সিং"
                      value={newStudent.courseName}
                      onChange={(e) => setNewStudent({ ...newStudent, courseName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ফলাফল / গ্রেড (Grade)</label>
                    <input
                      type="text"
                      placeholder="যেমন: A+ (Outstanding)"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden font-bold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">সনদ ইস্যু তারিখ</label>
                    <input
                      type="text"
                      placeholder="যেমন: ২০ মে ২০২৪"
                      value={newStudent.issueDate}
                      onChange={(e) => setNewStudent({ ...newStudent, issueDate: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">সার্টিফিকেট রেজিস্ট্রেশন নাম্বার</label>
                    <input
                      type="text"
                      placeholder="AFIT-CERT-88490"
                      value={newStudent.certificateNumber}
                      onChange={(e) => setNewStudent({ ...newStudent, certificateNumber: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#76c013] outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStudent(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#76c013] text-white shadow-xs"
                  >
                    {editingStudent ? 'আপডেট করুন' : 'ডাটাবেসে সেভ করুন'}
                  </button>
                </div>
              </form>
            )}

            {/* Students Data Table */}
            {content.students.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <UserCheck className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">বর্তমানে কোনো শিক্ষার্থী রেকর্ড নেই</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  উপরের "নতুন শিক্ষার্থী যুক্ত করুন" বাটনে ক্লিক করে আসল শিক্ষার্থীদের আইডি ও সনদ যোগ করতে পারেন।
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-english border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Student ID</th>
                      <th className="px-4 py-3">Batch</th>
                      <th className="px-4 py-3">Student Name</th>
                      <th className="px-4 py-3">Course</th>
                      <th className="px-4 py-3">Grade</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Delete & Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {content.students.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">{st.studentId}</td>
                        <td className="px-4 py-3 font-medium">{st.batchNumber}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{st.studentName}</td>
                        <td className="px-4 py-3 text-slate-600">{st.courseName}</td>
                        <td className="px-4 py-3 font-bold text-emerald-700">{st.grade}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingStudent(st);
                                setNewStudent({
                                  studentId: st.studentId,
                                  batchNumber: st.batchNumber,
                                  studentName: st.studentName,
                                  fatherName: st.fatherName || '',
                                  courseName: st.courseName,
                                  duration: st.duration,
                                  grade: st.grade,
                                  issueDate: st.issueDate,
                                  status: st.status,
                                  certificateNumber: st.certificateNumber || '',
                                });
                                setShowAddStudent(true);
                              }}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-semibold"
                              title="এডিট"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            
                            {/* Prominent Student Delete Button */}
                            <button
                              onClick={() => setDeleteTarget({
                                type: 'student',
                                id: st.id,
                                name: st.studentName,
                                subtitle: `Student ID: ${st.studentId} | Course: ${st.courseName}`
                              })}
                              className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold cursor-pointer"
                              title="ডিলিট করুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* TAB 8: STATS */}
        {currentTab === 'stats' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/90 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">সাফল্যের পরিসংখ্যান (Stats Numbers)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ওয়েবসাইটে প্রদর্শিত ১৫ বছরের সাফল্য, মোট শিক্ষার্থী সংখ্যা ও ফ্রিল্যান্সার সংখ্যা
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">অভিজ্ঞতার বছর (যেমন: ১৫+)</label>
                <input
                  type="text"
                  value={content.stats.yearsExperience}
                  onChange={(e) => updateContent({ stats: { ...content.stats, yearsExperience: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সর্বমোট শিক্ষার্থী (যেমন: ১৩৫০০+)</label>
                <input
                  type="text"
                  value={content.stats.totalStudents}
                  onChange={(e) => updateContent({ stats: { ...content.stats, totalStudents: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সফল ফ্রিল্যান্সার ও উদ্যোক্তা (যেমন: ৫০০০+)</label>
                <input
                  type="text"
                  value={content.stats.successfulFreelancers}
                  onChange={(e) => updateContent({ stats: { ...content.stats, successfulFreelancers: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষক ট্রেনিং দিচ্ছেন (যেমন: ১৮+)</label>
                <input
                  type="text"
                  value={content.stats.trainersCount}
                  onChange={(e) => updateContent({ stats: { ...content.stats, trainersCount: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#76c013] outline-hidden font-english"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={triggerSaveNotice}
                className="bg-[#76c013] hover:bg-[#68ac0e] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>পরিসংখ্যান সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* Factory Reset Section */}
        <div className="mt-10 p-6 bg-slate-200/60 rounded-2xl border border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-slate-800">ডিফল্ট সেটিংসে রিসেট (Reset to Factory Defaults)</h4>
            <p className="text-xs text-slate-600">
              আপনি যদি কোনো ভুল এন্ট্রি করে থাকেন, তবে যেকোনো সময় ওয়েবসাইট ও ক্লাউড ডাটাকে মূল ফ্রেশ অবস্থায় ফিরিয়ে নিতে পারবেন।
            </p>
          </div>

          <button
            onClick={() => setDeleteTarget({
              type: 'reset',
              name: 'ওয়েবসাইট ফ্যাক্টরি রিসেট',
              subtitle: 'সকল কাস্টম পরিবর্তন মুছে মূল ডিফল্ট অবস্থায় ফিরিয়ে নেওয়া হবে'
            })}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-red-700 bg-white hover:bg-red-50 border border-slate-300 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ফ্যাক্টরি রিসেট</span>
          </button>
        </div>

      </div>

    </div>
  );
};
