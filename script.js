// =============================================
// PREMIER POINT PARTNERSHIP — Enhanced Script
// =============================================

// ---- Mobile Nav ----
const mobileMenuBtn = document.querySelector('.mobile-menu');
const mobileNav     = document.querySelector('.mobile-nav');
const navOverlay    = document.querySelector('.nav-overlay');
const mobileClose   = document.querySelector('.mobile-nav-close');

function openMobileNav() {
  mobileNav.classList.add('open');
  navOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
if (mobileClose)   mobileClose.addEventListener('click', closeMobileNav);
if (navOverlay)    navOverlay.addEventListener('click', closeMobileNav);

// Close on link click
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});

// ---- Header scroll shadow ----
const header = document.querySelector('header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Intersection Observer: fade-in & staggered cards ----
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');

    // Stagger child .fade-in elements
    const children = el.querySelectorAll('.fade-in');
    children.forEach((child, i) => {
      setTimeout(() => child.classList.add('visible'), i * 90);
    });

    // Trigger about-text paragraph stagger
    el.querySelectorAll('.about-text p, .about-values').forEach(p => {
      p.classList.add('visible');
    });

    observer.unobserve(el);
  });
}, observerOptions);

document.querySelectorAll('.fade-section, .fade-in').forEach(el => observer.observe(el));

// ---- Contact Form ----
const form = document.getElementById('contactForm');
if (form) {
  const successMsg = document.getElementById('successMsg');
  const submitBtn  = form.querySelector('.btn-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate async (replace with real fetch to backend)
    await new Promise(r => setTimeout(r, 1200));

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    successMsg.style.display = 'block';
    form.reset();
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 6000);
  });
}

// ---- Counter animation for hero stats ----
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = isFloat
      ? value.toFixed(1)
      : Math.round(value).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      animateCounter(el, parseFloat(el.dataset.count));
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
