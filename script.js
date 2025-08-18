document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar ul');
    const body = document.body;

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling to document
            this.classList.toggle('active');
            navbar.classList.toggle('active');

            // Toggle overlay
            if (navbar.classList.contains('active')) {
                const overlay = document.createElement('div');
                overlay.classList.add('menu-overlay');
                overlay.classList.add('active'); // Ensure overlay is active
                body.appendChild(overlay);
                body.style.overflow = 'hidden';
            } else {
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300); // Match CSS transition duration
                }
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.navbar ul li a').forEach(link => {
            link.addEventListener('click', function(e) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                }
                body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInsideMenu = navbar.contains(e.target);
            const isClickInsideHamburger = hamburger.contains(e.target);

            if (!isClickInsideMenu && !isClickInsideHamburger && navbar.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                }
                body.style.overflow = '';
            }
        });
    } else {
        console.error('Hamburger or navbar not found');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Form submission handling
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                this.reset();
            }, 1500);
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            if (emailInput.value) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    alert('¡Gracias por suscribirte a nuestro newsletter!');
                    emailInput.value = '';
                }, 1000);
            }
        });
    }

    // Plan selection buttons
    document.querySelectorAll('.planes-grid .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planName = this.closest('.plan-card').querySelector('h3').textContent;
            alert(`Has seleccionado el plan ${planName}. Serás redirigido al proceso de pago.`);
        });
    });

    // Class reservation buttons
    document.querySelectorAll('.clase-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const className = this.closest('.clase-card').querySelector('h3').textContent;
            alert(`Has reservado la clase de ${className}. ¡Te esperamos!`);
        });
    });
});