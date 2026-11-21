/* Morel · Design C motion. No libraries. Everything degrades to a readable static page. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = (name) => { try { window.plausible && window.plausible(name); } catch (e) {} };

  /* Nav compacts after the hero starts to scroll away */
  const nav = document.querySelector('[data-nav]');
  const onNav = () => nav && nav.classList.toggle('is-compact', window.scrollY > 40);
  window.addEventListener('scroll', onNav, { passive: true }); onNav();

  /* Hero intro: words and glyphs settle in, staggered */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.querySelectorAll('.word, .glyph').forEach((el, i) => el.style.setProperty('--i', i));
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));
  }

  /* One-shot reveals (the plate's leader lines and labels) */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.25 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  /* Clips: play only while visible, never under reduced motion */
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('video.clip, .spec video').forEach((v) => vio.observe(v));

  /* Crew: hover or focus swaps idle for working/done */
  document.querySelectorAll('[data-agent]').forEach((card) => {
    const v = card.querySelector('video'); if (!v) return;
    const idle = v.getAttribute('src'), busy = v.dataset.hover;
    card.tabIndex = 0;
    const swap = (src) => { if (reduce || !busy) return; v.src = src; v.play().catch(() => {}); };
    card.addEventListener('mouseenter', () => swap(busy));
    card.addEventListener('focus', () => swap(busy));
    card.addEventListener('mouseleave', () => swap(idle));
    card.addEventListener('blur', () => swap(idle));
  });

  /* Case: pinned horizontal strip on wide screens */
  const caseEl = document.querySelector('[data-case]');
  const trackEl = caseEl && caseEl.querySelector('[data-track-el]');
  const bar = caseEl && caseEl.querySelector('[data-progress]');
  let seenCase = false;
  const wide = window.matchMedia('(min-width: 900px)');
  let overflow = 0;
  const measure = () => {
    if (!caseEl) return;
    const pin = wide.matches && !reduce;
    caseEl.classList.toggle('is-pinned', pin);
    if (!pin) { trackEl.style.transform = ''; return; }
    overflow = Math.max(0, trackEl.scrollWidth - window.innerWidth);
    caseEl.style.setProperty('--case-h', (window.innerHeight + overflow) + 'px');
    onCase();
  };
  const onCase = () => {
    if (!caseEl) return;
    const r = caseEl.getBoundingClientRect();
    const total = caseEl.offsetHeight - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    if (caseEl.classList.contains('is-pinned')) trackEl.style.transform = `translate3d(${-p * overflow}px,0,0)`;
    if (bar) bar.style.width = (p * 100).toFixed(1) + '%';
    if (!seenCase && r.top < window.innerHeight * 0.5) { seenCase = true; track('Scrolled into case'); }
  };
  if (trackEl && !caseEl.classList.contains('is-pinned')) {
    trackEl.addEventListener('scroll', () => {
      const max = trackEl.scrollWidth - trackEl.clientWidth;
      if (bar && max > 0) bar.style.width = (trackEl.scrollLeft / max * 100).toFixed(1) + '%';
    }, { passive: true });
  }
  window.addEventListener('scroll', onCase, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure); measure();

  /* The rule: words light up as you scroll through it */
  document.querySelectorAll('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    const spans = [...el.querySelectorAll('.w')];
    if (reduce) { spans.forEach((s) => s.classList.add('on')); return; }
    const onSplit = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.5)));
      const n = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < n));
    };
    window.addEventListener('scroll', onSplit, { passive: true }); onSplit();
  });

  /* Tracking hooks */
  document.querySelectorAll('[data-track="watch-case"]').forEach((a) => a.addEventListener('click', () => track('Watch a case')));

  /* Early access form: client-side check, then the done moment. No backend yet. */
  const form = document.querySelector('[data-form]');
  const done = document.querySelector('[data-done]');
  const err = document.querySelector('[data-err]');
  if (form) form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
    });
    err.hidden = ok;
    if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }
    track('Early access submit');
    form.hidden = true; done.hidden = false; done.focus();
    const v = done.querySelector('video'); if (v && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); }
  });
})();
