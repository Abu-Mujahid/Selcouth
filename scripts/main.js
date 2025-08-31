(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Compute a stable site base (works on root, topics, subpages, custom domain, or GitHub Pages project URL)
  const scriptEl = document.currentScript;
  let SITE_BASE = '';
  if (scriptEl && scriptEl.src) {
    // e.g., https://abu-mujahid.github.io/Selcouth/scripts/main.js -> https://abu-mujahid.github.io/Selcouth/
    SITE_BASE = scriptEl.src.split('/scripts/')[0] + '/';
  } else {
    // Fallback: try to infer from favicon <link>; else root
    const iconHref = document.querySelector('link[rel="icon"]')?.href || '/';
    SITE_BASE = iconHref.replace(/assets\/.*$/,'');
  }
  const TG_ICON_URL = SITE_BASE + 'assets/telegram.png';

  // Inline SVG icons for theme toggle
  const sunSVG = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
      <g stroke="currentColor" stroke-linecap="round" stroke-width="1.8">
        <path d="M12 2v2.6M12 19.4V22M4.6 12H2M22 12h-2.6M5.76 5.76 4 4M20 20l-1.76-1.76M18.24 5.76 20 4M4 20l1.76-1.76"/>
      </g>
    </svg>`;
  const moonSVG = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.7 14.5A8.7 8.7 0 0 1 9.5 3.3 8.7 8.7 0 1 0 20.7 14.5Z" stroke="currentColor" stroke-width="1.8" />
    </svg>`;

  // Theme toggle with icon
  const themeToggle = document.getElementById('themeToggle');
  function renderThemeButton(mode){
    if (!themeToggle) return;
    themeToggle.classList.add('icon-btn');
    const icon = mode === 'light' ? sunSVG : moonSVG;
    const sr = `<span class="sr-only">Toggle theme</span>`;
    themeToggle.innerHTML = sr + icon;
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.setAttribute('title', 'Toggle theme');
  }
  function applyTheme(mode){
    if (mode === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
    localStorage.setItem('theme', mode);
    renderThemeButton(mode);
  }
  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);
  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
      applyTheme(next);
    });
  }

  // Telegram links (private invite)
  const TELEGRAM_URL = 'https://t.me/+IQ-KS8czLp4wMGVl';
  document.querySelectorAll('#telegramLink,#footerTelegram').forEach(a => a && (a.href = TELEGRAM_URL));

  // Make header Telegram button icon-only using a robust PNG path
  const headerTg = document.getElementById('telegramLink');
  if (headerTg){
    headerTg.classList.add('icon-btn'); // keeps .btn.primary styles
    headerTg.setAttribute('aria-label', 'Open Telegram channel');
    headerTg.setAttribute('title', 'Open Telegram channel');
    headerTg.innerHTML = `<span class="sr-only">Open Telegram channel</span><img src="${TG_ICON_URL}" alt="" />`;
  }

  // Centralize CONTACT email across all pages
  const CONTACT_EMAIL = 'ravencorp.tech@gmail.com';
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.href = 'mailto:' + CONTACT_EMAIL;
    if (a.textContent.trim().toLowerCase() === 'contact') {
      a.setAttribute('aria-label', 'Email ' + CONTACT_EMAIL);
      a.title = 'Email ' + CONTACT_EMAIL;
    }
  });

  // Simple search filter for topic cards (homepage)
  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', (e)=>{
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.topic-card').forEach(card=>{
        const text = (card.innerText + ' ' + (card.getAttribute('data-tags')||'')).toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Reading progress bar
  const progress = document.getElementById('readProgress');
  if (progress) {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight || 1);
      progress.style.transform = `scaleX(${Math.min(1,Math.max(0,scrolled))})`;
    };
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Topic page helpers: reading time + curator credit + Telegram embed placeholder
  const main = document.querySelector('main.article');
  if (main) {
    const rt = document.getElementById('readingTime');
    if (rt) {
      const wordsPerMinute = 225;
      const text = main.innerText || '';
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / wordsPerMinute));
      rt.textContent = minutes + ' min read';
    }
    const CURATOR_NAME = 'Umm Ḥanẓalah';
    const meta = document.querySelector('.article-header .meta');
    if (meta && !meta.querySelector('.curator')) {
      const sep = document.createElement('span');
      sep.textContent = ' • ';
      const curator = document.createElement('span');
      curator.className = 'curator';
      curator.textContent = `Curated by ${CURATOR_NAME}`;
      meta.appendChild(sep);
      meta.appendChild(curator);
    }
    const containers = document.querySelectorAll('.tg-embeds[data-post-ids]');
    containers.forEach(container => {
      const help = document.createElement('div');
      help.className = 'helper';
      help.innerHTML = 'Telegram embeds will appear here if the channel becomes public. For now, use the Telegram link above.';
      container.appendChild(help);
    });
  }

  // Reveal-on-scroll animations (include .post-item)
  const revealEls = document.querySelectorAll(
    '.topic-card, .post-item, .cta-group .btn, .hero .intro p, .about, .article .key-takeaways, .article .content, .article .sources'
  );
  if ('IntersectionObserver' in window && revealEls.length){
    const obs = new IntersectionObserver((entries, o)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          o.unobserve(entry.target);
        }
      });
    }, {rootMargin: '0px 0px -10% 0px', threshold: 0.1});
    revealEls.forEach(el=>{
      el.classList.add('reveal');
      obs.observe(el);
    });
  } else {
    revealEls.forEach(el=>el.classList.add('is-visible'));
  }

  // -------- Site-wide Image Lightbox (auto-applied) --------
  (function initGlobalLightbox(){
    // Exclude small UI images, logos, header icons, and opted-out images.
    function isExcluded(img){
      if (!img || img.nodeName !== 'IMG') return true;
      if (img.classList.contains('logo')) return true;
      if (img.closest('.brand')) return true;           // wordmark/logo in header
      if (img.closest('.btn')) return true;             // icons inside buttons
      if (img.classList.contains('no-lightbox') || img.hasAttribute('data-no-lightbox')) return true;
      const w = img.naturalWidth || img.width || 0;
      const h = img.naturalHeight || img.height || 0;
      if (w && h && (w < 32 && h < 32)) return true;    // tiny icons
      return false;
    }

    function collectImages(){
      // Focus on main content areas
      const candidates = Array.from(document.querySelectorAll('main img, .article img, figure img, .content img, .post-list img'));
      return candidates.filter(img => !isExcluded(img));
    }

    let overlay, imgEl, btnClose, currentEl = null;

    function ensureOverlay(){
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <img class="lightbox-img" alt="" />
      `;
      document.body.appendChild(overlay);
      imgEl = overlay.querySelector('.lightbox-img');
      btnClose = overlay.querySelector('.lightbox-close');

      function close(){
        overlay.classList.remove('is-open');
        document.body.classList.remove('lightbox-open');
        imgEl.src = '';
        currentEl = null;
      }

      function onKey(e){
        if (!overlay.classList.contains('is-open')) return;
        if (e.key === 'Escape') return close();
        const imgs = collectImages();
        if (!imgs.length || !currentEl) return;
        let idx = imgs.indexOf(currentEl);
        if (e.key === 'ArrowRight'){
          idx = (idx + 1) % imgs.length;
          open(imgs[idx]);
        } else if (e.key === 'ArrowLeft'){
          idx = (idx - 1 + imgs.length) % imgs.length;
          open(imgs[idx]);
        }
      }

      overlay.addEventListener('click', (e)=>{ if (e.target === overlay) close(); });
      imgEl.addEventListener('click', (e)=> e.stopPropagation());
      btnClose.addEventListener('click', close);
      document.addEventListener('keydown', onKey);

      // expose close for ensureOverlay scope
      ensureOverlay._close = close;
    }

    function open(target){
      ensureOverlay();
      currentEl = target;
      const src = target.getAttribute('data-fullsrc') || target.currentSrc || target.src;
      imgEl.src = src;
      imgEl.alt = target.alt || '';
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-open');
    }

    function applyTo(imgs){
      imgs.forEach(img=>{
        if (img.dataset.lbApplied) return;
        img.dataset.lbApplied = '1';
        img.classList.add('lightboxable');
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e)=>{
          e.preventDefault();
          e.stopPropagation();
          open(img);
        });
      });
    }

    // Initial pass
    applyTo(collectImages());

    // Handle images added later
    const mo = new MutationObserver(() => {
      applyTo(collectImages());
    });
    mo.observe(document.body, {childList:true, subtree:true});
  })();

})();
