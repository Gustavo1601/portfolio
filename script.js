// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== TYPED EFFECT =====
const roles = ['Desenvolvedor de Software', 'Analista de Sistemas', 'Entusiasta de Banco de Dados', 'Desenvolvedor Web'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => { isDeleting = true; type(); }, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ===== COUNTER ANIMATION =====
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count;
          if (count >= target) clearInterval(interval);
        }, 40);
      });
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.sobre-stats');
if (statsSection) countObserver.observe(statsSection);

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});
