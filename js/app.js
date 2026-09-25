/**
 * Technical Writer Intern Starter Guide - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initWorkflowStepper();
  initChecklists();
  initCommComposer();
  initFilenameGenerator();
  initTemplates();
  initSearch();
  initScrollSpy();
  initTechieAssistant();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('tw_guide_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Mode tema diubah ke ${newTheme === 'dark' ? 'Dark 🌙' : 'Light ☀️'}`);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tw_guide_theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ==========================================================================
   2. Sidebar Navigation & Mobile Drawer
   ========================================================================== */
function initSidebar() {
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Close sidebar on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 860) {
          sidebar.classList.remove('mobile-open');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 860 && sidebar.classList.contains('mobile-open')) {
        if (!sidebar.contains(e.target) && !menuToggleBtn.contains(e.target)) {
          sidebar.classList.remove('mobile-open');
        }
      }
    });
  }

  // Print button
  const printBtn = document.getElementById('print-guide-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   3. Workflow Pipeline Stepper
   ========================================================================== */
const workflowData = [
  {
    step: 1,
    name: "Task Masuk",
    title: "Tahap 1: Task Masuk (Assignment)",
    desc: "Terima penugasan dan arahan langsung dari mentor atau team lead. Pastikan kamu memahami tujuan umum proyek sebelum melangkah ke tahap berikutnya.",
    checklist: [
      "Periksa kartu tugas (task card) di board manajemen proyek (Jira / Trello / ClickUp)",
      "Catat siapa Lead/Mentor yang bertanggung jawab atas task ini",
      "Ketahui estimasi target waktu pengerjaan draf awal"
    ],
    tip: "Segera tanyakan ke mentor jika deskripsi task terasa terlalu singkat atau belum jelas konteksnya."
  },
  {
    step: 2,
    name: "Pahami Requirement",
    title: "Tahap 2: Pahami Requirement & Scope",
    desc: "Pelajari ruang lingkup dokumen, siapa target pembaca (developer, user awam, atau stakeholder bisnis), serta tenggat waktu (deadline) yang ditentukan.",
    checklist: [
      "Identifikasi Target Audience: Apakah membutuhkan gaya bahasa teknis atau ramah pengguna akhir?",
      "Tentukan batas fitur: Fitur apa saja yang masuk scope dan fitur apa yang di luar scope?",
      "Cek ketersediaan template standar tim di repository"
    ],
    tip: "Mengetahui siapa pembaca dokumen mencegah kamu menggunakan jargon rumit untuk pengguna awam."
  },
  {
    step: 3,
    name: "Collect Information",
    title: "Tahap 3: Kumpulkan Materi & Eksplorasi Sistem",
    desc: "Kumpulkan materi pendukung, jalankan aplikasi di staging/development environment, coba alur pengguna langsung, dan susun draf pertanyaan spesifik.",
    checklist: [
      "Minta akun demo & URL staging kepada QA atau Developer",
      "Eksplorasi langsung flow aplikasi dan ambil tangkapan layar sementara",
      "Buat daftar pertanyaan jika menemukan error atau alur logika yang membingungkan"
    ],
    tip: "Selalu coba jalankan fitur sendiri sebelum bertanya kepada developer, agar pertanyaanmu berbobot dan fokus."
  },
  {
    step: 4,
    name: "Drafting",
    title: "Tahap 4: Penyusunan Draf (Drafting)",
    desc: "Mulai menyusun kerangka dan isi dokumen sesuai template standar. Gunakan struktur heading yang rapi, gambar pendukung yang jelas, dan bahasa yang konsisten.",
    checklist: [
      "Gunakan template resmi dari folder One Drive tim",
      "Terapkan hierarki Heading 1, Heading 2, Heading 3 secara berurutan",
      "Tambahkan screenshot bersih yang sudah diberi highlight visual (kotak merah/panah jika perlu)",
      "Gunakan terminologi baku dan hindari inkonsistensi kata kerja"
    ],
    tip: "Fokus pada kelengkapan draf awal terlebih dahulu, penyempurnaan gaya bahasa dapat diperhalus di tahap revisi."
  },
  {
    step: 5,
    name: "Review",
    title: "Tahap 5: Pengajuan Review (Peer & Stakeholder)",
    desc: "Ajukan draf ke PM atau Developer untuk pemeriksaan akurasi teknis, serta ke rekan Technical Writer / Lead untuk penilaian tata bahasa dan konsistensi.",
    checklist: [
      "Pastikan permission link Google Docs / Word cloud sudah dibuka akses edit/comment untuk reviewer",
      "Kirim pesan notifikasi ramah melalui channel komunikasi tim (Telegram / Slack)",
      "Sertakan catatan bagian-bagian khusus yang paling membutuhkan konfirmasi teknis"
    ],
    tip: "Berikan batas waktu wajar (misal: 1-2 hari kerja) agar dokumen tidak tertunda terlalu lama."
  },
  {
    step: 6,
    name: "Revision",
    title: "Tahap 6: Revisi & Tindak Lanjut Masukan",
    desc: "Lakukan perbaikan secara sistematis berdasarkan masukan, catatan komentar, dan hasil validasi teknis dari tim reviewer.",
    checklist: [
      "Periksa setiap komentar review satu per satu dan lakukan perbaikan yang diminta",
      "Balas komentar jika ada masukan yang membutuhkan klarifikasi tambahan",
      "Tandai komentar sebagai 'Resolved' hanya setelah revisi selesai diterapkan"
    ],
    tip: "Jangan ragu berdiskusi jika ada masukan reviewer yang bertentangan dengan standar gaya penulisan dokumentasi."
  },
  {
    step: 7,
    name: "Finalisasi",
    title: "Tahap 7: Approval Akhir & Publikasi",
    desc: "Minta approval akhir, simpan dokumen versi final ke cloud repository resmi (One Drive) dengan format penamaan yang baku, dan perbarui status task.",
    checklist: [
      "Terapkan format penamaan file standar: [JenisDokumen]_[NamaProject]_v[X.Y].docx",
      "Simpan file di struktur folder One Drive yang tepat, jangan di lokal!",
      "Ekspor versi PDF jika dokumen ditujukan untuk distribusi klien",
      "Update status task di board menjadi 'Done' / 'Published'"
    ],
    tip: "Arsipkan salinan dokumen di folder referensi pribadimu untuk bahan acuan proyek serupa selanjutnya."
  }
];

function initWorkflowStepper() {
  const pills = document.querySelectorAll('.workflow-step-pill');
  const titleEl = document.getElementById('workflow-step-title');
  const descEl = document.getElementById('workflow-step-desc');
  const checklistEl = document.getElementById('workflow-step-checklist');
  const tipEl = document.getElementById('workflow-step-tip');

  if (!pills.length || !titleEl) return;

  function renderStep(stepIndex) {
    const data = workflowData[stepIndex];
    if (!data) return;

    pills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === stepIndex);
    });

    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    checklistEl.innerHTML = '';
    data.checklist.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      checklistEl.appendChild(li);
    });

    if (tipEl) {
      tipEl.innerHTML = `💡 <strong>Pro-Tip:</strong> ${data.tip}`;
    }
  }

  pills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      renderStep(idx);
    });
  });

  // Initial render
  renderStep(0);
}

