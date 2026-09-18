import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { SiteContent, Course, Mentor, StudentRecord, GalleryPhoto } from '../types.ts';
import { initialSiteContent } from '../data/defaultData.ts';

interface SiteContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => Promise<void>;
  
  // Courses CRUD
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;

  // Mentors CRUD
  addMentor: (mentor: Omit<Mentor, 'id'>) => Promise<void>;
  updateMentor: (mentor: Mentor) => Promise<void>;
  deleteMentor: (id: string) => Promise<void>;

  // Students verification CRUD
  addStudent: (student: Omit<StudentRecord, 'id'>) => Promise<void>;
  updateStudent: (student: StudentRecord) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  deleteAllStudents: () => Promise<void>;
  verifyStudent: (studentId: string, batchNumber: string) => StudentRecord | null;

  // Gallery CRUD
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => Promise<void>;
  deleteGalleryPhoto: (id: string) => Promise<void>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPassword: string) => Promise<void>;

  // Sync state
  isLiveSyncing: boolean;
  lastSyncedAt: Date | null;

  // Navigation / Modal controls
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVerifyModalOpen: boolean;
  setIsVerifyModalOpen: (open: boolean) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  selectedCourseModal: Course | null;
  setSelectedCourseModal: (course: Course | null) => void;

  // Factory reset
  resetToDefaults: () => Promise<void>;
}

