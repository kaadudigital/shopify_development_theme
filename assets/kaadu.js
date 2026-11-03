/* Kaadu — small site-wide behaviours for the design-system components.
   Loaded with `defer` from layout/theme.liquid. Vanilla JS, no dependencies. */

/* Scroll an element to the middle of the viewport: through Lenis when assets/kaadu-scroll.js runs (S-11), else
   natively (instant under reduced motion). */
function kdScrollIntoView(el) {
  if (window.kdScrollTo) return window.kdScrollTo(el);
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
}

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
    kdScrollIntoView(target);
    target.focus({ preventScroll: true });
  });
})();

/* [data-kd-compare]: comparison slider. The range input sets --kd-pos (reveal %) on the panel. While nobody touches
   it the panel rocks slowly around the range value, to show it can be moved: starts data-rock-delay ms after the
   last interaction, sways ±data-rock-distance px on a sine (one back-and-forth every data-rock-speed ms, eased in
   over the first half swing), and glides back to the value as soon as the visitor hovers, presses or focuses it.
   Only on screen, never with prefers-reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setup(panel) {
    if (panel.kdCompare) return;
    panel.kdCompare = true;
    var range = panel.querySelector('.kd-compare__range');
    if (!range) return;
    var rock = panel.getAttribute('data-rock') === 'true';
    var distance = parseFloat(panel.getAttribute('data-rock-distance')) || 12;
    var period = Math.max(2000, parseInt(panel.getAttribute('data-rock-speed'), 10) || 6000);
    var delay = Math.max(500, parseInt(panel.getAttribute('data-rock-delay'), 10) || 2000);
    var hover = false, focus = false, press = false, visible = false;
    var idleAt = 0, start = 0, raf = 0;
    var pos = parseFloat(range.value) || 55;
    function show(value) { pos = value; panel.style.setProperty('--kd-pos', value + '%'); }
    function touch() { idleAt = performance.now() + delay; start = 0; }
    function frame(now) {
      raf = 0;
      if (!visible) return;
      var base = parseFloat(range.value) || 55;
      if (hover || focus || press || reduce.matches || now < idleAt) {
        start = 0;
        if (Math.abs(pos - base) > 0.05) show(pos + (base - pos) * 0.12);
        else if (pos !== base) show(base);
      } else {
        if (!start) start = now;
        var t = now - start;
        var ramp = Math.min(1, t / (period / 2));
        ramp = ramp * ramp * (3 - 2 * ramp);
        var amount = (distance / Math.max(1, panel.offsetWidth)) * 100;
        var value = base + amount * ramp * Math.sin((2 * Math.PI * t) / period);
        show(Math.min(96, Math.max(4, value)));
      }
      raf = requestAnimationFrame(frame);
    }
    function run() { if (!raf && visible) raf = requestAnimationFrame(frame); }
    range.addEventListener('input', function () { touch(); show(parseFloat(range.value)); });
    if (!rock) return;
    panel.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hover = true; });
    panel.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hover = false; touch(); } });
    panel.addEventListener('pointerdown', function () { press = true; touch(); });
    window.addEventListener('pointerup', function () { if (press) { press = false; touch(); } });
    window.addEventListener('pointercancel', function () { if (press) { press = false; touch(); } });
    range.addEventListener('focus', function () { focus = true; });
    range.addEventListener('blur', function () { focus = false; touch(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var was = visible;
        visible = entries[0].isIntersecting;
        if (visible && !was) { touch(); run(); }
      }, { threshold: 0.35 }).observe(panel);
    } else {
      visible = true;
      touch();
      run();
    }
  }
  function init(root) { root.querySelectorAll('[data-kd-compare]').forEach(setup); }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();

/* [data-kd-split]: cost split. Pressing a segment shows its title and text in the detail box, and its photo
   ([data-kd-split-photo] = segment index; segments without a photo leave the shape empty). */
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
    set('[data-kd-split-text]', seg.getAttribute('data-text'));
    var index = seg.getAttribute('data-index');
    split.querySelectorAll('[data-kd-split-photo]').forEach(function (photo) {
      photo.hidden = photo.getAttribute('data-kd-split-photo') !== index;
    });
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

