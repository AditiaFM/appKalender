// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('revealed');
        }
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
}

// Navigation highlight based on scroll position
function updateActiveSection() {
    const sections = ['architecture', 'knowledge', 'figures'];
    const scrollPosition = window.scrollY + 200;

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                // You can add active states here if needed
                console.log(`Active section: ${sectionId}`);
            }
        }
    });
}

// Add scroll reveal classes to elements
function initScrollReveal() {
    const elementsToReveal = [
        '.content-item',
        '.knowledge-card',
        '.figure-item'
    ];
    
    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('scroll-reveal');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    
    // Initial reveal check
    revealOnScroll();
    
    // Add scroll event listeners
    window.addEventListener('scroll', function() {
        revealOnScroll();
        parallaxEffect();
        updateActiveSection();
    });
    
    // Add click event for hero buttons
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects for cards
    const cards = document.querySelectorAll('.knowledge-card, .content-image');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Handle resize events
window.addEventListener('resize', function() {
    // Recalculate scroll positions if needed
    revealOnScroll();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});