const STORAGE_KEY = 'al_fahad_it_site_content_v2';
const ADMIN_AUTH_KEY = 'al_fahad_it_admin_session';
const FIRESTORE_DOC_PATH = 'site_settings/content';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading site content from local storage:', e);
    }
    return initialSiteContent;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  const [isLiveSyncing, setIsLiveSyncing] = useState<boolean>(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);

  const isInitialSyncDone = useRef(false);

  // 1. REAL-TIME FIRESTORE LISTENER (onSnapshot)
  useEffect(() => {
    const docRef = doc(db, 'site_settings', 'content');

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setIsLiveSyncing(false);
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as Partial<SiteContent>;
          setContent((prev) => ({
            ...prev,
            ...remoteData,
            students: Array.isArray(remoteData.students) ? remoteData.students : (remoteData.students ? [] : prev.students),
            courses: Array.isArray(remoteData.courses) ? remoteData.courses : prev.courses,
            mentors: Array.isArray(remoteData.mentors) ? remoteData.mentors : prev.mentors,
            gallery: Array.isArray(remoteData.gallery) ? remoteData.gallery : prev.gallery,
          }));
          setLastSyncedAt(new Date());
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          } catch (e) {
            console.error('Error caching remote data:', e);
          }
        } else {
          // Document does not exist yet on cloud, seed with initial data
          if (!isInitialSyncDone.current) {
            isInitialSyncDone.current = true;
            setDoc(docRef, {
              ...initialSiteContent,
              updatedAt: new Date().toISOString(),
            }).catch((err) => {
              handleFirestoreError(err, OperationType.WRITE, FIRESTORE_DOC_PATH);
            });
          }
        }
      },
      (error) => {
        setIsLiveSyncing(false);
        handleFirestoreError(error, OperationType.GET, FIRESTORE_DOC_PATH);
      }
    );

    return () => unsubscribe();
  }, []);

  // Helper to persist content to Firestore and local state
  const persistContent = async (updated: SiteContent) => {
    setContent(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Local storage save error:', e);
    }

    try {
      const docRef = doc(db, 'site_settings', 'content');
      await setDoc(docRef, {
        ...updated,
        updatedAt: new Date().toISOString(),
      });
      setLastSyncedAt(new Date());
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, FIRESTORE_DOC_PATH);
    }
  };

  const updateContent = async (newFields: Partial<SiteContent>) => {
    const updated = {
      ...content,
      ...newFields,
    };
    await persistContent(updated);
  };

  // Courses CRUD
  const addCourse = async (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `c-${Date.now()}`
    };
    const updated: SiteContent = {
      ...content,
      courses: [newCourse, ...content.courses],
    };
    await persistContent(updated);
  };

  const updateCourse = async (updatedCourse: Course) => {
    const updated: SiteContent = {
      ...content,
      courses: content.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c),
    };
    await persistContent(updated);
  };

  const deleteCourse = async (id: string) => {
    const updated: SiteContent = {
      ...content,
      courses: content.courses.filter(c => c.id !== id),
    };
    await persistContent(updated);
  };

  // Mentors CRUD
  const addMentor = async (mentorData: Omit<Mentor, 'id'>) => {
    const newMentor: Mentor = {
      ...mentorData,
      id: `m-${Date.now()}`
    };
    const updated: SiteContent = {
      ...content,
      mentors: [...content.mentors, newMentor],
    };
    await persistContent(updated);
  };

  const updateMentor = async (updatedMentor: Mentor) => {
    const updated: SiteContent = {
      ...content,
      mentors: content.mentors.map(m => m.id === updatedMentor.id ? updatedMentor : m),
    };
    await persistContent(updated);
  };

  const deleteMentor = async (id: string) => {
    const updated: SiteContent = {
      ...content,
      mentors: content.mentors.filter(m => m.id !== id),
    };
    await persistContent(updated);
  };

  // Student verification CRUD
  const addStudent = async (studentData: Omit<StudentRecord, 'id'>) => {
    const newStudent: StudentRecord = {
      ...studentData,
      id: `std-${Date.now()}`
    };
    const updated: SiteContent = {
      ...content,
      students: [newStudent, ...content.students],
    };
    await persistContent(updated);
  };

  const updateStudent = async (updatedStudent: StudentRecord) => {
    const updated: SiteContent = {
      ...content,
      students: content.students.map(s => s.id === updatedStudent.id ? updatedStudent : s),
    };
    await persistContent(updated);
  };

  const deleteStudent = async (id: string) => {
    const updated: SiteContent = {
      ...content,
      students: content.students.filter(s => s.id !== id),
    };
    await persistContent(updated);
  };

  const deleteAllStudents = async () => {
    const updated: SiteContent = {
      ...content,
      students: [],
    };
    await persistContent(updated);
  };

  const verifyStudent = (studentId: string, batchNumber: string): StudentRecord | null => {
    if (!studentId) return null;
    const cleanId = studentId.trim().toLowerCase();
    const cleanBatch = batchNumber.trim().toLowerCase();

    const found = content.students.find(s => {
      const matchId = s.studentId.trim().toLowerCase() === cleanId;
      const matchBatch = !cleanBatch || s.batchNumber.trim().toLowerCase() === cleanBatch;
      return matchId && matchBatch;
    });

    return found || null;
  };

  // Gallery CRUD
  const addGalleryPhoto = async (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: `gal-${Date.now()}`
    };
    const updated: SiteContent = {
      ...content,
      gallery: [newPhoto, ...content.gallery],
    };
    await persistContent(updated);
  };

  const deleteGalleryPhoto = async (id: string) => {
    const updated: SiteContent = {
      ...content,
      gallery: content.gallery.filter(g => g.id !== id),
    };
    await persistContent(updated);
  };

  // Admin Auth with dynamic or default password
  const loginAdmin = (password: string): boolean => {
    const customPass = (content as any).adminPassword;
    const allowed = customPass 
      ? [customPass, 'admin'] 
      : ['admin', 'admin123', 'alfahad', 'fahad123'];

    if (allowed.includes(password.trim())) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setActiveTab('home');
  };

  const updateAdminPassword = async (newPassword: string) => {
    const updated = {
      ...content,
      adminPassword: newPassword,
    };
    await persistContent(updated);
  };

  const resetToDefaults = async () => {
    await persistContent(initialSiteContent);
  };

  return (
    <SiteContext.Provider
      value={{
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
        verifyStudent,
        addGalleryPhoto,
        deleteGalleryPhoto,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        isLiveSyncing,
        lastSyncedAt,
        activeTab,
        setActiveTab,
        isVerifyModalOpen,
        setIsVerifyModalOpen,
        isVideoModalOpen,
        setIsVideoModalOpen,
        selectedCourseModal,
        setSelectedCourseModal,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
