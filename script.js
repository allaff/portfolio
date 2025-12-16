// Dicionário de Traduções (Mantemos aqui para rapidez de resposta)
const translations = {
    pt: {
        nav_about: "Sobre",
        nav_projects: "Projetos",
        nav_cert: "Certificados",
        nav_contact: "Contato",
        hero_cta: "Ver Projetos",
        about_title: "Sobre Mim",
        projects_title: "Projetos",
        cert_title: "Certificados",
        contact_title: "Contato",
        contact_text: "Vamos trabalhar juntos? Me mande um email."
    },
    en: {
        nav_about: "About",
        nav_projects: "Projects",
        nav_cert: "Certificates",
        nav_contact: "Contact",
        hero_cta: "View Projects",
        about_title: "About Me",
        projects_title: "Projects",
        cert_title: "Certificates",
        contact_title: "Contact",
        contact_text: "Let's work together? Send me an email."
    }
};

let currentLang = 'pt';
let siteData = null;

// Função principal para carregar o JSON e iniciar o site
async function initSite() {
    try {
        const response = await fetch('data.json');
        siteData = await response.json();

        renderProfile();
        setupEventListeners();
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

// Preenche o HTML com os dados do JSON
function renderProfile() {
    if (!siteData) return;

    document.getElementById('hero-name').textContent = `Olá, eu sou o ${siteData.profile.name}`;
    document.getElementById('about-text').textContent = siteData.profile.about;

    const emailBtn = document.getElementById('contact-email');
    emailBtn.textContent = siteData.profile.email;
    emailBtn.href = `mailto:${siteData.profile.email}`;
}

// Troca de idioma
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Atualiza o botão de idioma
    document.getElementById('lang-toggle').textContent = lang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';
}

function setupEventListeners() {
    // Evento Idioma
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        updateLanguage(currentLang);
    });

    // Evento Tema Dark
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
    });
}

// Inicializa tudo
initSite();

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = "";

    siteData.projects.forEach(proj => {
        // Transforma "HTML, CSS" em tags individuais
        const techTags = proj.tech.split(',').map(t =>
            `<span class="tech-tag">${t.trim()}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3>${proj.title}</h3>
                <div class="tech-container">${techTags}</div>
                <div class="card-links">
                    <a href="${proj.repo}" class="btn-secondary" target="_blank">Código</a>
                    <a href="${proj.demo}" class="btn-primary" target="_blank">Demo</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Não esqueças de chamar renderProjects() dentro da função initSite() logo após renderProfile()!