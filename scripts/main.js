(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Inline SVG icons
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
  const telegramSVG = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.7 4.3c.3-.23.3-.23.3-.23s.26-.2.02-.39c-.23-.18-.6-.1-.6-.1S3.9 10.1 2.28 10.8c-.26.12-.4.2-.5.34-.27.36.24.54.24.54l4.43 1.4s.17.03.24-.02c.6-.42 9.32-5.9 9.32-5.9.14-.1.26-.05.16.06-1.24 1.3-7.37 7.12-7.93 7.67-.1.1-.08.2-.08.2l-.33 4.6s-.18 1.4 1.22 0c.99-.96 1.94-1.78 2.46-2.22 1.61-1.32 3.22-2.62 4.85-3.94 3.06-2.48 4.86-4 4.86-4s.4-.33.48-.64c.08-.34-.23-.52-.23-.52l-7.9-3s-.38-.16.08-.36c2.49-1.1 5.68-2.5 7.31-3.22Z" fill="currentColor"/>
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

  // Make header Telegram button icon-only (accessible)
  const headerTg = document.getElementById('telegramLink');
  if (headerTg){
    headerTg.classList.add('icon-btn'); // keeps primary styling from HTML
    headerTg.setAttribute('aria-label', 'Open Telegram channel');
    headerTg.setAttribute('title', 'Open Telegram channel');
    headerTg.innerHTML = `<span class="sr-only">Open Telegram channel</span>${telegramSVG}`;
  }

  // If later you want the footer as an icon too, uncomment:
  /*
  const footerTg = document.getElementById('footerTelegram');
  if (footerTg){
    footerTg.classList.add('btn','primary','icon-btn');
    footerTg.setAttribute('aria-label','Open Telegram channel');
    footerTg.setAttribute('title','Open Telegram channel');
    footerTg.innerHTML = `<span class="sr-only">Open Telegram channel</span>${telegramSVG}`;
  }
  */

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
    // Reading time
    const rt = document.getElementById('readingTime');
    if (rt) {
      const wordsPerMinute = 225;
      const text = main.innerText || '';
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / wordsPerMinute));
      rt.textContent = minutes + ' min read';
    }
    // Curator credit
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
    // Telegram embeds helper (private channel)
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
    revealEls.forEach(el=>{
      el.classList.add('reveal');
      obs.observe(el);
    });
  } else {
    revealEls.forEach(el=>el.classList.add('is-visible'));
  }
})();
