(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const applyTheme = (mode) => {
    if (mode === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
    localStorage.setItem('theme', mode);
    if (themeToggle) themeToggle.textContent = mode === 'light' ? 'Dark' : 'Light';
  };
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
  });

  // Telegram links
  const TELEGRAM_URL = 'https://t.me/+IQ-KS8czLp4wMGVl';
  document.querySelectorAll('#telegramLink,#footerTelegram').forEach(a => a && (a.href = TELEGRAM_URL));

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

  // Topic page helpers: reading time + Telegram embeds
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

    // Telegram embeds
    // IMPORTANT: For embeds to work, you need a PUBLIC channel handle like 'Selcouth'.
    // Then add data-post-ids="123,124" to .tg-embeds and set TELEGRAM_HANDLE below.
    const TELEGRAM_HANDLE = ''; // e.g., 'Selcouth' (no @). Leave empty for private/invite-only channels.
    const containers = document.querySelectorAll('.tg-embeds[data-post-ids]');
    containers.forEach(container => {
      const ids = (container.getAttribute('data-post-ids') || '').split(',').map(s => s.trim()).filter(Boolean);
      if (!TELEGRAM_HANDLE || ids.length === 0) {
        const help = document.createElement('div');
        help.className = 'helper';
        help.innerHTML = 'Telegram embeds will appear here once a public channel handle and post IDs are provided.';
        container.appendChild(help);
        return;
      }
      ids.forEach(id => {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://telegram.org/js/telegram-widget.js?22';
        s.setAttribute('data-telegram-post', `${TELEGRAM_HANDLE}/${id}`);
        s.setAttribute('data-width', '100%');
        container.appendChild(s);
      });
    });
  }
})();
