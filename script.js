const translations = {
    pt: {
        nav_about: "Sobre", nav_projects: "Projetos", nav_cert: "Certificados",
        nav_contact: "Contato", hero_cta: "Ver Projetos", about_title: "Sobre Mim",
        projects_title: "Projetos", cert_title: "Certificados",
        contact_title: "Contato", contact_text: "Vamos trabalhar juntos? Me mande um email."
    },
    en: {
        nav_about: "About", nav_projects: "Projects", nav_cert: "Certificates",
        nav_contact: "Contact", hero_cta: "View Projects", about_title: "About Me",
        projects_title: "Projects", cert_title: "Certificates",
        contact_title: "Contact", contact_text: "Let's work together? Send me an email."
    }
};

let currentLang = 'pt';
let siteData = null;

async function initSite() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Erro ao carregar data.json");
        siteData = await response.json();

        renderProfile();
        renderProjects(); // Agora será chamado corretamente!
        setupEventListeners();
    } catch (error) {
        console.error("Erro crítico:", error);
    }
}

function renderProfile() {
    if (!siteData) return;
    const heroName = document.getElementById('hero-name');
    const aboutText = document.getElementById('about-text');
    const emailBtn = document.getElementById('contact-email');

    if (heroName) heroName.textContent = `Olá, eu sou o ${siteData.profile.name}`;
    if (aboutText) aboutText.textContent = siteData.profile.about;
    if (emailBtn) {
        emailBtn.textContent = siteData.profile.email;
        emailBtn.href = `mailto:${siteData.profile.email}`;
    }
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !siteData.projects) return;

    grid.innerHTML = "";
    siteData.projects.forEach(proj => {
        const techTags = proj.tech.split(',').map(t =>
            `<span class="tech-tag">${t.trim()}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${proj.title}</h3>
            <div class="tech-container">${techTags}</div>
            <div class="card-links">
                <a href="${proj.repo}" class="btn-secondary" target="_blank">Código</a>
                <a href="${proj.demo}" class="btn-primary" target="_blank">Demo</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupEventListeners() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        updateLanguage(currentLang);
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
    });
}

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) element.textContent = translations[lang][key];
    });
    document.getElementById('lang-toggle').textContent = lang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';
}

initSite();