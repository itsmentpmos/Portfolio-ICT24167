/**
 * data.js
 * Default bilingual portfolio dataset and translations for ICT Student at Sripatum University (SPU).
 * Profile: ณัฐพล มิ่งมา (Natthapon Mingma) - ICT 2nd Year Student
 */

const defaultProfile = {
  name: {
    th: "ณัฐพล มิ่งมา",
    en: "Natthapon Mingma"
  },
  nickname: {
    th: "นัท",
    en: "Nut"
  },
  role: {
    th: "นักศึกษาชั้นปีที่ 2 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยศรีปทุม",
    en: "2nd-Year Information and Communication Technology (ICT) Student, Sripatum University"
  },
  subRole: {
    th: "Aspiring Full-Stack Web Developer & Cloud Enthusiast",
    en: "Aspiring Full-Stack Web Developer & Cloud Enthusiast"
  },
  bio: {
    th: "นักศึกษาชั้นปีที่ 2 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม มีความมุ่งมั่นในการเรียนรู้และพัฒนา Modern Web Application, ระบบ Cloud Services และ Database Architecture สนใจและพร้อมเปิดรับโอกาสฝึกงานและร่วมงานด้าน Full-Stack หรือ Frontend Web Developer",
    en: "A dedicated 2nd-year ICT undergraduate at the Faculty of Information Technology, Sripatum University (SPU). Passionate about modern web architecture, clean UI/UX designs, and scalable cloud solutions. Eager to take on internship and junior developer opportunities in Full-Stack or Frontend Web Development."
  },
  gpax: "3.78",
  gpaxLabel: {
    th: "เกียรตินิยม (Track)",
    en: "First-Class Honors Track"
  },
  email: "natthapon.min@spumail.net",
  phone: "093-625-9486",
  location: {
    th: "กรุงเทพมหานคร, ประเทศไทย",
    en: "Bangkok, Thailand"
  },
  university: {
    th: "มหาวิทยาลัยศรีปทุม (วิทยาเขตบางเขน)",
    en: "Sripatum University (Bangkhen Campus)"
  },
  faculty: {
    th: "คณะเทคโนโลยีสารสนเทศ",
    en: "Faculty of Information Technology"
  },
  year: {
    th: "ชั้นปีที่ 2",
    en: "2nd Year (Sophomore)"
  },
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  avatarId: "default-avatar"
};

const defaultEducation = [
  {
    id: "edu-1",
    degree: {
      th: "วิทยาศาสตรบัณฑิต (วท.บ.)",
      en: "Bachelor of Science (B.Sc.)"
    },
    major: {
      th: "สาขาวิชาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ชั้นปีที่ 2",
      en: "Information and Communication Technology (ICT) - Year 2"
    },
    faculty: {
      th: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม",
      en: "Faculty of Information Technology, Sripatum University"
    },
    period: "2024 - ปัจจุบัน (Expected Grad: 2028)",
    gpax: "3.78 / 4.00",
    honors: {
      th: "ผลการเรียนดีเด่น คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม",
      en: "Academic Excellence Standing, Faculty of Information Technology, SPU"
    },
    description: {
      th: "ศึกษาหลักสูตรครอบคลุมการพัฒนาโปรแกรมประยุกต์เว็บ (Web Application), การวิเคราะห์และออกแบบระบบฐานข้อมูล (Database Systems), สถาปัตยกรรมคลาวด์คอมพิวติ้ง, เครือข่ายคอมพิวเตอร์ และการออกแบบประสบการณ์ผู้ใช้ (UX/UI)",
      en: "Curriculum covers Web Application Architecture, Relational Database Engineering, Cloud Fundamentals, Computer Networking, and Human-Computer Interaction (HCI)."
    },
    courses: [
      "Web Application Development",
      "Database Systems Architecture",
      "Object-Oriented Programming (OOP)",
      "Computer Networks & Communication",
      "Data Structures & Algorithms",
      "UI/UX Prototyping & Design"
    ]
  },
  {
    id: "edu-2",
    degree: {
      th: "มัธยมศึกษาตอนปลาย",
      en: "High School Diploma"
    },
    major: {
      th: "แผนการเรียนวิทยาศาสตร์ - คณิตศาสตร์ - คอมพิวเตอร์",
      en: "Science - Mathematics & Computer Science Track"
    },
    faculty: {
      th: "โรงเรียนมัธยมศึกษา",
      en: "High School Secondary Education"
    },
    period: "2021 - 2024",
    gpax: "3.72 / 4.00",
    honors: {
      th: "รางวัลโครงงานเทคโนโลยีและนวัตกรรมดิจิทัลระดับโรงเรียน",
      en: "Outstanding Digital Innovation Project Award"
    },
    description: {
      th: "ปูพื้นฐานการเขียนโปรแกรมเชิงตรรกะ, การแก้ปัญหาเชิงคำนวณ (Computational Thinking) และโครงสร้างข้อมูลเบื้องต้น",
      en: "Solid foundation in algorithmic thinking, computational logic, basic coding principles, and mathematics."
    },
    courses: ["Advanced Mathematics", "Computer Programming Basics", "Physics", "English Communication"]
  }
];

