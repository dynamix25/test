// HostRating - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header with Glass Effect Enhancement
    initStickyHeader();

    // Filter Buttons Interaction
    initFilterButtons();

    // Show More Tariffs Toggle
    initTariffToggle();

    // Smooth Scroll for Navigation
    initSmoothScroll();

    // Lazy Loading Animation for Cards
    initCardAnimations();
});

/**
 * Initialize Sticky Header
 * Adds 'scrolled' class when page is scrolled for enhanced glass effect
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Optional: Hide header on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
            });
            ticking = true;
        }
    });
}

/**
 * Initialize Filter Buttons
 * Handles filter dropdown toggles and active states
 */
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn:not(.sort-btn)');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');

            // Close other dropdowns (if implementing dropdown menus)
            filterBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                }
            });

            // Add ripple effect
            createRipple(this, event);
        });
    });

    // Filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.style.borderColor = 'var(--primary-color)';
                this.style.color = 'var(--primary-color)';
                this.style.background = 'rgba(124, 179, 66, 0.1)';
            } else {
                this.style.borderColor = '';
                this.style.color = '';
                this.style.background = '';
            }
        });
    });
}

/**
 * Initialize Tariff Toggle
 * Shows/hides additional tariffs
 */
function initTariffToggle() {
    const toggleBtns = document.querySelectorAll('.show-more-tariffs');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('data-expanded') === 'true';

            if (isExpanded) {
                this.innerHTML = '&#8595; ещё тарифы &#8595;';
                this.setAttribute('data-expanded', 'false');
            } else {
                this.innerHTML = '&#8593; скрыть тарифы &#8593;';
                this.setAttribute('data-expanded', 'true');
            }

            // Here you would show/hide additional tariff rows
            // For demo purposes, we just toggle the button text
        });
    });
}

/**
 * Initialize Smooth Scroll
 * Enables smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Initialize Card Animations
 * Adds intersection observer for lazy loading animations
 */
function initCardAnimations() {
    const cards = document.querySelectorAll('.provider-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Create Ripple Effect
 * Adds material design ripple effect to buttons
 */
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(124, 179, 66, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Discount Modal Handler
 * Opens discount/promo code modal when clicking discount buttons
 */
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('discount-btn')) {
        // Here you would open a modal with discount information
        console.log('Discount button clicked - implement modal');
    }
});

/**
 * Pagination Handler
 */
const pageBtns = document.querySelectorAll('.page-btn');
pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('page-dots')) {
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Here you would load new page content
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Show More Button Handler
 */
const showMoreBtn = document.querySelector('.show-more-btn');
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
        this.innerHTML = 'Загрузка...';

        // Simulate loading
        setTimeout(() => {
            this.innerHTML = 'Показать ещё';
            // Here you would load more providers
        }, 1000);
    });
}

/**
 * Provider Card Hover Effects
 */
const providerCards = document.querySelectorAll('.provider-card');
providerCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = 'var(--shadow-lg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

/**
 * Rating Stars Interaction
 */
const ratingBlocks = document.querySelectorAll('.rating-block');
ratingBlocks.forEach(block => {
    block.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });

    block.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Console welcome message
console.log('%c HostRating ', 'background: #7cb342; color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Рейтинг хостингов с 2024 года ', 'color: #666; font-size: 12px;');
