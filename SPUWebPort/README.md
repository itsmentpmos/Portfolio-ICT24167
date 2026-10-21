# SPU ICT Single-Page Web Portfolio 🎓
> เว็บไซต์ Single-Page Web Portfolio สำหรับนักศึกษา สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (Sripatum University - SPU)

---

## 🎨 การตั้งค่าการออกแบบ (Design Specification)

- **[COLOR PALETTE]**: **Cyan / Teal Accent** (สร้างความโดดเด่นสไตล์ Modern Tech ด้วยโทนสี Cyan `#06b6d4`, Teal `#14b8a6` และ Emerald/Dark Teal `#0f766e`)
- **[TEMPLATE STYLE]**: **Minimalist Modern** (สะอาดตา เรียบหรู พื้นหลัง Light/Dark Slate โครงสร้างกระจก Glassmorphism, Micro-interactions นุ่มนวล)
- **[NAV LAYOUT]**: **Sticky Left Vertical Sidebar (รูปแบบที่ 1)** (แถบเมนูด้านซ้ายตรึงคงที่ตลอดการเลื่อนหน้าเว็บ พร้อมระบบ Responsive Drawer สำหรับหน้าจอมือถือและแท็บเล็ต)
- **[BILINGUAL SUPPORT]**: ปุ่มสลับภาษา **`[TH / EN]`** อัตโนมัติที่มุมขวาบน ปรับเปลี่ยนเนื้อหาทั้ง 6 หัวข้อแบบ Real-time ทันที

---

## 📑 โครงสร้าง 6 ส่วนสำคัญตามลำดับ

1. 👤 **ข้อมูลส่วนตัว (Personal Details & Hero Section)**
   - แสดงชื่อ-นามสกุล (**ณัฐพล มิ่งมา / Natthapon Mingma**), ชื่อเล่น, ข้อมูลแนะนำตัว, สถานศึกษา (ม.ศรีปทุม คณะเทคโนโลยีสารสนเทศ สาขา ICT ชั้นปีที่ 2)
   - ข้อมูลผลการเรียน: GPAX 3.78 (เกียรตินิยม Track)
   - ข้อมูลติดต่อ: อีเมล `natthapon.min@spumail.net`, เบอร์โทรศัพท์ `093-625-9486`, ที่อยู่
   - **ระบบเปลี่ยนรูปโปรไฟล์**: คลิกที่รูปเพื่อเลือกไฟล์รูปภาพจากเครื่อง (`.jpg`, `.png`, `.webp`) พรีวิวและบันทึกออฟไลน์ทันทีผ่าน IndexedDB

2. 🎓 **ประวัติการศึกษา (Education)**
   - การ์ดระดับปริญญาตรี: วิทยาศาสตรบัณฑิต (วท.บ.) สาขา ICT มหาวิทยาลัยศรีปทุม ชั้นปีที่ 2
   - บันทึกรางวัลเกียรติยศและผลการเรียนดีเด่น คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม
   - ชิปแสดงหมวดวิชาเอกที่สำคัญ (Web App Development, Database Systems, Computer Networks ฯลฯ)

3. 🛠️ **ทักษะและความสามารถ (Skills)**
   - แบ่งเป็น 4 หมวดหมู่อย่างเป็นระเบียบ:
     1. **Programming Languages**: JavaScript (ES6+), TypeScript, Python, SQL, C#, HTML5/CSS3
     2. **Frontend Development**: Tailwind CSS, Vue.js, React.js, Vite, Responsive UI
     3. **Backend & Database**: Node.js, Express, Cloudflare Workers, PostgreSQL, SQLite (D1), REST API
     4. **Tools & DevOps**: Git/GitHub, Cloudflare Pages, Docker, Postman, Figma, VS Code
   - แถบแสดงระดับความชำนาญ (Animated Progress Bars) พร้อมป้ายระดับ Badge

4. 💼 **ประสบการณ์ทำงาน (Work Experience)**
   - แสดงผลในรูปแบบ **Timeline** พร้อมไอคอนและจุดเชื่อมโยง
   - ประวัติงานฝึกงาน (Full-Stack Intern), ผู้ช่วยสอนและพัฒนาระบบ (Student Assistant @ SPU), และงานฟรีแลนซ์

