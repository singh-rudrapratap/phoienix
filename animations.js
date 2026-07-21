// --- Scroll Reveal with IntersectionObserver ---
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Add stagger delay for grid children
        if (entry.target.closest('.menu-grid')) {
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.08}s`;
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => observer.observe(el));
});

// --- 3D Card Tilt Effect ---
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.menu-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5; // max 5deg
      const rotateY = (x - centerX) / centerX * 5;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// --- Hero Ember Particles ---
document.addEventListener('DOMContentLoaded', () => {
  const particleContainer = document.querySelector('.ember-particles');
  if (!particleContainer) return;
  
  function createEmber() {
    const ember = document.createElement('div');
    ember.className = 'ember';
    ember.style.left = Math.random() * 100 + '%';
    ember.style.bottom = '-10px';
    ember.style.width = (Math.random() * 4 + 2) + 'px';
    ember.style.height = ember.style.width;
    ember.style.animationDuration = (Math.random() * 4 + 4) + 's';
    ember.style.animationDelay = (Math.random() * 2) + 's';
    particleContainer.appendChild(ember);
    
    setTimeout(() => ember.remove(), 8000);
  }
  
  // Create embers periodically
  setInterval(createEmber, 600);
  // Initial batch
  for (let i = 0; i < 8; i++) {
    setTimeout(createEmber, i * 200);
  }
});

// --- Page Load Animation ---
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// --- Typing Effect ---
document.addEventListener('DOMContentLoaded', () => {
  const words = ['The Beans', 'The Fire', 'The Passion'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector('.typing-text');
  
  if (!typingElement) return;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing
  setTimeout(type, 1000);
});
