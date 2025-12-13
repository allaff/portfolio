// Dicionário de Traduções
const translations = {
    pt: {
        nav_about: "Sobre",
        nav_projects: "Projetos",
        nav_cert: "Certificados",
        nav_contact: "Contato",
        hero_title: "Olá, eu crio soluções digitais.",
        hero_subtitle: "Desenvolvedor Full Stack focado em performance e design.",
        hero_cta: "Ver Projetos",
        about_title: "Sobre Mim",
        about_text: "Sou apaixonado por tecnologia e programação. Transformo ideias complexas em código limpo e eficiente.",
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
        hero_title: "Hello, I create digital solutions.",
        hero_subtitle: "Full Stack Developer focused on performance and design.",
        hero_cta: "View Projects",
        about_title: "About Me",
        about_text: "I am passionate about technology and coding. I turn complex ideas into clean, efficient code.",
        projects_title: "Projects",
        cert_title: "Certificates",
        contact_title: "Contact",
        contact_text: "Let's work together? Send me an email."
    }
};

// Elementos
const langToggleBtn = document.getElementById('lang-toggle');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Estado inicial
let currentLang = 'pt';

// Função para atualizar textos
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[lang][key];
    });

    // Atualiza botão
    langToggleBtn.textContent = lang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';
}

// Event Listener: Troca de Idioma
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage(currentLang);
});

// Event Listener: Tema (Dark/Light)
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
});

// Efeito simples de Scroll Reveal (Opcional - Toque de atenção)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});