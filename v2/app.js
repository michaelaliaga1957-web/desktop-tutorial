/* Esplendor — no libraries.
   Motion supports the layout; it never drives it. Everything here is a
   no-op under prefers-reduced-motion. */
(function () {
  "use strict";
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── reveal on enter ──────────────────────────────────────────
     NOTE: .rv-mask hides itself with clip-path, and a self-clipped
     element reports zero intersection area in Chromium — observing it
     directly deadlocks and the image never appears. Observe the
     unclipped parent and let the cascade do the rest. */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.rv-mask,.kb').forEach(function (c) { c.classList.add('in'); });
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.rv,.rv-mask,.kb').forEach(function (el) {
    if (reduce) { el.classList.add('in'); return; }
    var target = el.classList.contains('rv-mask') && el.parentElement ? el.parentElement : el;
    io.observe(target);
  });

  /* ── hero entrance ───────────────────────────────────────────── */
  var hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('go'); });

  /* ── scroll-driven chrome ────────────────────────────────────── */
  var nav = document.getElementById('nav'),
      mbar = document.getElementById('mbar'),
      heroMedia = document.getElementById('heroMedia'),
      lastY = 0, ticking = false;

  function onScroll() {
    var y = scrollY;
    if (nav) nav.classList.toggle('compact', y > 40);
    if (mbar) {
      var past = y > innerHeight * 0.55;
      var up = y < lastY - 4;
      var atEnd = (y + innerHeight) > document.body.scrollHeight - 280;
      mbar.classList.toggle('up', past && (up || atEnd));
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
  }
  function frame() {
    if (!reduce && heroMedia && scrollY < innerHeight * 1.2) {
      heroMedia.style.transform = 'translate3d(0,' + (scrollY * 0.17) + 'px,0)';
    }
    onScroll();
    ticking = false;
  }
  addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  onScroll();

  /* ── nav section highlight ───────────────────────────────────── */
  var navLinks = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if (sections.filter(Boolean).length) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = sections.indexOf(e.target);
        navLinks.forEach(function (a, j) { a.classList.toggle('on', i === j); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* ── mobile sheet ────────────────────────────────────────────── */
  var burger = document.getElementById('burger'), sheet = document.getElementById('sheet');
  if (burger && sheet) {
    burger.addEventListener('click', function () {
      var on = sheet.classList.toggle('on');
      burger.classList.toggle('on', on);
      burger.setAttribute('aria-expanded', on);
      document.body.style.overflow = on ? 'hidden' : '';
    });
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        sheet.classList.remove('on'); burger.classList.remove('on');
        burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
      });
    });
  }

  /* ── language ────────────────────────────────────────────────── */
  function setLang(l) {
    document.documentElement.lang = l;
    try { localStorage.setItem('esp-lang', l); } catch (e) {}
    var en = document.getElementById('lgEn'), es = document.getElementById('lgEs');
    if (en) en.classList.toggle('on', l === 'en');
    if (es) es.classList.toggle('on', l === 'es');
  }
  var le = document.getElementById('lgEn'), ls = document.getElementById('lgEs');
  if (le) le.addEventListener('click', function () { setLang('en'); });
  if (ls) ls.addEventListener('click', function () { setLang('es'); });
  try { var saved = localStorage.getItem('esp-lang'); if (saved) setLang(saved); } catch (e) {}

  /* ── horizontal tracks: drag on pointer devices ──────────────── */
  function dragTrack(el) {
    if (!el) return;
    var down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; el.classList.add('drag');
    });
    addEventListener('pointerup', function () { down = false; el.classList.remove('drag'); });
    el.addEventListener('pointermove', function (e) {
      if (!down) return;
      var d = e.clientX - sx;
      if (Math.abs(d) > 3) moved = true;
      e.preventDefault(); el.scrollLeft = sl - d;
    });
    el.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  /* ── generic arrow pager for a scroll track ──────────────────── */
  function pager(track, prev, next, itemSel, dots) {
    if (!track) return;
    dragTrack(track);
    function step() {
      var c = track.querySelector(itemSel);
      if (!c) return 280;
      var s = getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0px';
      return c.getBoundingClientRect().width + (parseFloat(s) || 0);
    }
    function sync() {
      var max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = track.scrollLeft < 8;
      if (next) next.disabled = track.scrollLeft > max - 8;
      if (dots && dots.children.length) {
        var n = dots.children.length;
        var i = max > 0 ? Math.round((track.scrollLeft / max) * (n - 1)) : 0;
        for (var k = 0; k < n; k++) dots.children[k].classList.toggle('on', k === i);
      }
    }
    function go(dir) {
      track.scrollBy({ left: dir * step() * 2, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  }

  pager(document.getElementById('adTrack'),
        document.getElementById('adPrev'), document.getElementById('adNext'), '.ad', null);
  pager(document.getElementById('wkTrack'),
        document.getElementById('wkPrev'), document.getElementById('wkNext'), '.wk',
        document.getElementById('wkDots'));

  /* ── FAQ: animate the answer open/closed ─────────────────────── */
  document.querySelectorAll('.fq').forEach(function (fq) {
    var ans = fq.querySelector('.ans');
    if (!ans) return;
    if (!fq.open) ans.style.height = '0px';
    fq.querySelector('summary').addEventListener('click', function (e) {
      if (reduce) return;
      e.preventDefault();
      var opening = !fq.open;
      if (opening) {
        fq.open = true;
        ans.style.height = '0px';
        requestAnimationFrame(function () {
          ans.style.transition = 'height .5s cubic-bezier(.16,1,.3,1)';
          ans.style.height = ans.scrollHeight + 'px';
        });
      } else {
        ans.style.transition = 'height .4s cubic-bezier(.22,.61,.36,1)';
        ans.style.height = ans.scrollHeight + 'px';
        requestAnimationFrame(function () { ans.style.height = '0px'; });
        ans.addEventListener('transitionend', function h() {
          fq.open = false; ans.removeEventListener('transitionend', h);
        });
      }
    });
    ans.addEventListener('transitionend', function () {
      if (fq.open) ans.style.height = 'auto';
    });
  });

  /* ── before / after ──────────────────────────────────────────── */
  var ba = document.getElementById('ba');
  if (ba) {
    var dragging = false;
    function set(cx) {
      var r = ba.getBoundingClientRect();
      var p = Math.min(Math.max(((cx - r.left) / r.width) * 100, 2), 98);
      ba.style.setProperty('--rev', (100 - p) + '%');
      ba.setAttribute('aria-valuenow', Math.round(p));
    }
    ba.addEventListener('pointerdown', function (e) {
      dragging = true; ba.setPointerCapture(e.pointerId); set(e.clientX);
    });
    ba.addEventListener('pointermove', function (e) { if (dragging) set(e.clientX); });
    ba.addEventListener('pointerup', function () { dragging = false; });
    ba.addEventListener('pointercancel', function () { dragging = false; });
    ba.addEventListener('keydown', function (e) {
      var cur = parseFloat(getComputedStyle(ba).getPropertyValue('--rev')) || 50;
      if (e.key === 'ArrowLeft') { ba.style.setProperty('--rev', Math.min(cur + 4, 98) + '%'); e.preventDefault(); }
      if (e.key === 'ArrowRight') { ba.style.setProperty('--rev', Math.max(cur - 4, 2) + '%'); e.preventDefault(); }
    });
  }

  /* ── smooth in-page nav ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      scrollTo({ top: t.getBoundingClientRect().top + scrollY - 58, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
