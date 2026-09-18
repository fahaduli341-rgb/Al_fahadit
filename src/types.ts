export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  fee?: string;
  description: string;
  iconName: string;
  popular?: boolean;
  features?: string[];
}

export interface Mentor {
  id: string;
  name: string;
  designation: string; // পদ (e.g. Head of Faculty English)
  department: string;
  photoUrl: string;
  bio?: string;
  experienceYears?: string;
}

export interface StudentRecord {
  id: string;
  studentId: string;
  batchNumber: string;
  studentName: string;
  fatherName?: string;
  courseName: string;
  duration: string;
  grade: string;
  issueDate: string;
  status: 'Verified' | 'Completed' | 'Enrolled';
  certificateNumber?: string;
}

export interface ContactInfo {
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  address: string;
  district: string;
  officeHours: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  twitterUrl?: string;
}

export interface SiteStats {
  yearsExperience: string;
  totalStudents: string;
  successfulFreelancers: string;
  trainersCount: string;
}

export interface VideoInfo {
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  category: 'lab' | 'classroom' | 'event' | 'office';
}

export interface SiteContent {
  instituteName: string;
  instituteSubtitle: string;
  instituteTagline: string;
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubtext: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutImage: string;
  communityTitle: string;
  communitySubtitle: string;
  communityImage: string;
  videoInfo: VideoInfo;
  stats: SiteStats;
  contact: ContactInfo;
  courses: Course[];
  mentors: Mentor[];
  students: StudentRecord[];
  gallery: GalleryPhoto[];
}
