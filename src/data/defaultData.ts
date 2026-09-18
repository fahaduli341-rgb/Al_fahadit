import { SiteContent } from '../types.ts';

export const initialSiteContent: SiteContent = {
  instituteName: 'আল-ফাহাদ আইটি',
  instituteSubtitle: 'COMPUTER TRAINING INSTITUTE',
  instituteTagline: 'Leading IT Institute in Brahmanbaria',
  
  heroBadge: 'অবসরে বেকার বসে না থেকে',
  heroHeadline: 'আইটি সেক্টরে',
  heroHeadlineHighlight: 'স্কিল ডেভেলপমেন্ট হতে পারে সময়ের সেরা সিদ্ধান্ত',
  heroSubtext: 'অভিজ্ঞ মেন্টর আর আপডেটেড কারিকুলাম নিয়ে আল-ফাহাদ আইটি ইনস্টিটিউট প্রস্তুত আপনার ক্যারিয়ার গড়ার অগ্রযাত্রায়। আমাদের ১০টিরও বেশি ট্রেন্ডি কোর্স থেকে আজই বেছে নিন আপনার পছন্দের কোর্স।',

  aboutBadge: 'আমাদের সম্পর্কে',
  aboutTitle: 'দক্ষ কারিগর তৈরীতে বিশ্বস্ত এক নাম',
  aboutText1: 'আল-ফাহাদ আইটি ইনস্টিটিউট, ব্রাহ্মণবাড়িয়াতে দীর্ঘ দিন আইটি সেক্টরে দক্ষ কারিগর তৈরী করে কর্মসংস্থানের লক্ষ্যে কাজ করে যাচ্ছে। প্রতিষ্ঠার পর থেকে সুদীর্ঘ ১৫ বছর ধরে সমৃদ্ধ বাংলাদেশ বিনির্মাণে অবদান রেখে চলেছে এবং যুগান্তকারী পরিবর্তনের মাধ্যমে বহুমুখী সাফল্য অর্জন করছে।',
  aboutText2: 'ব্রাহ্মণবাড়িয়ায় অন্যতম শীর্ষস্থানীয় এই আইটি প্রতিষ্ঠানটি ২০১১ সাল থেকে তরুণ প্রজন্ম ও শিক্ষার্থীদের কম্পিউটার প্রশিক্ষণ দিয়ে স্বাবলম্বী করে তুলতে এবং বেকার সমস্যা দূর করতে অগ্রণী ভূমিকা পালন করে আসছে।',
  aboutImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',

  communityTitle: 'Join our student community',
  communitySubtitle: 'Be part of something bigger. Join us today!',
  communityImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',

  videoInfo: {
    title: 'A NEW JOURNEY STARTS',
    subtitle: 'আল-ফাহাদ আইটিতে শিক্ষার্থীদের সরাসরি ল্যাব ক্লাস ও ক্যারিয়ার তৈরির এক ঝলক',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // or default training tour video embed
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    duration: '03:45',
  },

  stats: {
    yearsExperience: '১৫+',
    totalStudents: '১৩৫০০+',
    successfulFreelancers: '৫০০০+',
    trainersCount: '১৮+',
  },

  contact: {
    phone1: '+৮৮০ ১৭৩৬ ৭২২৬২২',
    phone2: '+৮৮০ ১৯৭৬ ৭২২৬১১',
    email1: 'alfahadit@gmail.com',
    email2: 'alfahadit.bd@gmail.com',
    address: 'ফখরে বাঙ্গাল রোড, কান্দিপাড়া',
    district: 'ব্রাহ্মণবাড়িয়া ৩৪০০',
    officeHours: 'প্রতিদিন সকাল ৯:০০ টা - রাত ৮:০০ টা',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    whatsappNumber: '+8801736722622',
    twitterUrl: 'https://x.com',
  },

  courses: [
    {
      id: 'c-1',
      title: 'Auto Cad 2D & 3D',
      category: 'Engineering & Design',
      duration: '৩ মাস',
      fee: '৮,০০০ ৳',
      description: 'প্রফেশনাল আর্কিটেকচারাল এবং মেকানিকাল ড্রয়িং ও ৩ডি মডেলিং এর পূর্ণাঙ্গ প্রশিক্ষণ।',
      iconName: 'Box',
      popular: true,
      features: ['2D Floor Plan Drawing', '3D Modeling & Rendering', 'Hands-on Project Lab', 'Government Standard Exam']
    },
    {
      id: 'c-2',
      title: 'Digital Marketing & Freelancing',
      category: 'Marketing',
      duration: '৩ মাস',
      fee: '৭,৫০০ ৳',
      description: 'সোশ্যাল মিডিয়া মার্কেটিং, এসইও, গুগল অ্যাডস ও ফ্রিল্যান্সিং মার্কেটপ্লেস গাইডলাইন।',
      iconName: 'TrendingUp',
      popular: true,
      features: ['SEO & Content Strategy', 'Facebook & Google Ads', 'Fiverr & Upwork Setup', 'Live Campaign Practice']
    },
    {
      id: 'c-3',
      title: 'গ্রাফিক্স ডিজাইন ও ফ্রিল্যান্সিং',
      category: 'Creative Design',
      duration: '৩ মাস',
      fee: '৮,০০০ ৳',
      description: 'অ্যাডোবি ফটোশপ ও ইলাস্ট্রেটর দিয়ে আকর্ষণীয় ব্র্যান্ডিং, লোগো ও ইউআই ডিজাইন।',
      iconName: 'Palette',
      popular: true,
      features: ['Adobe Photoshop & Illustrator', 'Logo & Brand Identity', 'Print Media & Social Media Kit', 'Client Dealing & Portfolio']
    },
    {
      id: 'c-4',
      title: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট',
      category: 'Programming',
      duration: '৪ মাস',
      fee: '১০,০০০ ৳',
      description: 'এইচটিএমএল, সিএসএস, জাভাস্ক্রিপ্ট, রিঅ্যাক্ট এবং নোডজেএস দিয়ে আধুনিক ওয়েবসাইট তৈরি।',
      iconName: 'Code',
      popular: true,
      features: ['Frontend (HTML, CSS, React)', 'Backend Basics & APIs', 'Database Management', 'Full Project Deployment']
    },
    {
      id: 'c-5',
      title: 'অফিস অ্যাপ্লিকেশন',
      category: 'Basic Computer',
      duration: '৩ মাস',
      fee: '৪,৫০০ ৳',
      description: 'এমএস ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট, ইন্টারনেট ব্রাউজিং ও অফিসিয়াল ডাটা এন্ট্রি।',
      iconName: 'FileSpreadsheet',
      popular: false,
      features: ['MS Word & Professional Typing', 'MS Excel Formulas & Charts', 'PowerPoint Presentation', 'Email & Office Workflows']
    },
    {
      id: 'c-6',
      title: 'ভিডিও এডিটিং ও মোশন গ্রাফিক্স',
      category: 'Multimedia',
      duration: '৩ মাস',
      fee: '৮,৫০০ ৳',
      description: 'অ্যাডোবি প্রিমিয়ার প্রো এবং আফটার ইফেক্টস দিয়ে সিনেমাটিক ভিডিও ও অ্যানিমেশন।',
      iconName: 'Video',
      popular: true,
      features: ['Premiere Pro Timeline Master', 'After Effects Motion Titles', 'Audio Mixing & Color Grading', 'YouTube & Reel Production']
    },
    {
      id: 'c-7',
      title: 'স্পোকেন ইংলিশ',
      category: 'Language',
      duration: '২ মাস',
      fee: '৫,০০০ ৳',
      description: 'দৈনন্দিন ও আন্তর্জাতিক কর্মক্ষেত্রে সাবলীল ইংরেজি বলার নিয়মিত প্র্যাকটিস ক্লাস।',
      iconName: 'MessageSquare',
      popular: false,
      features: ['Fluency & Pronunciation', 'Grammar in Everyday Context', 'Group Discussion & Presentation', 'Interview Preparation']
    },
    {
      id: 'c-8',
      title: 'বেসিক ইংলিশ (বিগিনার টু এডভান্স)',
      category: 'Language',
      duration: '২.৫ মাস',
      fee: '৪,০০০ ৳',
      description: 'শুরু থেকে ব্যাকরণ, রিডিং ও রাইটিং স্কিল মজবুত করার গোছানো কারিকুলাম।',
      iconName: 'BookOpen',
      popular: false,
      features: ['Fundamental Grammar', 'Vocabulary Expansion', 'Sentence Construction', 'Listening Comprehension']
    },
    {
      id: 'c-9',
      title: 'ডিপ্লোমা ইন কম্পিউটার',
      category: 'Certification',
      duration: '৬ মাস',
      fee: '১২,০০০ ৳',
      description: 'হার্ডওয়্যার, সফটওয়্যার, নেটওয়ার্কিং ও অফিস অটোমেশনের দীর্ঘমেয়াদী পূর্ণাঙ্গ কোর্স।',
      iconName: 'Award',
      popular: true,
      features: ['Complete Hardware & Software', 'Advanced Office & Database', 'Networking Fundamentals', 'Recognized Diploma Certificate']
    },
    {
      id: 'c-10',
      title: 'হার্ডওয়্যার এন্ড নেটওয়ার্কিং',
      category: 'IT Support',
      duration: '২.৫ মাস',
      fee: '৬,৫০০ ৳',
      description: 'কম্পিউটার এসেম্বলিং, ট্রাবলশুটিং, ল্যান/ওয়াইফাই কনফিগারেশন ও আইটি সাপোর্ট।',
      iconName: 'Cpu',
      popular: false,
      features: ['PC Assembling & Disassembling', 'OS Installation & Troubleshooting', 'LAN Cable Crimping & Router Setup', 'Printer & Peripheral Config']
    },
    {
      id: 'c-11',
      title: 'এডভান্স এক্সেল ও পাওয়ারপয়েন্ট',
      category: 'Corporate Skills',
      duration: '১.৫ মাস',
      fee: '৪,০০০ ৳',
      description: 'VLOOKUP, XLOOKUP, Pivot Tables, ড্যাশবোর্ড তৈরি এবং আকর্ষণীয় প্রেজেন্টেশন।',
      iconName: 'BarChart3',
      popular: false,
      features: ['Advanced Excel Formulas & Logic', 'Pivot Tables & Dynamic Charts', 'Business KPI Dashboards', 'Executive Slide Deck Design']
    },
    {
      id: 'c-12',
      title: 'কম্পিউটার ও ইন্টারনেট প্রো (ক্রাশ)',
      category: 'Quick Learn',
      duration: '১ মাস',
      fee: '৩,০০০ ৳',
      description: 'দ্রুত কম্পিউটার পরিচালনা, টাইপিং, স্মার্ট ব্রাউজিং ও সাইবার সিকিউরিটি সতর্কতা।',
      iconName: 'Laptop',
      popular: false,
      features: ['Fast Bang & Eng Typing', 'Google Workspace Essentials', 'Cloud Storage & Safe Browsing', 'Basic Graphics & Tools']
    }
  ],

  mentors: [
    {
      id: 'm-1',
      name: 'Adv. Burhan Uddin',
      designation: 'Head of Faculty English',
      department: 'English & Language Department',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
      bio: 'সুদীর্ঘ ১০+ বছরের অভিজ্ঞতা সম্পন্ন ইংরেজি ভাষার অভিজ্ঞ প্রশিক্ষক ও লিড মেন্টর।',
      experienceYears: '১০+ বছর'
    },
    {
      id: 'm-2',
      name: 'Engr. Mahbub Alam',
      designation: 'Senior Fullstack Web Mentor',
      department: 'Software & Web Development',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      bio: 'সফটওয়্যার ইঞ্জিনিয়ার ও ফুলস্ট্যাক ডেভেলপার, বাস্তবমুখী প্রজেক্টের মাধ্যমে প্রশিক্ষণ দেন।',
      experienceYears: '৭+ বছর'
    },
    {
      id: 'm-3',
      name: 'Tanvir Hasan',
      designation: 'Lead Graphic Designer & UI/UX',
      department: 'Creative Design & Multimedia',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      bio: 'আন্তর্জাতিক মার্কেটপ্লেসের টপ রেটেড ফ্রিল্যান্সার এবং অভিজ্ঞ ক্রিয়েটিভ আর্ট ডিরেক্টর।',
      experienceYears: '৮+ বছর'
    },
    {
      id: 'm-4',
      name: 'Nabila Akhter',
      designation: 'Digital Marketing & SEO Lead',
      department: 'Digital Strategy & Analytics',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      bio: 'সোশ্যাল মিডিয়া গ্রোথ ও সার্চ ইঞ্জিন অপটিমাইজেশন এক্সপার্ট মেন্টর।',
      experienceYears: '৫+ বছর'
    },
    {
      id: 'm-5',
      name: 'Engr. Shamim Reza',
      designation: 'AutoCAD & Hardware Specialist',
      department: 'Engineering & Networking',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      bio: 'অটোক্যাড ড্রয়িং এবং নেটওয়ার্ক অবকাঠামো ব্যবস্থাপনায় অত্যন্ত দক্ষ শিক্ষক।',
      experienceYears: '৬+ বছর'
    }
  ],

  students: [
    {
      id: 'std-1',
      studentId: 'AFIT-2024-101',
      batchNumber: 'Batch-42',
      studentName: 'মো. ফাহাদ উল্লাহ (MD. Fahad Ullah)',
      fatherName: 'মো. রফিকুল ইসলাম',
      courseName: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট',
      duration: '৪ মাস (১৬০ ঘণ্টা)',
      grade: 'A+ (Outstanding)',
      issueDate: '১৫ মে ২০২৪',
      status: 'Verified',
      certificateNumber: 'AFIT-CERT-88412'
    },
    {
      id: 'std-2',
      studentId: 'AFIT-2024-102',
      batchNumber: 'Batch-42',
      studentName: 'নাফিসা রহমান (Nafisa Rahman)',
      fatherName: 'আব্দুল কাদের রহমান',
      courseName: 'গ্রাফিক্স ডিজাইন ও ফ্রিল্যান্সিং',
      duration: '৩ মাস (১২০ ঘণ্টা)',
      grade: 'A+ (Distinction)',
      issueDate: '২০ মে ২০২৪',
      status: 'Verified',
      certificateNumber: 'AFIT-CERT-88413'
    },
    {
      id: 'std-3',
      studentId: 'AFIT-2024-103',
      batchNumber: 'Batch-43',
      studentName: 'কামরুল ইসলাম (Kamrul Islam)',
      fatherName: 'মো. জয়নাল আবেদীন',
      courseName: 'ডিজিটাল মার্কেটিং এন্ড ফ্রিল্যান্সিং',
      duration: '৩ মাস (১২০ ঘণ্টা)',
      grade: 'A (Very Good)',
      issueDate: '১০ জুন ২০২৪',
      status: 'Verified',
      certificateNumber: 'AFIT-CERT-88450'
    },
    {
      id: 'std-4',
      studentId: 'AFIT-2024-104',
      batchNumber: 'Batch-41',
      studentName: 'তানহা তাবাসসুম (Tanha Tabassum)',
      fatherName: 'এম. এ. জলিল',
      courseName: 'স্পোকেন ইংলিশ',
      duration: '২ মাস (৮০ ঘণ্টা)',
      grade: 'A+ (Outstanding)',
      issueDate: '০৫ এপ্রিল ২০২৪',
      status: 'Verified',
      certificateNumber: 'AFIT-CERT-88390'
    },
    {
      id: 'std-5',
      studentId: 'AFIT-2024-105',
      batchNumber: 'Batch-44',
      studentName: 'আরিফুল হক (Ariful Haque)',
      fatherName: 'শামসুল হক',
      courseName: 'Auto Cad 2D & 3D',
      duration: '৩ মাস (১২০ ঘণ্টা)',
      grade: 'A+ (Distinction)',
      issueDate: '২৮ জুলাই ২০২৪',
      status: 'Verified',
      certificateNumber: 'AFIT-CERT-88502'
    }
  ],

  gallery: [
    {
      id: 'gal-1',
      title: 'কম্পিউটার ল্যাব ১ - লাইভ ক্লাস রুম',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      category: 'lab'
    },
    {
      id: 'gal-2',
      title: 'আধুনিক মনিটর ও দ্রুতগতির ব্রডব্যান্ড নেটওয়ার্ক ল্যাব',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      category: 'lab'
    },
    {
      id: 'gal-3',
      title: 'গ্রাফিক্স ও ওয়েব ডেভেলপমেন্ট প্র্যাকটিক্যাল সেশন',
      url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      category: 'classroom'
    },
    {
      id: 'gal-4',
      title: 'শিক্ষার্থীদের সনদ বিতরণ ও মিলনমেলা',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      category: 'event'
    },
    {
      id: 'gal-5',
      title: 'ফ্রিল্যান্সিং সাকসেস ওয়ার্কশপ ও সেমিনার',
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      category: 'event'
    },
    {
      id: 'gal-6',
      title: 'কাউন্সেলিং ও ইনফরমেশন ডেস্ক',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      category: 'office'
    }
  ]
};