const defaultSkills = {
  programming: [
    { name: "JavaScript (ES6+)", level: 90, badge: "Advanced" },
    { name: "TypeScript", level: 82, badge: "Proficient" },
    { name: "Python", level: 80, badge: "Proficient" },
    { name: "SQL (PostgreSQL/SQLite)", level: 85, badge: "Advanced" },
    { name: "HTML5 & Modern CSS3", level: 95, badge: "Expert" },
    { name: "C# / .NET Basics", level: 70, badge: "Intermediate" }
  ],
  frontend: [
    { name: "Tailwind CSS", level: 94, badge: "Expert" },
    { name: "Vue.js 3 / Composition API", level: 86, badge: "Advanced" },
    { name: "React.js", level: 82, badge: "Proficient" },
    { name: "Responsive & Mobile-First UI", level: 92, badge: "Expert" },
    { name: "Vite & Modern Bundlers", level: 84, badge: "Proficient" },
    { name: "SPA Architecture & State", level: 85, badge: "Advanced" }
  ],
  backend: [
    { name: "Node.js & Express.js", level: 86, badge: "Advanced" },
    { name: "Cloudflare Workers & D1/R2", level: 84, badge: "Proficient" },
    { name: "PostgreSQL & Prisma ORM", level: 82, badge: "Proficient" },
    { name: "RESTful API Engineering", level: 88, badge: "Advanced" },
    { name: "Authentication (JWT / OAuth2)", level: 80, badge: "Proficient" },
    { name: "SQLite / D1 Database", level: 85, badge: "Advanced" }
  ],
  tools: [
    { name: "Git & GitHub Workflow", level: 90, badge: "Advanced" },
    { name: "Cloudflare Pages & Edge", level: 86, badge: "Proficient" },
    { name: "Postman & API Testing", level: 88, badge: "Advanced" },
    { name: "Figma (UI/UX Prototyping)", level: 85, badge: "Proficient" },
    { name: "VS Code & Modern Extensions", level: 95, badge: "Expert" },
    { name: "Docker Basics", level: 72, badge: "Intermediate" }
  ]
};

