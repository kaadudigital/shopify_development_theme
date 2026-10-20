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
        state.pack = data.packs[0] ? data.packs[0].n : state.pack;
        render();
        var cart = form && form.querySelector('button[type="submit"]');
        if (cart) {
          cart.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
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

/* [data-kd-phone]: clips in the phone frame (sections/vertical-video-embeds.liquid). The screen is a scroll-snap
   track, one clip per screen (sideways, or up and down per screen size). Arrows step through and loop; leaving a clip pauses its video. A hosted video
   plays with sound on tap and pauses on a second tap. The «✶ Auf TikTok ansehen» link follows the clip on screen.
   Auto-advance (data-autoplay-desktop / -mobile, -direction 1 or -1, -interval in ms) runs only while nothing plays
   and the phone is on screen; it stops for good once the visitor swipes, scrolls or uses the arrows, and never
   runs with prefers-reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 767.98px)');
  function setup(phone) {
    if (phone.kdPhone) return;
    phone.kdPhone = true;
    var track = phone.querySelector('[data-kd-phone-track]');
    var stage = phone.closest('.kd-videos__stage') || phone.parentElement;
    var prev = stage.querySelector('[data-kd-phone-prev]');
    var next = stage.querySelector('[data-kd-phone-next]');
    var source = stage.querySelector('[data-kd-phone-source]');
    var clips = Array.prototype.slice.call(track.children);
    var current = -1, auto = false, stopped = false, visible = false;
    var smooth = function () { return reduce.matches ? 'auto' : 'smooth'; };

    // Sideways or up-and-down, whichever the CSS set for this screen size (.kd-videos--m-/--d-vertical).
    function vertical() { return getComputedStyle(track).flexDirection === 'column'; }
    function index() {
      return vertical()
        ? Math.round(track.scrollTop / Math.max(1, track.clientHeight))
        : Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    }
    function go(i) {
      var n = clips.length;
      i = ((i % n) + n) % n;
      if (vertical()) track.scrollTo({ top: i * track.clientHeight, behavior: smooth() });
      else track.scrollTo({ left: i * track.clientWidth, behavior: smooth() });
    }
    function stop(video) {
      if (!video) return;
      video.pause();
      video.closest('.kd-phone__clip').classList.remove('is-playing');
    }
    function update() {
      var i = index();
      if (i === current) return;
      current = i;
      clips.forEach(function (clip, k) {
        if (k !== i) stop(clip.querySelector('video'));
        clip.setAttribute('aria-hidden', k === i ? 'false' : 'true');
        clip.querySelectorAll('a, button, iframe').forEach(function (el) { el.tabIndex = k === i ? 0 : -1; });
      });
      if (source) {
        var url = clips[i] && clips[i].getAttribute('data-source-url');
        source.hidden = !url;
        if (url) {
          source.href = url;
          source.textContent = clips[i].getAttribute('data-source-label');
        }
      }
    }
    function playing() {
      return clips.some(function (clip) { return clip.classList.contains('is-playing'); });
    }

    var settle = null;
    track.addEventListener('scroll', function () {
      if (!auto) stopped = true;
      clearTimeout(settle);
      settle = setTimeout(function () { auto = false; update(); }, 120);
    }, { passive: true });
    if (prev) prev.addEventListener('click', function () { stopped = true; go(index() - 1); });
    if (next) next.addEventListener('click', function () { stopped = true; go(index() + 1); });
    track.addEventListener('keydown', function (event) {
      if (event.target !== track) return;
      var keys = vertical() ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
      var k = keys.indexOf(event.key);
      if (k > -1) {
        event.preventDefault();
        stopped = true;
        go(index() + (k ? 1 : -1));
      }
    });
    track.addEventListener('click', function (event) {
      var clip = event.target.closest('.kd-phone__clip--video');
      if (!clip || !(event.target.closest('[data-kd-clip-play]') || event.target.tagName === 'VIDEO')) return;
      var video = clip.querySelector('video');
      if (!video) return;
      stopped = true;
      if (clip.classList.contains('is-playing')) {
        stop(video);
      } else {
        video.muted = false;
        video.controls = false;
        clip.classList.add('is-playing');
        var p = video.play();
        if (p && p.catch) p.catch(function () { clip.classList.remove('is-playing'); });
      }
    });

    // Auto-advance
    var interval = Math.max(3000, parseInt(phone.getAttribute('data-autoplay-interval'), 10) || 6000);
    var direction = parseInt(phone.getAttribute('data-autoplay-direction'), 10) < 0 ? -1 : 1;
    function enabled() {
      if (stopped || reduce.matches || document.hidden || !visible || playing() || clips.length < 2) return false;
      return phone.getAttribute(mobile.matches ? 'data-autoplay-mobile' : 'data-autoplay-desktop') === 'true';
    }
    setInterval(function () {
      if (!enabled()) return;
      auto = true;
      go(index() + direction);
    }, interval);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (!visible) clips.forEach(function (clip) { stop(clip.querySelector('video')); });
      }, { threshold: 0.5 }).observe(phone);
    } else {
      visible = true;
    }
    update();
  }
  function init(root) { root.querySelectorAll('[data-kd-phone]').forEach(setup); }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();
