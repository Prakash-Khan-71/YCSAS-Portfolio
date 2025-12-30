// Smooth scrolling
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const toggleIcon = document.querySelector('.toggle-icon');

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light');
    toggleIcon.textContent = '🔅';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    toggleIcon.textContent = isLight ? '🔅' : '🌙';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 41, 59, 0.98)';
    } else {
        navbar.style.background = 'rgba(30, 41, 59, 0.95)';
    }
});

// Skills hover animation
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateY(-10px) scale(1.05)';
    });
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateY(0) scale(1)';
    });
});

// Project modals
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

const projectData = {
    portfolio: {
        title: 'Personal Portfolio',
        desc: 'Fully responsive portfolio built for YCSAS internship with smooth animations, dark/light mode, and interactive elements.'
    },
    landing: {
        title: 'Modern Landing Page',
        desc: 'Clean landing page design featuring CSS Grid, Flexbox, hover animations, and mobile-first responsive design.'
    },
    form: {
        title: 'Interactive Contact Form',
        desc: 'Advanced form with real-time validation, error handling, smooth animations, and professional user feedback.'
    }
};

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const modalType = card.dataset.modal;
        const data = projectData[modalType];
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Form validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    // Validate name
    if (!name.value.trim()) {
        name.parentNode.querySelector('.error').textContent = 'Name is required';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        email.parentNode.querySelector('.error').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        email.parentNode.querySelector('.error').textContent = 'Please enter valid email';
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim() || message.value.trim().length < 10) {
        message.parentNode.querySelector('.error').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (isValid) {
        alert('🎉 Thank you! Your message has been sent successfully.');
        contactForm.reset();
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section, .skill-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
