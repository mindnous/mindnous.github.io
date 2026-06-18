// Mobile Menu
var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
var menuBackdrop = document.querySelector('#menu-backdrop');
var menuCloseBtn = document.querySelector('#close-menu-mobile');

function openMobileMenu() {
  if (!menuContainer) return;
  menuContainer.classList.add('open');
  menuBackdrop && menuBackdrop.classList.add('open');
  menuTrigger && menuTrigger.classList.add('is-active');
  body.classList.add('lock-scroll');
}

function closeMobileMenu() {
  if (!menuContainer) return;
  menuContainer.classList.remove('open');
  menuBackdrop && menuBackdrop.classList.remove('open');
  menuTrigger && menuTrigger.classList.remove('is-active');
  body.classList.remove('lock-scroll');
}

if (menuTrigger && menuContainer) {
  menuTrigger.addEventListener('click', function() {
    menuContainer.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });
}

menuCloseBtn && menuCloseBtn.addEventListener('click', closeMobileMenu);
menuBackdrop && menuBackdrop.addEventListener('click', closeMobileMenu);

// Close on nav link tap (so it closes before navigating)
if (menuContainer) {
  menuContainer.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMobileMenu);
  });
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMobileMenu();
});

// Sticky Header Effect
var header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Lazy Loading Images
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
  });
} else {
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.classList.add('reduce-motion');
}
