document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('ion-icon');
            if (icon) {
                icon.name = icon.name === 'menu-outline' ? 'close-outline' : 'menu-outline';
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('ion-icon');
                if (icon) icon.name = 'menu-outline';
            }
        });
    });

    // 2. Navbar Scroll Effect
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal (Animate Up)
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

    // 5. Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = 'ml'; // Default to Malayalam as per user's content

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
        });

        langBtn.textContent = lang === 'en' ? 'മലയാളം' : 'English';
    };

    // Initial setup (Malayalam default if needed)
    // updateLanguage(currentLang);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ml' : 'en';
            updateLanguage(currentLang);
        });
    }

    // 6. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            const originalBtnText = contactForm.querySelector('button').textContent;
            contactForm.querySelector('button').textContent = currentLang === 'en' ? 'Wait...' : 'കാത്തിരിക്കൂ...';

            // WhatsApp Redirection
            const whatsappNumber = "919544873314";
            const text = `*New Inquiry from Peaceful Edits*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

            setTimeout(() => {
                contactForm.reset();
                formStatus.textContent = currentLang === 'en' ? 'Redirecting to WhatsApp!' : 'വാട്സാപ്പിലേക്ക് മാറുന്നു!';
                formStatus.style.color = '#58E1B9';
                contactForm.querySelector('button').textContent = originalBtnText;
                
                window.open(whatsappUrl, '_blank');
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1000);
        });
    }
});
