document.addEventListener('DOMContentLoaded', function() {
    // Check if particles.js is loaded
    if (typeof particlesJS !== 'undefined') {
        // Configure and load particles.js
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4cc9f0"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#7209b7",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        // Change particles color based on theme
        const toggleThemeParticles = () => {
            const isLightMode = document.body.classList.contains('light-mode');
            
            if (isLightMode) {
                pJSDom[0].pJS.particles.color.value = "#3a86ff";
                pJSDom[0].pJS.particles.line_linked.color = "#7209b7";
                pJSDom[0].pJS.particles.opacity.value = 0.2;
            } else {
                pJSDom[0].pJS.particles.color.value = "#4cc9f0";
                pJSDom[0].pJS.particles.line_linked.color = "#7209b7";
                pJSDom[0].pJS.particles.opacity.value = 0.3;
            }
            
            pJSDom[0].pJS.fn.particlesRefresh();
        };
        
        // Call on theme toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('click', () => {
            // Wait a bit for the theme to change
            setTimeout(toggleThemeParticles, 100);
        });
        
        // Call once at start
        setTimeout(toggleThemeParticles, 1000);
    }
});