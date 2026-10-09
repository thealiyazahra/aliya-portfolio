// Portfolio interactions: theme toggle, nav menu, and scroll reveal behavior.

const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');

// Theme toggling with saved preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  updateThemeIcon(true);
}

function updateThemeIcon(isLightMode) {
  const icon = themeToggle.querySelector('i');
  icon.className = isLightMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

themeToggle.addEventListener('click', () => {
  const isLightMode = body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', isLightMode ? 'light' : 'dark');
  updateThemeIcon(isLightMode);
});

// Mobile nav
navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Footer year
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Form handling for contact section (client-side placeholder)
document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const button = event.currentTarget.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.textContent = 'Message Sent';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    event.currentTarget.reset();
  }, 2200);
});
