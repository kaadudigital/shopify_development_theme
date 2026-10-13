/* Kaadu — small site-wide behaviours for the design-system components.
   Loaded with `defer` from layout/theme.liquid. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  /* [data-kd-focus="element-id"]: a button that moves focus to another element on the page
     (e.g. "Waitlist beitreten" → the e-mail field). Replaces inline onclick handlers. */
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-kd-focus]');
    if (!trigger) return;
    var target = document.getElementById(trigger.getAttribute('data-kd-focus'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    target.focus({ preventScroll: true });
  });
})();

/* [data-kd-flip]: people-card flip button. Swaps the card's front and back content
   (DS: no 3D transform), updates aria-pressed and the button label. */
(function () {
  'use strict';
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-kd-flip]');
    if (!button) return;
    var card = button.closest('.kd-card');
    if (!card) return;
    var front = card.querySelector('.kd-card__body:not(.kd-card__body--back)');
    var back = card.querySelector('.kd-card__body--back');
    if (!front || !back) return;

    var flipped = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    front.hidden = flipped;
    back.hidden = !flipped;
    card.classList.toggle('is-flipped', flipped);

    var label = button.querySelector('.kd-btn__label');
    var text = button.getAttribute(flipped ? 'data-label-back' : 'data-label-front');
    if (label && text) label.textContent = text;
  });
})();

/* [data-kd-compare]: comparison slider. The range input sets --kd-pos (reveal %) on the panel. */
(function () {
  'use strict';
  document.addEventListener('input', function (event) {
    var range = event.target.closest('.kd-compare__range');
    if (!range) return;
    var panel = range.closest('[data-kd-compare]');
    if (panel) panel.style.setProperty('--kd-pos', range.value + '%');
  });
})();

/* [data-kd-split]: cost split. Pressing a segment shows its title, amount and text in the detail notice. */
(function () {
  'use strict';
  document.addEventListener('click', function (event) {
    var seg = event.target.closest('.kd-split__seg');
    if (!seg) return;
    var split = seg.closest('[data-kd-split]');
    if (!split) return;
    split.querySelectorAll('.kd-split__seg').forEach(function (other) {
      other.setAttribute('aria-pressed', other === seg ? 'true' : 'false');
    });
    var set = function (selector, value) {
      var el = split.querySelector(selector);
      if (el) el.textContent = value || '';
    };
    set('[data-kd-split-title]', seg.getAttribute('data-title'));
    set('[data-kd-split-amount]', seg.getAttribute('data-amount'));
    set('[data-kd-split-text]', seg.getAttribute('data-text'));
  });
})();

/* Cloud buttons: when a button is wider than the cloud's own proportion (3149 × 889, ~3.5 : 1, +10 % slack),
   add .kd-btn--wide (two trimmed halves at natural proportion, up to 1.7× the cloud) or .kd-btn--wider (the halves
   slightly stretched), so the CSS swaps the stretched cloud for them (kd-button.liquid). */
(function () {
  'use strict';
  var CLOUD = 3149.217 / 889.043;
  function check(button) {
    var h = button.offsetHeight;
    if (!h) return;
    var ratio = button.offsetWidth / h;
    button.classList.toggle('kd-btn--wide', ratio > CLOUD * 1.1 && ratio <= CLOUD * 1.7);
    button.classList.toggle('kd-btn--wider', ratio > CLOUD * 1.7);
  }
  var observer = 'ResizeObserver' in window
    ? new ResizeObserver(function (entries) { entries.forEach(function (entry) { check(entry.target); }); })
    : null;
  function init(root) {
    root.querySelectorAll('.kd-btn').forEach(function (button) {
      if (!button.querySelector('.kd-btn__cloud--halves')) return;
      check(button);
      if (observer) observer.observe(button);
    });
  }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();

/* [data-kd-autoplay]: carousel auto-scroll (people cards). Every interval it scrolls one card on and loops back
   at the end. Pauses while hovered, focused, touched or off screen and while the tab is hidden; stops for good once
   the visitor scrolls by hand; never runs with prefers-reduced-motion or when nothing overflows.
   data-autoplay-desktop / -mobile ("true"/"false", mobile < 768px), data-autoplay-interval in ms. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 767.98px)');
  function setup(track) {
    if (track.kdAutoplay) return;
    track.kdAutoplay = true;
    var interval = Math.max(2000, parseInt(track.getAttribute('data-autoplay-interval'), 10) || 4000);
    var paused = 0, visible = false, stopped = false, auto = false, timer = null;
    function enabled() {
      if (stopped || reduce.matches || document.hidden || !visible || paused) return false;
      if (track.getAttribute(mobile.matches ? 'data-autoplay-mobile' : 'data-autoplay-desktop') !== 'true') return false;
      return track.scrollWidth - track.clientWidth > 4;
    }
    function step() {
      if (!enabled()) return;
      var card = track.firstElementChild;
      if (!card) return;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var max = track.scrollWidth - track.clientWidth;
      auto = true;
      if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: card.getBoundingClientRect().width + gap, behavior: 'smooth' });
      setTimeout(function () { auto = false; }, 900);
    }
    function start() { clearInterval(timer); timer = setInterval(step, interval); }
    function hold() { paused++; }
    function release() { paused = Math.max(0, paused - 1); }
    track.addEventListener('mouseenter', hold);
    track.addEventListener('mouseleave', release);
    track.addEventListener('focusin', hold);
    track.addEventListener('focusout', release);
    track.addEventListener('pointerdown', function () { stopped = true; });
    track.addEventListener('wheel', function () { stopped = true; }, { passive: true });
    track.addEventListener('keydown', function () { stopped = true; });
    track.addEventListener('scroll', function () { if (!auto) stopped = true; }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }, { threshold: 0.4 }).observe(track);
    } else {
      visible = true;
    }
    start();
  }
  function init(root) { root.querySelectorAll('[data-kd-autoplay]').forEach(setup); }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();
