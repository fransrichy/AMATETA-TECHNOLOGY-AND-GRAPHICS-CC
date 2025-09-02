document.addEventListener('DOMContentLoaded', () => {
    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme
    const setTheme = (theme) => {
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode');
            // Update icon to sun for dark mode
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            // Update icon to moon for light mode
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme preference on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        // Default to light mode if no preference, or check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark-mode');
        } else {
            setTheme('light-mode');
        }
    }

    // Event listener for theme toggle button
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            setTheme('light-mode');
        } else {
            setTheme('dark-mode');
        }
    });

    // --- Mobile Navigation Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu .nav-link-mobile');

    if (mobileMenuToggle && mobileNavOverlay && closeMobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            body.style.overflow = ''; // Restore scrolling
        });

        // Close mobile menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('open');
                body.style.overflow = '';
            });
        });
    }

    // --- Animated Counting Numbers (for services.html) ---
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.dataset.target;
                    const speed = 200;
                    const increment = target / speed;

                    let count = 0;

                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, options);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const mobileNavLinksActive = document.querySelectorAll('.mobile-nav-menu .nav-link-mobile');

    const highlightActiveLink = (links) => {
        // Get current page filename (e.g., "index.html", "about.html")
        const currentPath = window.location.pathname.split('/').pop();

        links.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            // Handle root path (empty string) for index.html
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    highlightActiveLink(navLinks);
    highlightActiveLink(mobileNavLinksActive);
});