const defaultExperience = [
  {
    id: "exp-1",
    role: {
      th: "Student Web Developer & IT Assistant",
      en: "Student Web Developer & IT Assistant"
    },
    company: {
      th: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม",
      en: "Faculty of Information Technology, Sripatum University"
    },
    location: {
      th: "กรุงเทพมหานคร",
      en: "Bangkok, Thailand"
    },
    type: {
      th: "Part-time & Campus Project",
      en: "Part-time & Campus Project"
    },
    period: "2024 - ปัจจุบัน",
    periodEn: "2024 - Present",
    highlights: {
      th: [
        "ร่วมพัฒนาระบบ Web Check-in & Event Registration สำหรับกิจกรรมนักศึกษาและ Open House ของคณะ IT SPU",
        "ช่วยสนับสนุนการตั้งค่าเครือข่ายและระบบปฏิบัติการในห้องปฏิบัติการคอมพิวเตอร์ อาคาร 11",
        "จัดทำสื่อและเอกสารประกอบการเรียนรู้การเขียนเว็บ (HTML/CSS/Tailwind) ให้แก่นักศึกษาในสาขา"
      ],
      en: [
        "Co-developed the web registration and check-in portal for SPU IT student events and Open House workshops.",
        "Assisted faculty staff in managing computer laboratory infrastructure and network configurations in Building 11.",
        "Created instructional documentation and starter code templates for modern web development (Tailwind CSS/JS)."
      ]
    },
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "SQLite", "QR Code API"]
  },
  {
    id: "exp-2",
    role: {
      th: "Front-End Developer (Internship / Trainee)",
      en: "Front-End Developer (Internship / Trainee)"
    },
    company: {
      th: "Digital Creative Studio Co., Ltd.",
      en: "Digital Creative Studio Co., Ltd."
    },
    location: {
      th: "กรุงเทพมหานคร (Hybrid)",
      en: "Bangkok, Thailand (Hybrid)"
    },
    type: {
      th: "งานฝึกงาน (Internship / Project-based)",
      en: "Internship / Project-based"
    },
    period: "มี.ค. 2024 - มิ.ย. 2024",
    periodEn: "Mar 2024 - Jun 2024",
    highlights: {
      th: [
        "พัฒนาและแปลงดีไซน์จาก Figma สู่โค้ด Responsive Web หน้าบ้านด้วย Tailwind CSS และ Vue.js",
        "เชื่อมต่อ RESTful API สำหรับระบบสมาชิก และจัดการ State Management ใน Single-Page Application",
        "ปรับปรุงคะแนน Lighthouse Performance ให้ได้ระดับ 95+ โดยการทำ Image Optimization และ Lazy Loading"
      ],
      en: [
        "Transformed Figma UI mockups into responsive, accessible web interfaces utilizing Tailwind CSS and Vue.js.",
        "Integrated RESTful endpoints for user authentication and dynamic content hydration.",
        "Optimized client-side web assets, achieving 95+ Google Lighthouse performance scores."
      ]
    },
    tech: ["Vue.js 3", "Tailwind CSS", "REST API", "Figma", "Git"]
  },
  {
    id: "exp-3",
    role: {
      th: "Freelance Front-End & UI Developer",
      en: "Freelance Front-End & UI Developer"
    },
    company: {
      th: "Independent Contractor",
      en: "Independent Contractor"
    },
    location: {
      th: "Remote",
      en: "Remote"
    },
    type: {
      th: "Freelance",
      en: "Freelance"
    },
    period: "2023 - ปัจจุบัน",
    periodEn: "2023 - Present",
    highlights: {
      th: [
        "ออกแบบและพัฒนาเว็บไซต์ Landing Page และ Portfolio สำหรับลูกค้าบุคคลและร้านค้าออนไลน์",
        "สร้างฟังก์ชัน Multi-language (TH/EN) และ Dark/Light Mode เพื่อเพิ่มประสบการณ์การใช้งานที่ประทับใจ",
        "Deploy เว็บไซต์ขึ้น Cloudflare Pages เพื่อความเร็วสูงและเข้าถึงได้ตลอด 24 ชั่วโมง"
      ],
      en: [
        "Built customized landing pages and portfolio sites tailored for local SMEs and creative professionals.",
        "Integrated seamless multi-language (TH/EN) switching and persistent dark/light theme preferences.",
        "Deployed production builds to Cloudflare Pages for high-availability and global CDN performance."
      ]
    },
    tech: ["Vanilla JS", "Tailwind CSS", "Cloudflare Pages", "HTML5", "CSS3"]
  }
];

