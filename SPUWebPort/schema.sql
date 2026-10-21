-- ============================================================
-- schema.sql
-- Cloudflare D1 (SQLite) Schema for SPU ICT Web Portfolio
-- Execute via: npx wrangler d1 execute spu-portfolio-db --file=./schema.sql
-- ============================================================

-- 1. Profile Information Table
DROP TABLE IF EXISTS profile;
CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY DEFAULT 'main-profile',
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    nickname_th TEXT,
    nickname_en TEXT,
    role_th TEXT NOT NULL,
    role_en TEXT NOT NULL,
    bio_th TEXT,
    bio_en TEXT,
    gpax TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location_th TEXT,
    location_en TEXT,
    university_th TEXT,
    university_en TEXT,
    faculty_th TEXT,
    faculty_en TEXT,
    avatar_r2_key TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Education Table
DROP TABLE IF EXISTS education;
CREATE TABLE IF NOT EXISTS education (
    id TEXT PRIMARY KEY,
    degree_th TEXT NOT NULL,
    degree_en TEXT NOT NULL,
    major_th TEXT NOT NULL,
    major_en TEXT NOT NULL,
    faculty_th TEXT NOT NULL,
    faculty_en TEXT NOT NULL,
    period TEXT NOT NULL,
    gpax TEXT NOT NULL,
    honors_th TEXT,
    honors_en TEXT,
    description_th TEXT,
    description_en TEXT,
    courses_json TEXT, -- JSON Array of course names
    sort_order INTEGER DEFAULT 0
);

-- 3. Skills Table
DROP TABLE IF EXISTS skills;
CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL CHECK(category IN ('programming', 'frontend', 'backend', 'tools')),
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    badge TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- 4. Work Experience Table
DROP TABLE IF EXISTS experience;
CREATE TABLE IF NOT EXISTS experience (
    id TEXT PRIMARY KEY,
    role_th TEXT NOT NULL,
    role_en TEXT NOT NULL,
    company_th TEXT NOT NULL,
    company_en TEXT NOT NULL,
    location_th TEXT,
    location_en TEXT,
    exp_type_th TEXT,
    exp_type_en TEXT,
    period_th TEXT NOT NULL,
    period_en TEXT NOT NULL,
    highlights_th_json TEXT, -- JSON Array of highlights
    highlights_en_json TEXT,
    tech_json TEXT,          -- JSON Array of tech stack tags
    sort_order INTEGER DEFAULT 0
);

-- 5. Projects Table (CRUD)
DROP TABLE IF EXISTS projects;
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('fullstack', 'frontend', 'backend')),
    description_th TEXT,
    description_en TEXT,
    tech_json TEXT,          -- JSON Array of technologies
    demo_url TEXT,
    github_url TEXT,
    image_r2_key TEXT,       -- Cloudflare R2 object key
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Certifications Table (CRUD & PDF Attachments)
DROP TABLE IF EXISTS certificates;
CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    issuer_th TEXT NOT NULL,
    issuer_en TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_id TEXT,
    description_th TEXT,
    description_en TEXT,
    pdf_r2_key TEXT,         -- Cloudflare R2 object key for PDF
    pdf_filename TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SEED DATA INSERTS
-- ============================================================

INSERT OR REPLACE INTO profile (id, name_th, name_en, nickname_th, nickname_en, role_th, role_en, bio_th, bio_en, gpax, email, phone, location_th, location_en, university_th, university_en, faculty_th, faculty_en)
VALUES (
    'main-profile',
    'ณัฐพล มิ่งมา',
    'Natthapon Mingma',
    'นัท',
    'Nut',
    'นักศึกษาชั้นปีที่ 2 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยศรีปทุม',
    '2nd-Year Information and Communication Technology (ICT) Student, Sripatum University',
    'นักศึกษาชั้นปีที่ 2 สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม มีความมุ่งมั่นในการเรียนรู้และพัฒนา Modern Web Application, ระบบ Cloud Services และ Database Architecture สนใจและพร้อมเปิดรับโอกาสฝึกงานและร่วมงานด้าน Full-Stack หรือ Frontend Web Developer',
    'A dedicated 2nd-year ICT undergraduate at the Faculty of Information Technology, Sripatum University (SPU). Passionate about modern web architecture, clean UI/UX designs, and scalable cloud solutions. Eager to take on internship and junior developer opportunities in Full-Stack or Frontend Web Development.',
    '3.78',
    'natthapon.min@spumail.net',
    '093-625-9486',
    'กรุงเทพมหานคร, ประเทศไทย',
    'Bangkok, Thailand',
    'มหาวิทยาลัยศรีปทุม (วิทยาเขตบางเขน)',
    'Sripatum University (Bangkhen Campus)',
    'คณะเทคโนโลยีสารสนเทศ',
    'Faculty of Information Technology'
);

