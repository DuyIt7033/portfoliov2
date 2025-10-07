// Navigation: safe project card navigation
function goToProject(event, url) {
  if (event.target && event.target.tagName && event.target.tagName.toLowerCase() !== 'a') {
    window.location.href = url;
  }
}

// Dropdown CV toggle and outside click close
function setupDropdown() {
  const button = document.getElementById('dropdownButton');
  const menu = document.getElementById('dropdownMenu');
  if (!button || !menu) return;

  button.addEventListener('click', function () {
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', function (event) {
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.add('hidden');
    }
  });
}

// Timeline modal content
const timelineContent = {
  ghs: {
    title: 'Intern Web Developer',
    company: 'GHS (Global Hospitality Solutions)',
    time: '05/2024 - 07/2024',
    summary: 'Thực tập web, tối ưu hiệu năng & bảo mật, học và áp dụng API.',
    bullets: [
      'Ngăn chặn SQL Injection thông qua validate/filter input',
      'Nén ảnh WebP tối ưu hiệu năng',
      'Thiết kế API, chỉnh sửa UI, bảo mật email',
      'Cải thiện hiệu suất, cộng tác với Git'
    ],
    techs: ['HTML/CSS', 'JavaScript', 'WebP']
  },
  ttqt: {
    title: 'Thanh Toán Quốc Tế',
    company: 'UNIT CORP',
    time: '05/2025 – 12/2025',
    summary: 'Số hóa quy trình Sacombank toàn quốc, Microservices, Oracle.',
    bullets: [
      'Xây dựng Spring Boot API kiến trúc Microservices, OOP & clean code',
      'Tích hợp dịch vụ nội bộ và phía ngân hàng',
      'Thiết kế luồng phê duyệt, giảm thao tác thủ công',
      'Thiết kế & quản lý CSDL LC nhập khẩu, đảm bảo chính xác & bảo mật'
    ],
    techs: ['Spring Boot', 'Microservices', 'Hibernate/JPA', 'REST API', 'Oracle', 'Migration SQL', 'Git', 'Maven', 'Postman']
  },
  simo: {
    title: 'Report to SIMO',
    company: 'UNIT CORP',
    time: '09/2025 – 10/2025',
    summary: 'IRS App: tổng hợp và báo cáo dữ liệu lên SIMO (SBV).',
    bullets: [
      'Phát triển module gửi báo cáo từ HSBC tới SIMO',
      'Xây dựng backend Spring MVC, chuẩn dữ liệu & định dạng',
      'Triển khai luồng tổng hợp dữ liệu và gửi báo cáo'
    ],
    techs: ['Java', 'Spring MVC', 'Oracle', 'Migration SQL', 'Maven', 'Git', 'Postman']
  }
};

function renderModalBody(item) {
  const techBadges = (item.techs || []).map(t => `<span class="px-2 py-1 rounded-full text-xs" style="background: rgba(249,185,49,0.12); color:#f9f3e7; border:1px solid rgba(66,111,134,0.4)">${t}</span>`).join(' ');
  const bullets = (item.bullets || []).map(b => `<li class="pl-2">${b}</li>`).join('');
  return `
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="md:col-span-3 space-y-2">
        <p class="hadnumber font-bold text-sm" style="color:#426f86">${item.time}</p>
        <h4 class="text-lg font-semibold" style="color:#f9f3e7">${item.title} — <span style="color:#426f86">${item.company}</span></h4>
        <p style="color:#f9f3e7">${item.summary || ''}</p>
        <ul class="list-disc ml-5 mt-2 space-y-1">${bullets}</ul>
      </div>
      <div class="md:col-span-2">
        <div class="p-4 rounded-lg surface border-accent">
          <p class="hadnumber font-bold text-sm mb-2" style="color:#426f86">Công nghệ</p>
          <div class="flex flex-wrap gap-2">${techBadges}</div>
        </div>
      </div>
    </div>
  `;
}

function openTimelineModal(key) {
  const modal = document.getElementById('timelineModal');
  const title = document.getElementById('timelineModalTitle');
  const body = document.getElementById('timelineModalBody');
  const item = timelineContent[key];
  if (!modal || !title || !body || !item) return;
  title.textContent = `${item.company} — ${item.title}`;
  body.innerHTML = renderModalBody(item);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeTimelineModal() {
  const modal = document.getElementById('timelineModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// Expose functions to global for inline handlers
window.goToProject = goToProject;
window.openTimelineModal = openTimelineModal;
window.closeTimelineModal = closeTimelineModal;

// Init after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  setupDropdown();
  // Close by ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeTimelineModal();
  });
  setupI18n();
});

