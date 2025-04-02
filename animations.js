document.addEventListener('DOMContentLoaded', function() {
    // Tech Stack Item Parallax Effect
    const techStackItems = document.querySelectorAll('.tech-stack-item');

    if (techStackItems.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            techStackItems.forEach(item => {
                const depth = parseFloat(item.getAttribute('data-depth')) || 0.5;
                const moveX = (x - 0.5) * depth * 50;
                const moveY = (y - 0.5) * depth * 50;
                
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // Add additional animations on scroll
    function setupScrollAnimations() {
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
    setTimeout(setupScrollAnimations, 1800);

    // Animate Timeline items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const windowHeight = window.innerHeight;
        
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight * 0.8 && !item.classList.contains('animated')) {
                setTimeout(() => {
                    item.classList.add('animated');
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200); // Staggered animation
                
                // Add a subtle animation to the dot
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    dot.classList.add('pulse');
                }
            }
        });
    }

    // Initialize timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateTimeline);
    setTimeout(animateTimeline, 1800); // Initial check after load

    // Add hover animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.classList.add('bounce');
                setTimeout(() => {
                    icon.classList.remove('bounce');
                }, 1000);
            }
        });
    });

    // CSS for the custom animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(76, 201, 240, 0.7);
            }
            70% {
                transform: scale(1.1);
                box-shadow: 0 0 0 10px rgba(76, 201, 240, 0);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(76, 201, 240, 0);
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .pulse-effect {
            animation: pulse 3s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-20px);
            }
            60% {
                transform: translateY(-10px);
            }
        }
        
        .bounce {
            animation: bounce 1s;
        }
        
        .orbit-badge {
            position: absolute;
            animation: orbit 10s linear infinite;
        }
        
        @keyframes orbit {
            from {
                transform: rotate(0deg) translateX(150px) rotate(0deg);
            }
            to {
                transform: rotate(360deg) translateX(150px) rotate(-360deg);
            }
        }
    `;
    
    document.head.appendChild(style);

    // Add parallax effect to sections on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for section backgrounds
        document.querySelectorAll('.glass-section').forEach(section => {
            const speed = 0.05;
            const yPos = -(scrollPosition - section.offsetTop) * speed;
            section.style.backgroundPosition = `50% ${yPos}px`;
        });
    });

    // Add floating animations to skill cards
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('float-animation');
    });

    // Add floating animation CSS
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        .float-animation {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    
    document.head.appendChild(floatStyle);

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.querySelector('span').style.color = '#4cc9f0';
            link.querySelector('span').style.transition = 'color 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.querySelector('span').style.color = '';
        });
    });

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

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .glass-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(rippleStyle);
});