5. 📁 **ผลงานของฉัน (My Projects - Dynamic Grid & Image CRUD)**
   - ปุ่มกรองหมวดหมู่: `[ทั้งหมด]`, `[Full-Stack]`, `[Frontend]`, `[Backend]`
   - **ระบบ CRUD ครบวงจร**:
     - **`[➕ เพิ่มผลงานใหม่]`**: โมดอลกรอกชื่อ, หมวดหมู่, คำอธิบาย, แท็กเทคโนโลยี, ลิงก์ Live Demo, GitHub Repo และอัปโหลดภาพหน้าปก
     - **`[✏️ แก้ไข]`**: แก้ไขข้อมูลผลงานที่มีอยู่เดิม
     - **`[🗑️ ลบ]`**: ลบผลงานพร้อมหน้าต่างยืนยันความปลอดภัย
     - **`[📷 ใส่/เปลี่ยนรูปภาพผลงาน]`**: ปุ่มเปลี่ยนรูปปกผลงานจากเครื่องคอมพิวเตอร์ได้ทันที

6. 💻 **การฝึกอบรม & ใบรับรอง (Training & Certifications - PDF Attachment CRUD)**
   - แสดงการรับรองวิชาชีพ เช่น AWS Academy Cloud Foundations, Google IT Support ฯลฯ
   - **ระบบ CRUD & เอกสาร PDF**:
     - **`[➕ เพิ่มใบรับรองใหม่]`**: บันทึกหลักสูตร, องค์กรผู้ออก, วันที่ และแนบไฟล์ PDF
     - **`[✏️ แก้ไข]`** และ **`[🗑️ ลบ]`**
     - **`[📎 แนบไฟล์ PDF]`**: อัปโหลดไฟล์ PDF จากเครื่องคอมพิวเตอร์เข้าสู่ระบบ
     - **`[📄 เปิดดู PDF]`**: เปิดโมดอลพรีวิวเอกสาร PDF แบบ In-App พร้อมฟังก์ชันเปิดแท็บใหม่และดาวน์โหลด

---

## ⚙️ ระบบเสริม (Extra Utilities)

- **Dark / Light Theme Toggle**: ปุ่มสลับโหมดมืด/สว่าง พร้อมจำค่าที่ผู้ใช้เลือกไว้ใน `localStorage`
- **Toast Notifications**: ป๊อปอัปแจ้งเตือนสวยงาม มุมขวาล่าง แจ้งผลการอัปโหลดรูปภาพ, การแนบ PDF, การบันทึก/ลบข้อมูล และการสลับภาษา/ธีม
- **Offline Storage**: ใช้ IndexedDB ร่วมกับ LocalStorage จัดเก็บไฟล์ภาพขนาดใหญ่และไฟล์ PDF โดยไม่ติดปัญหาขนาดความจุ 5MB

---

## ☁️ Cloudflare Ready (D1 Database & R2 Storage)

โปรเจกต์นี้มาพร้อมโครงสร้างรองรับการนำไปรันบน **Cloudflare Pages & Workers**:

1. **`wrangler.toml`**: กำหนดค่า Binding สำหรับ:
   - D1 Database: `DB` (ชื่อฐานข้อมูล `spu-portfolio-db`)
   - R2 Bucket: `PORTFOLIO_BUCKET` (ชื่อบัคเก็ต `spu-portfolio-assets`)
2. **`schema.sql`**: คำสั่งสร้างตารางฐานข้อมูล SQLite พร้อมข้อมูลเริ่มต้น (Seed Data)
3. **Cloudflare Pages Functions**:
   - `functions/api/projects.js` - CRUD ผลงานผ่าน D1
   - `functions/api/certificates.js` - CRUD ใบรับรองผ่าน D1
   - `functions/api/upload.js` - จัดเก็บไฟล์ภาพและ PDF เข้าสู่ Cloudflare R2
   - `functions/api/profile.js` - ดึงและแก้ไขข้อมูลโปรไฟล์ผ่าน D1

### ขั้นตอนการ Deploy สู่ Cloudflare Pages:

```bash
# 1. ติดตั้ง Wrangler CLI (หากยังไม่ได้ติดตั้ง)
npm install -g wrangler

# 2. เข้าสู่ระบบ Cloudflare
wrangler login

# 3. สร้าง D1 Database
wrangler d1 create spu-portfolio-db

# 4. รันคำสั่งสร้างตารางใน D1
wrangler d1 execute spu-portfolio-db --file=./schema.sql

# 5. สร้าง R2 Storage Bucket
wrangler r2 bucket create spu-portfolio-assets

# 6. Deploy ขึ้น Cloudflare Pages (ได้ URL ฟรี: https://natthapon-min.pages.dev)
wrangler pages deploy . --project-name natthapon-min
```

---

## 🚀 การเปิดใช้งานในเครื่อง (Local Usage)

เนื่องจากโปรเจกต์พัฒนาด้วย **HTML5, Tailwind CSS (CDN), และ Vanilla JS** จึงสามารถเปิดไฟล์ `index.html` บนเว็บเบราว์เซอร์ใดก็ได้ (Chrome, Edge, Firefox, Safari) โดยไม่ต้องติดตั้ง Node.js หรือเครื่องมือเพิ่มเติม!
