(function () {
  'use strict';

  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  function init() {

    // --- Phone clicks ---
    document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        var loc = el.classList.contains('float-cta') ? 'float_cta'
                : el.classList.contains('nav-phone') ? 'nav'
                : el.classList.contains('footer-phone') ? 'footer'
                : 'cta_band';
        track('phone_click', { event_category: 'engagement', location: loc });
      });
    });

    // --- Estimate drawer opens ---
    var openBtn = document.getElementById('open-estimate');
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        track('estimate_open', { event_category: 'engagement', source: 'nav_button' });
      });
    }

    // --- CTA button clicks (non-phone) ---
    document.querySelectorAll('.cta-band .btn, .btn-hero-primary, .nav-cta, .m-cta').forEach(function (el) {
      if (el.href && el.href.indexOf('tel:') > -1) return;
      el.addEventListener('click', function () {
        track('cta_click', {
          event_category: 'engagement',
          label: el.textContent.trim().replace(/\s+/g, ' ').substring(0, 50)
        });
      });
    });

    // --- Estimate form: track step progression by watching panel visibility ---
    document.querySelectorAll('.est-panel').forEach(function (panel) {
      var step = parseInt(panel.getAttribute('data-panel'), 10);
      new MutationObserver(function () {
        if (panel.style.display === 'block' && step > 1) {
          track('form_step_complete', { event_category: 'form', step: step - 1 });
        }
      }).observe(panel, { attributes: true, attributeFilter: ['style'] });
    });

    // --- Estimate form: submission success ---
    var successEl = document.getElementById('est-success');
    if (successEl) {
      new MutationObserver(function () {
        if (successEl.style.display === 'block') {
          track('generate_lead', { event_category: 'form', method: 'estimate_form' });
        }
      }).observe(successEl, { attributes: true, attributeFilter: ['style'] });
    }

    // --- Gallery filter clicks ---
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        track('gallery_filter', {
          event_category: 'engagement',
          filter: btn.getAttribute('data-filter') || 'all'
        });
      });
    });

    // --- Blog scroll depth (only on post pages) ---
    if (document.querySelector('.post-article')) {
      var milestones = [25, 50, 75, 100];
      var reached = {};
      window.addEventListener('scroll', function () {
        var scrolled = window.scrollY + window.innerHeight;
        var total = document.documentElement.scrollHeight;
        var pct = Math.floor((scrolled / total) * 100);
        milestones.forEach(function (m) {
          if (pct >= m && !reached[m]) {
            reached[m] = true;
            track('scroll_depth', {
              event_category: 'blog',
              percent: m,
              page: window.location.pathname
            });
          }
        });
      }, { passive: true });
    }

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
