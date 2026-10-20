/* Kaadu scroll motion (spec S-10, DS Motion «Scroll reveal»). GSAP 3.13 + ScrollTrigger + SplitText, loaded deferred
   from layout/theme.liquid only when the theme setting «Scroll animations» is on and not in the theme editor.
   html.kd-motion (set in <head>) pre-hides the targets in assets/base.bundle.css; this script reveals them once when
   their section reaches 85 % of the viewport. No reduced motion, no GSAP → the class goes and everything shows.
   Effects (registry below, scoped per section): words (h2 words slide up from a line mask), rise (kicker, text,
   buttons fade up), pop (pills and sticker artwork scale and turn in), cards (cards in view come in one by one),
   media (hero image: light scale on load + scrubbed parallax; never hidden, it is the LCP image).
   Pilot scope: the homepage hero (.kd-iw--hero) and the people cards (.kd-people). */
(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function release() { html.classList.remove('kd-motion'); }
  if (reduce || !window.gsap || !window.ScrollTrigger || !window.SplitText) { release(); return; }
  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger, window.SplitText);
  window.kdMotionStarted = true;

  var EASE = 'power2.out';           // = cubic-bezier(.215,.61,.355,1), cobfoods' reveal curve
  var POP = 'back.out(1.7)';
  var START = 'top 85%';

  var SECTIONS = '.kd-iw--hero, .kd-people';
  var SEL = {
    words: '.kd-heading__title, .kd-iw__title',
    rise: '.kd-heading__kicker, .kd-iw__kicker, .kd-iw__text, .kd-iw__cta, .kd-iw__actions, .kd-iw__note, .kd-iw__caption, .kd-people__footer .kd-btn, .kd-people__footer .kd-link',
    pop: '.kd-people__hint, .kd-tag:not(.kd-card__pill), .kd-badge, .sticker__rotate-container > *',
    cards: '.kd-card',
    media: '.kd-iw--hero .kd-iw__media'
  };

  function inView(el) {
    var r = el.getBoundingClientRect();
    return r.right > 0 && r.left < window.innerWidth;
  }

  function setup(section) {
    if (section.kdMotion) return;
    section.kdMotion = true;
    // Stickers are rendered beside the <section>, inside Shopify's wrapper.
    var scope = section.closest('.shopify-section') || section;
    var isHero = section.classList.contains('kd-iw--hero');
    var all = function (sel) { return Array.prototype.slice.call(scope.querySelectorAll(sel)); };

    var tl = gsap.timeline({
      paused: true,
      defaults: { ease: EASE },
      onComplete: function () { scope.classList.add('kd-motion-done'); }
    });

    all(SEL.words).forEach(function (title, i) {
      var split = window.SplitText.create(title, { type: 'words,lines', mask: 'lines', autoSplit: true, linesClass: 'kd-motion-line' });
      gsap.set(title, { autoAlpha: 1 });
      tl.from(split.words, { yPercent: 110, duration: 0.7, stagger: 0.06 }, i === 0 ? 0 : '<0.1');
    });

    var rise = all(SEL.rise);
    if (rise.length) tl.fromTo(rise, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, 0.25);

    var pop = all(SEL.pop);
    if (pop.length) tl.fromTo(pop, { scale: 0.6, rotation: -12, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08, ease: POP }, 0.45);

    var cards = all(SEL.cards);
    if (cards.length) {
      var visible = cards.filter(inView);
      var rest = cards.filter(function (c) { return visible.indexOf(c) === -1; });
      gsap.set(rest, { autoAlpha: 1 });   // off-screen carousel cards just show
      tl.fromTo(visible, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, clearProps: 'transform' }, 0.2);
    }

    if (isHero) {
      // The hero is the first section: play on load. Its image is the LCP element, so it stays visible.
      all(SEL.media).forEach(function (media) {
        var img = media.querySelector('img') || media;
        tl.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: EASE }, 0);
        gsap.fromTo(media, { yPercent: -4 }, {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
        });
      });
      tl.play();
    } else {
      window.ScrollTrigger.create({ trigger: section, start: START, once: true, onEnter: function () { tl.play(); } });
    }
  }

  function init(root) {
    var list = root.matches && root.matches(SECTIONS) ? [root] : Array.prototype.slice.call(root.querySelectorAll(SECTIONS));
    list.forEach(setup);
    window.ScrollTrigger.refresh();
  }

  html.classList.add('kd-motion-ready');
  init(document);
  // Sections that load late (fonts, images) change heights: re-measure trigger positions once everything is in.
  window.addEventListener('load', function () { window.ScrollTrigger.refresh(); });
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();