/* ==========================================================================
   4. Interactive Checklists with LocalStorage
   ========================================================================== */
function initChecklists() {
  const dailyChecklist = document.getElementById('daily-checklist');
  const finalChecklist = document.getElementById('final-checklist');

  loadChecklistState();

  // Attach toggle click to all check items
  document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('completed');
      saveChecklistState();
      updateChecklistCounters();
    });
  });

  // Reset daily
  const resetDailyBtn = document.getElementById('reset-daily-btn');
  if (resetDailyBtn) {
    resetDailyBtn.addEventListener('click', () => {
      document.querySelectorAll('#daily-checklist .check-item').forEach(i => i.classList.remove('completed'));
      saveChecklistState();
      updateChecklistCounters();
      showToast('Daily checklist telah di-reset!');
    });
  }

  // Reset final
  const resetFinalBtn = document.getElementById('reset-final-btn');
  if (resetFinalBtn) {
    resetFinalBtn.addEventListener('click', () => {
      document.querySelectorAll('#final-checklist .check-item').forEach(i => i.classList.remove('completed'));
      saveChecklistState();
      updateChecklistCounters();
      showToast('Final checklist telah di-reset!');
    });
  }

  // Select all final
  const allFinalBtn = document.getElementById('all-final-btn');
  if (allFinalBtn) {
    allFinalBtn.addEventListener('click', () => {
      document.querySelectorAll('#final-checklist .check-item').forEach(i => i.classList.add('completed'));
      saveChecklistState();
      updateChecklistCounters();
      showToast('Seluruh kriteria final telah dicentang! Siap submit 🚀');
    });
  }

  updateChecklistCounters();
}

function saveChecklistState() {
  const state = {};
  document.querySelectorAll('.check-item').forEach(item => {
    const id = item.getAttribute('data-id');
    if (id) {
      state[id] = item.classList.contains('completed');
    }
  });
  localStorage.setItem('tw_guide_checklists', JSON.stringify(state));
}

function loadChecklistState() {
  const saved = localStorage.getItem('tw_guide_checklists');
  if (!saved) return;
  try {
    const state = JSON.parse(saved);
    document.querySelectorAll('.check-item').forEach(item => {
      const id = item.getAttribute('data-id');
      if (id && state[id]) {
        item.classList.add('completed');
      }
    });
  } catch (e) {
    console.error('Failed to load checklist state', e);
  }
}

function updateChecklistCounters() {
  // Daily counter
  const dailyTotal = document.querySelectorAll('#daily-checklist .check-item').length;
  const dailyDone = document.querySelectorAll('#daily-checklist .check-item.completed').length;
  const dailyCounter = document.getElementById('daily-counter');
  if (dailyCounter) dailyCounter.textContent = `${dailyDone}/${dailyTotal} Selesai`;

  // Final counter
  const finalTotal = document.querySelectorAll('#final-checklist .check-item').length;
  const finalDone = document.querySelectorAll('#final-checklist .check-item.completed').length;
  const finalCounter = document.getElementById('final-counter');
  if (finalCounter) finalCounter.textContent = `${finalDone}/${finalTotal} Terpenuhi`;

  // Sidebar overall tracker
  const totalAll = dailyTotal + finalTotal;
  const doneAll = dailyDone + finalDone;
  const percent = totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0;

  const barFill = document.getElementById('intern-progress-fill');
  const barPercent = document.getElementById('intern-progress-percent');
  if (barFill) barFill.style.width = `${percent}%`;
  if (barPercent) barPercent.textContent = `${percent}%`;

  // Trigger celebration when 100% completed (Requirement 25)
  if (percent === 100 && totalAll > 0 && !window.__techieCelebrated) {
    window.__techieCelebrated = true;
    if (typeof triggerTechieCelebration === 'function') {
      triggerTechieCelebration();
    }
  } else if (percent < 100) {
    window.__techieCelebrated = false;
  }
}

