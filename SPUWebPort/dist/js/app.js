/**
 * app.js
 * Master application controller for SPU ICT Single-Page Web Portfolio.
 * Implements bilingual translations, dark/light theme, IndexedDB file uploads,
 * Dynamic Project CRUD + Image change, and Certification CRUD + PDF previews.
 */

// Global State
const appState = {
  lang: localStorage.getItem('spu_lang') || 'th',
  theme: localStorage.getItem('spu_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  activeProjectFilter: 'all',
  profile: null,
  education: null,
  skills: null,
  experience: null,
  projects: [],
  certificates: [],
  editingProjectId: null,
  editingCertId: null,
  deleteTarget: null // { type: 'project'|'cert', id: string }
};

// SVG Placeholders / Generators for sample images & certificates
const DEFAULT_AVATAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2306b6d4"/><stop offset="100%" stop-color="%230f766e"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g)" rx="100"/><circle cx="100" cy="75" r="38" fill="%23ffffff" opacity="0.95"/><path d="M40 175 C50 125 150 125 160 175 Z" fill="%23ffffff" opacity="0.95"/></svg>`;

function getProjectDefaultSvg(title, category) {
  const catColors = {
    fullstack: ['#06b6d4', '#14b8a6'],
    frontend: ['#3b82f6', '#06b6d4'],
    backend: ['#0d9488', '#047857']
  };
  const colors = catColors[category] || ['#0891b2', '#0d9488'];
  const safeTitle = encodeURIComponent(title.length > 28 ? title.slice(0, 26) + '...' : title);
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${encodeURIComponent(colors[0])}"/><stop offset="100%" stop-color="${encodeURIComponent(colors[1])}"/></linearGradient></defs><rect width="600" height="360" fill="url(%23bg)" rx="16"/><g opacity="0.1"><circle cx="100" cy="80" r="120" fill="%23fff"/><circle cx="520" cy="280" r="140" fill="%23fff"/></g><rect x="60" y="50" width="480" height="260" rx="12" fill="%230f172a" opacity="0.75"/><circle cx="90" cy="80" r="6" fill="%23ef4444"/><circle cx="110" cy="80" r="6" fill="%23f59e0b"/><circle cx="130" cy="80" r="6" fill="%2310b981"/><text x="300" y="175" fill="%23ffffff" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">${safeTitle}</text><rect x="230" y="210" width="140" height="34" rx="17" fill="%2314b8a6" opacity="0.9"/><text x="300" y="233" fill="%23ffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${encodeURIComponent(category.toUpperCase())}</text></svg>`;
}

