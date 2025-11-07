// Apple-Inspired Portfolio - Smooth Interactions

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling with offset for fixed navbar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect with class toggle
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for enhanced shadow
    if (currentScroll > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for smooth fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections and cards on scroll
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll(
        'section:not(.hero), .skill-card, .project-card, .timeline-item, .contact-item, .education-card'
    );

    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;

        // Observe element
        fadeInObserver.observe(element);
    });
};

// Active navigation link highlighting
const highlightNavigation = () => {
    const sections = document.querySelectorAll('section');
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Smooth hover effects for cards
const enhanceCardInteractions = () => {
    const cards = document.querySelectorAll('.skill-card, .project-card, .timeline-content, .contact-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
};

// Add dynamic hamburger animation styles
const addHamburgerStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    `;
    document.head.appendChild(style);
};

// Back to top button with Apple-style appearance
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');

    button.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;

    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
        this.style.boxShadow = '0 6px 24px rgba(0, 122, 255, 0.4)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(0, 122, 255, 0.3)';
    });
};

// Enhanced email copy functionality
const setupEmailCopy = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        // Create click handler for copying email
        const copyHandler = (e) => {
            e.preventDefault();
            const email = link.textContent.trim();

            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!');
            }).catch(() => {
                // Fallback: open mailto link if copy fails
                window.location.href = link.href;
            });
        };

        // Add click event
        link.addEventListener('click', copyHandler);
    });
};

// Apple-style notification
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2500);
};

// Lazy loading for images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Reduced motion preference support
const respectMotionPreferences = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
};

// Initialize all functions on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Add styles
    addHamburgerStyles();

    // Initialize features
    initScrollAnimations();
    highlightNavigation();
    enhanceCardInteractions();
    createBackToTop();
    setupEmailCopy();
    lazyLoadImages();
    respectMotionPreferences();

    // Set initial navbar state
    if (window.pageYOffset > 10) {
        navbar.classList.add('scrolled');
    }
});

// Preloader - Remove loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animation for hero section
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((element, index) => {
        element.style.animation = `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`;
    });
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }, 250);
});

// Clean console message
console.log('%c👋 Welcome to my portfolio!', 'color: #007AFF; font-size: 16px; font-weight: 600; font-family: Inter, sans-serif;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #666666; font-size: 13px; font-family: Inter, sans-serif;');
console.log('%cFeel free to reach out: paipaticharan@gmail.com', 'color: #007AFF; font-size: 13px; font-family: Inter, sans-serif;');