const defaultProjects = [
  {
    id: "proj-1",
    title: {
      th: "ระบบจัดการตารางเรียนและกิจกรรมนักศึกษา SPU (SPU Life+)",
      en: "SPU Life+: Smart Campus & Course Scheduler"
    },
    category: "fullstack",
    description: {
      th: "เว็บแอปพลิเคชันจัดการตารางเรียน คำนวณเกรดเฉลี่ยจำลอง และระบบแจ้งเตือนกิจกรรมของนักศึกษา มหาวิทยาลัยศรีปทุม พร้อมฟังก์ชันส่งออกตารางเรียนลง Google Calendar",
      en: "Modern campus management web app for SPU students featuring interactive course schedules, GPA simulator, push notifications, and Google Calendar sync."
    },
    tech: ["Vue.js 3", "Tailwind CSS", "Node.js", "PostgreSQL", "Cloudflare Pages"],
    demoUrl: "https://spu-life-demo.pages.dev",
    githubUrl: "https://github.com/spu-ict/spu-life-tracker",
    imageId: "proj-img-1",
    createdAt: "2024-08-15"
  },
  {
    id: "proj-2",
    title: {
      th: "แดชบอร์ดตรวจสอบสภาพแวดล้อม IoT อาคาร 11 SPU",
      en: "SPU Building 11 IoT Environmental Monitor"
    },
    category: "frontend",
    description: {
      th: "หน้าเว็บแสดงผลสถิติและกราฟแสดงค่าอุณหภูมิ ความชื้น และค่าฝุ่น PM2.5 ในอาคารเรียน คณะเทคโนโลยีสารสนเทศ SPU แบบ Real-time ผ่านการเชื่อมต่อ WebSockets และ MQTT",
      en: "Real-time environmental sensor dashboard visualizing live temperature, humidity, and PM2.5 metrics across SPU Building 11 via WebSockets & MQTT."
    },
    tech: ["React.js", "Tailwind CSS", "Chart.js", "MQTT.js", "WebSockets"],
    demoUrl: "https://spu-iot-monitor.pages.dev",
    githubUrl: "https://github.com/spu-ict/iot-dashboard-spu",
    imageId: "proj-img-2",
    createdAt: "2024-06-10"
  },
  {
    id: "proj-3",
    title: {
      th: "Cloudflare D1 & R2 Serverless Asset Manager API",
      en: "Cloudflare D1 & R2 Serverless Asset Manager API"
    },
    category: "backend",
    description: {
      th: "RESTful API เซิร์ฟเวอร์เลสบน Cloudflare Workers จัดการอัปโหลด จัดเก็บรูปภาพและเอกสาร PDF ขนาดใหญ่ด้วย R2 Bucket และบันทึก Metadata บน Cloudflare D1 SQL Database",
      en: "High-performance serverless REST API on Cloudflare Workers for secure media/PDF uploads to Cloudflare R2 bucket and relational metadata tracking in D1."
    },
    tech: ["Cloudflare Workers", "D1 SQLite", "R2 Object Storage", "TypeScript", "Hono"],
    demoUrl: "https://spu-cf-api.workers.dev",
    githubUrl: "https://github.com/spu-ict/cloudflare-d1-r2-api",
    imageId: "proj-img-3",
    createdAt: "2024-04-20"
  },
  {
    id: "proj-4",
    title: {
      th: "คลังสื่อการเรียนรู้ออนไลน์ ICT SPU Knowledge Hub",
      en: "SPU ICT Knowledge Hub & Community"
    },
    category: "fullstack",
    description: {
      th: "แพลตฟอร์มรวบรวมชีทสรุป แนวข้อสอบเก่า และคลิปติวสำหรับนักศึกษาคณะเทคโนโลยีสารสนเทศ มีระบบอัปโหลดไฟล์ การให้คะแนน และระบบค้นหาแบบ Full-text Search",
      en: "Collaborative knowledge sharing hub for SPU ICT students with peer-reviewed study notes, past exams repository, full-text search, and tagging system."
    },
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Prisma", "Lucide Icons"],
    demoUrl: "https://spu-hub.pages.dev",
    githubUrl: "https://github.com/spu-ict/knowledge-hub",
    imageId: "proj-img-4",
    createdAt: "2024-02-12"
  }
];

