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
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delayed cursor outline movement for trailing effect
        setTimeout(() => {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }, 80);
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Cursor effects on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .tilt-card, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            element.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            element.classList.remove('hovered');
        });
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / totalHeight) * 100;
        document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        if (scrollTop > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

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
        const typewriter = new Typed('#typewriter', {
            strings: ['Developer', 'ML Engineer', 'Researcher', 'Problem Solver'],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 500,
            loop: true
        });
    }

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-item');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load

    // Count Up Animation for Stats
    const countEls = document.querySelectorAll('.count-up');
    
    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            el.textContent = Math.floor(current);
            
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    function startCountAnimation() {
        countEls.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elTop < windowHeight * 0.8) {
                animateCount(el);
                el.classList.add('counted');
            }
        });
    }
    
    // Filter only the elements that haven't been animated yet
    function checkCountElements() {
        const uncountedEls = Array.from(countEls).filter(el => !el.classList.contains('counted'));
        
        if (uncountedEls.length > 0) {
            startCountAnimation();
        }
    }
    
    window.addEventListener('scroll', checkCountElements);
    setTimeout(checkCountElements, 1000); // Initial check after load

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight * 0.8) {
                setTimeout(() => {
                    bar.style.width = progress;
                }, 200);
            }
        });
    }
    
    window.addEventListener('scroll', animateSkillBars);
    setTimeout(animateSkillBars, 1000); // Initial check after load

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
    
    fabToggle.addEventListener('click', () => {
        document.querySelector('.fab-menu').classList.toggle('active');
        fabToggle.classList.toggle('active');
        
        if (fabToggle.classList.contains('active')) {
            fabToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            fabToggle.innerHTML = '<i class="fas fa-plus"></i>';
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