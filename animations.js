document.addEventListener('DOMContentLoaded', function() {
    // Navbar elements and state (moved from script.js)
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    // Utility for debouncing
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Tech Stack Item Parallax Effect with requestAnimationFrame
    const techStackItems = document.querySelectorAll('.tech-stack-item');
    let mouseX = 0, mouseY = 0;
    let isMouseMoving = false;

    if (techStackItems.length > 0) {
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isMouseMoving) {
                isMouseMoving = true;
                requestAnimationFrame(updateTechStackParallax);
            }
        });
    }

    function updateTechStackParallax() {
        isMouseMoving = false;
        const x = mouseX / window.innerWidth;
        const y = mouseY / window.innerHeight;
        
        techStackItems.forEach(item => {
            const depth = parseFloat(item.getAttribute('data-depth')) || 0.5;
            const moveX = (x - 0.5) * depth * 50;
            const moveY = (y - 0.5) * depth * 50;
            
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Add additional animations on scroll (Initial setup, not scroll dependent directly)
    function setupInitialAnimations() {
        // Hero section elements staggered reveal
        const heroElements = document.querySelectorAll('.hero-content > *');
        let delay = 0;
        
        heroElements.forEach(element => {
            if (!element.classList.contains('animate__animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 500 + delay);
                
                delay += 200;
            }
        });

        // Orbit animation for tech badges
        const orbitEl = document.querySelector('.orbit');
        if (orbitEl) {
            orbitEl.style.animation = 'orbit-rotation 15s linear infinite';
        }

        // Avatar pulse animation
        const avatarContainer = document.querySelector('.avatar-container');
        if (avatarContainer) {
            avatarContainer.classList.add('pulse-effect');
        }
    }

    // Run animations after initial load
    setTimeout(setupInitialAnimations, 1800);

    // --- Functions moved from script.js ---
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-item');
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom && !element.classList.contains('active')) {
                element.classList.add('active');
            }
        });
    }

    const countEls = document.querySelectorAll('.count-up');
    const countedStatus = new Map(); // To track if a counter has finished
    countEls.forEach(el => countedStatus.set(el, false));


    function animateCount(el) {
        if (countedStatus.get(el)) return; // Skip if already counted

        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // ms
        let current = 0;
        const increment = target / (duration / 16); // Calculate increment per frame (approx 60fps)

        function updateCounter() {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
                countedStatus.set(el, true); // Mark as counted
            }
        }
        requestAnimationFrame(updateCounter);
    }

    function checkCountElements() {
        countEls.forEach(el => {
            if (!countedStatus.get(el)) { // Only check if not already counted
                const elTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elTop < windowHeight * 0.8) {
                    animateCount(el);
                }
            }
        });
    }
    
    // --- End of functions moved from script.js ---
    // Skill bar animation logic removed as the section is being deleted.


    // Animate Timeline items (modified for consolidated scroll handler)
    const timelineItems = document.querySelectorAll('.timeline-item');
    // Initialize timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function animateTimeline() {
        const windowHeight = window.innerHeight;
        timelineItems.forEach((item, index) => {
            if (!item.classList.contains('animated')) {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < windowHeight * 0.8) {
                    setTimeout(() => {
                        item.classList.add('animated');
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        const dot = item.querySelector('.timeline-dot');
                        if (dot) {
                            dot.classList.add('pulse');
                        }
                    }, index * 100); // Reduced stagger delay slightly
                }
            }
        });
    }
    
    // Parallax for section backgrounds (modified for consolidated scroll handler)
    const parallaxSections = document.querySelectorAll('.glass-section');
    function handleSectionParallax() {
        const scrollPosition = window.scrollY;
        parallaxSections.forEach(section => {
            const speed = 0.05; // Keep this value small for subtle effect
            // Check if section is in viewport to optimize
            const rect = section.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrollPosition - section.offsetTop) * speed;
                section.style.backgroundPosition = `50% ${yPos}px`;
            }
        });
    }

    // Navbar Scroll Effect Logic (moved from script.js)
    function handleNavbarScroll() {
        if (!navbar) return; // Exit if navbar element doesn't exist

        const scrollTop = window.scrollY;

        // Style adjustments (padding, shadow)
        if (scrollTop > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }

        // Show/hide navbar
        if (scrollTop > lastScrollTop && scrollTop > 300) { // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else { // Scrolling up or at the top
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }

    // Consolidated Scroll Handler
    function handleScrollAnimations() {
        // Call all scroll-dependent animation functions
        handleNavbarScroll(); // Added Navbar scroll logic
        checkReveal();
        checkCountElements();
        // animateSkillBars(); // Removed call as section is deleted
        animateTimeline();
        handleSectionParallax();
    }

    // Debounced scroll listener
    const debouncedScrollHandler = debounce(handleScrollAnimations, 20); // Adjust wait time as needed (16-50ms is common)
    window.addEventListener('scroll', debouncedScrollHandler);

    // Initial calls for elements potentially in view on load
    setTimeout(() => {
        handleScrollAnimations();
    }, 500); // Delay slightly after other initializations


    // Add hover animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.classList.add('icon-bounce'); // Changed class name
                setTimeout(() => {
                    icon.classList.remove('icon-bounce'); // Changed class name
                }, 1000);
            }
        });
    });

    // CSS for custom animations is now in style.css

    // Add floating animations to skill cards (Keep as is, not scroll dependent)
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('float-animation');
    });

    // Floating animation CSS is now in style.css

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Ripple effect CSS is now in style.css
});