const defaultCertificates = [
  {
    id: "cert-1",
    title: {
      th: "AWS Academy Graduate - Cloud Foundations",
      en: "AWS Academy Graduate - Cloud Foundations"
    },
    issuer: {
      th: "Amazon Web Services (AWS) Academy",
      en: "Amazon Web Services (AWS) Academy"
    },
    date: "2024-05",
    credentialId: "AWS-ACAD-883921-TH",
    description: {
      th: "ผ่านการอบรมและรับรองความรู้พื้นฐาน Cloud Computing, สถาปัตยกรรม AWS, Security, Compute, Storage และ Networking",
      en: "Completed accredited coursework in core cloud computing concepts, AWS security, architecture principles, and infrastructure services."
    },
    pdfId: "cert-pdf-1",
    pdfName: "AWS_Academy_Cloud_Foundations_Natthapon.pdf"
  },
  {
    id: "cert-2",
    title: {
      th: "Google IT Support Professional Certificate",
      en: "Google IT Support Professional Certificate"
    },
    issuer: {
      th: "Google / Coursera",
      en: "Google / Coursera"
    },
    date: "2024-03",
    credentialId: "COURSERA-GGL-6749102",
    description: {
      th: "หลักสูตรครอบคลุม Computer Networking, Operating Systems, System Administration, และ IT Security",
      en: "Professional certification verifying skills in end-user troubleshooting, computer networking, OS management, and IT defense."
    },
    pdfId: "cert-pdf-2",
    pdfName: "Google_IT_Support_Natthapon.pdf"
  },
  {
    id: "cert-3",
    title: {
      th: "SPU ICT Innovation & Web Developer Excellence Award",
      en: "SPU ICT Innovation & Web Developer Excellence Award"
    },
    issuer: {
      th: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม",
      en: "Faculty of Information Technology, Sripatum University"
    },
    date: "2024-01",
    credentialId: "SPU-ICT-AWARD-2024",
    description: {
      th: "รางวัลชมเชยการประกวดโครงงานนวัตกรรมแอปพลิเคชันเว็บเพื่อชุมชน มหาวิทยาลัยศรีปทุม",
      en: "Honorable mention award in the SPU Annual Web Innovation & Community Software Competition."
    },
    pdfId: "cert-pdf-3",
    pdfName: "SPU_ICT_Innovation_Award_Natthapon.pdf"
  }
];

