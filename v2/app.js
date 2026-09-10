/* Esplendor V2 prototype — no libraries.
   IntersectionObserver reveals, rAF hero parallax, pointer drag tracks. */
(function () {
  "use strict";
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── reveal on enter ──
     NOTE: .rv-mask hides itself with clip-path, and a self-clipped element
     reports zero intersection area in Chromium — observing it directly
     deadlocks. Observe its parent and let CSS cascade. */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.rv,.rv-mask,.kb').forEach(function (el) {
    if (reduce) { el.classList.add('in'); return; }
    io.observe(el.classList.contains('rv-mask') && el.parentElement ? el.parentElement : el);
  });
  // cascade helper: when a parent gets .in, light up masked children
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      if (m.target.classList && m.target.classList.contains('in')) {
        m.target.querySelectorAll('.rv-mask,.kb').forEach(function (c) { c.classList.add('in'); });
      }
    });
  }).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  /* ── hero entrance ── */
  var hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('go'); });

  /* ── nav compact + mobile bar (scroll-aware) ── */
  var nav = document.getElementById('nav'), mbar = document.getElementById('mbar');
  var lastY = 0, ticking = false, heroMedia = document.getElementById('heroMedia');

  function onScroll() {
    var y = scrollY;
    if (nav) nav.classList.toggle('compact', y > 40);
    if (mbar) {
      var past = y > innerHeight * 0.55;
      var up = y < lastY - 4;
      var bottom = (y + innerHeight) > document.body.scrollHeight - 260;
      mbar.classList.toggle('up', past && (up || bottom));
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
  }
  function frame() {
    if (!reduce && heroMedia && scrollY < innerHeight * 1.15) {
      heroMedia.style.transform = 'translate3d(0,' + (scrollY * 0.16) + 'px,0)';
    }
    onScroll(); ticking = false;
  }
  addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  onScroll();

  /* ── mobile sheet ── */
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

  /* ── language toggle ── */
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

  /* ── drag-to-scroll for horizontal tracks (desktop) ── */
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
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  }
  var adTrack = document.getElementById('adTrack');
  dragTrack(adTrack);
  dragTrack(document.getElementById('wkTrack'));

  /* ── add-on arrows ── */
  var prev = document.getElementById('adPrev'), next = document.getElementById('adNext');
  if (adTrack && prev && next) {
    function step() {
      var c = adTrack.querySelector('.ad');
      return c ? c.getBoundingClientRect().width + 16 : 260;
    }
    function sync() {
      prev.disabled = adTrack.scrollLeft < 8;
      next.disabled = adTrack.scrollLeft > adTrack.scrollWidth - adTrack.clientWidth - 8;
    }
    prev.addEventListener('click', function () { adTrack.scrollBy({ left: -step() * 2, behavior: reduce ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { adTrack.scrollBy({ left: step() * 2, behavior: reduce ? 'auto' : 'smooth' }); });
    adTrack.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync); sync();
  }

  /* ── before / after ── */
  var ba = document.getElementById('ba');
  if (ba) {
    var dragging = false;
    function set(cx) {
      var r = ba.getBoundingClientRect();
      var p = Math.min(Math.max(((cx - r.left) / r.width) * 100, 2), 98);
      ba.style.setProperty('--rev', (100 - p) + '%');
      ba.setAttribute('aria-valuenow', Math.round(p));
    }
    ba.addEventListener('pointerdown', function (e) { dragging = true; ba.setPointerCapture(e.pointerId); set(e.clientX); });
    ba.addEventListener('pointermove', function (e) { if (dragging) set(e.clientX); });
    ba.addEventListener('pointerup', function () { dragging = false; });
    ba.addEventListener('pointercancel', function () { dragging = false; });
    ba.addEventListener('keydown', function (e) {
      var cur = parseFloat(getComputedStyle(ba).getPropertyValue('--rev')) || 50;
      if (e.key === 'ArrowLeft') { ba.style.setProperty('--rev', Math.min(cur + 4, 98) + '%'); e.preventDefault(); }
      if (e.key === 'ArrowRight') { ba.style.setProperty('--rev', Math.max(cur - 4, 2) + '%'); e.preventDefault(); }
    });
  }
})();