/* ==========================================================================
   5. Interactive Communication Simulator / Generator
   ========================================================================== */
function initCommComposer() {
  const tabBtns = document.querySelectorAll('.composer-tab-btn');
  const recipientInput = document.getElementById('comm-recipient');
  const subjectInput = document.getElementById('comm-subject');
  const pointsInput = document.getElementById('comm-points');
  const linkInput = document.getElementById('comm-link');
  const previewText = document.getElementById('comm-preview-text');
  const copyBtn = document.getElementById('copy-comm-btn');

  if (!previewText) return;

  let activeType = 'klarifikasi'; // 'klarifikasi', 'followup', 'blocker'

  const templates = {
    klarifikasi: (recipient, subject, points, link) => {
      return `Halo Mas/Mbak ${recipient || '[Nama Dev/PM]'}, saya sedang menyusun dokumentasi ${subject || '[Nama Dokumen/Fitur]'}. Ada poin alur yang ingin saya konfirmasi:\n\n${points || '1. Apakah status ini otomatis berganti?\n2. Jika user membatalkan, apakah data tersimpan?'}\n\nDraf dokumen dapat dilihat di ${link || '[Link Dokumen]'}. Terima kasih banyak atas bantuannya!`;
    },
    followup: (recipient, subject, points, link) => {
      return `Halo Mas/Mbak ${recipient || '[Nama Reviewer]'}, izin menanyakan terkait review draf ${subject || '[Nama Dokumen/Fitur]'}.\n\nApakah sudah sempat memeriksa bagian berikut:\n${points || '- Alur transaksi pada bab 3\n- Gambar arsitektur sistem'}\n\nLink dokumen: ${link || '[Link Dokumen]'}.\nJika ada bagian yang perlu direvisi atau didiskusikan langsung, mohon infonya ya. Terima kasih!`;
    },
    blocker: (recipient, subject, points, link) => {
      return `Halo Mas/Mbak ${recipient || '[Nama Lead/Mentor]'}, izin mengabarkan blocker dalam pengerjaan task ${subject || '[Nama Task]'}.\n\nKendala yang dialami:\n${points || '- Belum mendapat akses akun staging\n- Endpoint API belum mengembalikan response yang valid'}\n\nOpsi/langkah yang sudah dicoba:\n- Menghubungi tim DevOps via Telegram\n- Menguji via Postman tapi menerima error 403\n\nLampiran/draf: ${link || '[Link Terkait]'}. Mohon arahannya, terima kasih!`;
    }
  };

  function updatePreview() {
    const fn = templates[activeType] || templates.klarifikasi;
    previewText.textContent = fn(
      recipientInput.value.trim(),
      subjectInput.value.trim(),
      pointsInput.value.trim(),
      linkInput.value.trim()
    );
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.getAttribute('data-type');
      updatePreview();
    });
  });

  [recipientInput, subjectInput, pointsInput, linkInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updatePreview);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyToClipboard(previewText.textContent, 'Pesan komunikasi berhasil disalin!');
    });
  }

  updatePreview();
}

/* ==========================================================================
   6. Interactive Naming Convention Tool
   ========================================================================== */
function initFilenameGenerator() {
  const docTypeSelect = document.getElementById('name-doctype');
  const projNameInput = document.getElementById('name-project');
  const versionInput = document.getElementById('name-version');
  const extSelect = document.getElementById('name-ext');
  const resultDisplay = document.getElementById('filename-result');
  const copyBtn = document.getElementById('copy-filename-btn');

  if (!resultDisplay) return;

  function updateFilename() {
    const docType = docTypeSelect.value || 'UserGuide';
    let proj = projNameInput.value.trim() || 'ProjectName';
    proj = proj.replace(/\s+/g, '_'); // sanitize spaces
    let ver = versionInput.value.trim() || '1.0';
    if (!ver.startsWith('v')) ver = 'v' + ver;
    const ext = extSelect.value || '.docx';

    const filename = `${docType}_${proj}_${ver}${ext}`;
    resultDisplay.textContent = filename;
  }

  [docTypeSelect, projNameInput, versionInput, extSelect].forEach(el => {
    if (el) el.addEventListener('input', updateFilename);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyToClipboard(resultDisplay.textContent, 'Nama file berhasil disalin!');
    });
  }

  updateFilename();
}

/* ==========================================================================
   7. Useful Templates System
   ========================================================================== */
function initTemplates() {
  const tabs = document.querySelectorAll('.template-tab-btn');
  const panels = document.querySelectorAll('.template-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-panel');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });

  // Copy buttons on templates
  document.querySelectorAll('.btn-copy-template').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-copy-target');
      const codeEl = document.getElementById(codeId);
      if (codeEl) {
        copyToClipboard(codeEl.textContent, 'Template berhasil disalin ke clipboard!');
      }
    });
  });
}

/* ==========================================================================
   8. Search Engine & Modal
   ========================================================================== */
