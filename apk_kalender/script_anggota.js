// Data anggota kelompok
const groupMembers = [
    {
        id: 1,
        name: "Moc. Aditia Firman Maulana",
        nim: "231080200123",
        class: "4B1",
        image: "photo-1581092795360-fd1ca04f0952"
    },
    {
        id: 2,
        name: "Mukh Zaki",
        nim: "2021001002", 
        class: "4B1",
        image: "photo-1649972904349-6e44c42644a7"
    },
    {
        id: 3,
        name: "Ilham Armain",
        nim: "2021001003",
        class: "4B1", 
        image: "photo-1581091226825-a6a2a5aee158"
    },
    {
        id: 4,
        name: "Addiyn Ainas",
        nim: "2021001004",
        class: "4B1",
        image: "photo-1535268647677-300dbf3d78d1"
    },
    {
        id: 5,
        name: "Bimas Najid",
        nim: "2021001005",
        class: "4B1",
        image: "photo-1501286353178-1ec881214838"
    }
];

// Gradient warna untuk setiap anggota
const gradients = [
    "linear-gradient(135deg, #3b82f6, #06b6d4)",
    "linear-gradient(135deg, #8b5cf6, #ec4899)", 
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #6366f1, #8b5cf6)"
];

// Fungsi untuk membuat kartu anggota
function createMemberCard(member, index) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    card.innerHTML = `
        <div class="member-content">
            <div class="profile-section">
                <div class="profile-wrapper" style="background: ${gradients[index]};">
                    <div class="profile-image">
                        <img src="https://images.unsplash.com/${member.image}?auto=format&fit=crop&w=150&h=150" 
                             alt="${member.name}"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <svg class="fallback-icon" style="display: none;" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </div>
                <div class="member-badge" style="background: ${gradients[index]};">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </div>

            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                
                <div class="member-details">
                    <div class="detail-item">
                        <p class="detail-label">NIM</p>
                        <p class="detail-value">${member.nim}</p>
                    </div>
                    
                    <div class="detail-item">
                        <p class="detail-label">Kelas</p>
                        <p class="detail-value">${member.class}</p>
                    </div>
                </div>

                <div class="member-number" style="background: ${gradients[index]};">
                    Anggota ${index + 1}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Fungsi untuk menampilkan semua anggota
function renderMembers() {
    const membersGrid = document.getElementById('membersGrid');
    
    groupMembers.forEach((member, index) => {
        const memberCard = createMemberCard(member, index);
        membersGrid.appendChild(memberCard);
    });
}

// Fungsi animasi scroll reveal
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe semua kartu anggota
    document.querySelectorAll('.member-card').forEach(card => {
        observer.observe(card);
    });
}

// Fungsi untuk menambahkan efek hover interaktif
function addInteractiveEffects() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Fungsi untuk smooth scroll dan parallax effect
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.group-header');
        const speed = 0.5;
        
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Inisialisasi aplikasi
function init() {
    // Render anggota kelompok
    renderMembers();
    
    // Setup animasi dan efek
    setTimeout(() => {
        handleScrollAnimations();
        addInteractiveEffects();
        addParallaxEffect();
    }, 100);
    
    // Tambahkan loading animation
    document.body.classList.add('loaded');
}

// Jalankan setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', init);

// Tambahkan responsive behavior untuk mobile
window.addEventListener('resize', () => {
    // Reset animations on resize
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
        }, 10);
    });
});

// Export functions untuk testing (opsional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        groupMembers,
        createMemberCard,
        renderMembers
    };
}