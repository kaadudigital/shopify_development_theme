/* Kaadu smooth scrolling (spec S-11, DS Motion). Lenis 1.3 eases the native scroll position on wheel and trackpad
   input (lerp 0.12: the page settles about 0.4 s after the last tick); touch, keyboard and the scrollbar stay native.
   Loaded deferred from layout/theme.liquid, before GSAP, only when the theme setting «Smooth scrolling» is on and
   not in the theme editor; Lenis itself does nothing under prefers-reduced-motion.
   assets/kaadu-motion.js drives lenis.raf from GSAP's ticker when it runs (and stops the loop below), so parallax
   and reveals follow the eased position.
   Stops while the MENU overlay or the cart drawer lock the page (both set overflow hidden on <html>), so the eased
   position cannot drift behind an open layer; their own panels and the inner scrollers (people track, phone
   screens, comparison table) keep their wheel. Same-page hash links (e.g. /#produkt) glide instead of jumping.
   window.kdScrollTo(el) is the shared «scroll an element to the middle» for assets/kaadu.js: Lenis when it runs,
   else native (instant under reduced motion). */
(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function nativeTo(el) { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
  window.kdScrollTo = nativeTo;
  if (reduce || !window.Lenis) return;

  var lenis = new window.Lenis({
    lerp: 0.12,                 // snappy (Marshal, 2026-10-20); cobfoods ≈ 0.07
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,           // phones scroll natively
    allowNestedScroll: true,    // a scrollable element under the pointer keeps the wheel (tracks, tables, panels)
    autoRaf: false,             // driven below, or from gsap.ticker by kaadu-motion.js
    autoToggle: false,          // the lock is handled by the observer below (deterministic, no CSS transition trick)
    anchors: false              // same-page hash links are handled below (they are mostly «/#id», not «#id»)
  });
  window.kdLenis = lenis;

  var rafId = requestAnimationFrame(function loop(t) { lenis.raf(t); rafId = requestAnimationFrame(loop); });
  lenis.kdStopLoop = function () { if (rafId) cancelAnimationFrame(rafId); rafId = 0; };

  // Page lock: the MENU overlay (hero-logo-with-menu) and the cart drawer (Alpine x-trap.noscroll) set
  // overflow hidden inline on <html>. Stop Lenis while that is so; start again when the lock goes.
  function syncLock() {
    var locked = /hidden/.test(html.style.overflow + ' ' + html.style.overflowY);
    if (locked && !lenis.isStopped) lenis.stop();
    else if (!locked && lenis.isStopped) lenis.start();
  }
  new MutationObserver(syncLock).observe(html, { attributes: true, attributeFilter: ['style'] });
  syncLock();

  // Open layers (menu overlay, drawers, modals) must take the wheel themselves even while Lenis is stopped. Only
  // those: in-page scrollers (people track, phone screens, comparison table) are left to allowNestedScroll, which
  // checks the gesture's own axis, so a vertical wheel over a horizontal scroller still moves the page. (A prevent
  // attribute there plus its overscroll-behavior: contain stalled the page under the pointer.) Set here, not in
  // the section files (several belong to other specs).
  var PREVENT = '.menu-content, [role="dialog"]';
  function markPrevent(root) {
    Array.prototype.slice.call(root.querySelectorAll(PREVENT)).forEach(function (el) { el.setAttribute('data-lenis-prevent', ''); });
  }
  markPrevent(document);
  document.addEventListener('shopify:section:load', function (event) { markPrevent(event.target); });

  // Centre an element in the viewport through Lenis (kaadu.js: pack selector focus, trial button → cart).
  window.kdScrollTo = function (el) {
    if (lenis.isStopped) return nativeTo(el);
    var r = el.getBoundingClientRect();
    lenis.scrollTo(el, { offset: -Math.round((window.innerHeight - r.height) / 2) });
  };

  // Same-page hash links glide to their target (href="#produkt" and href="/#produkt" on the homepage).
  document.addEventListener('click', function (event) {
    var a = event.target.closest('a[href*="#"]');
    if (!a || (a.target && a.target !== '_self') || event.defaultPrevented || lenis.isStopped) return;
    var url;
    try { url = new URL(a.href); } catch (e) { return; }
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
    if (!url.hash || url.hash === '#') return;
    var el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el || el.tagName === 'MAIN') return;   // the skip link must move focus natively
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    lenis.scrollTo(el);
  });
})();