const searchableItems = [
  { title: "Welcome & Role Introduction", section: "section-1", snippet: "Penerjemah Konteks Teknis dan Penjaga Standar Dokumentasi." },
  { title: "Tools Utama: Word, Draw.io, Snipping Tool", section: "section-2", snippet: "Persiapan awal, repository One Drive, channel Telegram." },
  { title: "Workflow 7 Tahap (Pipeline)", section: "section-3", snippet: "Task Masuk, Requirement, Collect Info, Drafting, Review, Revision, Finalisasi." },
  { title: "Tipe Dokumen (SOP, User Guide, MoM, dll.)", section: "section-4", snippet: "7 jenis dokumen: SOP, User Guide, Technical Doc, MoM, Test Plan." },
  { title: "Cara Handle Task Baru (Initial Check)", section: "section-5", snippet: "Identifikasi Information Gap, cek deadline, ajukan pertanyaan kunci." },
  { title: "Komunikasi dengan Tim PM & Developer", section: "section-6", snippet: "Simulator pesan, etika follow-up review, dan eskalasi blocker." },
  { title: "Tips Dokumentasi & Standar Penamaan File", section: "section-7", snippet: "Format penamaan [Jenis]_[Project]_v[X.Y], hierarki heading, screenshot bersih." },
  { title: "Common Mistakes (Kesalahan yang Harus Dihindari)", section: "section-8", snippet: "Do's & Don'ts: jangan tulis tanpa requirement, screenshot out of date, simpan lokal." },
  { title: "Daily & Weekly Checklist Interaktif", section: "section-9", snippet: "Daftar centang harian untuk melacak progress pekerjaan dan task board." },
  { title: "Pesan & Tips dari Intern Sebelumnya (Legacy Note)", section: "section-10", snippet: "5 nasihat emas: jangan takut bertanya, pahami konteks bisnis, catat rapi." },
  { title: "Template Dokumen (MoM, SOP, User Guide)", section: "section-11", snippet: "Template siap salin untuk Minutes of Meeting, Standard Operating Procedure, dan Manual." },
  { title: "Final Checklist Sebelum Submit Dokumen", section: "section-12", snippet: "Pemeriksaan akhir nama file, konsistensi istilah, UI terbaru, dan approval." }
];

function initSearch() {
  const triggerBtn = document.getElementById('search-trigger-btn');
  const modalBackdrop = document.getElementById('search-modal-backdrop');
  const searchInput = document.getElementById('modal-search-input');
  const resultsList = document.getElementById('search-results-list');
  const closeBtn = document.getElementById('close-search-btn');

  if (!modalBackdrop || !searchInput || !resultsList) return;

  function openSearch() {
    modalBackdrop.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
    renderResults('');
  }

  function closeSearch() {
    modalBackdrop.classList.remove('open');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeSearch();
  });

  // Keyboard shortcut Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modalBackdrop.classList.contains('open') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    renderResults(e.target.value.trim().toLowerCase());
  });

  function renderResults(query) {
    resultsList.innerHTML = '';
    const filtered = query
      ? searchableItems.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.snippet.toLowerCase().includes(query)
        )
      : searchableItems;

    if (filtered.length === 0) {
      resultsList.innerHTML = `
        <li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          Tidak ada topik yang cocok dengan "<strong>${escapeHtml(query)}</strong>"
        </li>`;
      return;
    }

    filtered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.innerHTML = `
        <div>
          <div class="search-result-title">${highlightText(item.title, query)}</div>
          <div class="search-result-snippet">${highlightText(item.snippet, query)}</div>
        </div>
        <span style="font-size: 0.75rem; color: var(--indigo-500); font-weight: 600;">Buka ➔</span>
      `;

      li.addEventListener('click', () => {
        closeSearch();
        const target = document.getElementById(item.section);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          target.style.transition = 'box-shadow 0.3s ease';
          target.style.boxShadow = '0 0 0 3px var(--indigo-500)';
          setTimeout(() => {
            target.style.boxShadow = '';
          }, 1800);
        }
      });

      resultsList.appendChild(li);
    });
  }
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark style="background: rgba(99, 102, 241, 0.25); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================================================================
   9. ScrollSpy for Sidebar Active State
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}

/* ==========================================================================
   Utility: Copy to Clipboard & Toast
   ========================================================================== */
