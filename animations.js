(function () {
  'use strict';

  // Nav scroll shadow
  var nav = document.querySelector('nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('nav--scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Skip all animations if reduced-motion is set
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var GROUPS = [
    { sel: '.feat-card',       cls: 'will-animate',       stagger: true  },
    { sel: '.review-card',     cls: 'will-animate',       stagger: true  },
    { sel: '.how-step',        cls: 'will-animate',       stagger: true  },
    { sel: '.faq-item',        cls: 'will-animate',       stagger: true  },
    { sel: '.why-stat',        cls: 'will-animate',       stagger: true  },
    { sel: '.trust-item',      cls: 'will-animate',       stagger: true  },
    { sel: '.service-card',    cls: 'will-animate',       stagger: true  },
    { sel: '.blog-card',       cls: 'will-animate',       stagger: true  },
    { sel: '.process-step',    cls: 'will-animate',       stagger: true  },
    { sel: '.areas-city-cell', cls: 'will-animate',       stagger: false },
    { sel: '.quote-left',      cls: 'will-animate-left',  stagger: false },
    { sel: '.quote-right',     cls: 'will-animate-right', stagger: false },
  ];

  function applyAnimationClasses() {
    GROUPS.forEach(function (cfg) {
      var els = Array.from(document.querySelectorAll(cfg.sel));

      // Track stagger index per parent container
      var parentCount = {};

      els.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // Skip elements already in the viewport — leave them visible
        if (rect.top < window.innerHeight - 40 && rect.bottom > 0) return;

        el.classList.add(cfg.cls);

        if (cfg.stagger) {
          var parentKey = el.parentElement ? (el.parentElement.className + el.parentElement.id) : '';
          parentCount[parentKey] = (parentCount[parentKey] || 0) + 1;
          var idx = parentCount[parentKey];
          if (idx > 1 && idx <= 6) {
            el.dataset.delay = String(idx - 1);
          }
        }
      });
    });
  }

  function setupObserver() {
    if (!window.IntersectionObserver) {
      // Fallback: reveal all
      document.querySelectorAll('.will-animate, .will-animate-left, .will-animate-right')
        .forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        observer.unobserve(el);
        // Remove animation class after transition so hover effects use the element's own transition
        var dur = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 600;
        setTimeout(function () {
          el.classList.remove('will-animate', 'will-animate-left', 'will-animate-right');
          delete el.dataset.delay;
        }, dur + 80);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.will-animate, .will-animate-left, .will-animate-right')
      .forEach(function (el) { observer.observe(el); });
  }

  function init() {
    applyAnimationClasses();
    setupObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
