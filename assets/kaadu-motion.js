/* Kaadu scroll motion (spec S-10, DS Motion «Scroll reveal»). GSAP 3.13 + ScrollTrigger + SplitText, loaded deferred
   from layout/theme.liquid only when the theme setting «Scroll animations» is on and not in the theme editor.
   html.kd-motion (set in <head>) pre-hides the first sections' targets in assets/base.bundle.css; sections further
   down are hidden here before the visitor reaches them. Each section plays once when its top reaches 85 % of the
   viewport (sections already in view play at once), then hands its elements back to the stylesheet. No reduced
   motion, no GSAP → the class goes and everything shows.
   Effects: words (headings slide up word by word from a line mask), rise (kicker, text, buttons fade up), pop
   (pills, badges and sticker artwork scale and turn in), cards (cards, tiles and rows come in one by one), media
   (images rise in; first-section images are never hidden, LCP) and parallax (scrubbed ±4 % on photos), plus the
   ticker, which only runs while it is on screen.
   The registry below lists, per section class, which elements get which effect. A section whose setting
   «Scroll animations» is off renders data-kd-motion="off" and is skipped. */
(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function release() { html.classList.remove('kd-motion'); }
  if (reduce || !window.gsap || !window.ScrollTrigger || !window.SplitText) { release(); return; }
  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger, window.SplitText);
  window.kdMotionStarted = true;

  var EASE = 'power2.out';           // = cubic-bezier(.215,.61,.355,1), cobfoods' reveal curve
  var POP = 'back.out(1.7)';
  var START = 'top 85%';
  var STICKERS = '.sticker__rotate-container > *';

  // Per section: words / rise / pop / cards / media / parallax selectors (inside the section's Shopify wrapper).
  var REGISTRY = [
    { section: '.kd-iw-band',
      words: '.kd-iw__title',
      rise: '.kd-iw__kicker, .kd-iw__text, .kd-iw__cta, .kd-iw__actions, .kd-iw__note, .kd-iw__caption',
      media: '.kd-iw__media', parallax: '.kd-iw__media' },
    { section: '.kd-video',
      words: '.kd-video__title',
      rise: '.kd-video__actions',
      pop: '.kd-video__play' },
    { section: '.kd-is-band',
      words: '.kd-is__title, .kd-is__quote',
      rise: '.kd-is__subheading, .kd-is__text, .kd-is__button',
      pop: '.kd-is__cite, .kd-tag',
      media: '.kd-is__media', parallax: '.kd-is__media' },
    { section: '.kd-people',
      words: '.kd-heading__title',
      rise: '.kd-heading__kicker, .kd-people__footer .kd-btn, .kd-people__footer .kd-link',
      pop: '.kd-people__hint',
      cards: '.kd-card', cardsInViewOnly: true },
    { section: '.kd-pack',
      words: '.kd-pack__title',
      rise: '.kd-pack__reviews, .kd-pack__intro, .kd-pack__notice, .kd-group-label, .kd-options--2, .kd-pack__buy, .kd-pack__foot, .kd-pack__long, .kd-pack__detail',
      pop: '.kd-pack__seal',
      cards: '.kd-pack__pack, .kd-pack__plan-list .kd-option',
      media: '.kd-pack__media' },
    { section: '.kd-videos',
      words: '.kd-heading__title',
      rise: '.kd-videos__intro, .kd-videos__nav, .kd-videos__actions',
      pop: '.kd-videos__rig' },
    { section: '.kd-iwh',
      words: '.kd-iwh__heading',
      rise: '.kd-iwh__intro, .kd-iwh__actions',
      cards: '.kd-iwh__tile',
      media: '.kd-iwh__media', parallax: '.kd-iwh__media' },
    { section: '.kd-compare-section',
      words: '.kd-heading__title',
      rise: '.kd-heading__kicker, .kd-compare-section__notes',
      stage: function (scope) { var l = scope.querySelector('.kd-compare__layer'); return l ? [l.parentElement] : []; } },
    { section: '.kd-trial',
      words: '.kd-trial__heading',
      rise: '.kd-trial__text, .kd-trial__button, .kd-trial__note',
      pop: '.kd-trial__badge',
      fade: '.kd-trial__piece' },      // the pieces float with a CSS transform animation: opacity only
    { section: '.kd-split-section',
      words: '.kd-heading__title',
      rise: '.kd-split-section__intro, .kd-split-section__art, .kd-split__detail, .kd-split-section__foot',
      cards: '.kd-split__seg' },
    { section: '.kd-join',
      words: '.kd-heading__title',
      rise: '.kd-heading__kicker, .kd-join__text, .kd-form',
      pop: '.kd-join__image' },
    { section: '.kd-ctable',
      words: '.kd-heading__title',
      rise: '.kd-heading__kicker, .kd-ctable__intro, .kd-ctable__note',
      fade: '.kd-ctable__table tr' },   // table rows: opacity only (no transforms on rows)
    { section: '.kd-reviews',
      words: '.kd-heading__title',
      rise: '.kd-heading__kicker, .kd-reviews__btn',
      cards: '.kd-review' }
  ];

  function list(scope, sel) {
    if (!sel) return [];
    if (typeof sel === 'function') return sel(scope);
    return Array.prototype.slice.call(scope.querySelectorAll(sel));
  }
  function off(scope) { return !!(scope.matches('[data-kd-motion="off"]') || scope.querySelector('[data-kd-motion="off"]')); }
  function unique(arr) { return arr.filter(function (el, i) { return arr.indexOf(el) === i; }); }
  function inViewX(el) { var r = el.getBoundingClientRect(); return r.right > 0 && r.left < window.innerWidth; }
  function inViewY(el) { var r = el.getBoundingClientRect(); return r.top < window.innerHeight * 0.85 && r.bottom > 0; }

  function setup(section, entry) {
    if (section.kdMotion) return;
    section.kdMotion = true;
    var scope = section.closest('.shopify-section') || section;   // stickers sit beside the <section>, in the wrapper
    if (off(scope)) return;                                       // section setting «Scroll animations» off
    var first = inViewY(section);                                 // already on screen at load: play now, never hide media
    var revealed = [];
    var tl = gsap.timeline({
      paused: true,
      defaults: { ease: EASE },
      onComplete: function () {
        // Hand every target back to the stylesheet: the pre-hide stops (kd-motion-done) and the inline styles go,
        // so CSS that hides an element on purpose wins again. Parallax targets keep their scrubbed transform.
        scope.classList.add('kd-motion-done');
        gsap.set(revealed, { clearProps: 'visibility,opacity' });
        gsap.set(revealed.filter(function (el) { return !el.kdParallax; }), { clearProps: 'transform' });
      }
    });

    list(scope, entry.parallax).forEach(function (el) {
      el.kdParallax = true;
      // Relative to the element's own yPercent: free-canvas images are placed with translate(-50%, -50%).
      var base = gsap.getProperty(el, 'yPercent') || 0;
      gsap.fromTo(el, { yPercent: base - 4 }, { yPercent: base + 4, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    list(scope, entry.words).forEach(function (title, i) {
      var split = window.SplitText.create(title, { type: 'words,lines', mask: 'lines', autoSplit: true, linesClass: 'kd-motion-line' });
      gsap.set(title, { autoAlpha: 1 });
      revealed.push(title);
      tl.from(split.words, { yPercent: 110, duration: 0.7, stagger: 0.06 }, i === 0 ? 0 : '<0.1');
    });

    var media = list(scope, entry.media).concat(list(scope, entry.stage));
    if (media.length) {
      revealed = revealed.concat(media);
      if (first) {
        // First section: its image may be the LCP element. Light scale only, never hidden.
        media.forEach(function (m) { tl.fromTo(m.querySelector('img') || m, { scale: 1.06 }, { scale: 1, duration: 1.1 }, 0); });
      } else {
        tl.fromTo(media, { y: 48, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0);
      }
    }

    var rise = list(scope, entry.rise);
    revealed = revealed.concat(rise);
    if (rise.length) tl.fromTo(rise, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, 0.25);

    var cards = list(scope, entry.cards);
    if (cards.length) {
      var moving = entry.cardsInViewOnly ? cards.filter(inViewX) : cards;
      gsap.set(cards.filter(function (c) { return moving.indexOf(c) === -1; }), { autoAlpha: 1 });   // off-screen carousel cards just show
      revealed = revealed.concat(cards);
      tl.fromTo(moving, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, 0.3);
    }

    var fade = list(scope, entry.fade);
    revealed = revealed.concat(fade);
    if (fade.length) tl.fromTo(fade, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: 0.07, ease: 'none' }, 0.3);

    var pop = unique(list(scope, entry.pop).concat(list(scope, STICKERS)));
    revealed = revealed.concat(pop);
    if (pop.length) tl.fromTo(pop, { scale: 0.6, rotation: -12, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08, ease: POP }, 0.45);

    if (first) {
      tl.play();
    } else {
      // Hide now (the visitor has not reached the section yet), reveal on scroll.
      tl.progress(0).pause();
      ScrollTrigger.create({ trigger: section, start: START, once: true, onEnter: function () { tl.play(); } });
    }
  }

  // Ticker: the CSS loop only runs while the band is on screen (cobfoods' text-ticker).
  function setupTicker(ticker) {
    if (ticker.kdMotion) return;
    ticker.kdMotion = true;
    if (off(ticker.closest('.shopify-section') || ticker)) return;
    ScrollTrigger.create({ trigger: ticker, start: 'top bottom', end: 'bottom top', toggleClass: { targets: ticker, className: 'kd-ticker--live' } });
    ticker.classList.add('kd-ticker--gated');
  }

  function init(root) {
    REGISTRY.forEach(function (entry) {
      var found = root.matches && root.matches(entry.section) ? [root] : Array.prototype.slice.call(root.querySelectorAll(entry.section));
      found.forEach(function (section) { setup(section, entry); });
    });
    Array.prototype.slice.call(root.querySelectorAll('.kd-ticker')).forEach(setupTicker);
    ScrollTrigger.refresh();
  }

  html.classList.add('kd-motion-ready');
  init(document);
  // Images and fonts change section heights after load: re-measure trigger positions once everything is in.
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();
