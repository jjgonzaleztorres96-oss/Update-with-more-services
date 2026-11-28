(function () {
  'use strict';

  var QUESTIONS = [
    {
      id: 'location',
      text: 'Where are you located?',
      answer: 'We’re based in North York but we work all over the GTA — Toronto, Richmond Hill, Vaughan, Markham, Aurora, and surrounding areas.'
    },
    {
      id: 'products',
      text: 'What products do you use?',
      answer: 'We use Benjamin Moore and Sherwin Williams. Both are professional-grade products that give you even coverage and a finish that lasts.'
    },
    {
      id: 'timeline',
      text: 'How long does a typical project take?',
      answer: 'Most interior jobs take 1–3 days. A single room is usually done in a day, a full condo takes 2 days, and a whole house is typically 3–5 days depending on size. We include a specific timeline in every estimate.'
    },
    {
      id: 'estimate',
      text: 'Do you offer free estimates?',
      answer: 'Yes — completely free, no obligation. Fill out our quick form and we’ll send you a written estimate within 12 hours.'
    },
    {
      id: 'services',
      text: 'What type of painting do you do?',
      answer: 'Interior, exterior, condo, cabinet, and commercial painting across Toronto and the GTA.'
    }
  ];

  /* ── CSS ───────────────────────────────────────────────── */
  var css =
    '#tyler-btn{' +
      'position:fixed;bottom:92px;right:28px;' +
      'width:52px;height:52px;border-radius:50%;' +
      'background:#1a1109;border:2px solid #c4602a;' +
      'color:#f0ece6;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.35);' +
      'z-index:149;transition:transform 0.2s,background 0.2s;' +
      'padding:0;' +
    '}' +
    '#tyler-btn:hover{background:#c4602a;transform:scale(1.08)}' +
    '#tyler-btn svg{width:26px;height:26px}' +
    /* notification dot */
    '#tyler-dot{' +
      'position:absolute;top:2px;right:2px;' +
      'width:10px;height:10px;border-radius:50%;' +
      'background:#c4602a;border:2px solid #fff;' +
      'animation:tyler-pulse 2s infinite;' +
    '}' +
    '@keyframes tyler-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.7}}' +
    /* chat panel */
    '#tyler-chat{' +
      'position:fixed;bottom:160px;right:16px;' +
      'width:min(310px,calc(100vw - 32px));' +
      'background:#fff;border-radius:16px;' +
      'box-shadow:0 8px 40px rgba(0,0,0,0.18);' +
      'z-index:200;display:none;flex-direction:column;' +
      'overflow:hidden;font-family:Carlito,sans-serif;' +
      'max-height:min(480px,calc(100vh - 180px));' +
    '}' +
    '#tyler-chat.tyler-open{display:flex}' +
    '.tyler-hd{' +
      'background:#1a1109;color:#f0ece6;' +
      'padding:14px 16px;display:flex;align-items:center;gap:10px;' +
      'flex-shrink:0;' +
    '}' +
    '.tyler-avatar{' +
      'width:34px;height:34px;border-radius:50%;' +
      'background:#c4602a;display:flex;align-items:center;justify-content:center;' +
      'flex-shrink:0;font-size:1.1rem;' +
    '}' +
    '.tyler-hd-text{flex:1;line-height:1.3}' +
    '.tyler-hd-text strong{display:block;font-size:0.95rem}' +
    '.tyler-hd-text span{font-size:0.75rem;opacity:0.65}' +
    '.tyler-hd-close{' +
      'background:none;border:none;color:#f0ece6;' +
      'font-size:1.3rem;cursor:pointer;padding:2px 4px;' +
      'opacity:0.7;line-height:1;' +
    '}' +
    '.tyler-hd-close:hover{opacity:1}' +
    '.tyler-body{' +
      'padding:16px;overflow-y:auto;display:flex;' +
      'flex-direction:column;gap:10px;flex:1;' +
    '}' +
    '.tyler-msg{' +
      'font-size:0.875rem;line-height:1.55;' +
      'padding:10px 13px;border-radius:12px;max-width:92%;' +
    '}' +
    '.tyler-msg--bot{' +
      'background:#f4f0eb;color:#1a1109;align-self:flex-start;' +
      'border-bottom-left-radius:4px;' +
    '}' +
    '.tyler-msg--user{' +
      'background:#c4602a;color:#fff;align-self:flex-end;' +
      'border-bottom-right-radius:4px;text-align:right;' +
    '}' +
    '.tyler-qs{display:flex;flex-direction:column;gap:7px;margin-top:4px}' +
    '.tyler-q{' +
      'background:#fff;border:1.5px solid #e0d8d0;' +
      'border-radius:8px;padding:9px 12px;' +
      'font-size:0.82rem;font-family:Carlito,sans-serif;' +
      'text-align:left;cursor:pointer;color:#1a1109;' +
      'transition:border-color 0.15s,background 0.15s;line-height:1.4;' +
    '}' +
    '.tyler-q:hover{border-color:#c4602a;background:#fdf7f3}' +
    '.tyler-cta{' +
      'margin-top:4px;padding:10px 14px;' +
      'background:#c4602a;color:#fff;' +
      'border:none;border-radius:8px;' +
      'font-size:0.85rem;font-family:Carlito,sans-serif;' +
      'font-weight:700;cursor:pointer;width:100%;' +
      'transition:background 0.15s;' +
    '}' +
    '.tyler-cta:hover{background:#a34d22}' +
    '.tyler-reset{' +
      'background:none;border:none;color:#c4602a;' +
      'font-size:0.78rem;cursor:pointer;text-align:center;' +
      'font-family:Carlito,sans-serif;padding:4px;' +
    '}' +
    '.tyler-reset:hover{text-decoration:underline}';

  /* ── Inject CSS ─────────────────────────────────────────── */
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Build HTML ─────────────────────────────────────────── */
  function buildUI() {
    // Button
    var btn = document.createElement('button');
    btn.id = 'tyler-btn';
    btn.setAttribute('aria-label', 'Chat with Tyler');
    btn.innerHTML =
      '<div id="tyler-dot"></div>' +
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

    // Chat panel
    var chat = document.createElement('div');
    chat.id = 'tyler-chat';
    chat.setAttribute('role', 'dialog');
    chat.setAttribute('aria-label', 'Chat with Tyler');
    chat.innerHTML =
      '<div class="tyler-hd">' +
        '<div class="tyler-avatar">🤖</div>' +
        '<div class="tyler-hd-text"><strong>Tyler</strong><span>Cornerstone Assistant</span></div>' +
        '<button class="tyler-hd-close" id="tyler-close" aria-label="Close chat">×</button>' +
      '</div>' +
      '<div class="tyler-body" id="tyler-body">' +
        '<div class="tyler-msg tyler-msg--bot">Hi, I’m Tyler! I can answer a few quick questions about Cornerstone Pro Painting. What would you like to know?</div>' +
        '<div class="tyler-qs" id="tyler-qs"></div>' +
      '</div>';
    document.body.appendChild(chat);

    return { btn: btn, chat: chat };
  }

  /* ── Log inquiry ────────────────────────────────────────── */
  function logInquiry(question) {
    // GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'chatbot_question', {
        event_category: 'tyler',
        question_id: question.id,
        question_text: question.text
      });
    }
    // localStorage backup
    try {
      var log = JSON.parse(localStorage.getItem('tyler_log') || '[]');
      log.push({ id: question.id, q: question.text, t: new Date().toISOString() });
      if (log.length > 200) log = log.slice(-200);
      localStorage.setItem('tyler_log', JSON.stringify(log));
    } catch (e) {}
  }

  /* ── Show answer ────────────────────────────────────────── */
  function showAnswer(body, question) {
    var qs = document.getElementById('tyler-qs');
    if (qs) qs.remove();

    // User bubble
    var userMsg = document.createElement('div');
    userMsg.className = 'tyler-msg tyler-msg--user';
    userMsg.textContent = question.text;
    body.appendChild(userMsg);

    // Bot answer
    var botMsg = document.createElement('div');
    botMsg.className = 'tyler-msg tyler-msg--bot';
    botMsg.textContent = question.answer;
    body.appendChild(botMsg);

    // CTA
    var cta = document.createElement('button');
    cta.className = 'tyler-cta';
    cta.textContent = 'Get a Free Estimate →';
    cta.addEventListener('click', function () {
      var openBtn = document.getElementById('open-estimate');
      if (openBtn) {
        openBtn.click();
        closeChat();
      } else {
        window.location.href = '/#contact';
      }
    });
    body.appendChild(cta);

    // Ask another
    var reset = document.createElement('button');
    reset.className = 'tyler-reset';
    reset.textContent = 'Ask another question';
    reset.addEventListener('click', function () {
      resetChat(body);
    });
    body.appendChild(reset);

    body.scrollTop = body.scrollHeight;
  }

  /* ── Reset chat ─────────────────────────────────────────── */
  function resetChat(body) {
    body.innerHTML =
      '<div class="tyler-msg tyler-msg--bot">Hi, I’m Tyler! I can answer a few quick questions about Cornerstone Pro Painting. What would you like to know?</div>' +
      '<div class="tyler-qs" id="tyler-qs"></div>';
    buildQuestions(body);
  }

  /* ── Build question buttons ─────────────────────────────── */
  function buildQuestions(body) {
    var qs = document.getElementById('tyler-qs');
    if (!qs) return;
    QUESTIONS.forEach(function (q) {
      var btn = document.createElement('button');
      btn.className = 'tyler-q';
      btn.textContent = q.text;
      btn.addEventListener('click', function () {
        logInquiry(q);
        showAnswer(body, q);
      });
      qs.appendChild(btn);
    });
  }

  /* ── Open / close ───────────────────────────────────────── */
  var isOpen = false;

  function openChat(chat, dot) {
    chat.classList.add('tyler-open');
    if (dot) dot.style.display = 'none';
    isOpen = true;
  }

  function closeChat() {
    var chat = document.getElementById('tyler-chat');
    if (chat) chat.classList.remove('tyler-open');
    isOpen = false;
  }

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    var ui = buildUI();
    var body = document.getElementById('tyler-body');
    var dot = document.getElementById('tyler-dot');

    buildQuestions(body);

    ui.btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen) {
        closeChat();
      } else {
        openChat(ui.chat, dot);
      }
    });

    document.getElementById('tyler-close').addEventListener('click', function (e) {
      e.stopPropagation();
      closeChat();
    });

    // Stop any click inside the panel from reaching the document handler
    ui.chat.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    // Close on outside click
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