// Generates a mock printable/downloadable PDF Blob for certifications
function generateSamplePdfBlob(title, issuer, date, credentialId, recipientName) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { margin: 0; padding: 40px; font-family: 'Helvetica Neue', Arial, sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .cert-card { background: #ffffff; border: 12px double #0d9488; padding: 60px 40px; max-width: 750px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-radius: 8px; position: relative; }
        .cert-header { color: #0f766e; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px; }
        .cert-title { font-size: 32px; color: #0f172a; margin: 15px 0; font-weight: 800; line-height: 1.2; }
        .cert-recipient-intro { font-size: 16px; color: #64748b; margin-top: 25px; }
        .cert-recipient { font-size: 28px; color: #0d9488; font-weight: bold; margin: 10px 0 20px; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 5px; }
        .cert-body { font-size: 16px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto 30px; }
        .cert-footer { display: flex; justify-content: space-between; border-top: 1px solid #cbd5e1; padding-top: 25px; margin-top: 40px; }
        .cert-meta { font-size: 13px; color: #64748b; text-align: left; }
        .cert-seal { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #14b8a6); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="cert-card">
        <div class="cert-header">Sripatum University • Faculty of IT</div>
        <div style="font-size:14px; color:#64748b; text-transform:uppercase; letter-spacing:2px;">Certificate of Achievement</div>
        <h1 class="cert-title">${title}</h1>
        <div class="cert-recipient-intro">This is proudly presented to:</div>
        <div class="cert-recipient">${recipientName || 'Natthapon Mingma'}</div>
        <div class="cert-body">
          For demonstrating exemplary technical proficiency, leadership, and successful completion of the training curriculum issued by <strong>${issuer}</strong>.
        </div>
        <div class="cert-footer">
          <div class="cert-meta">
            <div><strong>Issuer:</strong> ${issuer}</div>
            <div><strong>Issue Date:</strong> ${date}</div>
            <div><strong>Credential ID:</strong> ${credentialId || 'N/A'}</div>
          </div>
          <div class="cert-seal">VERIFIED<br/>OFFICIAL</div>
        </div>
      </div>
    </body>
    </html>
  `;
  return new Blob([htmlContent], { type: 'text/html' });
}

// Application Initialization
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initLanguage();
  loadStateData();
  await initSeedFiles();
  renderAll();
  setupEventListeners();
  setupScrollSpy();
});

// Initialize Theme
function initTheme() {
  if (appState.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('spu_theme', appState.theme);
  if (appState.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
  showToast(i18n[appState.lang].toasts.themeChanged, 'info');
}

function updateThemeIcon() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const mobileThemeBtn = document.getElementById('mobile-theme-toggle-btn');
  const isDark = appState.theme === 'dark';
  
  const iconHtml = isDark 
    ? `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
    : `<svg class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
  
  if (themeBtn) themeBtn.innerHTML = iconHtml;
  if (mobileThemeBtn) mobileThemeBtn.innerHTML = iconHtml;
}

// Initialize Language
function initLanguage() {
  updateLanguageUI();
}

function toggleLanguage(lang) {
  if (appState.lang === lang) return;
  appState.lang = lang;
  localStorage.setItem('spu_lang', lang);
  updateLanguageUI();
  renderAll();
  showToast(i18n[appState.lang].toasts.langChanged, 'success');
}

function updateLanguageUI() {
  const thBtns = document.querySelectorAll('.lang-btn-th');
  const enBtns = document.querySelectorAll('.lang-btn-en');
  
  if (appState.lang === 'th') {
    thBtns.forEach(b => {
      b.classList.add('bg-teal-600', 'text-white', 'shadow-sm');
      b.classList.remove('text-slate-600', 'dark:text-slate-400');
    });
    enBtns.forEach(b => {
      b.classList.remove('bg-teal-600', 'text-white', 'shadow-sm');
      b.classList.add('text-slate-600', 'dark:text-slate-400');
    });
  } else {
    enBtns.forEach(b => {
      b.classList.add('bg-teal-600', 'text-white', 'shadow-sm');
      b.classList.remove('text-slate-600', 'dark:text-slate-400');
    });
    thBtns.forEach(b => {
      b.classList.remove('bg-teal-600', 'text-white', 'shadow-sm');
      b.classList.add('text-slate-600', 'dark:text-slate-400');
    });
  }

  // Update Page Title
  document.title = i18n[appState.lang].siteTitle;
  
  // Update data-i18n static elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getNestedTranslation(i18n[appState.lang], key);
    if (translation) {
      el.textContent = translation;
    }
  });
}

function getNestedTranslation(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Load data from Storage or fallback to default dataset
function loadStateData() {
  const storedProfile = window.spuStorage.getItem('spu_profile', null);
  if (!storedProfile || storedProfile.name?.th !== defaultProfile.name.th) {
    appState.profile = defaultProfile;
    window.spuStorage.setItem('spu_profile', defaultProfile);
  } else {
    appState.profile = storedProfile;
  }

  const storedEdu = window.spuStorage.getItem('spu_education', null);
  if (!storedEdu || !storedEdu[0]?.major?.th?.includes('ชั้นปีที่ 2')) {
    appState.education = defaultEducation;
    window.spuStorage.setItem('spu_education', defaultEducation);
  } else {
    appState.education = storedEdu;
  }

  appState.skills = window.spuStorage.getItem('spu_skills', defaultSkills);
  appState.experience = window.spuStorage.getItem('spu_experience', defaultExperience);
  appState.projects = window.spuStorage.getItem('spu_projects', defaultProjects);
  appState.certificates = window.spuStorage.getItem('spu_certificates', defaultCertificates);
}

// Pre-seed storage with default sample PDFs & Images if not present
async function initSeedFiles() {
  // Check default avatar
  const avatar = await window.spuStorage.getFile('profile_avatar');
  if (!avatar) {
    await window.spuStorage.saveFile('profile_avatar', DEFAULT_AVATAR_SVG, 'image/svg+xml', 'avatar.svg');
  }

  // Check sample certificates
  for (const cert of appState.certificates) {
    if (cert.pdfId) {
      const existing = await window.spuStorage.getFile(cert.pdfId);
      if (!existing) {
        const title = cert.title[appState.lang] || cert.title.en || 'Certification';
        const issuer = cert.issuer[appState.lang] || cert.issuer.en || 'Issuer';
        const blob = generateSamplePdfBlob(title, issuer, cert.date, cert.credentialId, appState.profile.name[appState.lang]);
        
        // Convert blob to base64 dataUrl
        const reader = new FileReader();
        reader.onloadend = async () => {
          await window.spuStorage.saveFile(cert.pdfId, reader.result, 'application/pdf', cert.pdfName || 'certificate.pdf');
        };
        reader.readAsDataURL(blob);
      }
    }
  }
}

// Master Render Function
async function renderAll() {
  await renderProfileHero();
  renderEducation();
  renderSkills();
  renderExperience();
  await renderProjects();
  await renderCertifications();
  renderContact();
}

// 1. Render Personal Details & Hero
async function renderProfileHero() {
  const lang = appState.lang;
  const p = appState.profile;
  const t = i18n[lang].hero;

  // Name & Titles
  const nameEl = document.getElementById('hero-name');
  const roleEl = document.getElementById('hero-role');
  const bioEl = document.getElementById('hero-bio');
  const gpaxEl = document.getElementById('hero-gpax');
  const emailEl = document.getElementById('hero-email');
  const phoneEl = document.getElementById('hero-phone');
  const locationEl = document.getElementById('hero-location');
  const sidebarName = document.getElementById('sidebar-name');
  const sidebarRole = document.getElementById('sidebar-role');

  if (nameEl) nameEl.textContent = p.name[lang];
  if (roleEl) roleEl.textContent = p.role[lang];
  if (bioEl) bioEl.textContent = p.bio[lang];
  if (gpaxEl) gpaxEl.textContent = p.gpax;
  if (emailEl) {
    emailEl.textContent = p.email;
    emailEl.href = `mailto:${p.email}`;
  }
  if (phoneEl) {
    phoneEl.textContent = p.phone;
    phoneEl.href = `tel:${p.phone.replace(/[^0-9+]/g, '')}`;
  }
  if (locationEl) locationEl.textContent = p.location[lang];
  if (sidebarName) sidebarName.textContent = p.name[lang];
  if (sidebarRole) sidebarRole.textContent = i18n[lang].nav.roleShort;

  // Avatar Image
  const avatarImg = document.getElementById('profile-avatar-img');
  const sidebarAvatar = document.getElementById('sidebar-avatar-img');
  const file = await window.spuStorage.getFile('profile_avatar');
  const avatarSrc = (file && file.fileData) ? file.fileData : DEFAULT_AVATAR_SVG;

  if (avatarImg) avatarImg.src = avatarSrc;
  if (sidebarAvatar) sidebarAvatar.src = avatarSrc;
}

// 2. Render Education Section
function renderEducation() {
  const lang = appState.lang;
  const container = document.getElementById('education-list');
  if (!container) return;

  container.innerHTML = appState.education.map((edu, idx) => `
    <div class="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div class="absolute -right-8 -top-8 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all"></div>
      
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50 mb-3">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            ${edu.degree[lang]}
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">${edu.major[lang]}</h3>
          <p class="text-base text-teal-600 dark:text-teal-400 font-medium">${edu.faculty[lang]}</p>
        </div>
        
        <div class="flex flex-wrap md:flex-col md:items-end gap-2 text-sm">
          <span class="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            🗓️ ${edu.period}
          </span>
          <span class="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-200/50 dark:border-cyan-800/40">
            ⭐ GPAX: ${edu.gpax}
          </span>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div class="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/40 mb-4">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clip-rule="evenodd"/></svg>
          <div>
            <span class="font-bold">${i18n[lang].education.honorsBadge}:</span> ${edu.honors[lang]}
          </div>
        </div>

        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">${edu.description[lang]}</p>

        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">${i18n[lang].education.coursesTitle}</span>
          <div class="flex flex-wrap gap-2">
            ${edu.courses.map(course => `
              <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                ${course}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// 3. Render Skills Section (4 Categories)
function renderSkills() {
  const lang = appState.lang;
  const t = i18n[lang].skills;

  const categories = [
    { key: 'programming', title: t.catProgramming, icon: '💻', items: appState.skills.programming },
    { key: 'frontend', title: t.catFrontend, icon: '🎨', items: appState.skills.frontend },
    { key: 'backend', title: t.catBackend, icon: '⚙️', items: appState.skills.backend },
    { key: 'tools', title: t.catTools, icon: '🛠️', items: appState.skills.tools }
  ];

  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <div class="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <span class="text-2xl">${cat.icon}</span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">${cat.title}</h3>
        </div>

        <div class="space-y-4">
          ${cat.items.map(skill => `
            <div>
              <div class="flex justify-between items-center text-sm mb-1.5">
                <span class="font-medium text-slate-800 dark:text-slate-200">${skill.name}</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-300 border border-teal-200/40 dark:border-teal-800/50">
                  ${skill.badge} (${skill.level}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div class="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full transition-all duration-700 ease-out" style="width: ${skill.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// 4. Render Work Experience Timeline
function renderExperience() {
  const lang = appState.lang;
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  container.innerHTML = appState.experience.map((exp, idx) => `
    <div class="relative pl-8 sm:pl-10 pb-12 last:pb-2 group">
      <!-- Vertical line -->
      <div class="absolute left-3.5 sm:left-4 top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 group-last:hidden"></div>
      
      <!-- Timeline Node Circle -->
      <div class="absolute left-1 sm:left-1.5 top-1.5 w-5 h-5 rounded-full bg-teal-500 border-4 border-white dark:border-slate-950 shadow-sm flex items-center justify-center"></div>

      <div class="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <span class="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 mb-1">
              ${exp.type[lang]}
            </span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">${exp.role[lang]}</h3>
            <p class="text-teal-600 dark:text-teal-400 font-medium text-sm">${exp.company[lang]} • <span class="text-slate-500">${exp.location[lang]}</span></p>
          </div>
          <span class="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            ${lang === 'th' ? exp.period : exp.periodEn}
          </span>
        </div>

        <div class="mt-4">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            ${i18n[lang].experience.highlightsTitle}
          </p>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
            ${exp.highlights[lang].map(point => `
              <li class="flex items-start gap-2">
                <span class="text-teal-500 font-bold mt-0.5">•</span>
                <span>${point}</span>
              </li>
            `).join('')}
          </ul>

          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            ${exp.tech.map(t => `
              <span class="text-xs px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400">
                #${t}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// 5. Render Projects Section (CRUD Grid & Filter)
async function renderProjects() {
  const lang = appState.lang;
  const t = i18n[lang].projects;
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = appState.projects.filter(p => {
    if (appState.activeProjectFilter === 'all') return true;
    return p.category.toLowerCase() === appState.activeProjectFilter.toLowerCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500 dark:text-slate-400">
        <p class="text-lg">${t.noProjects}</p>
      </div>
    `;
    return;
  }

  const projectCards = await Promise.all(filtered.map(async (p) => {
    // Resolve image
    let imgSrc = '';
    if (p.imageId) {
      const file = await window.spuStorage.getFile(p.imageId);
      if (file && file.fileData) {
        imgSrc = file.fileData;
      }
    }
    if (!imgSrc) {
      const title = p.title[lang] || p.title.en || 'SPU Project';
      imgSrc = getProjectDefaultSvg(title, p.category);
    }

    const title = p.title[lang] || p.title.en;
    const desc = p.description[lang] || p.description.en;

    return `
      <div class="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between group" data-project-id="${p.id}">
        <div>
          <!-- Thumbnail Container with Change Image button -->
          <div class="relative aspect-video w-full overflow-hidden bg-slate-900">
            <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" id="proj-img-${p.id}" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70"></div>
            
            <!-- Category badge -->
            <span class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-teal-300 border border-teal-500/30">
              ${p.category.toUpperCase()}
            </span>

            <!-- Change Image Quick Action overlay -->
            <label class="absolute bottom-3 right-3 cursor-pointer bg-slate-900/90 hover:bg-teal-600 text-white text-xs px-2.5 py-1.5 rounded-lg backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 shadow-md">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>${t.changeImg}</span>
              <input type="file" accept="image/*" class="hidden" onchange="handleProjectImageUpload('${p.id}', this)" />
            </label>
          </div>

          <!-- Body -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">${title}</h3>
            <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">${desc}</p>
            
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${p.tech.map(tech => `
                <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  ${tech}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <!-- External links -->
          <div class="flex items-center gap-2">
            ${p.demoUrl ? `
              <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                ${t.liveDemo}
              </a>
            ` : ''}
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                ${t.github}
              </a>
            ` : ''}
          </div>

          <!-- CRUD Buttons -->
          <div class="flex items-center gap-1.5">
            <button onclick="openEditProjectModal('${p.id}')" class="p-1.5 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="${t.edit}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button onclick="confirmDelete('project', '${p.id}')" class="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors" title="${t.delete}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }));

  container.innerHTML = projectCards.join('');
}

// 6. Render Training & Certifications (CRUD & PDF)
async function renderCertifications() {
  const lang = appState.lang;
  const t = i18n[lang].certifications;
  const container = document.getElementById('certifications-grid');
  if (!container) return;

  if (appState.certificates.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
        <p>${t.noCerts}</p>
      </div>
    `;
    return;
  }

  const cards = await Promise.all(appState.certificates.map(async (c) => {
    const title = c.title[lang] || c.title.en;
    const issuer = c.issuer[lang] || c.issuer.en;
    const desc = c.description ? (c.description[lang] || c.description.en) : '';
    const hasPdf = !!c.pdfId;

    return `
      <div class="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200/50 dark:border-teal-800/50 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
            </div>
            
            <!-- Quick CRUD Buttons -->
            <div class="flex items-center gap-1">
              <button onclick="openEditCertModal('${c.id}')" class="p-1.5 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="${t.edit}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button onclick="confirmDelete('cert', '${c.id}')" class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors" title="${t.delete}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">${title}</h3>
          <p class="text-teal-600 dark:text-teal-400 text-sm font-medium mb-3">${issuer}</p>

          <div class="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div class="flex justify-between">
              <span>${t.issuedDate}</span>
              <span class="font-semibold text-slate-700 dark:text-slate-300">${c.date}</span>
            </div>
            ${c.credentialId ? `
              <div class="flex justify-between">
                <span>${t.credentialId}</span>
                <span class="font-mono text-slate-700 dark:text-slate-300">${c.credentialId}</span>
              </div>
            ` : ''}
          </div>

          ${desc ? `<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">${desc}</p>` : ''}
        </div>

        <!-- PDF Buttons (View & Attach) -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          ${hasPdf ? `
            <button onclick="viewCertificatePdf('${c.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200/60 dark:border-teal-800 text-xs font-semibold transition-colors">
              <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>${t.viewPdf}</span>
            </button>
          ` : `
            <span class="text-xs text-slate-400 italic">No PDF attached</span>
          `}

          <!-- Attach PDF File directly -->
          <label class="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
            <span>${t.attachPdf}</span>
            <input type="file" accept="application/pdf" class="hidden" onchange="handleCertPdfDirectUpload('${c.id}', this)" />
          </label>
        </div>
      </div>
    `;
  }));

  container.innerHTML = cards.join('');
}

// 7. Render Contact Section
function renderContact() {
  const lang = appState.lang;
  const p = appState.profile;
  const t = i18n[lang].contact;

  const emailEl = document.getElementById('contact-email');
  const phoneEl = document.getElementById('contact-phone');
  const locationEl = document.getElementById('contact-location');
  const uniEl = document.getElementById('contact-university');

  if (emailEl) {
    emailEl.textContent = p.email;
    emailEl.href = `mailto:${p.email}`;
  }
  if (phoneEl) {
    phoneEl.textContent = p.phone;
    phoneEl.href = `tel:${p.phone.replace(/[^0-9+]/g, '')}`;
  }
  if (locationEl) locationEl.textContent = p.location[lang];
  if (uniEl) uniEl.textContent = `${p.university[lang]} (${p.faculty[lang]})`;
}

// Modal Helper Functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  requestAnimationFrame(() => modal.classList.add('open'));
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }, 250);
}

// -------------------------------------------------------------
// EVENT LISTENERS & UI INTERACTIONS
// -------------------------------------------------------------
function setupEventListeners() {
  // Mobile drawer navigation
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const mobileOverlay = document.getElementById('sidebar-overlay');

  if (menuToggle && sidebar && mobileOverlay) {
    const toggleSidebar = () => {
      sidebar.classList.toggle('-translate-x-full');
      mobileOverlay.classList.toggle('hidden');
    };
    menuToggle.addEventListener('click', toggleSidebar);
    mobileOverlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          sidebar.classList.add('-translate-x-full');
          mobileOverlay.classList.add('hidden');
        }
      });
    });
  }

  // Avatar Upload listener
  const avatarInput = document.getElementById('avatar-file-input');
  if (avatarInput) {
    avatarInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast(i18n[appState.lang].toasts.invalidFileType, 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        await window.spuStorage.saveFile('profile_avatar', reader.result, file.type, file.name);
        await renderProfileHero();
        showToast(i18n[appState.lang].toasts.avatarSuccess, 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  // Filter Project buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.target.getAttribute('data-filter') || 'all';
      appState.activeProjectFilter = filter;
      
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-teal-600', 'text-white');
        b.classList.add('text-slate-600', 'dark:text-slate-400');
      });
      btn.classList.add('active', 'bg-teal-600', 'text-white');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400');
      
      renderProjects();
    });
  });

  // Modal backdrop click to close
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        hideModal(backdrop.id);
      }
    });
  });

  // Escape key to close any active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        hideModal(modal.id);
      });
    }
  });
}

// ScrollSpy to highlight active navigation link
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);
}

// -------------------------------------------------------------
// PROJECT CRUD IMPLEMENTATION
// -------------------------------------------------------------
function openAddProjectModal() {
  appState.editingProjectId = null;
  const title = document.getElementById('project-modal-title');
  const form = document.getElementById('project-form');
  
  if (title) title.textContent = i18n[appState.lang].modals.project.addTitle;
  if (form) form.reset();
  
  document.getElementById('proj-input-id').value = '';
  showModal('project-modal');
}

function openEditProjectModal(projectId) {
  const project = appState.projects.find(p => p.id === projectId);
  if (!project) return;

  appState.editingProjectId = projectId;
  const title = document.getElementById('project-modal-title');
  
  if (title) title.textContent = i18n[appState.lang].modals.project.editTitle;

  document.getElementById('proj-input-id').value = project.id;
  document.getElementById('proj-input-title').value = project.title[appState.lang] || project.title.th || project.title.en;
  document.getElementById('proj-input-category').value = project.category;
  document.getElementById('proj-input-desc').value = project.description[appState.lang] || project.description.th || project.description.en;
  document.getElementById('proj-input-tech').value = project.tech.join(', ');
  document.getElementById('proj-input-demo').value = project.demoUrl || '';
  document.getElementById('proj-input-github').value = project.githubUrl || '';
  
  showModal('project-modal');
}

function closeProjectModal() {
  hideModal('project-modal');
}

async function handleProjectFormSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById('proj-input-id').value;
  const titleVal = document.getElementById('proj-input-title').value.trim();
  const categoryVal = document.getElementById('proj-input-category').value;
  const descVal = document.getElementById('proj-input-desc').value.trim();
  const techVal = document.getElementById('proj-input-tech').value.split(',').map(s => s.trim()).filter(Boolean);
  const demoVal = document.getElementById('proj-input-demo').value.trim();
  const githubVal = document.getElementById('proj-input-github').value.trim();
  const fileInput = document.getElementById('proj-input-file');

  let imageId = null;
  if (fileInput && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    const dataUrl = await new Promise(res => {
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(file);
    });
    imageId = `proj-img-${Date.now()}`;
    await window.spuStorage.saveFile(imageId, dataUrl, file.type, file.name);
  }

  if (idInput) {
    // Edit existing project
    const idx = appState.projects.findIndex(p => p.id === idInput);
    if (idx !== -1) {
      const existing = appState.projects[idx];
      existing.title = { th: titleVal, en: titleVal };
      existing.category = categoryVal;
      existing.description = { th: descVal, en: descVal };
      existing.tech = techVal;
      existing.demoUrl = demoVal;
      existing.githubUrl = githubVal;
      if (imageId) existing.imageId = imageId;
      
      showToast(i18n[appState.lang].toasts.projectUpdated, 'success');
    }
  } else {
    // Add new project
    const newProj = {
      id: `proj-${Date.now()}`,
      title: { th: titleVal, en: titleVal },
      category: categoryVal,
      description: { th: descVal, en: descVal },
      tech: techVal,
      demoUrl: demoVal,
      githubUrl: githubVal,
      imageId: imageId,
      createdAt: new Date().toISOString()
    };
    appState.projects.unshift(newProj);
    showToast(i18n[appState.lang].toasts.projectAdded, 'success');
  }

  // Persist to LocalStorage
  window.spuStorage.setItem('spu_projects', appState.projects);
  closeProjectModal();
  await renderProjects();
}

// Quick image upload directly on the project card
async function handleProjectImageUpload(projectId, input) {
  const file = input.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast(i18n[appState.lang].toasts.invalidFileType, 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const imgId = `proj-img-${projectId}-${Date.now()}`;
    await window.spuStorage.saveFile(imgId, reader.result, file.type, file.name);

    // Update project state
    const proj = appState.projects.find(p => p.id === projectId);
    if (proj) {
      proj.imageId = imgId;
      window.spuStorage.setItem('spu_projects', appState.projects);
      await renderProjects();
      showToast(i18n[appState.lang].toasts.projectImageSuccess, 'success');
    }
  };
  reader.readAsDataURL(file);
}

// -------------------------------------------------------------
// CERTIFICATE CRUD & PDF ATTACHMENT IMPLEMENTATION
// -------------------------------------------------------------
function openAddCertModal() {
  appState.editingCertId = null;
  const title = document.getElementById('cert-modal-title');
  const form = document.getElementById('cert-form');
  
  if (title) title.textContent = i18n[appState.lang].modals.cert.addTitle;
  if (form) form.reset();
  
  document.getElementById('cert-input-id').value = '';
  showModal('cert-modal');
}

function openEditCertModal(certId) {
  const cert = appState.certificates.find(c => c.id === certId);
  if (!cert) return;

  appState.editingCertId = certId;
  const title = document.getElementById('cert-modal-title');
  
  if (title) title.textContent = i18n[appState.lang].modals.cert.editTitle;

  document.getElementById('cert-input-id').value = cert.id;
  document.getElementById('cert-input-title').value = cert.title[appState.lang] || cert.title.th || cert.title.en;
  document.getElementById('cert-input-issuer').value = cert.issuer[appState.lang] || cert.issuer.th || cert.issuer.en;
  document.getElementById('cert-input-date').value = cert.date;
  document.getElementById('cert-input-credential').value = cert.credentialId || '';
  document.getElementById('cert-input-desc').value = cert.description ? (cert.description[appState.lang] || cert.description.th || cert.description.en) : '';

  showModal('cert-modal');
}

function closeCertModal() {
  hideModal('cert-modal');
}

async function handleCertFormSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById('cert-input-id').value;
  const titleVal = document.getElementById('cert-input-title').value.trim();
  const issuerVal = document.getElementById('cert-input-issuer').value.trim();
  const dateVal = document.getElementById('cert-input-date').value.trim();
  const credentialVal = document.getElementById('cert-input-credential').value.trim();
  const descVal = document.getElementById('cert-input-desc').value.trim();
  const pdfInput = document.getElementById('cert-input-pdf');

  let pdfId = null;
  let pdfName = null;

  if (pdfInput && pdfInput.files[0]) {
    const file = pdfInput.files[0];
    if (file.type !== 'application/pdf') {
      showToast(i18n[appState.lang].toasts.invalidFileType, 'error');
      return;
    }
    const reader = new FileReader();
    const dataUrl = await new Promise(res => {
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(file);
    });
    pdfId = `cert-pdf-${Date.now()}`;
    pdfName = file.name;
    await window.spuStorage.saveFile(pdfId, dataUrl, 'application/pdf', file.name);
  }

  if (idInput) {
    // Edit existing cert
    const idx = appState.certificates.findIndex(c => c.id === idInput);
    if (idx !== -1) {
      const existing = appState.certificates[idx];
      existing.title = { th: titleVal, en: titleVal };
      existing.issuer = { th: issuerVal, en: issuerVal };
      existing.date = dateVal;
      existing.credentialId = credentialVal;
      existing.description = { th: descVal, en: descVal };
      if (pdfId) {
        existing.pdfId = pdfId;
        existing.pdfName = pdfName;
      }
      showToast(i18n[appState.lang].toasts.certUpdated, 'success');
    }
  } else {
    // Create new certificate
    const newCert = {
      id: `cert-${Date.now()}`,
      title: { th: titleVal, en: titleVal },
      issuer: { th: issuerVal, en: issuerVal },
      date: dateVal,
      credentialId: credentialVal,
      description: { th: descVal, en: descVal },
      pdfId: pdfId,
      pdfName: pdfName
    };
    appState.certificates.unshift(newCert);
    showToast(i18n[appState.lang].toasts.certAdded, 'success');
  }

  window.spuStorage.setItem('spu_certificates', appState.certificates);
  closeCertModal();
  await renderCertifications();
}

// Direct PDF attachment from certificate card
async function handleCertPdfDirectUpload(certId, input) {
  const file = input.files[0];
  if (!file) return;

  if (file.type !== 'application/pdf') {
    showToast(i18n[appState.lang].toasts.invalidFileType, 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const pdfId = `cert-pdf-${certId}-${Date.now()}`;
    await window.spuStorage.saveFile(pdfId, reader.result, 'application/pdf', file.name);

    const cert = appState.certificates.find(c => c.id === certId);
    if (cert) {
      cert.pdfId = pdfId;
      cert.pdfName = file.name;
      window.spuStorage.setItem('spu_certificates', appState.certificates);
      await renderCertifications();
      showToast(i18n[appState.lang].toasts.pdfAttached, 'success');
    }
  };
  reader.readAsDataURL(file);
}

// View Certificate in interactive in-app PDF Modal viewer
async function viewCertificatePdf(certId) {
  const cert = appState.certificates.find(c => c.id === certId);
  if (!cert || !cert.pdfId) {
    showToast(i18n[appState.lang].toasts.pdfViewError, 'error');
    return;
  }

  const file = await window.spuStorage.getFile(cert.pdfId);
  if (!file || !file.fileData) {
    showToast(i18n[appState.lang].toasts.pdfViewError, 'error');
    return;
  }

  const modal = document.getElementById('pdf-modal');
  const frame = document.getElementById('pdf-preview-frame');
  const title = document.getElementById('pdf-modal-title');
  const openNewTabBtn = document.getElementById('pdf-open-newtab-btn');
  const downloadBtn = document.getElementById('pdf-download-btn');

  const certTitle = cert.title[appState.lang] || cert.title.en;
  if (title) title.textContent = `${certTitle} (PDF Preview)`;

  frame.src = file.fileData;

  // Set action buttons
  openNewTabBtn.onclick = () => {
    const win = window.open();
    if (win) {
      win.document.write(`<iframe src="${file.fileData}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    }
  };

  downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = file.fileData;
    a.download = cert.pdfName || `${certTitle}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  showModal('pdf-modal');
}

function closePdfModal() {
  const frame = document.getElementById('pdf-preview-frame');
  frame.src = 'about:blank';
  hideModal('pdf-modal');
}

// -------------------------------------------------------------
// DELETE CONFIRMATION MODAL
// -------------------------------------------------------------
function confirmDelete(type, id) {
  appState.deleteTarget = { type, id };
  showModal('delete-modal');
}

function closeDeleteModal() {
  appState.deleteTarget = null;
  hideModal('delete-modal');
}

async function executeDelete() {
  if (!appState.deleteTarget) return;
  const { type, id } = appState.deleteTarget;

  if (type === 'project') {
    appState.projects = appState.projects.filter(p => p.id !== id);
    window.spuStorage.setItem('spu_projects', appState.projects);
    await renderProjects();
    showToast(i18n[appState.lang].toasts.projectDeleted, 'info');
  } else if (type === 'cert') {
    const cert = appState.certificates.find(c => c.id === id);
    if (cert && cert.pdfId) {
      await window.spuStorage.deleteFile(cert.pdfId);
    }
    appState.certificates = appState.certificates.filter(c => c.id !== id);
    window.spuStorage.setItem('spu_certificates', appState.certificates);
    await renderCertifications();
    showToast(i18n[appState.lang].toasts.certDeleted, 'info');
  }

  closeDeleteModal();
}

// -------------------------------------------------------------
// TOAST NOTIFICATIONS
// -------------------------------------------------------------
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm max-w-sm pointer-events-auto backdrop-blur-md transition-all';
  
  if (type === 'success') {
    toast.className += ' bg-teal-900/90 text-teal-100 border-teal-500/40 shadow-teal-950/20';
  } else if (type === 'error') {
    toast.className += ' bg-rose-900/90 text-rose-100 border-rose-500/40 shadow-rose-950/20';
  } else {
    toast.className += ' bg-slate-900/90 text-slate-100 border-slate-700/50 shadow-slate-950/20';
  }

  const iconSvg = type === 'success'
    ? `<svg class="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
    : type === 'error'
    ? `<svg class="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
    : `<svg class="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span class="flex-1 font-medium">${message}</span>
    <button class="text-white/60 hover:text-white" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
