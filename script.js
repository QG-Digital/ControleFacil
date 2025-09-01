// WhatsApp numbers array - Add your consultant numbers here
const whatsappNumbers = [
    '5543996349824', // Consultor 1
    '5543996349824', // Consultor 2  
    '5543996349824', // Consultor 3
    '5543996349824', // Consultor 4
    '5543996349824'  // Consultor 5
];

// Function to get random WhatsApp number
function getRandomWhatsAppNumber() {
    const randomIndex = Math.floor(Math.random() * whatsappNumbers.length);
    return whatsappNumbers[randomIndex];
}

// Function to open WhatsApp with random number
function openWhatsApp() {
    const selectedNumber = getRandomWhatsAppNumber();
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o ControleFácil Importação. Poderia me enviar mais informações?');
    const whatsappUrl = `https://wa.me/${selectedNumber}?text=${message}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
}

// Menu Mobile Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Back to Top Functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Skip if it's a contact button (will be handled by WhatsApp function)
        if (this.classList.contains('contact-button')) {
            return;
        }
        
        if (this.getAttribute('href') === '#') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Contact Buttons - WhatsApp Integration
document.querySelectorAll('.contact-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
});

// Scroll Animations
function checkScroll() {
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .step, .steps-image, .video-container, .differentiators-list li, .testimonial-card, .guarantee, .cta h2, .cta p, .cta .btn');
    
    elementsToAnimate.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Initial check on page load
window.addEventListener('load', () => {
    checkScroll();
    
    // Add a small delay to ensure all elements are loaded
    setTimeout(() => {
        checkScroll();
    }, 100);
});

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Intersection Observer for better performance (optional enhancement)
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elementsToObserve = document.querySelectorAll('.benefit-card, .step, .steps-image, .video-container, .differentiators-list li, .testimonial-card, .guarantee, .cta h2, .cta p, .cta .btn');
        elementsToObserve.forEach(el => observer.observe(el));
    });
}