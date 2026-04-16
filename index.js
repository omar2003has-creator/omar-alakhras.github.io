// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
  });
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.backgroundColor = '#0a0a0f';
      navLinks.style.padding = '24px';
      navLinks.style.borderBottom = '1px solid rgba(139, 92, 246, 0.2)';
      navLinks.style.gap = '20px';
      navLinks.style.zIndex = '999';
    }
  });
}

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      // Close mobile menu if open
      if (navLinks && navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      }
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll Animation (Reveal on scroll)
const revealElements = document.querySelectorAll('.skill-category, .project-card, .volunteer-card, .future-card, .contact-card, .info-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
  });
}

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length && navItems.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(link => {
      link.style.color = '#a1a1aa';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#8b5cf6';
      }
    });
  });
}

// Loader (optional - if you want to add a loader div)
window.addEventListener('load', () => {
  // Any preloader removal logic here
  document.body.style.visibility = 'visible';
});

// Prevent cursor on touch devices
if ('ontouchstart' in window) {
  if (cursor) cursor.style.display = 'none';
  if (cursorFollower) cursorFollower.style.display = 'none';
}