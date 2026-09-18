import React, { useState } from 'react';
import { SiteProvider, useSite } from './context/SiteContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { VideoModal } from './components/VideoModal.tsx';
import { FeaturesSection } from './components/FeaturesSection.tsx';
import { CoursesSection } from './components/CoursesSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { StatsSection } from './components/StatsSection.tsx';
import { MentorsSection } from './components/MentorsSection.tsx';
import { LabGallerySection } from './components/LabGallerySection.tsx';
import { StudentCommunitySection } from './components/StudentCommunitySection.tsx';
import { PartnersSection } from './components/PartnersSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { StudentVerifyModal } from './components/StudentVerifyModal.tsx';
import { CourseDetailModal } from './components/CourseDetailModal.tsx';
import { AdminLoginModal } from './components/AdminLoginModal.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, isAdminLoggedIn } = useSite();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // If user navigated to Admin Panel and is authenticated
  if (activeTab === 'admin' && isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 font-bengali antialiased">
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-bengali text-slate-800 antialiased selection:bg-[#76c013]/30 selection:text-slate-900">
      {/* Top Navbar */}
      <Navbar
        onOpenAdminModal={() => {
          if (isAdminLoggedIn) {
            setActiveTab('admin');
          } else {
            setIsAdminModalOpen(true);
          }
        }}
      />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <AboutSection />
        <StatsSection />
        <MentorsSection />
        <LabGallerySection />
        <StudentCommunitySection />
        <PartnersSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminModal={() => {
          if (isAdminLoggedIn) {
            setActiveTab('admin');
          } else {
            setIsAdminModalOpen(true);
          }
        }}
      />

      {/* Interactive Global Modals */}
      <VideoModal />
      <StudentVerifyModal />
      <CourseDetailModal />
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