/* [data-kd-config]: product configurator (sections/custom-packaging-selector.liquid). Keeps mode (once/abo), pack,
   delivery plan and quantity in aria-pressed / the stepper, fills every price from the JSON data (prices round to
   5 Rappen), shows the delivery rows only for Abo, and keeps the cart form's id / selling_plan / quantity in sync. */
(function () {
  'use strict';
  function money(currency, value) { return currency + ' ' + (Math.round(value * 20) / 20).toFixed(2); }
  function setup(root) {
    if (root.kdConfig) return;
    var dataEl = root.querySelector('[data-kd-config-data]');
    if (!dataEl) return;
    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
    root.kdConfig = true;
    var state = { mode: data.mode === 'once' ? 'once' : 'abo', pack: data.pack, plan: data.plan, qty: 1 };
    var form = root.querySelector('[data-kd-config-form]');
    var qtyOut = form && form.querySelector('output');
    var qtyInput = form && form.querySelector('input[name="quantity"]');
    if (qtyInput) state.qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    var ref = parseFloat(String(data.reference).replace(',', '.')) || 0;
    function pack(n) { return data.packs.filter(function (p) { return p.n === n; })[0] || data.packs[0]; }
    function available(p) { return !!p && p.available !== false; }
    var firstAvailable = data.packs.filter(available)[0];
    // A sold-out default pack: start on the first pack that can be bought.
    if (!available(pack(state.pack)) && firstAvailable) state.pack = firstAvailable.n;
    function plan(n) { return data.plans.filter(function (p) { return p.n === n; })[0] || data.plans[0]; }
    function price(p) { return parseFloat(String(p.price).replace(',', '.')) || 0; }
    function unitPrice(p, isAbo) {
      var pl = plan(state.plan);
      var disc = isAbo && p.aboDiscount && pl ? pl.discount / 100 : 0;
      return price(p) * (1 - disc);
    }
    function render() {
      var isAbo = state.mode === 'abo';
      root.querySelectorAll('[data-kd-config-group]').forEach(function (group) {
        var key = group.getAttribute('data-kd-config-group');
        group.querySelectorAll('[data-value]').forEach(function (btn) {
          btn.setAttribute('aria-pressed', String(btn.getAttribute('data-value') === String(state[key])));
        });
      });
      root.querySelectorAll('[data-kd-config-group="pack"] [data-value]').forEach(function (btn) {
        var p = pack(parseInt(btn.getAttribute('data-value'), 10));
        var unit = unitPrice(p, isAbo);
        var per = unit / (p.bags || 1);
        var save = ref ? Math.round((1 - per / ref) * 100) : 0;
        btn.querySelector('[data-price]').textContent = money(data.currency, unit);
        btn.querySelector('[data-meta]').textContent = data.currency + ' ' + per.toFixed(2) + ' ' + data.perBag + (save > 0 ? ' · ' + data.save + '\u00a0' + save + '\u00a0%' : '');
        var was = btn.querySelector('[data-was]');
        var showWas = unit < price(p) - 0.001;
        was.hidden = !showWas;
        was.textContent = showWas ? data.was + ' ' + money(data.currency, price(p)) : '';
      });
      var current = pack(state.pack);
      root.querySelectorAll('[data-kd-config-group="plan"] [data-value]').forEach(function (btn) {
        var pl = plan(parseInt(btn.getAttribute('data-value'), 10));
        var disc = current.aboDiscount ? pl.discount : 0;
        btn.querySelector('[data-price]').textContent = money(data.currency, price(current) * (1 - disc / 100));
        btn.querySelector('[data-save]').textContent = disc > 0 ? data.save + '\u00a0' + disc + '\u00a0%' : '';
      });
      var plans = root.querySelector('[data-kd-config-plans]');
      if (plans) plans.hidden = !isAbo;
      var unit = unitPrice(current, isAbo);
      root.querySelectorAll('[data-total]').forEach(function (el) { el.textContent = money(data.currency, unit * state.qty); });
      var foot = root.querySelector('[data-foot]');
      if (foot) {
        var ship = isAbo || current.freeShip ? data.shipFree : data.shipPaid;
        foot.textContent = [data.currency + ' ' + (unit / (current.bags || 1)).toFixed(2) + ' ' + data.perBag, ship, data.footExtra].filter(Boolean).join(' · ');
      }
      if (form) {
        var soldOut = !available(current);
        var submit = form.querySelector('button[type="submit"]');
        if (submit) submit.disabled = soldOut;
        form.querySelectorAll('.kd-pack__label-buy').forEach(function (el) { el.hidden = soldOut; });
        form.querySelectorAll('[data-soldout-label]').forEach(function (el) { el.hidden = !soldOut; });
        form.querySelector('input[name="id"]').value = current.variant || '';
        var sp = form.querySelector('input[name="selling_plan"]');
        var spId = isAbo ? (plan(state.plan) || {}).sellingPlan : '';
        sp.value = spId || '';
        sp.disabled = !spId;
        if (qtyInput) qtyInput.value = state.qty;
        if (qtyOut) qtyOut.textContent = state.qty;
      }
    }
    root.addEventListener('click', function (event) {
      var option = event.target.closest('[data-kd-config-group] [data-value]');
      if (option && root.contains(option)) {
        var key = option.closest('[data-kd-config-group]').getAttribute('data-kd-config-group');
        var value = option.getAttribute('data-value');
        state[key] = key === 'mode' ? value : parseInt(value, 10);
        render();
        return;
      }
      var trial = event.target.closest('[data-kd-config-trial]');
      if (trial && root.contains(trial)) {
        state.mode = 'once';
        state.pack = firstAvailable ? firstAvailable.n : state.pack;
        render();
        var cart = form && form.querySelector('button[type="submit"]');
        if (cart) {
          kdScrollIntoView(cart);
          cart.focus({ preventScroll: true });
        }
        return;
      }
      var step = event.target.closest('[data-step]');
      if (step && root.contains(step)) {
        state.qty = Math.min(99, Math.max(1, state.qty + parseInt(step.getAttribute('data-step'), 10)));
        render();
      }
    });
    if (form) {
      form.addEventListener('submit', function (event) {
        // No variant linked yet (frontend first): don't send an empty cart request.
        if (!available(pack(state.pack))) { event.preventDefault(); return; }
        if (!form.querySelector('input[name="id"]').value) {
          event.preventDefault();
          if (window.console) console.warn('[Kaadu] Pack configurator: no variant ID set for this pack.');
        }
      });
    }
    render();
  }
  function init(scope) { scope.querySelectorAll('[data-kd-config]').forEach(setup); }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();

/* [data-kd-ugc]: the video-card slider (sections/vertical-video-embeds.liquid), modelled on the cobfoods.com UGC
   row. The track is a scroll-snap row of 9 : 16 cards; ← →, the dots and the arrow keys step through it and loop.
   A card's muted preview clip plays on hover (data-preview="hover"; in view on touch screens) or while the card is
   on screen ("inview"), never under prefers-reduced-motion. The play button plays the full clip with sound — one
   card at a time; a second tap pauses, the bar along the bottom shows progress, leaving the screen pauses it.
   Auto-advance (data-autoplay-desktop / -mobile, -interval in ms) runs only while nothing plays and the row is on
   screen; it stops for good once the visitor swipes, scrolls or uses the controls. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 767.98px)');
  var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
  function setup(stage) {
    if (stage.kdUgc) return;
    stage.kdUgc = true;
    var track = stage.querySelector('[data-kd-ugc-track]');
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    var prev = stage.querySelector('[data-kd-ugc-prev]');
    var next = stage.querySelector('[data-kd-ugc-next]');
    var dots = Array.prototype.slice.call(stage.querySelectorAll('[data-kd-ugc-dot]'));
    var previewMode = stage.getAttribute('data-preview') || 'hover';
    var inviewPreview = previewMode === 'inview' || (previewMode === 'hover' && !hoverable.matches);
    var current = -1, auto = false, stopped = false, visible = false, playingCard = null;
    var smooth = function () { return reduce.matches ? 'auto' : 'smooth'; };

    function pad() { return parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0; }
    function maxScroll() { return Math.max(0, track.scrollWidth - track.clientWidth); }
    // Where the row actually lands for slide i: its start, clamped to the end of the scroll range (the last cards can
    // never scroll to the start when the overflow is less than a screenful; the browser stops at the end instead).
    function target(i) { return Math.min(maxScroll(), Math.max(0, slides[i].offsetLeft - pad())); }
    // The entry nearest the current scroll position; on a tie the later one (several cards share the end position).
    function nearest(positions) {
      var x = track.scrollLeft, best = 0, dist = Infinity;
      positions.forEach(function (v, k) {
        var d = Math.abs(v - x);
        if (d <= dist + 0.5) { dist = d; best = k; }
      });
      return best;
    }
    function index() { return nearest(slides.map(function (slide, i) { return target(i); })); }
    function go(i) {
      var n = slides.length;
      i = ((i % n) + n) % n;
      track.scrollTo({ left: target(i), behavior: smooth() });
    }
    // Dots stand for screenfuls of cards, not single cards; arrows and dots go once every card fits (resize-aware).
    var perView = 1, pages = slides.length;
    function layout() {
      var fits = track.scrollWidth <= track.clientWidth + 1;
      stage.classList.toggle('kd-videos__stage--fits', fits);
      var w = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      perView = Math.max(1, Math.floor((track.clientWidth - 2 * pad() + gap) / Math.max(1, w + gap)));
      pages = Math.max(1, Math.ceil(slides.length / perView));
      dots.forEach(function (dot, k) {
        dot.hidden = k >= pages;
        if (k < pages) {
          var from = k * perView + 1, to = Math.min(slides.length, (k + 1) * perView);
          dot.setAttribute('aria-label', (from === to ? 'Clip ' + from : 'Clips ' + from + '–' + to) + ' von ' + slides.length);
        }
      });
      current = -1;
      update();
    }
    function pageStart(k) { return target(Math.min(slides.length - 1, k * perView)); }
    function page() {
      var starts = [];
      for (var k = 0; k < pages; k++) starts.push(pageStart(k));
      return nearest(starts);
    }
    function update() {
      var p = page();
      if (p === current) return;
      current = p;
      dots.forEach(function (dot, k) {
        if (k === p) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    // Playback
    function previewOf(card) { return card.querySelector('.kd-videos__preview'); }
    function videoOf(card) { return card.querySelector('.kd-videos__video'); }
    function pressed(card, on) {
      var button = card.querySelector('[data-kd-ugc-play]');
      if (button) button.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    function startPreview(card, byHover) {
      var preview = previewOf(card);
      if (!preview || card.classList.contains('is-playing') || card.classList.contains('is-paused')) return;
      if (reduce.matches && !byHover) return;
      preview.muted = true;
      var p = preview.play();
      if (p && p.catch) p.catch(function () {});
      card.classList.add('is-previewing');
    }
    function stopPreview(card) {
      var preview = previewOf(card);
      if (!preview) return;
      preview.pause();
      card.classList.remove('is-previewing');
    }
    function pauseMain(card) {
      var video = videoOf(card);
      if (!video || !card.classList.contains('is-playing')) return;
      video.pause();
      card.classList.remove('is-playing');
      card.classList.add('is-paused');
      pressed(card, false);
    }
    function resetMain(card) {
      var video = videoOf(card);
      if (!video) return;
      video.pause();
      try { video.currentTime = 0; } catch (e) { /* not loaded yet */ }
      card.classList.remove('is-playing', 'is-paused');
      card.style.removeProperty('--kd-vid-progress');
      pressed(card, false);
      if (playingCard === card) playingCard = null;
    }
    function playMain(card) {
      var video = videoOf(card);
      if (!video) return;
      if (playingCard && playingCard !== card) resetMain(playingCard);
      stopPreview(card);
      video.muted = false;
      video.controls = false;
      card.classList.add('is-playing');
      card.classList.remove('is-paused');
      pressed(card, true);
      playingCard = card;
      var p = video.play();
      if (p && p.catch) p.catch(function () { resetMain(card); });
    }
    function playing() { return !!playingCard && playingCard.classList.contains('is-playing'); }

    slides.forEach(function (slide) {
      var card = slide.querySelector('[data-kd-ugc-card]');
      if (!card) return;
      var video = videoOf(card);
      if (video) {
        video.addEventListener('timeupdate', function () {
          if (video.duration) card.style.setProperty('--kd-vid-progress', (video.currentTime / video.duration * 100).toFixed(2) + '%');
        });
        video.addEventListener('ended', function () { resetMain(card); });
      }
      var button = card.querySelector('[data-kd-ugc-play]');
      if (button) {
        button.addEventListener('click', function () {
          stopped = true;
          if (card.classList.contains('is-playing')) pauseMain(card);
          else playMain(card);
        });
      }
      if (previewMode === 'hover' && previewOf(card)) {
        card.addEventListener('pointerenter', function (event) { if (event.pointerType === 'mouse') startPreview(card, true); });
        card.addEventListener('pointerleave', function (event) { if (event.pointerType === 'mouse') stopPreview(card); });
      }
    });

    // Row navigation
    var settle = null;
    track.addEventListener('scroll', function () {
      if (!auto) stopped = true;
      clearTimeout(settle);
      settle = setTimeout(function () { auto = false; update(); }, 120);
    }, { passive: true });
    if (prev) prev.addEventListener('click', function () { stopped = true; go(index() - 1); });
    if (next) next.addEventListener('click', function () { stopped = true; go(index() + 1); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopped = true;
        track.scrollTo({ left: pageStart(parseInt(dot.getAttribute('data-kd-ugc-dot'), 10) || 0), behavior: smooth() });
      });
    });
    var relayout = null;
    window.addEventListener('resize', function () { clearTimeout(relayout); relayout = setTimeout(layout, 150); });
    window.addEventListener('load', layout);
    track.addEventListener('keydown', function (event) {
      if (event.target !== track) return;
      var k = ['ArrowLeft', 'ArrowRight'].indexOf(event.key);
      if (k > -1) {
        event.preventDefault();
        stopped = true;
        go(index() + (k ? 1 : -1));
      }
    });

    // Auto-advance
    var interval = Math.max(3000, parseInt(stage.getAttribute('data-autoplay-interval'), 10) || 6000);
    function enabled() {
      if (stopped || reduce.matches || document.hidden || !visible || playing() || slides.length < 2) return false;
      return stage.getAttribute(mobile.matches ? 'data-autoplay-mobile' : 'data-autoplay-desktop') === 'true';
    }
    setInterval(function () {
      if (!enabled()) return;
      auto = true;
      go(index() + 1);
    }, interval);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }, { threshold: 0.5 }).observe(stage);
      var watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var card = entry.target.querySelector('[data-kd-ugc-card]');
          if (!card) return;
          if (previewMode !== 'off' && inviewPreview) {
            if (entry.intersectionRatio >= 0.6) startPreview(card, false);
            else stopPreview(card);
          }
          if (entry.intersectionRatio < 0.3) pauseMain(card);
        });
      }, { threshold: [0, 0.3, 0.6] });
      slides.forEach(function (slide) { watcher.observe(slide); });
    } else {
      visible = true;
    }
    layout();
  }
  function init(root) { root.querySelectorAll('[data-kd-ugc]').forEach(setup); }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();

