(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

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

  // Telegram links (private channel invite)
  const TELEGRAM_URL = 'https://t.me/+IQ-KS8czLp4wMGVl';
  document.querySelectorAll('#telegramLink,#footerTelegram').forEach(a => a && (a.href = TELEGRAM_URL));

  // Make header Telegram button icon-only using PNG at assets/telegram.png
  const headerTg = document.getElementById('telegramLink');
  if (headerTg){
    headerTg.classList.add('icon-btn'); // keeps .btn.primary styles from HTML
    headerTg.setAttribute('aria-label', 'Open Telegram channel');
    headerTg.setAttribute('title', 'Open Telegram channel');
    headerTg.innerHTML = `<span class="sr-only">Open Telegram channel</span><img src="assets/telegram.png" alt="" />`;
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

  // Reveal-on-scroll animations
  const revealEls = document.querySelectorAll(
    '.topic-card, .cta-group .btn, .hero .intro p, .about, .article .key-takeaways, .article .content, .article .sources'
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
    revealEls.forEach(el=>{ el.classList.add('reveal'); obs.observe(el); });
  } else {
    revealEls.forEach(el=>el.classList.add('is-visible'));
  }
})();
