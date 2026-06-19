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
    // If the image already finished (cached / instant SVG) before this ran,
    // mark it now so it doesn't stay stuck at opacity 0. `complete` is true on
    // both success and error, and SVGs may report naturalWidth 0, so don't
    // gate on dimensions here.
    if (img.complete) {
      img.classList.add('loaded');
      return;
    }
    var markLoaded = function() { img.classList.add('loaded'); };
    img.addEventListener('load', markLoaded);
    // Never leave a broken/errored image invisible.
    img.addEventListener('error', markLoaded);
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

// Scroll-reveal "pop out": reveal each .reveal element as it enters the viewport
(function() {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var reduceMotion = document.documentElement.classList.contains('reduce-motion') ||
    (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach(function(el) { observer.observe(el); });
})();

// Ensure the full-screen hero video autoplays (muted) across browsers.
// Some browsers ignore the `muted` attribute for autoplay unless the property
// is set in JS and play() is called explicitly.
(function() {
  var heroVideo = document.querySelector('.home-video-media');
  if (!heroVideo) return;

  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.setAttribute('muted', '');
  heroVideo.playsInline = true;

  function tryPlay() {
    var p = heroVideo.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function() {
        // Autoplay still blocked: resume on the first user interaction.
        var resume = function() {
          heroVideo.play();
          document.removeEventListener('click', resume);
          document.removeEventListener('touchstart', resume);
          document.removeEventListener('keydown', resume);
        };
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('touchstart', resume, { once: true });
        document.addEventListener('keydown', resume, { once: true });
      });
    }
  }

  if (heroVideo.readyState >= 2) {
    tryPlay();
  } else {
    heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
    heroVideo.addEventListener('canplay', tryPlay, { once: true });
  }
})();
