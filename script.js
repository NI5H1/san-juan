// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const heroSlider = document.querySelector('.hero-slider');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
const totalSlides = 3;

// Toggle Mobile Menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = navToggle.getElementsByTagName('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(8px, 8px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.getElementsByTagName('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 76;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Slider functionality
function updateSlider() {
    heroSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

// Add click events to dots
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto-advance slides
setInterval(nextSlide, 5000);

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

heroSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSlider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            // Swipe right
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        updateSlider();
    }
}