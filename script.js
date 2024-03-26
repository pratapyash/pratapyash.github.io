// Simple script to show how JS could be used to enhance the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // This could be expanded to include functionality like highlighting navbar links based on scroll position
    console.log('Portfolio ready!');

    // Placeholder for future expansion, e.g., smooth scrolling or dynamic content loading
});

// Example of smooth scroll for future navbar links (expand upon adding navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
