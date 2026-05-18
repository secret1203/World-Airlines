/* ============================================================
   SHIH HANG ENTERPRISE — main script
   ============================================================ */

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Sticky nav background change on scroll ----
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Mobile menu toggle ----
const burger = document.querySelector('.nav__burger');
const links  = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  links.classList.toggle('open');
});
// Close on link tap
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('active');
    links.classList.remove('open');
  });
});

// ---- Smooth scroll offset (account for fixed nav) ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 6;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Reveal-on-scroll for major elements ----
const REVEAL_SELECTORS = [
  '.section__head',
  '.about-card', '.about-info',
  '.team-card',
  '.adv-card', '.value-card',
  '.prod-card', '.line-card',
  '.eq-card',
  '.biz-card',
  '.app-card', '.yut-card',
  '.future-card',
  '.contact-left', '.contact-right'
];
const targets = document.querySelectorAll(REVEAL_SELECTORS.join(','));
targets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(el => io.observe(el));
} else {
  targets.forEach(el => el.classList.add('in'));
}

// ---- Subtle parallax on hero visual ----
const heroVisual = document.querySelector('.hero__visual');
if (heroVisual) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ---- Active nav link highlighting based on viewport section ----
const sections = ['about','team','advantages','production','services','products','future','contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll('.nav__links a');

function highlightActive() {
  const scrollPos = window.scrollY + nav.offsetHeight + 80;
  let current = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) current = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${current}`) link.style.color = 'var(--navy-900)';
    else if (!link.classList.contains('nav__cta')) link.style.color = '';
  });
}
window.addEventListener('scroll', highlightActive, { passive: true });
highlightActive();
