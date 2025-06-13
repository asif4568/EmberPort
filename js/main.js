// ===== MAIN JAVASCRIPT =====

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavbar();
    initMobileMenu();
    initThemeToggle();
    initHeroEffects();
    initWordRevealAnimation();
    initTrustedBrandsCarousel();
    initFooterYear();
    initHeroButtonAnimations(); // GSAP animations for hero buttons
    initBackgroundMusic();
    
    // Load cursor script after other elements are initialized
    const cursorScript = document.createElement('script');
    cursorScript.src = 'js/cursor.js';
    document.body.appendChild(cursorScript);
});

// Background music functionality
function initBackgroundMusic() {
    const bgMusic = document.getElementById('background-music');
    let isPlaying = false;

    // Function to play music
    function playMusic() {
        if (bgMusic && !isPlaying) {
            bgMusic.muted = false; // Unmute the audio
            bgMusic.play().then(() => {
                isPlaying = true;
                console.log('Background music started.');
            }).catch(error => {
                console.error('Error playing background music:', error);
            });
        }
    }

    // Function to pause music
    function pauseMusic() {
        if (bgMusic && isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            console.log('Background music paused.');
        }
    }

    // Attempt to play music on any user interaction
    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('keydown', playMusic, { once: true });

    // Optional: Add a toggle button for music (if you want to give users control)
    // Example: <button id="music-toggle">Toggle Music</button>
    // const musicToggleButton = document.getElementById('music-toggle');
    // if (musicToggleButton) {
    //     musicToggleButton.addEventListener('click', () => {
    //         if (isPlaying) {
    //             pauseMusic();
    //         } else {
    //             playMusic();
    //         }
    //     });
    // }
}

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    let lastScroll = 0;
    let ticking = false;
    
    // Request animation frame for smoother performance
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        // Always show navbar at the top of the page
        if (currentScroll <= 10) {
            navbar.classList.remove('scrolled', 'hidden');
            ticking = false;
            return;
        }
        
        // Scrolling down - hide navbar
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
            navbar.classList.add('scrolled');
        } 
        // Scrolling up - show navbar immediately
        else if (currentScroll < lastScroll) {
            navbar.classList.remove('hidden');
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    // Handle scroll with requestAnimationFrame for performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
    
    // Update active link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
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
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const closeBtn = document.querySelector('.mobile-close-btn');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user has a saved theme preference
    if (savedTheme) {
        body.classList.add(savedTheme + '-mode');
    } else {
        // Check if user has a system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            body.classList.add('dark-mode');
        } else {
            body.classList.add('light-mode');
        }
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        // Add click animation
        themeToggle.classList.add('theme-toggle-clicked');
        
        // Remove the animation class after the animation completes
        setTimeout(() => {
            themeToggle.classList.remove('theme-toggle-clicked');
        }, 300);
        
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Hero section effects
function initHeroEffects() {
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    
    if (!hero) return;
    
    // Load the audio file
    const audio = new Audio('assets/sound effect/ember interact.mp3');
    audio.volume = 0.5; // Set a reasonable volume

    // Play sound on mouse enter and pause on mouse leave
    hero.addEventListener('mouseenter', () => {
        audio.play().catch(e => console.error("Error playing audio:", e));
    });

    hero.addEventListener('mouseleave', () => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
    });

    // Cursor following light effect
    hero.addEventListener('mousemove', (e) => {
        // Get cursor position relative to the hero section
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add active class to show the light
        hero.classList.add('light-active');
        
        // Position the light effect at cursor position
        hero.style.setProperty('--cursor-x', `${x}px`);
        hero.style.setProperty('--cursor-y', `${y}px`);
        
        // Update the ::after pseudo-element position
        const afterStyle = `
            .hero::after {
                left: ${x - 150}px;
                top: ${y - 150}px;
            }
        `;
        
        // Add or update the style element
        let styleElement = document.getElementById('hero-cursor-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'hero-cursor-style';
            document.head.appendChild(styleElement);
        }
        styleElement.textContent = afterStyle;
    });
    
    // Remove light effect when cursor leaves the hero section
    hero.addEventListener('mouseleave', () => {
        hero.classList.remove('light-active');
    });
    
    // Hero title animation is handled in CSS
}

// Note: The floating animation keyframes are defined in CSS

// Trusted Brands Carousel functionality
function initTrustedBrandsCarousel() {
    new Swiper('.trusted-brands-carousel', {
        slidesPerView: 5,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            },
        },
    });
}

// Footer current year functionality
function initFooterYear() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Hero Button Animations
function initHeroButtonAnimations() {
    if (typeof gsap !== 'undefined') { // Check if GSAP is loaded
        const heroButtons = document.querySelectorAll('.hero-buttons .cta-button, .hero-buttons .secondary-button');

        if (heroButtons.length > 0) {
            gsap.fromTo(heroButtons, 
                { autoAlpha: 0, y: 20 }, // From state: invisible and slightly down
                {
                    autoAlpha: 1,         // To state: fully visible
                    y: 0,                 // To state: original y position
                    duration: 0.8,
                    stagger: 0.2,         // Animate buttons one after another
                    delay: 0.5,           // Delay after page load
                    ease: 'power2.out',
                    clearProps: "autoAlpha,transform" // Clears only the properties GSAP animated
                }
            );
            console.log('EmberPort Debug: GSAP hero button animation re-enabled with fromTo and autoAlpha.');
        } else {
            console.warn('EmberPort Debug: Hero buttons not found for GSAP animation.');
        }
    } else {
        console.warn('EmberPort Debug: GSAP library not found. Skipping hero button animations.');
    }
}

// Word reveal animation functionality
function initWordRevealAnimation() {
    const revealElements = document.querySelectorAll('.word-reveal-animation');

    revealElements.forEach(revealElement => {
        const originalText = revealElement.textContent;
        revealElement.innerHTML = ''; // Clear existing content

        originalText.split(/\s+/).forEach(word => {
            if (word.trim() !== '') {
                const span = document.createElement('span');
                span.innerHTML = word + '&nbsp;';
                span.classList.add('word');
                revealElement.appendChild(span);
            }
        });

        const spans = revealElement.querySelectorAll('.word');
        let i = 0;

        function revealNextWords() {
            if (i < spans.length) {
                for (let j = 0; j < 2 && (i + j) < spans.length; j++) {
                    spans[i + j].classList.add('revealed');
                }
                i += 2;
                setTimeout(revealNextWords, 50);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealNextWords();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(revealElement);

        spans.forEach(span => {
            span.addEventListener('mouseenter', () => {
                span.style.color = '#FF8C00';
            });
            span.addEventListener('mouseleave', () => {
                span.style.color = '';
            });
        });
    });
}