function copyToClipboard(text, successMsg = 'Teks berhasil disalin!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Gagal menyalin teks');
  }
  document.body.removeChild(textarea);
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `<span>✓</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ==========================================================================
   10. Chibi AI — Techie Interactive Assistant & Companion (Requirements 22 - 28)
   ========================================================================== */
function initTechieAssistant() {
  const floatingWrapper = document.getElementById('techie-floating-wrapper');
  const avatarBtn = document.getElementById('techie-avatar-btn');
  const askBadge = document.getElementById('techie-ask-badge');
  const chatPanel = document.getElementById('techie-chat-panel');
  const closeChatBtn = document.getElementById('close-chat-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-user-input');

  const speechBubble = document.getElementById('techie-speech-bubble');
  const bubbleText = document.getElementById('bubble-text');
  const bubbleActionBtn = document.getElementById('bubble-action-btn');
  const closeBubbleBtn = document.getElementById('close-speech-bubble-btn');
  const floatingAvatarImg = document.getElementById('floating-techie-img');

  if (!floatingWrapper || !chatPanel) return;

  // 1. Toggle Chat Panel
  function openChat() {
    chatPanel.classList.remove('hidden');
    chatPanel.setAttribute('aria-hidden', 'false');
    if (chatInput) chatInput.focus();
    if (floatingAvatarImg) {
      floatingAvatarImg.src = 'assets/techie_laptop.png';
    }
  }

  function closeChat() {
    chatPanel.classList.add('hidden');
    chatPanel.setAttribute('aria-hidden', 'true');
    if (floatingAvatarImg) {
      floatingAvatarImg.src = 'assets/techie_default.png';
    }
  }

  if (avatarBtn) {
    avatarBtn.addEventListener('click', () => {
      if (chatPanel.classList.contains('hidden')) openChat();
      else closeChat();
    });
  }

  if (askBadge) askBadge.addEventListener('click', openChat);
  if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);

  // 2. Speech Bubble Interactions (Requirement 26)
  if (closeBubbleBtn) {
    closeBubbleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speechBubble.style.display = 'none';
    });
  }

  if (bubbleActionBtn) {
    bubbleActionBtn.addEventListener('click', () => {
      openChat();
    });
  }

  // Section Contextual Tips for Speech Bubble (Requirement 24 & 26)
  const sectionTips = {
    'section-1': {
      text: "Hai! Selamat datang di dunia Technical Writing 👋 Yuk kenalan dulu dengan role kamu.",
      pose: 'assets/techie_welcome.png'
    },
    'section-2': {
      text: "Sebelum mulai, pastikan tools, repository, dan communication channel sudah siap.",
      pose: 'assets/techie_checklist.png'
    },
    'section-3': {
      text: "Task masuk bukan berarti langsung menulis. Pahami requirement dan kumpulkan informasinya dulu.",
      pose: 'assets/techie_laptop.png'
    },
    'section-4': {
      text: "SOP, User Guide, MoM, Technical Documentation... Kamu akan menemukan berbagai jenis dokumentasi di sini.",
      pose: 'assets/techie_explaining.png'
    },
    'section-5': {
      text: "Kalau requirement belum jelas, jangan langsung menebak. Catat information gap dan siapkan pertanyaan.",
      pose: 'assets/techie_thinking.png'
    },
    'section-6': {
      text: "Siapkan pertanyaan yang terstruktur sebelum menghubungi PM atau Dev.",
      pose: 'assets/techie_writing.png'
    },
    'section-7': {
      text: "Gunakan standar penamaan file: [Jenis]_[Project]_v[X.Y].docx agar arsip cloud selalu tertib!",
      pose: 'assets/techie_laptop.png'
    },
    'section-8': {
      text: "Jangan sampai screenshot yang kamu gunakan ternyata masih versi lama 👀",
      pose: 'assets/techie_warning.png'
    },
    'section-9': {
      text: "Sedikit demi sedikit, checklist yang rapi bikin pekerjaan lebih terkontrol.",
      pose: 'assets/techie_checklist.png'
    },
    'section-10': {
      text: "Tips dari intern sebelumnya? Jangan takut bertanya.",
      pose: 'assets/techie_default.png'
    },
    'section-11': {
      text: "Butuh struktur cepat? Gunakan template MoM, SOP, atau User Guide yang sudah teruji!",
      pose: 'assets/techie_explaining.png'
    },
    'section-12': {
      text: "Sudah cek semuanya? Kalau iya, you're ready to submit! 🚀",
      pose: 'assets/techie_thumbsup.png'
    }
  };

  // Update bubble text dynamically on scroll
  let currentSectionId = '';
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        const id = sec.getAttribute('id');
        if (id !== currentSectionId && sectionTips[id]) {
          currentSectionId = id;
          if (bubbleText && speechBubble.style.display !== 'none') {
            bubbleText.textContent = sectionTips[id].text;
            if (floatingAvatarImg && chatPanel.classList.contains('hidden')) {
              floatingAvatarImg.src = sectionTips[id].pose;
            }
          }
        }
      }
    });
  });

  // 3. Section Entrance Animations via IntersectionObserver (Requirement 25)
  const sectionCards = document.querySelectorAll('.techie-section-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    sectionCards.forEach(card => observer.observe(card));
  } else {
    sectionCards.forEach(card => card.classList.add('is-visible'));
  }

  // 4. Quick Questions & Answers Database (Strictly Starter Guide content - Requirement 23)
  const knowledgeBase = {
    "What should I do first?": {
      title: "Langkah Pertama yang Wajib Kamu Lakukan (Persiapan Awal)",
      content: "Sebagai Technical Writer Intern baru, lakukan 3 persiapan awal ini sebelum mengambil task pertama:\n\n• 🛠️ Tools Utama: Siapkan Google Docs / MS Word (penulisan baku), Draw.io (pembuatan diagram & flowchart), serta Snipping Tool (screenshot bersih).\n• 📁 Document Repository: Pahami struktur folder kerja tim di One Drive agar draf tidak tersimpan lokal di laptop pribadi tanpa cadangan.\n• 💬 Communication Channel: Masuk ke channel tim di Telegram (seperti #proj-documentation, #announcements, dan #dev-team) lalu perkenalkan dirimu!",
      jumpTarget: "#section-2",
      jumpLabel: "Buka Bagian Before You Start ➔"
    },
    "How does the workflow work?": {
      title: "Alur Kerja (Workflow) 7 Tahap",
      content: "Pembuatan dokumen mengikuti 7 tahapan terstruktur:\n\n1. Task Masuk: Terima penugasan dan pelajari tujuan fitur.\n2. Pahami Requirement: Telaah user stories & use-case flow.\n3. Collect Information: Wawancara PM/Dev & eksplorasi environment staging.\n4. Drafting: Tulis draf dokumen menggunakan template baku.\n5. Review: Kirimkan draf ke tim teknis untuk validasi akurasi.\n6. Revision: Selesaikan revisi dan update tangkapan layar.\n7. Finalisasi: Simpan di One Drive resmi dan bagikan link akses ke tim.",
      jumpTarget: "#section-3",
      jumpLabel: "Buka Visualisasi Pipeline Workflow ➔"
    },
    "What should I check before submitting?": {
      title: "Final Quality Gate (Checklist Sebelum Submit)",
      content: "Sebelum menyerahkan dokumen ke mentor atau stakeholder, pastikan 6 kriteria ini lulus:\n\n☑️ Standar Penamaan: Judul & header sudah sesuai format [Jenis]_[Project]_v[X.Y].docx\n☑️ Konsistensi Bahasa: Ejaan baku, tanpa typo, istilah teknis seragam (misal: Unduh vs Download)\n☑️ Screenshot UI Terkini: Menggunakan tampilan staging/live versi terbaru dan data privat tersensor\n☑️ Format & Tipografi: Hierarki Heading 1/2/3 rapi, penomoran langkah urut, tabel rapi\n☑️ Pertanyaan Tuntas: Tidak ada placeholder [TBD] yang tertinggal\n☑️ Akses Cloud Terbuka: File sudah di One Drive resmi dan permission sharing aktif.",
      jumpTarget: "#section-12",
      jumpLabel: "Buka Final Checklist Interaktif ➔"
    },
    "How should I communicate with Dev?": {
      title: "Etika Komunikasi dengan Developer & PM",
      content: "Kunci komunikasi yang efektif dengan tim teknis:\n\n• 📋 Pertanyaan Terstruktur: Kumpulkan pertanyaan dalam daftar poin terstruktur dengan konteks yang jelas sebelum menghubungi Dev/PM. Hindari bertanya sepenggal-sepenggal tanpa konteks.\n• ⏰ Follow-Up Tepat Waktu: Berikan waktu 1-2 hari kerja untuk review. Jika belum ada respon, sapa dengan ramah disertai link langsung ke bagian yang butuh persetujuan.\n• 🚨 Eskalasi Blocker Cepat: Jangan diam menunggu jika terhalang akses akun atau bug API. Segera beri tahu mentor di Telegram!",
      jumpTarget: "#section-6",
      jumpLabel: "Buka Simulator Komunikasi ➔"
    },
    "What mistakes should I avoid?": {
      title: "Kesalahan Umum yang Wajib Dihindari",
      content: "Waspadai 4 jebakan ini:\n\n❌ Langsung menulis tanpa memahami requirement: Luangkan waktu klarifikasi scope di awal agar tidak perombakan total saat review.\n❌ Tidak mencatat rapat secara real-time: Segera catat MoM saat rapat berlangsung.\n❌ Screenshot usang & data privat terekspos: Pastikan UI versi rilis terbaru dan data rahasia sudah disamarkan.\n❌ Menyimpan dokumen hanya di laptop lokal: Selalu simpan di shared cloud One Drive perusahaan dengan auto-save aktif!",
      jumpTarget: "#section-8",
      jumpLabel: "Buka Common Mistakes ➔"
    }
  };

  // 5. Category Handlers (Requirement 27 AI Assistant Mode)
  const categoryResponses = {
    workflow: {
      title: "⚡ Alur Kerja 7 Tahap",
      content: "Proses penulisan dokumen terdiri dari 7 tahapan: <strong>1. Task Masuk ➔ 2. Pahami Requirement ➔ 3. Collect Info ➔ 4. Drafting ➔ 5. Review ➔ 6. Revision ➔ 7. Finalisasi</strong>. Di portal ini, kamu bisa mengklik setiap tombol tahap untuk melihat action item dan pro-tip lengkap!",
      jumpTarget: "#section-3",
      jumpLabel: "Jelajahi Pipeline Workflow ➔"
    },
    'new-task': {
      title: "📝 Langkah Taktis Menerima Task Baru",
      content: "Saat mendapat task baru: <strong>1. Pemeriksaan Awal</strong> (cek deadline & template), <strong>2. Daftar Pertanyaan Kunci</strong> (siapa target pembaca, versi berapa, prasyarat akses), dan <strong>3. Identifikasi Information Gap</strong> (catat bagian alur yang belum jelas dan jadwalkan sesi klarifikasi singkat).",
      jumpTarget: "#section-5",
      jumpLabel: "Buka Panduan New Task ➔"
    },
    documentation: {
      title: "📚 7 Jenis Dokumen Technical Writer",
      content: "Dokumen yang akan kamu tangani mencakup: <strong>SOP</strong> (prosedur baku operasional), <strong>User Guide</strong> (panduan pengguna akhir), <strong>Technical Doc</strong> (spesifikasi teknis & API), <strong>Knowledge Article</strong> (solusi troubleshooting), <strong>MoM</strong> (notula rapat & action items), <strong>Test Plan</strong> (skenario pengujian), dan <strong>Documentation Update</strong> (pembaharuan versi).",
      jumpTarget: "#section-4",
      jumpLabel: "Lihat Detail Jenis Dokumen ➔"
    },
    checklist: {
      title: "✅ Checklist Kerja Harian & Final",
      content: "Gunakan <strong>Daily / Weekly Checklist</strong> (6 tugas rutin) untuk menjaga ritme kerja harian, dan <strong>Final Checklist</strong> (6 butir Quality Gate) tepat sebelum mengirimkan dokumen ke stakeholder. Seluruh progres tersimpan otomatis di browser!",
      jumpTarget: "#section-9",
      jumpLabel: "Buka Checklist Interaktif ➔"
    },
    communication: {
      title: "💬 Etika Komunikasi & Simulator Pesan",
      content: "Gunakan form generator pesan di Bagian 06 untuk menyusun pesan <em>Klarifikasi Teknis</em>, <em>Follow-Up Review</em>, atau <em>Eskalasi Blocker</em> secara profesional dengan tombol salin instan satu-klik.",
      jumpTarget: "#section-6",
      jumpLabel: "Buka Simulator Komunikasi ➔"
    }
  };

  // Helper to add message bubble
  function addMessage(sender, htmlContent, jumpLink = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;

    const avatarHtml = sender === 'bot'
      ? `<div class="chat-msg-avatar"><img src="assets/techie_welcome.png" alt="Techie"></div>`
      : `<div class="chat-msg-avatar" style="background: var(--violet-500); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">ME</div>`;

    let bubbleInner = `<div class="chat-msg-bubble">${htmlContent}`;
    if (jumpLink) {
      bubbleInner += `<br><button class="chat-jump-btn" data-target="${jumpLink.target}"><span>${jumpLink.label}</span></button>`;
    }
    bubbleInner += `</div>`;

    msgDiv.innerHTML = avatarHtml + bubbleInner;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const jumpBtn = msgDiv.querySelector('.chat-jump-btn');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        const targetId = jumpBtn.getAttribute('data-target');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          closeChat();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.style.boxShadow = '0 0 0 3px var(--indigo-500)';
          setTimeout(() => { targetEl.style.boxShadow = ''; }, 2000);
        }
      });
    }
  }

  // Helper for bot typing effect
  function botReply(htmlContent, jumpLink = null) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.innerHTML = `
      <div class="chat-msg-avatar"><img src="assets/techie_writing.png" alt="Techie Writing"></div>
      <div class="chat-msg-bubble">
        <div class="typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();
      addMessage('bot', htmlContent, jumpLink);
    }, 450);
  }

  // Attach quick question buttons click
  function setupQuickButtons() {
    document.querySelectorAll('.quick-q-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-question');
        handleQuestion(q);
      });
    });
  }
  setupQuickButtons();

  // Attach category chip clicks
  document.querySelectorAll('.chat-category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.getAttribute('data-category');
      const data = categoryResponses[cat];
      if (data) {
        addMessage('user', `Bisa jelaskan seputar <strong>${chip.textContent}</strong>?`);
        botReply(`<p><strong>${data.title}</strong></p><p style="margin-top: 6px;">${data.content}</p>`, {
          target: data.jumpTarget,
          label: data.jumpLabel
        });
      }
    });
  });

  // Handle question string
  function handleQuestion(question) {
    addMessage('user', question);
    const item = knowledgeBase[question];
    if (item) {
      const formatted = `<p><strong>${item.title}</strong></p><div style="margin-top: 6px; white-space: pre-line;">${item.content}</div>`;
      botReply(formatted, {
        target: item.jumpTarget,
        label: item.jumpLabel
      });
    } else {
      // Intelligent fallback query against Starter Guide keywords
      const qLower = question.toLowerCase();
      let match = null;

      if (qLower.includes('sop') || qLower.includes('standard operating')) {
        match = {
          text: "<strong>SOP (Standard Operating Procedure):</strong> Dokumen instruksi baku langkah-demi-langkah yang memuat Tujuan, Ruang Lingkup, Definisi, Prosedur, dan Flowchart. Gunakan template resmi di Bagian 11.",
          target: "#section-11",
          label: "Buka Template SOP ➔"
        };
      } else if (qLower.includes('mom') || qLower.includes('meeting') || qLower.includes('notula')) {
        match = {
          text: "<strong>MoM (Minutes of Meeting):</strong> Catatan resmi rapat yang mencakup Waktu, Peserta, Keputusan, dan Action Items (Task, PIC, Due Date). Catat secara real-time saat rapat berlangsung.",
          target: "#section-11",
          label: "Buka Template MoM ➔"
        };
      } else if (qLower.includes('user guide') || qLower.includes('manual')) {
        match = {
          text: "<strong>User Guide:</strong> Panduan pemakaian aplikasi untuk end-user. Struktur: Pendahuluan ➔ Prasyarat Akses ➔ Panduan Fitur + Screenshot UI versi terbaru ➔ FAQ.",
          target: "#section-11",
          label: "Buka Template User Guide ➔"
        };
      } else if (qLower.includes('screenshot') || qLower.includes('gambar') || qLower.includes('ui')) {
        match = {
          text: "<strong>Standar Screenshot:</strong> Gunakan Snipping Tool dari environment staging/live versi terbaru. Berikan border/highlight merah pada tombol aksi, dan pastikan data pribadi atau rahasia disamarkan.",
          target: "#section-8",
          label: "Cek Panduan Screenshot di Mistakes ➔"
        };
      } else if (qLower.includes('nama file') || qLower.includes('naming') || qLower.includes('version')) {
        match = {
          text: "<strong>Standar Penamaan File:</strong> Format baku tim adalah <code>[Jenis]_[Project]_v[X.Y].docx</code> (contoh: <code>SOP_PaymentGateway_v1.0.docx</code>). Gunakan generator penamaan file di Bagian 07!",
          target: "#section-7",
          label: "Buka Generator Nama File ➔"
        };
      } else if (qLower.includes('onedrive') || qLower.includes('cloud') || qLower.includes('folder')) {
        match = {
          text: "<strong>Cloud First Policy:</strong> Kerjakan dan simpan seluruh file di One Drive resmi perusahaan. Jangan menyimpan draf hanya di local storage laptop untuk menghindari kehilangan data.",
          target: "#section-2",
          label: "Cek Panduan Repository ➔"
        };
      } else if (qLower.includes('telegram') || qLower.includes('channel') || qLower.includes('chat')) {
        match = {
          text: "<strong>Communication Channel:</strong> Masuk ke channel Telegram tim (#proj-documentation, #announcements, #dev-team) dan perkenalkan diri saat bergabung.",
          target: "#section-2",
          label: "Cek Channel Komunikasi ➔"
        };
      } else if (qLower.includes('blocker') || qLower.includes('kendala') || qLower.includes('macet')) {
        match = {
          text: "<strong>Eskalasi Blocker:</strong> Jangan menunggu jika tertahan akun staging atau respon API. Segera kabari mentor/lead via Telegram menggunakan template eskalasi blocker di Bagian 06.",
          target: "#section-6",
          label: "Buka Template Blocker ➔"
        };
      } else {
        match = {
          text: `Pertanyaan kamu mengenai <em>"${question}"</em> telah tercatat. Sebagai intern, selalu rujuk pada 12 modul panduan di website ini atau gunakan quick buttons di bawah:`,
          target: "#section-1",
          label: "Kembali ke Awal Panduan ➔"
        };
      }

      botReply(`<p>${match.text}</p>`, {
        target: match.target,
        label: match.label
      });
    }
  }

  // Handle Chat Input Form Submit
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      chatInput.value = '';
      handleQuestion(val);
    });
  }

  // Clear Chat History
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-message bot">
          <div class="chat-msg-avatar"><img src="assets/techie_welcome.png" alt="Techie"></div>
          <div class="chat-msg-bubble">
            <p>Percakapan telah di-reset! Aku <strong>Techie</strong> 👋 Apa yang bisa kubantu hari ini?</p>
            <div class="quick-questions-wrapper">
              <button class="quick-q-btn" data-question="What should I do first?"><span>What should I do first?</span><span>➔</span></button>
              <button class="quick-q-btn" data-question="How does the workflow work?"><span>How does the workflow work?</span><span>➔</span></button>
              <button class="quick-q-btn" data-question="What should I check before submitting?"><span>What should I check before submitting?</span><span>➔</span></button>
            </div>
          </div>
        </div>
      `;
      setupQuickButtons();
      showToast('Riwayat chat telah di-reset');
    });
  }

  // 6. Interactive 9-Pose Showcase Gallery Switcher (Requirement 28)
  const poseCards = document.querySelectorAll('.techie-pose-card');
  const poseFileMap = {
    welcome: 'assets/techie_welcome.png',
    laptop: 'assets/techie_laptop.png',
    writing: 'assets/techie_writing.png',
    thinking: 'assets/techie_thinking.png',
    explaining: 'assets/techie_explaining.png',
    warning: 'assets/techie_warning.png',
    checklist: 'assets/techie_checklist.png',
    celebration: 'assets/techie_celebration.png',
    thumbsup: 'assets/techie_thumbsup.png'
  };

  poseCards.forEach(card => {
    card.addEventListener('click', () => {
      poseCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const poseKey = card.getAttribute('data-pose');
      if (poseFileMap[poseKey] && floatingAvatarImg) {
        floatingAvatarImg.src = poseFileMap[poseKey];
        // Trigger subtle bounce
        floatingAvatarImg.parentElement.style.transform = 'translateY(-12px) scale(1.15)';
        setTimeout(() => {
          floatingAvatarImg.parentElement.style.transform = '';
        }, 400);
        showToast(`Techie berganti ke Pose: ${card.querySelector('.techie-pose-name').textContent} ✨`);
      }
    });
  });

  // 7. Celebration Modal Close Button
  const closeCelebrationBtn = document.getElementById('close-celebration-btn');
  const celebrationOverlay = document.getElementById('techie-celebration-overlay');
  if (closeCelebrationBtn && celebrationOverlay) {
    closeCelebrationBtn.addEventListener('click', () => {
      celebrationOverlay.classList.remove('active');
      if (floatingAvatarImg) {
        floatingAvatarImg.src = 'assets/techie_thumbsup.png';
      }
    });
  }
}

// Celebration Trigger function (Requirement 25)
function triggerTechieCelebration() {
  const overlay = document.getElementById('techie-celebration-overlay');
  const floatingAvatarImg = document.getElementById('floating-techie-img');
  if (overlay) {
    overlay.classList.add('active');
  }
  if (floatingAvatarImg) {
    floatingAvatarImg.src = 'assets/techie_celebration.png';
  }
  showToast('🎉 Selamat! 100% Seluruh Checklist Selesai!');
}

