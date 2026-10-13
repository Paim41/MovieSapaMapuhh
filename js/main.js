/* MovieSapaMapuh marketing landing page — standalone presentation only.
   All mock dashboard interactions are local to the page; no app API is called. */
(() => {
  'use strict';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const touch = window.matchMedia('(pointer: coarse)');
  const menu = $('#menuToggle');
  const nav = $('#primaryNav');
  const spotlight = $('#spotlight');
  const toast = $('#toast');
  let toastTimeout;
  function announce(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
  }
  function closeMenu() {
    if (!menu || !nav) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    const use = $('use', menu);
    if (use) use.setAttribute('href', '#i-menu');
  }
  menu?.addEventListener('click', () => {
    const shouldOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', shouldOpen);
    menu.setAttribute('aria-expanded', String(shouldOpen));
    menu.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');
    $('use', menu)?.setAttribute('href', shouldOpen ? '#i-close' : '#i-menu');
  });
  $$('#primaryNav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (nav?.classList.contains('open') && !e.target.closest('.nav-shell')) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
  // Modest cursor-reactive spotlight on devices that actually have a pointer.
  if (spotlight && !reducedMotion.matches && !touch.matches) {
    let raf = 0;
    window.addEventListener('pointermove', e => {
      if (raf) return;
      const x = e.clientX, y = e.clientY;
      raf = requestAnimationFrame(() => {
        spotlight.style.setProperty('--mx', `${x}px`);
        spotlight.style.setProperty('--my', `${y}px`);
        raf = 0;
      });
    }, {passive:true});
  } else if (spotlight) spotlight.hidden = true;
  // Reveal enters once; fully visible without IntersectionObserver.
  const elements = $$('.section-intro, .feature-card, .step-card, .download-banner, .character-stage, .character-text, .experience-grid');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    elements.forEach(el => el.setAttribute('data-reveal', ''));
    const obs = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    }), {threshold: .08, rootMargin: '0px 0px -20px 0px'});
    elements.forEach(el => obs.observe(el));
  }
  const sectionIds = ['experience','features','how-it-works','faq'];
  if ('IntersectionObserver' in window) {
    const activeSections = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      $$('#primaryNav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }), {rootMargin:'-30% 0px -60% 0px'});
    sectionIds.map(id => document.getElementById(id)).filter(Boolean).forEach(el => activeSections.observe(el));
  }
  const content = {
    home: {title:'Everything starts<br>from Home.',description:'A home for movie and series catalogs, curated by your connected sources and the app’s existing catalog controls.', label:'EXPLORE MODE'},
    search:{title:'Search your<br>available sources.',description:'Look for media through existing source and catalog search functions. This page only filters illustrative category labels.',label:'DISCOVERY MODE'},
    library:{title:'Your library,<br>your filters.',description:'Navigate Library and its categories. What appears in the real app depends on your available sources and actual library state.',label:'ORGANIZE MODE'},
    addons:{title:'Connect the<br>ecosystem.',description:'Configure Stremio/Nuvio-compatible addons and movie, series and Telegram file catalog settings in the real application.',label:'INTEGRATION MODE'},
    settings:{title:'Keep control<br>close by.',description:'Access Bot Pool, server settings, credentials, optional tunnel configuration and Developer Credits.',label:'CONFIGURATION MODE'}
  };
  const demoTabs = $$('.demo-tab');
  function setTab(id, focus = false) {
    if (!content[id]) return;
    demoTabs.forEach(tab => {
      const selected = tab.dataset.tab === id;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    $$('.demo-panel').forEach(panel => {
      const selected = panel.id === `panel-${id}`;
      panel.hidden = !selected;
      panel.classList.toggle('active', selected);
    });
    $('#experienceTitle').innerHTML = content[id].title;
    $('#experienceDescription').textContent = content[id].description;
    $('.shouting-label').textContent = content[id].label;
    $('.showcase-number').innerHTML = `${String(Object.keys(content).indexOf(id) + 1).padStart(2,'0')} <span>/05</span>`;
  }
  demoTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setTab(tab.dataset.tab));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      let next = index;
      if (e.key === 'ArrowRight') next = (index + 1) % demoTabs.length;
      if (e.key === 'ArrowLeft') next = (index - 1 + demoTabs.length) % demoTabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = demoTabs.length - 1;
      setTab(demoTabs[next].dataset.tab, true);
    });
  });
  const sampleCategories = [
    {name:'Movies',desc:'Catalog type'},
    {name:'Series',desc:'Catalog type'},
    {name:'Telegram Files',desc:'Catalog type'},
    {name:'Stremio / Nuvio',desc:'Addon setup'},
    {name:'Bot Pool',desc:'Server settings'}
  ];
  function renderSearch(query = '') {
    const parent = $('#demoSearchResults');
    if (!parent) return;
    const filter = query.trim().toLocaleLowerCase();
    const matches = sampleCategories.filter(item => `${item.name} ${item.desc}`.toLocaleLowerCase().includes(filter));
    parent.replaceChildren();
    if (!matches.length) {
      const el = document.createElement('div');
      el.className = 'search-empty';
      el.textContent = 'No matching demo categories. Try “movies”, “series”, or “bot”.';
      parent.append(el);
      return;
    }
    for (const item of matches) {
      const row = document.createElement('div');
      row.className = 'search-result';
      const label = document.createElement('span'); label.textContent = item.name;
      const desc = document.createElement('small'); desc.textContent = item.desc;
      row.append(label,desc);
      parent.append(row);
    }
  }
  renderSearch();
  $('#demoSearch')?.addEventListener('input', e => renderSearch(e.target.value));
  $$('.demo-poster').forEach(p => p.addEventListener('click', () => {
    const category = p.dataset.category;
    setTab('search');
    const input = $('#demoSearch');
    if (input) {input.value = category; renderSearch(category); input.focus();}
  }));
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !e.altKey && !e.ctrlKey && !e.metaKey && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '') && $('#experience')?.getBoundingClientRect().top < innerHeight) {
      e.preventDefault();setTab('search');$('#demoSearch')?.focus();
    }
  });
  const libraryMessages = {
    all:['Your library starts here.','Connect sources and browse your available catalog items.'],
    movies:['Movie library filter','This is a UI preview; actual movie items appear in your app.'],
    series:['Series library filter','Your configured series sources determine real results.'],
    files:['Telegram file filter','The real library depends on connected Telegram file sources.']
  };
  $$('.chip[data-filter]').forEach(button => button.addEventListener('click', () => {
    $$('.chip[data-filter]').forEach(el => el.classList.toggle('selected', el === button));
    const msg = libraryMessages[button.dataset.filter];
    $('#libraryStateTitle').textContent = msg[0];
    $('#libraryStateMessage').textContent = msg[1];
  }));
  $('#copyLocal')?.addEventListener('click', async () => {
    const text = $('#copyLocal').dataset.copy;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const area = document.createElement('textarea');
        area.value=text;area.style.position='fixed';area.style.top='-1000px';document.body.append(area);area.select();
        if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
        area.remove();
      }
      announce('Copied local server address.');
    } catch {
      announce('Copy unavailable here. Address: http://127.0.0.1:8088');
    }
  });
  const sprite = $('.sprite-stack');
  const walkButton = $('#toggleWalk');
  let paused = reducedMotion.matches;
  function syncWalk() {
    sprite?.classList.toggle('is-paused',paused);
    if (walkButton) walkButton.querySelector('span').textContent = paused ? 'Play animation' : 'Pause animation';
  }
  syncWalk();
  walkButton?.addEventListener('click',()=>{paused=!paused;syncWalk();announce(paused?'Loader animation paused.':'Loader animation playing.');});
  reducedMotion.addEventListener?.('change',e=>{paused=e.matches;syncWalk();});
  $('#year').textContent = String(new Date().getFullYear());
})();
