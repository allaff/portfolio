const translations = {
    pt: { nav_about: "Sobre", nav_projects: "Projetos", nav_cert: "Certificados", nav_contact: "Contato", hero_cta: "Ver Projetos", about_title: "Sobre Mim", projects_title: "Projetos", cert_title: "Certificados", contact_title: "Contato", contact_text: "Vamos trabalhar juntos? Me mande um email." },
    en: { nav_about: "About", nav_projects: "Projects", nav_cert: "Certificates", nav_contact: "Contact", hero_cta: "View Projects", about_title: "About Me", projects_title: "Projects", cert_title: "Certificates", contact_title: "Contact", contact_text: "Let's work together? Send me an email." }
};

let currentLang = 'pt';
let siteData = null;

async function initSite() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Não foi possível carregar o data.json');
        siteData = await response.json();
        renderProfile();
        renderProjects();
        setupEventListeners();
    } catch (e) {
        console.error("Erro crítico ao carregar dados:", e);
    }
}

function renderProfile() {
    if (!siteData || !siteData.profile) return;
    const profile = siteData.profile;

    // CORREÇÃO: Fallback robusto para evitar o erro de undefined
    const langData = profile[currentLang] || profile.pt || {};

    const nameEl = document.getElementById('hero-name');
    const aboutEl = document.getElementById('about-text');
    const emailEl = document.getElementById('contact-email');

    if (nameEl) nameEl.textContent = `Olá, eu sou o ${profile.name}`;
    if (aboutEl) aboutEl.textContent = langData.about || "Texto não disponível.";
    if (emailEl) {
        emailEl.textContent = profile.email;
        emailEl.href = `mailto:${profile.email}`;
    }
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !siteData || !siteData.projects) return;

    grid.innerHTML = siteData.projects.map(proj => `
        <div class="card">
            <h3>${proj.title}</h3>
            <div style="margin: 10px 0;">
                ${proj.tech.split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('')}
            </div>
            <div class="card-links">
                <a href="${proj.repo}" class="btn-secondary" target="_blank">Código</a>
                <a href="${proj.demo}" class="btn-primary" target="_blank">Demo</a>
            </div>
        </div>
    `).join('');
}

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    renderProfile();
    document.getElementById('lang-toggle').textContent = lang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';
}

function setupEventListeners() {
    const langBtn = document.getElementById('lang-toggle');
    const themeBtn = document.getElementById('theme-toggle');

    if (langBtn) {
        langBtn.onclick = () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            updateLanguage(currentLang);
        };
    }

    if (themeBtn) {
        themeBtn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        };
    }
}

initSite();