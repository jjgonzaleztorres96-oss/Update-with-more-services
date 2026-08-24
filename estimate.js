(function () {
  'use strict';

  var MAX_PHOTOS = 3;
  var photoFiles = [];
  var EMAILJS_KEY = 'jzTGEVeLn4nHdZx36';

  function ensureEmailJS(cb) {
    if (window.emailjs) {
      // Already loaded (e.g. index.html has its own EmailJS block)
      if (!window._ejsInited) {
        try { emailjs.init({ publicKey: EMAILJS_KEY }); } catch(e){}
        window._ejsInited = true;
      }
      cb();
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function() {
      emailjs.init({ publicKey: EMAILJS_KEY });
      window._ejsInited = true;
      cb();
    };
    s.onerror = function() { cb(); }; // proceed even if CDN fails
    document.head.appendChild(s);
  }

  function openDrawer() {
    var overlay = document.getElementById('est-overlay');
    if (!overlay) return;
    overlay.classList.add('est-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var overlay = document.getElementById('est-overlay');
    if (!overlay) return;
    overlay.classList.remove('est-open');
    document.body.style.overflow = '';
  }

  function goToPanel(n) {
    var panels = document.querySelectorAll('.est-panel');
    panels.forEach(function (p) {
      p.style.display = p.dataset.panel == n ? 'block' : 'none';
    });
    updateStepIndicators(n);
    var drawer = document.querySelector('.est-drawer');
    if (drawer) drawer.scrollTop = 0;
  }

  function updateStepIndicators(current) {
    var steps = document.querySelectorAll('.est-step');
    steps.forEach(function (s) {
      var n = parseInt(s.dataset.step, 10);
      s.classList.remove('est-step--active', 'est-step--done');
      if (n === current) s.classList.add('est-step--active');
      else if (n < current) s.classList.add('est-step--done');
    });
  }

  function collectFormData() {
    var form = document.getElementById('est-form');
    if (!form) return {};

    function val(name) {
      var el = form.querySelector('[name="' + name + '"]');
      if (!el) return '';
      if (el.type === 'radio') {
        var checked = form.querySelector('[name="' + name + '"]:checked');
        return checked ? checked.value : '';
      }
      return el.value.trim();
    }

    return {
      service:       val('service'),
      rooms:         val('rooms'),
      timeline:      val('timeline'),
      current_color: val('current_color'),
      condition:     val('condition'),
      area:          val('area'),
      notes:         val('notes'),
      first_name:    val('first_name'),
      last_name:     val('last_name'),
      phone:         val('phone'),
      email:         val('email')
    };
  }

  function validateStep1() {
    var data = collectFormData();
    if (!data.service) { alert('Please select what you\'d like painted.'); return false; }
    if (!data.timeline) { alert('Please select a timeline.'); return false; }
    return true;
  }

  function validateStep3() {
    var data = collectFormData();
    if (!data.first_name) { alert('Please enter your first name.'); return false; }
    if (!data.phone && !data.email) { alert('Please enter a phone number or email.'); return false; }
    return true;
  }

  function handlePhotoChange(input) {
    var newFiles = Array.from(input.files || []);
    newFiles.forEach(function (f) {
      if (photoFiles.length < MAX_PHOTOS) photoFiles.push(f);
    });
    renderPreviews();
    input.value = '';
  }

  function renderPreviews() {
    var container = document.getElementById('est-previews');
    if (!container) return;
    container.innerHTML = '';
    photoFiles.forEach(function (f) {
      var img = document.createElement('img');
      img.className = 'est-preview-img';
      img.src = URL.createObjectURL(f);
      container.appendChild(img);
    });
    var label = document.querySelector('.est-upload-label span:first-of-type');
    if (label) {
      label.textContent = photoFiles.length > 0
        ? photoFiles.length + ' photo' + (photoFiles.length > 1 ? 's' : '') + ' added'
        : 'Tap to add photos';
    }
  }

  function toBase64(file) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(e.target.result); };
      reader.readAsDataURL(file);
    });
  }

  function submitEstimate() {
    if (!validateStep3()) return;

    var btn = document.getElementById('est-submit');
    var status = document.getElementById('est-status');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    if (status) status.textContent = '';

    var data = collectFormData();

    var message = [
      'SERVICE: ' + data.service,
      data.rooms ? 'ROOMS: ' + data.rooms : '',
      'TIMELINE: ' + data.timeline,
      '',
      'CURRENT COLOR: ' + (data.current_color || 'Not specified'),
      'CONDITION: ' + (data.condition || 'Not specified'),
      'AREA: ' + (data.area || 'Not specified'),
      'NOTES: ' + (data.notes || 'None'),
      '',
      'CONTACT:',
      'Name: ' + data.first_name + ' ' + data.last_name,
      'Phone: ' + data.phone,
      'Email: ' + data.email,
    ].filter(Boolean).join('\n');

    var photoPromises = photoFiles.map(function (f) { return toBase64(f); });

    Promise.all(photoPromises).then(function (b64s) {
      var photoNote = b64s.length > 0
        ? '\n\nPHOTOS: ' + b64s.length + ' image(s) submitted.'
        : '';

      var params = {
        from_name:    data.first_name + ' ' + data.last_name,
        reply_to:     data.email || ('noreply@cornerstonepainting.ca'),
        phone:        data.phone,
        message:      message + photoNote,
        service_type: data.service,
        timeline:     data.timeline,
      };

      ensureEmailJS(function () {
        if (window.emailjs) {
          emailjs.send('service_65u9teq', 'template_umgubsc', params)
            .then(function () {
              showSuccess();
            })
            .catch(function (err) {
              console.error('EmailJS error', err);
              if (status) status.textContent = 'Something went wrong. Please call us at 437-242-3829.';
              if (btn) { btn.disabled = false; btn.textContent = 'Send Request'; }
            });
        } else {
          showSuccess();
        }
      });
    });
  }

  function showSuccess() {
    var form = document.getElementById('est-form');
    var steps = document.querySelector('.est-steps');
    var success = document.getElementById('est-success');
    if (form) form.style.display = 'none';
    if (steps) steps.style.display = 'none';
    if (success) success.style.display = 'block';
  }

  function resetDrawer() {
    var form = document.getElementById('est-form');
    var steps = document.querySelector('.est-steps');
    var success = document.getElementById('est-success');
    if (form) { form.reset(); form.style.display = 'block'; }
    if (steps) steps.style.display = 'flex';
    if (success) success.style.display = 'none';
    photoFiles = [];
    renderPreviews();
    goToPanel(1);
    var roomsWrap = document.getElementById('est-rooms-wrap');
    if (roomsWrap) roomsWrap.style.display = 'none';
  }

  function init() {
    var openBtn = document.getElementById('open-estimate');
    var overlay = document.getElementById('est-overlay');
    var closeBtn = document.getElementById('est-close');
    var form = document.getElementById('est-form');

    if (!overlay) return;

    if (openBtn) {
      openBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetDrawer();
        openDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeDrawer();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Next buttons
    document.querySelectorAll('.est-next').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = parseInt(this.dataset.target, 10);
        if (target === 2 && !validateStep1()) return;
        goToPanel(target);
      });
    });

    // Back buttons
    document.querySelectorAll('.est-back').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToPanel(parseInt(this.dataset.target, 10));
      });
    });

    // Show/hide rooms selector based on service choice
    document.querySelectorAll('[name="service"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        var roomsWrap = document.getElementById('est-rooms-wrap');
        if (!roomsWrap) return;
        roomsWrap.style.display = this.value === 'Interior Painting' ? 'block' : 'none';
      });
    });

    // Photo upload
    var photoInput = document.getElementById('est-photos');
    if (photoInput) {
      photoInput.addEventListener('change', function () {
        handlePhotoChange(this);
      });
    }

    // Form submit
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitEstimate();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
