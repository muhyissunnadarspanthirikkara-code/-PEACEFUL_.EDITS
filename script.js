document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('ion-icon');
        icon.name = icon.name === 'menu-outline' ? 'close-outline' : 'menu-outline';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('ion-icon').name = 'menu-outline';
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach((el) => {
        observer.observe(el);
    });

    // Language Toggle logic
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = 'ml'; // Default to Malayalam as per user's primary language

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
        });

        langBtn.textContent = lang === 'en' ? 'മലയാളം' : 'English';
    };

    // Initial setup
    updateLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ml' : 'en';
        updateLanguage(currentLang);
    });

    // Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            const originalText = contactForm.querySelector('button').textContent;
            const sendingText = currentLang === 'en' ? 'Opening WhatsApp...' : 'വാട്സാപ്പ് തുറക്കുന്നു...';
            const successText = currentLang === 'en' ? 'Redirecting to WhatsApp!' : 'വാട്സാപ്പിലേക്ക് മാറുന്നു!';
            
            contactForm.querySelector('button').textContent = sendingText;

            // Construct WhatsApp Message
            const whatsappNumber = "919544873314";
            const text = `*New Inquiry from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

            setTimeout(() => {
                contactForm.reset();
                formStatus.textContent = successText;
                formStatus.style.color = '#58E1B9';
                contactForm.querySelector('button').textContent = originalText;
                
                // Open WhatsApp in new tab
                window.open(whatsappUrl, '_blank');
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1000);
        });
    }
});
