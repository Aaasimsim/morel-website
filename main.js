/* Morel · Design E. No libraries; the page reads fine without this file. */
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = (name) => { try { window.plausible && window.plausible(name); } catch (e) {} };

  /* Theme toggle (remembers the choice on this device) */
  const toggle = document.querySelector('[data-theme-toggle]');
  const syncToggle = () => toggle && toggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance');
  syncToggle();
  if (toggle) toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('morel-theme', root.dataset.theme); } catch (e) {}
    syncToggle();
  });

  /* Product tabs: click, or arrow keys inside the tab list */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      select(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
    });
  });

  /* Reveals: chapters fade up once; the plate draws its leader lines */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal], [data-plate], .log').forEach((el) => io.observe(el));

  /* Clips play only while on screen, never under reduced motion */
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('video.clip').forEach((v) => { if (!v.closest('[data-done]')) vio.observe(v); });

  /* Chapter rail: appears while you read the six chapters, marks the current one */
  const rail = document.querySelector('[data-rail]');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  if (rail && chapters.length) {
    rail.hidden = false; rail.classList.add('is-off');
    const links = [...rail.querySelectorAll('a')];
    const onRail = () => {
      const first = chapters[0].getBoundingClientRect(), last = chapters[chapters.length - 1].getBoundingClientRect();
      const inside = first.top < window.innerHeight * 0.6 && last.bottom > window.innerHeight * 0.4;
      rail.classList.toggle('is-off', !inside);
      let current = chapters[0].id;
      chapters.forEach((c) => { if (c.getBoundingClientRect().top < window.innerHeight * 0.45) current = c.id; });
      links.forEach((a) => a.classList.toggle('on', a.dataset.for === current));
    };
    window.addEventListener('scroll', onRail, { passive: true }); onRail();
  }

  /* Tracking hooks */
  let sawCase = false;
  window.addEventListener('scroll', () => {
    if (sawCase) return;
    const c = document.getElementById('c1');
    if (c && c.getBoundingClientRect().top < window.innerHeight * 0.5) { sawCase = true; track('Scrolled into the request story'); }
  }, { passive: true });
  document.querySelectorAll('[data-track="follow-request"]').forEach((a) => a.addEventListener('click', () => track('Follow one request')));

  /* Early access: email first, details second, then the done moment. No backend yet. */
  const form = document.querySelector('[data-form]');
  if (!form) return;
  const more = form.querySelector('[data-more]');
  const err = form.querySelector('[data-err]');
  const email = form.querySelector('#f-email');
  const done = document.querySelector('[data-done]');
  const validEmail = () => /^\S+@\S+\.\S+$/.test(email.value.trim());
  const next = () => {
    const ok = validEmail();
    email.setAttribute('aria-invalid', ok ? 'false' : 'true');
    err.textContent = 'Please enter a work email.'; err.hidden = ok;
    if (!ok) { email.focus(); return; }
    more.hidden = false; form.querySelector('[data-next]').hidden = true;
    form.querySelector('#f-name').focus();
  };
  form.querySelector('[data-next]').addEventListener('click', next);
  email.addEventListener('keydown', (e) => { if (e.key === 'Enter' && more.hidden) { e.preventDefault(); next(); } });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (more.hidden) { next(); return; }
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = f.type === 'checkbox' ? !f.checked : (f.type === 'email' ? !validEmail() : !f.value.trim());
      f.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
    });
    err.textContent = 'Please fill in the required fields and tick the box.'; err.hidden = ok;
    if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }
    track('Early access submit');
    form.hidden = true; done.hidden = false; done.focus();
    const v = done.querySelector('video'); if (v && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); }
  });
})();
