// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Doa Tabs Functionality
function showDoaTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
}

// Calendar Generation
function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid-days');
    if (!calendarGrid) return;
    
    // Generate 30 days for current month
    for (let i = 1; i <= 30; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.style.cssText = `
            padding: 0.5rem;
            text-align: center;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
        `;
        
        // Highlight current day (15th for demo)
        if (i === 15) {
            dayElement.style.backgroundColor = '#0d7377';
            dayElement.style.color = 'white';
        } else {
            dayElement.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f3f4f6';
            });
            dayElement.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.getElementById('mobileNav');
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
    
    // Make hero section immediately visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
    }
}

// Surah selection functionality
function initSurahSelection() {
    const surahItems = document.querySelectorAll('.surah-item');
    
    surahItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            surahItems.forEach(si => si.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Here you could load different surah content
            console.log('Selected surah:', this.querySelector('h4').textContent);
        });
    });
}

// Audio play functionality (placeholder)
function initAudioControls() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPlaying = this.textContent.includes('⏸️');
            
            if (isPlaying) {
                this.textContent = '▶️ Putar Audio';
                console.log('Audio paused');
            } else {
                this.textContent = '⏸️ Jeda Audio';
                console.log('Audio playing');
            }
        });
    });
}

// Prayer times update (placeholder - would normally fetch from API)
function updatePrayerTimes() {
    const prayerTimes = {
        subuh: '04:45',
        dzuhur: '12:15',
        ashar: '15:30',
        maghrib: '18:10',
        isya: '19:25'
    };
    
    // This would normally fetch real prayer times based on location
    console.log('Prayer times updated:', prayerTimes);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    initSurahSelection();
    initAudioControls();
    updatePrayerTimes();
    
    console.log('Cahaya Hijriyah website initialized');
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    }
});