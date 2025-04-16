const zoomIn = document.getElementById('zoom-in');
const zoomOut = document.getElementById('zoom-out');
const resetZoom = document.getElementById('reset-zoom');
let currentZoom = 1;

zoomIn.addEventListener('click', () => {
    if (currentZoom < 1.5) {
        currentZoom += 0.1;
        document.body.style.zoom = currentZoom;
    }
});

zoomOut.addEventListener('click', () => {
    if (currentZoom > 0.5) {
        currentZoom -= 0.1;
        document.body.style.zoom = currentZoom;
    }
});

resetZoom.addEventListener('click', () => {
    currentZoom = 1;
    document.body.style.zoom = currentZoom;
});

// Add scroll animation for service and project cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add hover effects for buttons
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transition = 'all 0.3s ease';
    });
});

// Mobile menu toggler (simplified for this example)
const mobileMenuBtn = document.createElement('div');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
`;
mobileMenuBtn.style.display = 'none';
mobileMenuBtn.style.cursor = 'pointer';

const navLinks = document.querySelector('.nav-links');
document.querySelector('nav').appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        navLinks.style.display = 'none';
        navLinks.style.position = 'absolute';
        navLinks.style.flexDirection = 'column';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navLinks.style.zIndex = '100';
    } else {
        mobileMenuBtn.style.display = 'none';
        navLinks.style.display = 'flex';
        navLinks.style.position = 'static';
        navLinks.style.flexDirection = 'row';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
    }
});

// Trigger resize event to set initial state
window.dispatchEvent(new Event('resize'));