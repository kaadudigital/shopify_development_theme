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