// Bilingual UI Text Dictionary
const i18n = {
  th: {
    siteTitle: "ณัฐพล มิ่งมา | Portfolio นักศึกษา ICT ชั้นปีที่ 2 มหาวิทยาลัยศรีปทุม",
    nav: {
      brand: "SPU ICT PORTFOLIO",
      roleShort: "นักศึกษา ICT ชั้นปีที่ 2 • ม.ศรีปทุม",
      profile: "ข้อมูลส่วนตัว",
      education: "ประวัติการศึกษา",
      skills: "ทักษะและความสามารถ",
      experience: "ประสบการณ์ทำงาน",
      projects: "ผลงานของฉัน",
      certifications: "การฝึกอบรม & ใบรับรอง",
      contact: "ติดต่อฉัน",
      themeDark: "โหมดมืด",
      themeLight: "โหมดสว่าง"
    },
    hero: {
      badge: "พร้อมเปิดรับโอกาสฝึกงาน & ร่วมงาน Full-Stack / Frontend Web",
      greeting: "สวัสดีครับ, ผมชื่อ",
      name: "ณัฐพล มิ่งมา",
      nicknamePrefix: "ชื่อเล่น:",
      gpaxTitle: "เกรดเฉลี่ยสะสม (GPAX):",
      contactBtn: "ติดต่อพูดคุย",
      viewProjectsBtn: "ชมผลงานทั้งหมด",
      downloadResume: "ดาวน์โหลด CV / Resume",
      uploadAvatarBtn: "เปลี่ยนรูปโปรไฟล์",
      quickStats: {
        projects: "ผลงานเว็บ",
        certs: "ใบประกาศนียบัตร",
        courses: "หน่วยกิตสำเร็จ",
        satisfaction: "เกรดเฉลี่ยสะสม"
      }
    },
    education: {
      title: "ประวัติการศึกษา",
      subtitle: "เส้นทางการเรียนรู้และพัฒนาตนเอง ณ มหาวิทยาลัยศรีปทุม และสถาบันการศึกษา",
      honorsBadge: "ผลการเรียนดีเด่น",
      coursesTitle: "วิชาสำคัญที่ได้ศึกษา:"
    },
    skills: {
      title: "ทักษะ & ความเชี่ยวชาญ",
      subtitle: "เทคโนโลยี เครื่องมือ และเฟรมเวิร์กที่นำมาประยุกต์ใช้ในการแก้ปัญหาและสร้างระบบ",
      catProgramming: "Programming Languages",
      catFrontend: "Frontend Development",
      catBackend: "Backend & Database",
      catTools: "Tools & DevOps Infrastructure"
    },
    experience: {
      title: "ประสบการณ์ทำงาน",
      subtitle: "ประวัติการฝึกงาน การร่วมงานกับองค์กร และโปรเจกต์ฟรีแลนซ์",
      highlightsTitle: "หน้าที่และผลงานสำคัญ:"
    },
    projects: {
      title: "ผลงานของฉัน",
      subtitle: "ผลงานโปรเจกต์เว็บแอปพลิเคชันจริง พร้อมระบบบริหารจัดการ เพิ่ม ลบ แก้ไข (CRUD)",
      addBtn: "➕ เพิ่มผลงานใหม่",
      filterAll: "ทั้งหมด",
      filterFullstack: "Full-Stack",
      filterFrontend: "Frontend",
      filterBackend: "Backend",
      liveDemo: "ดูตัวอย่างสด",
      github: "ดูซอร์สโค้ด",
      edit: "แก้ไข",
      delete: "ลบ",
      changeImg: "เปลี่ยนรูปภาพ",
      noProjects: "ไม่พบผลงานในหมวดหมู่นี้ คุณสามารถกดเพิ่มผลงานใหม่ได้ทันที"
    },
    certifications: {
      title: "การฝึกอบรม & ใบรับรอง",
      subtitle: "หลักสูตรความรู้และใบประกาศนียบัตรวิชาชีพ พร้อมเอกสาร PDF แนบและเปิดพรีวิว",
      addBtn: "➕ เพิ่มใบรับรองใหม่",
      viewPdf: "📄 เปิดดู PDF",
      attachPdf: "📎 แนบไฟล์ PDF",
      edit: "แก้ไข",
      delete: "ลบ",
      credentialId: "รหัสอ้างอิง:",
      issuedDate: "วันที่ได้รับ:",
      noCerts: "ยังไม่มีข้อมูลใบรับรอง กดปุ่มเพื่อเพิ่มข้อมูลใบประกาศนียบัตร"
    },
    contact: {
      title: "ข้อมูลการติดต่อ",
      subtitle: "สนใจร่วมงาน สอบถามข้อมูล หรือแลกเปลี่ยนความรู้ทางเทคโนโลยี สามารถติดต่อได้โดยตรงครับ",
      emailLabel: "อีเมลติดต่อ",
      phoneLabel: "เบอร์โทรศัพท์",
      locationLabel: "ที่อยู่ / ทำเล",
      universityLabel: "สถานศึกษา",
      facultyLabel: "คณะ & ภาควิชา"
    },
    modals: {
      project: {
        addTitle: "เพิ่มผลงานใหม่",
        editTitle: "แก้ไขผลงาน",
        titleLabel: "ชื่อผลงาน / Project Name",
        catLabel: "หมวดหมู่ผลงาน",
        descLabel: "รายละเอียดผลงาน",
        techLabel: "เทคโนโลยีที่ใช้ (คั่นด้วยจุลภาค เช่น Vue, Tailwind, Node)",
        demoLabel: "ลิงก์ Live Demo (URL)",
        githubLabel: "ลิงก์ GitHub Repository (URL)",
        imageLabel: "รูปภาพผลงาน (เลือกรูปภาพจากเครื่อง)",
        saveBtn: "บันทึกผลงาน",
        cancelBtn: "ยกเลิก"
      },
      cert: {
        addTitle: "เพิ่มใบรับรอง / การฝึกอบรม",
        editTitle: "แก้ไขข้อมูลใบรับรอง",
        titleLabel: "ชื่อหลักสูตร / รางวัล",
        issuerLabel: "สถาบัน / ผู้มอบใบรับรอง",
        dateLabel: "วันที่ / เดือนที่ได้รับ (เช่น 2024-05)",
        idLabel: "รหัสอ้างอิง (Credential ID)",
        descLabel: "รายละเอียดทักษะที่ได้รับ",
        pdfLabel: "ไฟล์เอกสารใบรับรอง (PDF)",
        saveBtn: "บันทึกใบรับรอง",
        cancelBtn: "ยกเลิก"
      },
      pdfViewer: {
        title: "พรีวิวเอกสารใบรับรอง (PDF Preview)",
        openNewTab: "เปิดในแท็บใหม่",
        download: "ดาวน์โหลด",
        close: "ปิดหน้าต่าง"
      },
      deleteConfirm: {
        title: "ยืนยันการลบข้อมูล",
        message: "คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้",
        confirmBtn: "ยืนยันการลบ",
        cancelBtn: "ยกเลิก"
      }
    },
    toasts: {
      avatarSuccess: "อัปเดตรูปภาพโปรไฟล์เรียบร้อยแล้ว!",
      projectAdded: "เพิ่มผลงานใหม่ลงในพอร์ตเรียบร้อยแล้ว!",
      projectUpdated: "อัปเดตข้อมูลผลงานสำเร็จ!",
      projectDeleted: "ลบผลงานเรียบร้อยแล้ว",
      projectImageSuccess: "เปลี่ยนรูปภาพผลงานเรียบร้อยแล้ว!",
      certAdded: "เพิ่มข้อมูลใบรับรองใหม่เรียบร้อยแล้ว!",
      certUpdated: "อัปเดตข้อมูลใบรับรองสำเร็จ!",
      certDeleted: "ลบข้อมูลใบรับรองเรียบร้อยแล้ว",
      pdfAttached: "แนบไฟล์เอกสาร PDF สำเร็จ พร้อมเปิดดูได้ทันที!",
      pdfViewError: "ไม่พบเอกสาร PDF ที่แนบไว้ หรือยังไม่ได้เลือกไฟล์",
      invalidFileType: "รูปแบบไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ที่รองรับ",
      langChanged: "เปลี่ยนภาษาเป็น ภาษาไทย เรียบร้อย",
      themeChanged: "สลับโหมดการแสดงผลเรียบร้อย"
    }
  },
  en: {
    siteTitle: "Natthapon Mingma | SPU ICT 2nd-Year Student Portfolio",
    nav: {
      brand: "SPU ICT PORTFOLIO",
      roleShort: "2nd-Year ICT • Sripatum Univ.",
      profile: "Personal Details",
      education: "Education",
      skills: "Skills & Stack",
      experience: "Experience",
      projects: "My Projects",
      certifications: "Training & Certs",
      contact: "Contact Me",
      themeDark: "Dark Mode",
      themeLight: "Light Mode"
    },
    hero: {
      badge: "Open for Full-Stack / Frontend Internship & Roles",
      greeting: "Hello, my name is",
      name: "Natthapon Mingma",
      nicknamePrefix: "Nickname:",
      gpaxTitle: "Cumulative GPAX:",
      contactBtn: "Get In Touch",
      viewProjectsBtn: "Explore Projects",
      downloadResume: "Download CV / Resume",
      uploadAvatarBtn: "Change Avatar",
      quickStats: {
        projects: "Live Projects",
        certs: "Certifications",
        courses: "Credits Passed",
        satisfaction: "Cumulative GPAX"
      }
    },
    education: {
      title: "Education History",
      subtitle: "Academic journey and achievements at Sripatum University and prior institutions",
      honorsBadge: "Academic Distinction",
      coursesTitle: "Key Coursework & Competencies:"
    },
    skills: {
      title: "Skills & Technical Stack",
      subtitle: "Modern toolsets, languages, and frameworks employed to architect scalable solutions",
      catProgramming: "Programming Languages",
      catFrontend: "Frontend Development",
      catBackend: "Backend & Database",
      catTools: "Tools & DevOps Infrastructure"
    },
    experience: {
      title: "Work Experience",
      subtitle: "Chronicle of internships, academic assistantships, and client projects",
      highlightsTitle: "Key Responsibilities & Achievements:"
    },
    projects: {
      title: "My Projects",
      subtitle: "Interactive showcase of production-ready web applications with full CRUD management",
      addBtn: "➕ Add New Project",
      filterAll: "All",
      filterFullstack: "Full-Stack",
      filterFrontend: "Frontend",
      filterBackend: "Backend",
      liveDemo: "Live Demo",
      github: "Source Code",
      edit: "Edit",
      delete: "Delete",
      changeImg: "Change Image",
      noProjects: "No projects found under this category. Feel free to add one!"
    },
    certifications: {
      title: "Training & Certifications",
      subtitle: "Verified professional certifications, industry training, and native PDF previews",
      addBtn: "➕ Add Certificate",
      viewPdf: "📄 View PDF",
      attachPdf: "📎 Attach PDF",
      edit: "Edit",
      delete: "Delete",
      credentialId: "Credential ID:",
      issuedDate: "Issued Date:",
      noCerts: "No certifications added yet. Click above to add a credential!"
    },
    contact: {
      title: "Contact Details",
      subtitle: "Feel free to reach out for internship opportunities, collaborations, or technical inquiries",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      locationLabel: "Location",
      universityLabel: "Institution",
      facultyLabel: "Faculty & Department"
    },
    modals: {
      project: {
        addTitle: "Add New Project",
        editTitle: "Edit Project Details",
        titleLabel: "Project Title",
        catLabel: "Category",
        descLabel: "Description",
        techLabel: "Tech Stack (comma separated: e.g. Vue, Tailwind, Node)",
        demoLabel: "Live Demo URL",
        githubLabel: "GitHub Repository URL",
        imageLabel: "Project Thumbnail (Choose image from computer)",
        saveBtn: "Save Project",
        cancelBtn: "Cancel"
      },
      cert: {
        addTitle: "Add Certification / Training",
        editTitle: "Edit Certification",
        titleLabel: "Certificate / Award Title",
        issuerLabel: "Issuing Organization",
        dateLabel: "Issued Date / Month (e.g. 2024-05)",
        idLabel: "Credential ID",
        descLabel: "Skills & Highlights",
        pdfLabel: "Certificate Document (PDF)",
        saveBtn: "Save Certificate",
        cancelBtn: "Cancel"
      },
      pdfViewer: {
        title: "Certificate PDF Previewer",
        openNewTab: "Open in New Tab",
        download: "Download",
        close: "Close"
      },
      deleteConfirm: {
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this record? This action cannot be reversed.",
        confirmBtn: "Yes, Delete",
        cancelBtn: "Cancel"
      }
    },
    toasts: {
      avatarSuccess: "Profile avatar successfully updated!",
      projectAdded: "New project successfully added to portfolio!",
      projectUpdated: "Project details updated successfully!",
      projectDeleted: "Project removed from portfolio",
      projectImageSuccess: "Project cover image successfully updated!",
      certAdded: "New certification successfully added!",
      certUpdated: "Certification details updated successfully!",
      certDeleted: "Certification removed",
      pdfAttached: "PDF document successfully attached and ready to view!",
      pdfViewError: "No PDF file attached or file is unreadable",
      invalidFileType: "Invalid file format. Please upload a supported file.",
      langChanged: "Switched language to English",
      themeChanged: "Display theme toggled successfully"
    }
  }
};
