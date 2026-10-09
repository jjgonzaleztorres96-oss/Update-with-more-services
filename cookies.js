(function () {
  var CONSENT_KEY = 'csp_cookie_consent';
  var GA_ID = 'G-VFBX6106FN';

  function loadGA() {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    s.async = true;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // Already consented — load GA silently
  if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
    loadGA();
    return;
  }

  // Already declined — do nothing
  if (localStorage.getItem(CONSENT_KEY) === 'declined') return;

  // First visit — show banner
  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="ck-inner">' +
        '<div class="ck-text">' +
          '<strong>We use cookies</strong>' +
          '<p>We use analytics cookies to understand how visitors use our site so we can keep improving it. No personal data is sold or shared.</p>' +
        '</div>' +
        '<div class="ck-actions">' +
          '<button id="ck-decline">Decline</button>' +
          '<button id="ck-accept">Accept</button>' +
        '</div>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent =
      '#cookie-banner{' +
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
        'background:#1a1109;color:#f0ece6;' +
        'border-top:2px solid #c4602a;' +
        'font-family:Carlito,sans-serif;font-size:0.92rem;line-height:1.5;' +
        'animation:ck-slide-up 0.35s ease;' +
      '}' +
      '@keyframes ck-slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
      '.ck-inner{' +
        'max-width:1200px;margin:0 auto;padding:16px 24px;' +
        'display:flex;align-items:center;gap:24px;flex-wrap:wrap;' +
      '}' +
      '.ck-text{flex:1;min-width:220px}' +
      '.ck-text strong{display:block;margin-bottom:3px;font-size:0.95rem}' +
      '.ck-text p{margin:0;opacity:0.82;font-size:0.86rem}' +
      '.ck-actions{display:flex;gap:10px;flex-shrink:0}' +
      '#ck-decline,#ck-accept{' +
        'padding:9px 22px;border-radius:5px;font-size:0.88rem;' +
        'font-weight:600;cursor:pointer;border:none;font-family:inherit;' +
        'transition:opacity 0.18s;' +
      '}' +
      '#ck-decline{background:transparent;color:#f0ece6;border:1.5px solid rgba(240,236,230,0.35)}' +
      '#ck-decline:hover{border-color:#f0ece6}' +
      '#ck-accept{background:#c4602a;color:#fff}' +
      '#ck-accept:hover{background:#a34d22}' +
      '@media(max-width:600px){' +
        '.ck-inner{flex-direction:column;align-items:stretch;gap:14px}' +
        '.ck-actions{justify-content:flex-end}' +
      '}';

    document.head.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById('ck-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      loadGA();
      dismiss();
    });

    document.getElementById('ck-decline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      dismiss();
    });

    function dismiss() {
      banner.style.transition = 'transform 0.3s ease';
      banner.style.transform = 'translateY(100%)';
      setTimeout(function () { banner.remove(); }, 310);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
