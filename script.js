document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden';
        }, 500);
    }, 1500);

    // Custom Cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    const bodyForCursor = document.body; // Renamed to avoid conflict with other 'body' vars if any
    const cursorToggleBtn = document.getElementById('cursorToggleBtn');

    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;
    let isCursorMoving = false;
    const cursorEase = 0.15;
    let rafId = null;
    let isCustomCursorEnabled = true; // Default state

    function updateCursorVisuals(isEnabled) {
        if (isEnabled) {
            if (cursor) cursor.style.opacity = '1';
            if (cursorOutline) cursorOutline.style.opacity = '1';
            // RAF loop for movement will be started by mousemove if not already running
        } else {
            if (cursor) cursor.style.opacity = '0';
            if (cursorOutline) cursorOutline.style.opacity = '0';
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }
    }
    
    function updateCursorState(enable) {
        isCustomCursorEnabled = enable;
        if (enable) {
            bodyForCursor.classList.remove('custom-cursor-disabled');
            // CSS will handle body.style.cursor = 'none';
            updateCursorVisuals(true);
            // Restart RAF loop if mouse is already moving or was previously moving
            if (!rafId && (cursorX !== 0 || cursorY !== 0)) { // Check if cursor has moved from initial 0,0
                 isCursorMoving = true; // Signal that movement should resume if mouse moves again
                 rafId = requestAnimationFrame(updateCursorSmooth);
            }
            localStorage.setItem('customCursorEnabled', 'true');
        } else {
            bodyForCursor.classList.add('custom-cursor-disabled');
            // CSS will handle body.style.cursor = 'auto';
            updateCursorVisuals(false);
            // RAF loop is already stopped by updateCursorVisuals
            localStorage.setItem('customCursorEnabled', 'false');
        }
        // Update toggle button icon (visual state)
        if (cursorToggleBtn) {
            const icon = cursorToggleBtn.querySelector('i');
            if (icon) {
                if (isCustomCursorEnabled) {
                    icon.classList.remove('fa-hand-pointer'); // Or whatever icon implies 'off'
                    icon.classList.add('fa-mouse-pointer');
                } else {
                    icon.classList.remove('fa-mouse-pointer');
                    icon.classList.add('fa-hand-pointer'); // Example for 'off' state
                }
            }
        }
    }

    function updateCursorSmooth() {
        if (!isCustomCursorEnabled) {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            return;
        }

        outlineX += (cursorX - outlineX) * cursorEase;
        outlineY += (cursorY - outlineY) * cursorEase;

        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        if (cursorOutline) {
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        }

        if (Math.abs(cursorX - outlineX) < 0.1 && Math.abs(cursorY - outlineY) < 0.1 && !isCursorMoving) {
            cancelAnimationFrame(rafId);
            rafId = null;
        } else {
            rafId = requestAnimationFrame(updateCursorSmooth);
        }
        isCursorMoving = false;
    }

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        isCursorMoving = true;
        if (isCustomCursorEnabled && !rafId) {
            rafId = requestAnimationFrame(updateCursorSmooth);
        }
    });

    document.addEventListener('mouseenter', () => {
        if (isCustomCursorEnabled) {
            updateCursorVisuals(true);
        }
    });

    document.addEventListener('mouseleave', () => {
        // Always hide custom cursor parts when mouse leaves window
        if (cursor) cursor.style.opacity = '0';
        if (cursorOutline) cursorOutline.style.opacity = '0';
        // System cursor visibility is handled by CSS based on body class
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .tilt-card, input, textarea');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (isCustomCursorEnabled && cursor && cursorOutline) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (isCustomCursorEnabled && cursor && cursorOutline) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });

    if (cursorToggleBtn) {
        cursorToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateCursorState(!isCustomCursorEnabled); // Toggle the state
        });
    }

    // Load cursor preference on page load
    const savedCursorState = localStorage.getItem('customCursorEnabled');
    const initialCursorState = savedCursorState === null ? true : (savedCursorState === 'true');
    updateCursorState(initialCursorState);


    // Scroll Progress Bar (Keeping this simple, direct listener as it's lightweight)
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const scrolled = (window.scrollY / totalHeight) * 100;
            const progressBar = document.querySelector('.scroll-progress-bar');
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        }
    });

    // Navbar Scroll Effect - REMOVED from here, will be in animations.js

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (document.querySelector('.nav-links').classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Back to Top Button
    document.querySelector('.back-to-top').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Light/Dark Mode Toggle
    const lightModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            updateToggleIcon(true);
        } else {
            body.classList.remove('light-mode');
            updateToggleIcon(false);
        }
    }
    
    lightModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        updateToggleIcon(isLightMode);
        
        // Save theme preference
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
    
    function updateToggleIcon(isLightMode) {
        const icon = lightModeToggle.querySelector('i');
        if (isLightMode) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Typewriter Effect
    if (document.getElementById('typewriter')) {
        try {
            const typewriter = new Typed('#typewriter', {
                strings: ['Developer', 'ML Engineer', 'Researcher', 'Problem Solver'],
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 1500,
                startDelay: 500,
                loop: true
            });
        } catch (e) {
            console.error("Typed.js library not found or failed to initialize for #typewriter.", e);
        }
    }

    // Reveal Animations on Scroll - REMOVED (logic moved to animations.js)
    // Count Up Animation for Stats - REMOVED (logic moved to animations.js)
    // Skill Bar Animation - REMOVED (logic moved to animations.js)

    // Tilt Effect for Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3
        });
    }

    // Floating Action Button Toggle
    const fabToggle = document.querySelector('.fab-toggle');
    
    const fabIcon = fabToggle.querySelector('i'); // Get the icon element

    fabToggle.addEventListener('click', () => {
        document.querySelector('.fab-menu').classList.toggle('active');
        fabToggle.classList.toggle('active');
        
        if (fabToggle.classList.contains('active')) {
            if (fabIcon) {
                fabIcon.classList.remove('fa-plus');
                fabIcon.classList.add('fa-times');
            }
        } else {
            if (fabIcon) {
                fabIcon.classList.remove('fa-times');
                fabIcon.classList.add('fa-plus');
            }
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, just simulate a successful submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});