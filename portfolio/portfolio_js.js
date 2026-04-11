/**
 * ====================================
 * PROFESSIONAL PORTFOLIO - JAVASCRIPT
 * ====================================
 */

/**
 * Toggle section visibility
 * @param {HTMLElement} button - The section header button
 */
function toggleSection(button) {
    const content = button.nextElementSibling;
    button.classList.toggle('collapsed');
    const dotId = button.parentElement.id.split('-')[0] + "-dot";
    const dot = document.getElementById(dotId);

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.paddingTop = "2rem";
        content.style.paddingBottom = "2rem";
        dot.classList.remove('hidden');
    } else {
        content.classList.add('hidden');
        content.style.maxHeight = "0";
        content.style.paddingTop = "0";
        content.style.paddingBottom = "0";
        dot.classList.add('hidden');
    }
}

/**
 * Initialize all sections on page load
 */
function initializeSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach((header) => {
        const content = header.nextElementSibling;

        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '2rem';
        content.style.paddingBottom = '2rem';

        header.addEventListener('click', function () {
            toggleSection(this);
        });

        header.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection(this);
            }
        });
    });
}

/**
 * Add smooth scroll behavior for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            };
        });
    });
}

/**
 * Add animation to elements on scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.experience-item, .education-item, .project-item, .skill-group').forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

/**
 * Handle window resize for responsive behavior
 */
function handleResize() {
    const sectionContents = document.querySelectorAll('.section-content:not(.hidden)');

    sectionContents.forEach((content) => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
}


/**
 * Add active link highlighting based on scroll position
 */
function initializeActiveLinks() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.dot');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach((dot) => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });
}

/**
 * Initialize all interactive features
 */
function initializePortfolio() {
    initializeSections();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeActiveLinks();

    window.addEventListener('resize', handleResize);
}

/**
 * Run initialization when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', initializePortfolio);


/*
========================
 CHANGES FROM JSON FILE
========================
*/

async function config() {
    try {
        const response = await fetch('../config.json');
        const data = await response.json();

        applyColors(data.colors);
        renderText(data["header-and-summary"]);
        renderWorkExperience(data["work-experience"]);
        renderEducation(data.education);
        renderSkills(data.skills);
        renderProjects(data.projects);
        renderAchievements(data.achievements);
        renderSocialMedia(data["social-media"]);
        renderCopyRight(data["copy-right-section"]);

        initializeScrollAnimations();
        handleResize();
    } catch (error) {
        console.error("failed to fetch DATA", error)
    }
}

//colors
function applyColors(colorData) {
    const root = document.documentElement;
    root.style.setProperty('--main-color', colorData["main-color"]);
    root.style.setProperty('--section-bg-color', colorData["sections-background-color"]);
    root.style.setProperty('--text-1-color', colorData["text-1-color"]);
    root.style.setProperty('--text-2-color', colorData["text-2-color"]);
    root.style.setProperty('--text-3-color', colorData["text-3-color"]);

    document.body.style.backgroundColor = colorData["body-color"];
    document.querySelector("footer").style.backgroundColor = colorData["copy-right-color"];
}

function renderText(textData) {
    document.documentElement.lang = textData["language"];
    document.title = textData["page-title"];

    //the header
    document.querySelector(".name").innerText = textData.name;
    document.querySelector(".title").innerText = textData.title;
    document.querySelector(".print-btn").innerText = textData["pdf-button-name"];
    document.querySelector(".print-btn").href = textData["pdf-url"];

    //hero-section
    document.querySelector('.hero-text h2').innerText = textData["summary-title"];
    document.getElementById("hero-section-paragraph-1").innerText = textData["hero-section-paragraph-1"];
    document.getElementById("hero-section-paragraph-2").innerText = textData["hero-section-paragraph-2"];
    document.getElementById("email").innerText = textData["email"];
    document.getElementById("phone").innerText = textData["phone"];
    document.getElementById("location").innerText = textData["location"];
}

//experience section
function renderWorkExperience(experienceData) {
    const experienceContainer = document.getElementById("experience-content");
    experienceContainer.innerHTML = "";

    Object.values(experienceData).forEach(exp => {
        const experienceItem = document.createElement("div");
        experienceItem.className = "experience-item";

        experienceItem.innerHTML = `
            <div class="experience-header">
                <div>
                    <h3>${exp.title}</h3>
                    <p class="company">${exp.company}</p>
                </div>
                <span class="duration">${exp.duration}</span>
            </div>
            <p class="description">${exp.description}</p>
            `;
        experienceContainer.appendChild(experienceItem)
    })

}

//education section
function renderEducation(educationData) {
    const educationContainer = document.getElementById("education-content");
    educationContainer.innerHTML = "";

    Object.values(educationData).forEach(edu => {
        const educationItem = document.createElement("div");
        educationItem.className = "education-item";

        educationItem.innerHTML = `
                <div class="education-header">
                    <div>
                        <h3>${edu.title}</h3>
                        <p class="institution">${edu.institution}</p>
                    </div>
                    <span class="year">${edu.year}</span>
                </div>
                <p class="field">${edu.field}</p>
            `;
        educationContainer.appendChild(educationItem)
    })
}

//skills section
function renderSkills(skillsData) {
    const skillsGrid = document.querySelector(".skills-grid");
    skillsGrid.innerHTML = "";

    skillsData.forEach(group => {
        const skillGroup = document.createElement("div");
        skillGroup.className = "skill-group";

        const tagsHtml = group.tags
            .map(tag => `<span class="skill-tag">${tag}</span>`)
            .join("");

        skillGroup.innerHTML = `
            <h3>${group.category}</h3>
            <div class="skill-tags">
                ${tagsHtml}
            </div>
        `;

        skillsGrid.appendChild(skillGroup);
    });
}

//projects section
function renderProjects(projectsData) {
    const projectContainer = document.querySelector("#projects-section .section-content");

    projectContainer.innerHTML = "";

    projectsData.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.className = "project-item";

        projectItem.innerHTML = `
            <div class="project-header">
                <h3>${project.name}</h3>
                <span class="project-tech">${project.tech}</span>
            </div>
            <p class="description">${project.description}</p>
        `;

        projectContainer.appendChild(projectItem);
    });
}

//achievements section
function renderAchievements(achievementsData) {
    const listContainer = document.querySelector(".certification-list");

    listContainer.innerHTML = "";

    achievementsData.forEach(text => {
        const certItem = document.createElement("div");
        certItem.className = "cert-item";
        certItem.innerText = text;

        listContainer.appendChild(certItem);
    });
}

//social media section
function renderSocialMedia(socialData) {
    const socialMediaTitle = document.getElementById('cta-paragraph');
    socialMediaTitle.innerText = socialData.title;

    const platforms = ["instagram", "facebook", "github", "gmail", "linkedin", "reddit", "whatsapp", "x"];

    platforms.forEach(name => {
        const el = document.getElementById(name);
        if (!el) return;

        const isVisible = socialData[`${name}-visibility`] === "show";
        el.style.display = isVisible ? "" : "none";

        const val = socialData[`${name}-url`];

        el.href = val;
        
    });
}

function renderCopyRight(copyRight) {
    const copyRightText = document.querySelector("#footer p");
    copyRightText.innerHTML = "&copy;" + copyRight.text;
}

config()