/* [data-kd-cart-open]: the header's cart sticker opens the cart drawer (Alpine store "modals", registered by the
   stock ModalCart island) instead of leaving for /cart; the link's href stays the no-JS fallback. */
(function () {
  'use strict';
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-kd-cart-open]');
    if (!trigger || event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
    var modals = window.Alpine && window.Alpine.store && window.Alpine.store('modals');
    if (!modals || !modals.isRegistered || !modals.isRegistered('cart')) return;
    event.preventDefault();
    modals.open('cart');
  });
})();

/* [data-kd-discount]: discount codes in the cart drawer. Submitting the form adds the code, a [data-kd-discount-remove]
   tag drops one; both POST the whole code list to /cart/update.js (`discount`, comma-separated) with the cart
   sections, then raise shapes:cart:update so the stock Shapes islands (CartItems, CartFooter, cart_count) morph
   the new markup in. A code Shopify reports as not applicable is taken out again and the form shows its error. */
(function () {
  'use strict';
  var SECTIONS = 'cart-items,cart-footer,cart-item-count,cart-live-region';
  function codesOf(form) {
    return (form.getAttribute('data-codes') || '').split(',').map(function (c) { return c.trim(); }).filter(Boolean);
  }
  function showError(form, message) {
    var error = form.querySelector('[data-kd-discount-error]');
    if (!error) return;
    if (message) error.textContent = message;
    error.hidden = !message;
  }
  function post(codes, sections) {
    var body = { discount: codes.join(',') };
    if (sections) { body.sections = SECTIONS; body.sections_url = window.location.pathname; }
    var routes = (window.theme && window.theme.routes) || {};
    return fetch(routes.cart_update_url || '/cart/update.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify(body)
    }).then(function (response) { return response.json(); });
  }
  function apply(form, codes, added) {
    if (form.hasAttribute('data-busy')) return;
    form.setAttribute('data-busy', '');
    showError(form, '');
    post(codes, true).then(function (cart) {
      if (added) {
        var found = (cart.discount_codes || []).some(function (entry) {
          return entry.applicable && String(entry.code).toUpperCase() === added.toUpperCase();
        });
        if (!found) {
          showError(form, form.getAttribute('data-error') || 'Error');
          form.removeAttribute('data-busy');
          /* leave the cart as it was */
          post(codes.filter(function (c) { return c.toUpperCase() !== added.toUpperCase(); }), false);
          return;
        }
      }
      window.dispatchEvent(new CustomEvent('shapes:cart:update', { detail: { response: cart } }));
    }).catch(function () {
      form.removeAttribute('data-busy');
      showError(form, (window.theme && window.theme.strings && window.theme.strings.cartError) || form.getAttribute('data-error') || 'Error');
    });
  }
  document.addEventListener('submit', function (event) {
    var form = event.target.closest('[data-kd-discount]');
    if (!form) return;
    event.preventDefault();
    var input = form.querySelector('input[name="discount"]');
    var code = input ? input.value.trim() : '';
    if (!code) { if (input) input.focus(); return; }
    var codes = codesOf(form);
    if (codes.some(function (c) { return c.toUpperCase() === code.toUpperCase(); })) { input.value = ''; return; }
    apply(form, codes.concat(code), code);
  });
  document.addEventListener('click', function (event) {
    var tag = event.target.closest('[data-kd-discount-remove]');
    if (!tag) return;
    var form = tag.closest('[data-kd-discount]');
    if (!form) return;
    event.preventDefault();
    var remove = tag.getAttribute('data-kd-discount-remove').toUpperCase();
    apply(form, codesOf(form).filter(function (c) { return c.toUpperCase() !== remove; }), null);
  });
})();
