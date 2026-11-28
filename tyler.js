(function () {
  'use strict';

  var PHONE = '437-242-3829';
  var PHONE_HREF = 'tel:+14372423829';
  var EJS_KEY = 'jzTGEVeLn4nHdZx36';
  var EJS_SVC = 'service_65u9teq';
  var EJS_TPL = 'template_umgubsc';

  var QUESTIONS = [
    {
      id: 'estimate',
      text: 'Do you offer free estimates?',
      answer: 'Yes — 100% free, no commitment. Send us your project details and we’ll get back to you with a written estimate within 12 hours. Most clients hear from us the same day.'
    },
    {
      id: 'location',
      text: 'Where do you work?',
      answer: 'We’re based in North York and cover the full GTA — Toronto, Richmond Hill, Vaughan, Woodbridge, Markham, Aurora, and surrounding areas. If you’re not sure, just ask.'
    },
    {
      id: 'services',
      text: 'What type of painting do you do?',
      answer: 'Interior, exterior, condo, cabinet, and commercial painting. We handle everything from a single room refresh to a full commercial project across Toronto and the GTA.'
    },
    {
      id: 'timeline',
      text: 'How long does a project take?',
      answer: 'Most interior jobs take 1–3 days. A single room is typically done in one day, a full condo in two. Every estimate includes a specific start date and timeline so you can plan around it.'
    },
    {
      id: 'products',
      text: 'What products do you use?',
      answer: 'We use Benjamin Moore and Sherwin Williams exclusively. Both are professional-grade paints that give you better coverage, cleaner colour, and a finish that holds up for years.'
    }
  ];

  /* ── CSS ───────────────────────────────────────────────────── */
  var css =
    '#tyler-btn{' +
      'position:fixed;bottom:92px;right:28px;' +
      'width:52px;height:52px;border-radius:50%;' +
      'background:#1a1109;border:2px solid #c4602a;' +
      'color:#f0ece6;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;' +
      'box-shadow:0 4px 24px rgba(0,0,0,0.38);' +
      'z-index:149;transition:transform 0.2s,background 0.2s,box-shadow 0.2s;' +
      'padding:0;' +
    '}' +
    '#tyler-btn:hover{background:#c4602a;transform:scale(1.1);box-shadow:0 6px 28px rgba(196,96,42,0.4)}' +
    '#tyler-btn svg{width:26px;height:26px;pointer-events:none}' +
    '#tyler-dot{' +
      'position:absolute;top:1px;right:1px;' +
      'width:12px;height:12px;border-radius:50%;' +
      'background:#22c55e;border:2.5px solid #fff;' +
      'animation:tyler-pulse 2s infinite;pointer-events:none;' +
    '}' +
    '@keyframes tyler-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.35);opacity:0.75}}' +
    '#tyler-label{' +
      'position:fixed;bottom:103px;right:92px;' +
      'background:#1a1109;color:#f0ece6;' +
      'padding:7px 13px;border-radius:20px;' +
      'font-size:0.78rem;font-family:Carlito,sans-serif;' +
      'white-space:nowrap;pointer-events:none;' +
      'box-shadow:0 2px 12px rgba(0,0,0,0.22);' +
      'animation:tyler-slidein 0.4s ease 1.2s both;' +
      'z-index:148;' +
    '}' +
    '#tyler-label::after{' +
      'content:"";position:absolute;top:50%;right:-7px;' +
      'transform:translateY(-50%);' +
      'border:5px solid transparent;border-left-color:#1a1109;border-right:0;' +
    '}' +
    '@keyframes tyler-slidein{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}' +
    '#tyler-chat{' +
      'position:fixed;bottom:160px;right:16px;' +
      'width:min(320px,calc(100vw - 32px));' +
      'background:#fff;border-radius:18px;' +
      'box-shadow:0 12px 48px rgba(0,0,0,0.2);' +
      'z-index:200;display:none;flex-direction:column;' +
      'overflow:hidden;font-family:Carlito,sans-serif;' +
      'max-height:min(560px,calc(100vh - 180px));' +
      'opacity:0;transform:translateY(14px) scale(0.97);' +
      'transition:opacity 0.22s ease,transform 0.22s ease;' +
    '}' +
    '#tyler-chat.tyler-open{opacity:1;transform:translateY(0) scale(1)}' +
    '.tyler-hd{' +
      'background:#1a1109;color:#f0ece6;' +
      'padding:14px 16px;display:flex;align-items:center;gap:11px;flex-shrink:0;' +
    '}' +
    '.tyler-avatar{' +
      'position:relative;width:38px;height:38px;border-radius:50%;' +
      'background:#c4602a;display:flex;align-items:center;justify-content:center;' +
      'flex-shrink:0;font-size:1.2rem;' +
    '}' +
    '.tyler-status-dot{' +
      'position:absolute;bottom:1px;right:1px;' +
      'width:10px;height:10px;border-radius:50%;' +
      'background:#22c55e;border:2px solid #1a1109;' +
    '}' +
    '.tyler-hd-text{flex:1;line-height:1.3}' +
    '.tyler-hd-name{display:block;font-size:0.95rem;font-weight:700;letter-spacing:0.01em}' +
    '.tyler-hd-sub{font-size:0.72rem;opacity:0.6;display:flex;align-items:center;gap:4px}' +
    '.tyler-hd-sub::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#22c55e;flex-shrink:0}' +
    '.tyler-hd-close{' +
      'background:none;border:none;color:#f0ece6;' +
      'font-size:1.4rem;cursor:pointer;padding:4px 6px;' +
      'opacity:0.55;line-height:1;border-radius:6px;' +
      'transition:opacity 0.15s,background 0.15s;' +
    '}' +
    '.tyler-hd-close:hover{opacity:1;background:rgba(255,255,255,0.1)}' +
    '.tyler-body{' +
      'padding:16px;overflow-y:auto;display:flex;' +
      'flex-direction:column;gap:10px;flex:1;scroll-behavior:smooth;' +
    '}' +
    '.tyler-msg{' +
      'font-size:0.875rem;line-height:1.6;' +
      'padding:10px 13px;border-radius:14px;max-width:92%;' +
      'animation:tyler-msgin 0.18s ease both;' +
    '}' +
    '@keyframes tyler-msgin{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}' +
    '.tyler-msg--bot{background:#f4f0eb;color:#1a1109;align-self:flex-start;border-bottom-left-radius:4px}' +
    '.tyler-msg--user{background:#c4602a;color:#fff;align-self:flex-end;border-bottom-right-radius:4px;text-align:right}' +
    '.tyler-typing{display:flex;align-items:center;gap:5px;padding:13px 15px}' +
    '.tyler-typing span{width:7px;height:7px;border-radius:50%;background:#c4602a;animation:tyler-bounce 1.1s infinite ease-in-out;opacity:0.7}' +
    '.tyler-typing span:nth-child(2){animation-delay:0.18s}' +
    '.tyler-typing span:nth-child(3){animation-delay:0.36s}' +
    '@keyframes tyler-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}' +
    '.tyler-qs{display:flex;flex-direction:column;gap:7px;margin-top:2px}' +
    '.tyler-q{' +
      'background:#fff;border:1.5px solid #e0d8d0;' +
      'border-radius:10px;padding:10px 13px;' +
      'font-size:0.83rem;font-family:Carlito,sans-serif;' +
      'text-align:left;cursor:pointer;color:#1a1109;' +
      'transition:border-color 0.15s,background 0.15s,transform 0.1s;line-height:1.4;' +
    '}' +
    '.tyler-q:hover{border-color:#c4602a;background:#fdf7f3;transform:translateX(2px)}' +

    /* custom question section */
    '.tyler-custom-toggle{' +
      'margin-top:4px;background:none;border:none;' +
      'color:#c4602a;font-size:0.8rem;font-family:Carlito,sans-serif;' +
      'cursor:pointer;text-align:left;padding:4px 2px;' +
      'display:flex;align-items:center;gap:5px;' +
      'transition:opacity 0.15s;text-decoration:underline;text-underline-offset:3px;' +
    '}' +
    '.tyler-custom-toggle:hover{opacity:0.75}' +
    '.tyler-custom-form{' +
      'display:none;flex-direction:column;gap:9px;' +
      'margin-top:2px;animation:tyler-msgin 0.18s ease both;' +
    '}' +
    '.tyler-custom-form.tyler-cf-open{display:flex}' +
    '.tyler-cf-textarea{' +
      'width:100%;box-sizing:border-box;' +
      'border:1.5px solid #e0d8d0;border-radius:10px;' +
      'padding:10px 12px;font-size:0.83rem;font-family:Carlito,sans-serif;' +
      'resize:none;outline:none;color:#1a1109;' +
      'transition:border-color 0.15s;min-height:72px;' +
    '}' +
    '.tyler-cf-textarea:focus{border-color:#c4602a}' +
    '.tyler-cf-input{' +
      'width:100%;box-sizing:border-box;' +
      'border:1.5px solid #e0d8d0;border-radius:10px;' +
      'padding:9px 12px;font-size:0.83rem;font-family:Carlito,sans-serif;' +
      'outline:none;color:#1a1109;' +
      'transition:border-color 0.15s;' +
    '}' +
    '.tyler-cf-input:focus{border-color:#c4602a}' +
    '.tyler-cf-hint{font-size:0.73rem;color:#888;padding:0 2px;line-height:1.4}' +
    '.tyler-cf-send{' +
      'padding:10px 14px;background:#c4602a;color:#fff;' +
      'border:none;border-radius:10px;' +
      'font-size:0.875rem;font-family:Carlito,sans-serif;' +
      'font-weight:700;cursor:pointer;width:100%;' +
      'transition:background 0.15s,transform 0.1s;' +
    '}' +
    '.tyler-cf-send:hover:not(:disabled){background:#a34d22;transform:translateY(-1px)}' +
    '.tyler-cf-send:disabled{opacity:0.55;cursor:not-allowed}' +
    '.tyler-cf-err{font-size:0.78rem;color:#c0392b;padding:0 2px}' +

    /* answer actions */
    '.tyler-actions{display:flex;flex-direction:column;gap:8px;margin-top:4px}' +
    '.tyler-cta-primary{' +
      'padding:11px 14px;background:#c4602a;color:#fff;' +
      'border:none;border-radius:10px;' +
      'font-size:0.875rem;font-family:Carlito,sans-serif;' +
      'font-weight:700;cursor:pointer;width:100%;' +
      'transition:background 0.15s,transform 0.1s;' +
    '}' +
    '.tyler-cta-primary:hover{background:#a34d22;transform:translateY(-1px)}' +
    '.tyler-cta-call{' +
      'padding:10px 14px;background:transparent;color:#1a1109;' +
      'border:1.5px solid #c4602a;border-radius:10px;' +
      'font-size:0.83rem;font-family:Carlito,sans-serif;' +
      'font-weight:600;cursor:pointer;width:100%;' +
      'transition:background 0.15s,color 0.15s;text-decoration:none;' +
      'display:flex;align-items:center;justify-content:center;gap:7px;' +
    '}' +
    '.tyler-cta-call:hover{background:#1a1109;color:#f0ece6}' +
    '.tyler-back{' +
      'background:#f4f0eb;border:none;color:#1a1109;' +
      'font-size:0.8rem;cursor:pointer;font-family:Carlito,sans-serif;' +
      'padding:9px 13px;border-radius:10px;width:100%;text-align:center;' +
      'transition:background 0.15s;display:flex;align-items:center;justify-content:center;gap:5px;' +
    '}' +
    '.tyler-back:hover{background:#e8e0d8}' +
    '.tyler-divider{height:1px;background:#f0ece6;margin:2px 0;flex-shrink:0}';

  /* ── Inject CSS ─────────────────────────────────────────────── */
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Load EmailJS on demand ─────────────────────────────────── */
  function loadEmailJS(callback) {
    if (window.emailjs) { return callback(); }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function () {
      try { emailjs.init({ publicKey: EJS_KEY }); } catch (e) {}
      callback();
    };
    s.onerror = function () { callback(); };
    document.head.appendChild(s);
  }

  /* ── Build UI ───────────────────────────────────────────────── */
  function buildUI() {
    var seen = false;
    try { seen = !!localStorage.getItem('tyler_seen'); } catch (e) {}

    var btn = document.createElement('button');
    btn.id = 'tyler-btn';
    btn.setAttribute('aria-label', 'Chat with Tyler');
    btn.innerHTML =
      (seen ? '' : '<div id="tyler-dot"></div>') +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="3" y="7" width="18" height="13" rx="2.5"/>' +
        '<circle cx="9" cy="13.5" r="1.8" fill="currentColor" stroke="none"/>' +
        '<circle cx="15" cy="13.5" r="1.8" fill="currentColor" stroke="none"/>' +
        '<path d="M9 17.5h6"/>' +
        '<line x1="12" y1="7" x2="12" y2="4"/>' +
        '<circle cx="12" cy="3.2" r="1.2" fill="currentColor" stroke="none"/>' +
        '<line x1="3" y1="12" x2="1.5" y2="12"/>' +
        '<line x1="21" y1="12" x2="22.5" y2="12"/>' +
      '</svg>';
    document.body.appendChild(btn);

    if (!seen) {
      var label = document.createElement('div');
      label.id = 'tyler-label';
      label.textContent = 'Questions? Ask Tyler';
      document.body.appendChild(label);
    }

    var chat = document.createElement('div');
    chat.id = 'tyler-chat';
    chat.setAttribute('role', 'dialog');
    chat.setAttribute('aria-label', 'Chat with Tyler');
    chat.innerHTML =
      '<div class="tyler-hd">' +
        '<div class="tyler-avatar">' +
          '🤖' +
          '<span class="tyler-status-dot"></span>' +
        '</div>' +
        '<div class="tyler-hd-text">' +
          '<span class="tyler-hd-name">Tyler</span>' +
          '<span class="tyler-hd-sub">Usually replies in minutes</span>' +
        '</div>' +
        '<button class="tyler-hd-close" id="tyler-close" aria-label="Close chat">✕</button>' +
      '</div>' +
      '<div class="tyler-divider"></div>' +
      '<div class="tyler-body" id="tyler-body"></div>';
    document.body.appendChild(chat);

    return { btn: btn, chat: chat };
  }

  /* ── Greeting + questions ───────────────────────────────────── */
  function buildGreeting(body) {
    var msg = document.createElement('div');
    msg.className = 'tyler-msg tyler-msg--bot';
    msg.textContent = 'Hi! I’m Tyler — happy to answer a quick question about Cornerstone Pro Painting. What would you like to know?';
    body.appendChild(msg);

    var qs = document.createElement('div');
    qs.className = 'tyler-qs';
    qs.id = 'tyler-qs';
    body.appendChild(qs);

    QUESTIONS.forEach(function (q) {
      var chip = document.createElement('button');
      chip.className = 'tyler-q';
      chip.textContent = q.text;
      chip.addEventListener('click', function () {
        logInquiry(q);
        showTypingThenAnswer(body, q);
      });
      qs.appendChild(chip);
    });

    // Custom question toggle
    var toggle = document.createElement('button');
    toggle.className = 'tyler-custom-toggle';
    toggle.innerHTML = '✏️ Don’t see your question? Ask us directly';
    body.appendChild(toggle);

    var form = buildCustomForm(body);
    body.appendChild(form);

    toggle.addEventListener('click', function () {
      var open = form.classList.contains('tyler-cf-open');
      form.classList.toggle('tyler-cf-open', !open);
      if (!open) {
        body.scrollTop = body.scrollHeight;
        form.querySelector('.tyler-cf-textarea').focus();
      }
    });
  }

  /* ── Custom question form ───────────────────────────────────── */
  function buildCustomForm(body) {
    var form = document.createElement('div');
    form.className = 'tyler-custom-form';

    var ta = document.createElement('textarea');
    ta.className = 'tyler-cf-textarea';
    ta.placeholder = 'What would you like to know?';
    ta.rows = 3;
    form.appendChild(ta);

    var nameInput = document.createElement('input');
    nameInput.className = 'tyler-cf-input';
    nameInput.type = 'text';
    nameInput.placeholder = 'Your name (optional)';
    form.appendChild(nameInput);

    var contactInput = document.createElement('input');
    contactInput.className = 'tyler-cf-input';
    contactInput.type = 'text';
    contactInput.placeholder = 'Phone or email so we can reply ★';
    form.appendChild(contactInput);

    var hint = document.createElement('div');
    hint.className = 'tyler-cf-hint';
    hint.textContent = 'We review every message and reply within a few hours.';
    form.appendChild(hint);

    var errEl = document.createElement('div');
    errEl.className = 'tyler-cf-err';
    errEl.style.display = 'none';
    form.appendChild(errEl);

    var sendBtn = document.createElement('button');
    sendBtn.className = 'tyler-cf-send';
    sendBtn.textContent = 'Send My Question →';
    form.appendChild(sendBtn);

    sendBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var question = ta.value.trim();
      var name = nameInput.value.trim();
      var contact = contactInput.value.trim();

      errEl.style.display = 'none';

      if (!question) {
        errEl.textContent = 'Please type your question first.';
        errEl.style.display = 'block';
        ta.focus();
        return;
      }
      if (!contact) {
        errEl.textContent = 'Please add a phone or email so we can get back to you.';
        errEl.style.display = 'block';
        contactInput.focus();
        return;
      }

      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending…';

      submitCustomQuestion(question, name, contact, function (ok) {
        // Replace the whole form area with a confirmation
        form.remove();
        var qs = document.getElementById('tyler-qs');
        if (qs) qs.remove();
        var toggle = body.querySelector('.tyler-custom-toggle');
        if (toggle) toggle.remove();

        var confirm = document.createElement('div');
        confirm.className = 'tyler-msg tyler-msg--bot';
        confirm.textContent = ok
          ? 'Got it! We’ll review your question and get back to you at ' + contact + ' — usually within a few hours. Thanks for reaching out!'
          : 'Thanks for your question! We’ll follow up with you at ' + contact + ' shortly.';
        body.appendChild(confirm);

        var actions = document.createElement('div');
        actions.className = 'tyler-actions';
        actions.style.marginTop = '8px';

        var ctaEstimate = document.createElement('button');
        ctaEstimate.className = 'tyler-cta-primary';
        ctaEstimate.textContent = 'Get a Free Estimate →';
        ctaEstimate.addEventListener('click', function (e) {
          e.stopPropagation();
          goToEstimate();
        });
        actions.appendChild(ctaEstimate);

        var ctaCall = document.createElement('a');
        ctaCall.className = 'tyler-cta-call';
        ctaCall.href = PHONE_HREF;
        ctaCall.innerHTML = phoneIcon() + 'Call ' + PHONE;
        actions.appendChild(ctaCall);

        body.appendChild(actions);
        body.scrollTop = body.scrollHeight;
      });
    });

    return form;
  }

  /* ── Submit custom question via EmailJS ─────────────────────── */
  function submitCustomQuestion(question, name, contact, callback) {
    // GA4 + localStorage
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'chatbot_custom_question', {
        event_category: 'tyler',
        question_text: question.substring(0, 150),
        contact: contact
      });
    }
    try {
      var log = JSON.parse(localStorage.getItem('tyler_log') || '[]');
      log.push({ type: 'custom', q: question, name: name, contact: contact, t: new Date().toISOString() });
      if (log.length > 200) log = log.slice(-200);
      localStorage.setItem('tyler_log', JSON.stringify(log));
    } catch (e) {}

    // EmailJS
    loadEmailJS(function () {
      if (!window.emailjs) { callback(false); return; }
      var params = {
        from_name:    name || 'Website Visitor',
        reply_to:     contact,
        phone:        contact,
        service_type: 'Tyler Chatbot Inquiry',
        message:      'Question from Tyler chatbot:\n\n' + question + '\n\nName: ' + (name || '—') + '\nContact: ' + contact
      };
      emailjs.send(EJS_SVC, EJS_TPL, params)
        .then(function () { callback(true); })
        .catch(function () { callback(false); });
    });
  }

  /* ── Typing animation → FAQ answer ─────────────────────────── */
  function showTypingThenAnswer(body, question) {
    var qs = document.getElementById('tyler-qs');
    if (qs) qs.remove();
    var toggle = body.querySelector('.tyler-custom-toggle');
    if (toggle) toggle.remove();
    var cf = body.querySelector('.tyler-custom-form');
    if (cf) cf.remove();

    var userMsg = document.createElement('div');
    userMsg.className = 'tyler-msg tyler-msg--user';
    userMsg.textContent = question.text;
    body.appendChild(userMsg);

    var typing = document.createElement('div');
    typing.className = 'tyler-msg tyler-msg--bot tyler-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    setTimeout(function () {
      typing.remove();

      var botMsg = document.createElement('div');
      botMsg.className = 'tyler-msg tyler-msg--bot';
      botMsg.textContent = question.answer;
      body.appendChild(botMsg);

      var actions = document.createElement('div');
      actions.className = 'tyler-actions';

      var ctaEstimate = document.createElement('button');
      ctaEstimate.className = 'tyler-cta-primary';
      ctaEstimate.textContent = 'Get a Free Estimate →';
      ctaEstimate.addEventListener('click', function (e) {
        e.stopPropagation();
        goToEstimate();
      });
      actions.appendChild(ctaEstimate);

      var ctaCall = document.createElement('a');
      ctaCall.className = 'tyler-cta-call';
      ctaCall.href = PHONE_HREF;
      ctaCall.innerHTML = phoneIcon() + 'Call ' + PHONE;
      actions.appendChild(ctaCall);

      var back = document.createElement('button');
      back.className = 'tyler-back';
      back.innerHTML = '← Ask another question';
      back.addEventListener('click', function () {
        body.innerHTML = '';
        buildGreeting(body);
        body.scrollTop = 0;
      });
      actions.appendChild(back);

      body.appendChild(actions);
      body.scrollTop = body.scrollHeight;
    }, 680);
  }

  /* ── Helpers ────────────────────────────────────────────────── */
  function goToEstimate() {
    closeChat();
    var onHome = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';
    if (onHome) {
      var contact = document.getElementById('contact');
      if (contact) { contact.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.location.href = '/#contact';
  }

  function phoneIcon() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42a2 2 0 0 1 1.98-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 5.72 5.72l.95-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  }

  function logInquiry(question) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'chatbot_question', {
        event_category: 'tyler',
        question_id: question.id,
        question_text: question.text
      });
    }
    try {
      var log = JSON.parse(localStorage.getItem('tyler_log') || '[]');
      log.push({ id: question.id, q: question.text, t: new Date().toISOString() });
      if (log.length > 200) log = log.slice(-200);
      localStorage.setItem('tyler_log', JSON.stringify(log));
    } catch (e) {}
  }

  /* ── Open / close ───────────────────────────────────────────── */
  var isOpen = false;

  function openChat(chat, dot, label) {
    chat.style.display = 'flex';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        chat.classList.add('tyler-open');
      });
    });
    if (dot) dot.style.display = 'none';
    if (label) label.style.display = 'none';
    isOpen = true;
    try { localStorage.setItem('tyler_seen', '1'); } catch (e) {}
  }

  function closeChat() {
    var chat = document.getElementById('tyler-chat');
    if (chat) {
      chat.classList.remove('tyler-open');
      setTimeout(function () { if (!isOpen) chat.style.display = 'none'; }, 240);
    }
    isOpen = false;
  }

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    var ui = buildUI();
    var body = document.getElementById('tyler-body');
    var dot = document.getElementById('tyler-dot');
    var label = document.getElementById('tyler-label');

    buildGreeting(body);

    ui.btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen) { closeChat(); } else { openChat(ui.chat, dot, label); }
    });

    document.getElementById('tyler-close').addEventListener('click', function (e) {
      e.stopPropagation();
      closeChat();
    });

    ui.chat.addEventListener('click', function (e) { e.stopPropagation(); });

    document.addEventListener('click', function (e) {
      if (isOpen && !ui.chat.contains(e.target) && e.target !== ui.btn && !ui.btn.contains(e.target)) {
        closeChat();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
