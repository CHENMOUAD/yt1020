/* ==========================================================================
   KursRadar — UI-Verhalten
   Alle Buttons rufen k2() im <head> auf. Hier steht nur, was die Oberfläche
   selbst tut: Sticky-Header, Floating-Button, Einblenden, FAQ, Jahr.
   ========================================================================== */
(function () {
  'use strict';

  var hdr = document.getElementById('hdr');

  /* ---------- 1. Sticky-Header ---------- */
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (hdr) hdr.classList.toggle('is-stuck', y > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Einblenden ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('in'); });
  }

  /* ---------- 3. FAQ ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.faq__item'), function (item) {
    var q = item.querySelector('.faq__q');
    var a = item.querySelector('.faq__a');
    if (!q || !a) return;

    function set(open) {
      item.classList.toggle('is-open', open);
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    }

    if (item.classList.contains('is-open')) set(true);
    q.addEventListener('click', function () {
      set(!item.classList.contains('is-open'));
    });
  });

  /* ---------- 4. Jahr ---------- */
  var yEl = document.getElementById('year');
  if (yEl) yEl.textContent = String(new Date().getFullYear());
})();
