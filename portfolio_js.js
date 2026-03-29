/**
 * ============================================
 * PROFESSIONAL PORTFOLIO - JAVASCRIPT
 * Handles interactive features like section toggles
 * ============================================
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

        // Set initial state (all expanded by default)
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '2rem';
        content.style.paddingBottom = '2rem';

        // Add click event listener
        header.addEventListener('click', function () {
            toggleSection(this);
        });

        // Add keyboard support (Enter and Space)
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
            }else{
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(10px)';
            }
        });
    }, observerOptions);

    // Observe all section items
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
 * Add print functionality
 */
function initializePrint() {
    // Expand all sections before printing
    window.addEventListener('beforeprint', () => {
        const sectionHeaders = document.querySelectorAll('.section-header.collapsed');
        sectionHeaders.forEach((header) => {
            toggleSection(header);
        });
    });

    // Collapse sections after printing
    window.addEventListener('afterprint', () => {
        const expandedSections = document.querySelectorAll('.section-header:not(.collapsed)');
        expandedSections.forEach((header) => {
            if (!header.classList.contains('collapsed')) {
                toggleSection(header);
            }
        })
        document.getElementById("footer").style.display = "block";
        document.getElementById("social-media-links-container").style.display = "none";
        document.getElementById("social-media-logos-container").style.display = "inline-block";
    });
}

function printingThisPage(){
    document.querySelectorAll('.experience-item, .education-item, .project-item, .skill-group').forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
    document.getElementById("footer").style.display = "none";
    document.getElementById("social-media-links-container").style.display = "block";
    document.getElementById("social-media-logos-container").style.display = "none";
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
    // Initialize sections
    initializeSections();

    // Initialize smooth scroll
    initializeSmoothScroll();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize print functionality
    initializePrint();

    // Initialize active links
    initializeActiveLinks();

    // Handle window resize
    window.addEventListener('resize', handleResize);
}

/**
 * Run initialization when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', initializePortfolio);

/**
 * Optional: Add keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Press 'P' to print
    if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        window.print();
    }

    // Press 'Escape' to collapse all sections
    if (e.key === 'Escape') {
        const expandedSections = document.querySelectorAll('.section-header:not(.collapsed)');
        expandedSections.forEach((header) => {
            if (!header.classList.contains('collapsed')) {
                toggleSection(header);
            }
        });
    }
});
