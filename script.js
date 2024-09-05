document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio ready!');

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Light mode toggle
    const lightModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Set initial icon based on current mode
    updateToggleIcon();

    lightModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        updateToggleIcon();
    });

    function updateToggleIcon() {
        const icon = lightModeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Fade-in animation on scroll
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => observer.observe(elem));

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted');
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});