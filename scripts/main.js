(function(){
  const html = document.documentElement;
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

  // Language & RTL toggle
  const langToggle = document.getElementById('langToggle');
  const setLang = (lang) => {
    const dict = window.SELCOUTH_I18N?.[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    html.lang = lang === 'ar' ? 'ar' : 'en';
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
    if (langToggle) langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
  };
  const savedLang = localStorage.getItem('lang') || 'en';
  setLang(savedLang);
  if (langToggle) langToggle.addEventListener('click', ()=>{
    const next = html.lang === 'ar' ? 'en' : 'ar';
    setLang(next);
  });

  // Telegram link placeholder - update when you provide handle
  const TELEGRAM_URL = '#'; // e.g., 'https://t.me/yourChannelHandle'
  const telegramEls = [document.getElementById('telegramLink'), document.getElementById('footerTelegram')].filter(Boolean);
  telegramEls.forEach(a => { a.href = TELEGRAM_URL; });

  // Search filter for topic cards
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
})();