// Simple i18n
const translations = {
  en: {
    'hero.summary': 'Proficient in Java Spring Boot with experience building APIs, integrating Oracle databases, and contributing to banking projects. Focused on backend, data management, and security; strong teamwork, problem-solving, fast learning, responsibility, and long-term commitment.',
    'menu.home': 'Home',
    'menu.skills': 'Skills',
    'menu.experience': 'Experience',
    'menu.projects': 'Projects',
    'menu.contact': 'Contact',
    'cv.download': 'Download CV ▼',
    'cv.vi': 'Vietnamese Cv',
    'cv.en': 'English Cv',
    'tech.heading': 'Technologies',
    'tech.group.java': 'Java Ecosystem',
    'tech.group.py': 'Python Web',
    'tech.group.php': 'PHP Stack',
    'exp.heading': 'Experience',
    'projects.heading': 'Projects',
    'edu.heading': 'Education',
    'cert.heading': 'Certificates',
    'contact.heading': 'Interested In Working Together?',
    'contact.text': 'I’m always open to collaborating on exciting projects or answering any questions you might have. Feel free to reach out via email or through the social media platforms below.',
    'contact.copyright': '© PTND. All rights reserved.',
    'node.ghs.brief': 'Web internship, performance and security optimization, learning APIs.',
    'node.ttqt.brief': 'Digitizing Sacombank processes, Microservices, Oracle.',
    'node.simo.brief': 'IRS App: aggregate and report data to SBV.'
  },
  vi: {
    'hero.summary': 'Thành thạo Java Spring Boot, kinh nghiệm xây dựng API, tích hợp cơ sở dữ liệu Oracle và tham gia dự án ngân hàng. Tập trung phát triển backend, quản lý dữ liệu, bảo mật; làm việc nhóm tốt, giải quyết vấn đề hiệu quả, học nhanh và trách nhiệm, định hướng gắn bó lâu dài.',
    'menu.home': 'Trang chủ',
    'menu.skills': 'Kỹ năng',
    'menu.experience': 'Kinh nghiệm',
    'menu.projects': 'Dự án',
    'menu.contact': 'Liên hệ',
    'cv.download': 'Tải CV ▼',
    'cv.vi': 'CV Tiếng Việt',
    'cv.en': 'CV Tiếng Anh',
    'tech.heading': 'Công nghệ',
    'tech.group.java': 'Hệ sinh thái Java',
    'tech.group.py': 'Python Web',
    'tech.group.php': 'PHP Stack',
    'exp.heading': 'Kinh nghiệm',
    'projects.heading': 'Dự án',
    'edu.heading': 'Học vấn',
    'cert.heading': 'Chứng chỉ',
    'contact.heading': 'Bạn muốn hợp tác cùng tôi?',
    'contact.text': 'Tôi luôn sẵn sàng hợp tác trong các dự án thú vị hoặc giải đáp thắc mắc của bạn. Hãy liên hệ qua email hoặc các nền tảng mạng xã hội bên dưới.',
    'contact.copyright': '© PTND. Giữ mọi quyền.',
    'node.ghs.brief': 'Thực tập Web, tối ưu hiệu năng & bảo mật, học API.',
    'node.ttqt.brief': 'Số hóa quy trình Sacombank, Microservices, Oracle.',
    'node.simo.brief': 'IRS App: Tổng hợp, báo cáo dữ liệu lên SBV.'
  }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const t = translations[lang] && translations[lang][key];
    if (t) el.textContent = t;
  });
}

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

function setupI18n() {
  const saved = localStorage.getItem('lang') || 'vi';
  applyTranslations(saved);
  // floating toggle button
  const btn = document.createElement('button');
  btn.id = 'langToggleBtn';
  btn.style.position = 'fixed';
  btn.style.right = '16px';
  btn.style.bottom = '16px';
  btn.style.zIndex = '1000';
  btn.style.padding = '8px 12px';
  btn.style.border = '1px solid rgba(66,111,134,0.4)';
  btn.style.borderRadius = '20px';
  btn.style.background = 'rgba(47,49,48,0.8)';
  btn.style.color = '#f9f3e7';
  btn.style.cursor = 'pointer';
  btn.textContent = saved === 'vi' ? 'EN' : 'VI';
  btn.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'vi';
    const next = current === 'vi' ? 'en' : 'vi';
    setLanguage(next);
    btn.textContent = next === 'vi' ? 'EN' : 'VI';
  });
  document.body.appendChild(btn);
}

// expose language setter if needed
window.setLanguage = setLanguage;