INSERT OR REPLACE INTO education (id, degree_th, degree_en, major_th, major_en, faculty_th, faculty_en, period, gpax, honors_th, honors_en, description_th, description_en, courses_json, sort_order)
VALUES (
    'edu-1',
    'วิทยาศาสตรบัณฑิต (วท.บ.)',
    'Bachelor of Science (B.Sc.)',
    'สาขาวิชาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ชั้นปีที่ 2',
    'Information and Communication Technology (ICT) - Year 2',
    'คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม',
    'Faculty of Information Technology, Sripatum University',
    '2024 - ปัจจุบัน (Expected Grad: 2028)',
    '3.78 / 4.00',
    'ผลการเรียนดีเด่น คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม',
    'Academic Excellence Standing, Faculty of Information Technology, SPU',
    'ศึกษาครอบคลุมการพัฒนาโปรแกรมประยุกต์เว็บและคลาวด์, สถาปัตยกรรมระบบฐานข้อมูล, ความมั่นคงปลอดภัยสารสนเทศ, การจัดการเครือข่ายคอมพิวเตอร์ และการออกแบบประสบการณ์ผู้ใช้ (UX/UI)',
    'Comprehensive studies in Web & Cloud Application Engineering, Database Architecture, Cybersecurity, Network Administration, and UI/UX Design Methodologies.',
    '["Web Application Development", "Database Systems Architecture", "Object-Oriented Programming (OOP)", "Computer Networks & Security", "Data Structures & Algorithms", "UI/UX Prototyping & Design"]',
    1
);

INSERT OR REPLACE INTO projects (id, title_th, title_en, category, description_th, description_en, tech_json, demo_url, github_url, image_r2_key)
VALUES 
(
    'proj-1',
    'ระบบจัดการตารางเรียนและกิจกรรมนักศึกษา SPU (SPU Life+)',
    'SPU Life+: Smart Campus & Course Scheduler',
    'fullstack',
    'เว็บแอปพลิเคชันจัดการตารางเรียน คำนวณเกรดเฉลี่ยจำลอง และระบบแจ้งเตือนกิจกรรมของนักศึกษา มหาวิทยาลัยศรีปทุม',
    'Modern campus management web app for SPU students featuring interactive course schedules, GPA simulator, and push notifications.',
    '["Vue.js 3", "Tailwind CSS", "Node.js", "PostgreSQL", "Cloudflare Pages"]',
    'https://spu-life-demo.pages.dev',
    'https://github.com/spu-ict/spu-life-tracker',
    'projects/spu-life.png'
),
(
    'proj-2',
    'แดชบอร์ดตรวจสอบสภาพแวดล้อม IoT อาคาร 11 SPU',
    'SPU Building 11 IoT Environmental Monitor',
    'frontend',
    'หน้าเว็บแสดงผลสถิติและกราฟแสดงค่าอุณหภูมิ ความชื้น และค่าฝุ่น PM2.5 ในอาคารเรียน คณะเทคโนโลยีสารสนเทศ SPU แบบ Real-time',
    'Real-time environmental sensor dashboard visualizing live temperature, humidity, and PM2.5 metrics across SPU Building 11.',
    '["React.js", "Tailwind CSS", "Chart.js", "MQTT.js", "WebSockets"]',
    'https://spu-iot-monitor.pages.dev',
    'https://github.com/spu-ict/iot-dashboard-spu',
    'projects/spu-iot.png'
);

INSERT OR REPLACE INTO certificates (id, title_th, title_en, issuer_th, issuer_en, issue_date, credential_id, description_th, description_en, pdf_r2_key, pdf_filename)
VALUES 
(
    'cert-1',
    'AWS Academy Graduate - Cloud Foundations',
    'AWS Academy Graduate - Cloud Foundations',
    'Amazon Web Services (AWS) Academy',
    'Amazon Web Services (AWS) Academy',
    '2024-05',
    'AWS-ACAD-883921-TH',
    'ผ่านการอบรมและรับรองความรู้พื้นฐาน Cloud Computing, สถาปัตยกรรม AWS, Security, Compute, Storage และ Networking',
    'Completed accredited coursework in core cloud computing concepts, AWS security, architecture principles, and infrastructure services.',
    'certs/aws-cloud-foundations.pdf',
    'AWS_Academy_Cloud_Foundations_Phatcharapol.pdf'
),
(
    'cert-2',
    'Google IT Support Professional Certificate',
    'Google IT Support Professional Certificate',
    'Google / Coursera',
    'Google / Coursera',
    '2024-03',
    'COURSERA-GGL-6749102',
    'หลักสูตรครอบคลุม Computer Networking, Operating Systems, System Administration, และ IT Security',
    'Professional certification verifying skills in end-user troubleshooting, computer networking, OS management, and IT defense.',
    'certs/google-it-support.pdf',
    'Google_IT_Support_Phatcharapol.pdf'
);
