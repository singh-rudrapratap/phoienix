// --- Mobile Hamburger Toggle ---
function toggleMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger) hamburger.classList.toggle('active');
  if(navLinks) {
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }
}

// Close mobile nav when clicking a link
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        if(hamburger) hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(nav) {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
  }
});

// --- Active Section Highlighting ---
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});

// --- Back to Top Button ---
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  if (window.scrollY > 500) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// --- Smooth Scroll for Nav Links ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
