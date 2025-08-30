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
  const TELEGRAM_URL = 'https://t.me/+IQ-KS8czLp4wMGVl'; // invite link (private channel)
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

  // Topic page helpers: reading time + author credit + Telegram embeds placeholder
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

    // Curator credit (auto-append to the meta line)
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

    // Telegram embeds
    // Note: Embeds require a PUBLIC channel handle; your channel is private, so we show a helper.
    const containers = document.querySelectorAll('.tg-embeds[data-post-ids]');
    containers.forEach(container => {
      const help = document.createElement('div');
      help.className = 'helper';
      help.innerHTML = 'Telegram embeds will appear here if the channel becomes public. For now, use the Telegram link above.';
      container.appendChild(help);
    });
  }
})();
