/* SENSORA impact page. Reads everything from data.js; there is nothing to edit here for content changes. */
(function () {
  "use strict";
  var D = window.SENSORA_DATA;
  if (!D) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]); }
    if (text) n.textContent = text;
    return n;
  }
  function fmtDate(iso) {
    var p = (iso || "").split("-");
    if (p.length !== 3) return iso || "";
    var m = ["January","February","March","April","May","June","July","August","September","October","November","December"][+p[1] - 1];
    return (+p[2]) + " " + m + " " + p[0];
  }
  // Evidence drawer: source label and date for a figure
  function sourceDrawer(src) {
    if (!src) return document.createTextNode("");
    var d = el("details", { "class": "src" });
    d.appendChild(el("summary", null, "Source"));
    var dl = el("dl");
    dl.appendChild(el("dt", null, "Source")); dl.appendChild(el("dd", null, src.label));
    dl.appendChild(el("dt", null, "Dated")); dl.appendChild(el("dd", null, fmtDate(src.date)));
    dl.appendChild(el("dt", null, "Last updated")); dl.appendChild(el("dd", null, fmtDate(D.meta.lastUpdated)));
    d.appendChild(dl);
    return d;
  }

  /* Banner, money, footer */
  $("approval-text").textContent = D.meta.approvalBanner;
  $("money").textContent = D.moneyRaised.display;
  $("money-cap").textContent = D.moneyRaised.caption;
  $("money-src").appendChild(sourceDrawer(D.moneyRaised.source));
  var up = $("updated"); up.textContent = fmtDate(D.meta.lastUpdated); up.setAttribute("datetime", D.meta.lastUpdated);

  /* Hide any section (and its menu link) whose list in data.js is empty */
  document.querySelectorAll("[data-needs]").forEach(function (n) {
    var list = D[n.getAttribute("data-needs")];
    var has = Array.isArray(list) && list.length > 0;
    n.hidden = !has;
  });

  /* Achieved facts and film */
  var facts = $("facts");
  D.achievements.forEach(function (a) {
    var li = el("li");
    li.appendChild(el("b", null, a.value));
    li.appendChild(el("span", { "class": "lbl" }, a.label));
    li.appendChild(sourceDrawer(a.source));
    facts.appendChild(li);
  });
  $("film").href = D.film.url;
  $("film").setAttribute("aria-label", "Watch the 2026 film (opens Frame.io in a new tab)");
  $("film-img").src = D.film.image;

  /* Story */
  var S = D.story;
  var q = $("quote");
  q.appendChild(el("p", null, "“" + S.quote + "”"));
  q.appendChild(el("cite", null, S.quoteBy));
  var colours = ["#FFD23F", "#FF7A1A", "#FF6FA8", "#FF2BD6", "#1EC8C8"];
  S.beats.forEach(function (b, i) {
    var li = el("li", { style: "--c:" + colours[i % colours.length] });
    li.appendChild(el("h3", null, b.title));
    li.appendChild(el("p", null, b.text));
    $("beats").appendChild(li);
  });
  $("article").href = S.articleUrl;
  $("beats").parentNode.appendChild(sourceDrawer(S.source));
  if (S.video && S.video.src) {
    var v = $("video");
    v.setAttribute("poster", S.video.poster);
    v.setAttribute("aria-label", S.video.title);
    v.appendChild(el("source", { src: S.video.src, type: "video/mp4" }));
    if (S.video.captions) v.appendChild(el("track", { kind: "captions", src: S.video.captions, srclang: "en", label: "English", "default": "" }));
    $("video-cap").textContent = S.video.title + ". Plays only when you press play.";
  } else {
    $("video-wrap").hidden = true;
  }

  /* 2027 */
  var N = D.nextEvent;
  $("next-date").textContent = N.date;
  $("next-venue").textContent = N.venue;
  $("next-music").textContent = "With " + N.music;
  $("next-link").href = N.previewUrl;

  /* Support */
  var ph = $("support-phone");
  ph.href = "tel:" + D.charitySupport.phone.replace(/\s/g, "");
  ph.textContent = "Call " + D.charitySupport.phone;
  $("support-web").href = D.charitySupport.url;

  /* How we built this */
  D.howBuilt.forEach(function (t) { $("built-list").appendChild(el("li", null, t)); });

  /* Opportunities explorer (only runs when there are approved items) */
  function cardList(listEl, items, tagText) {
    listEl.innerHTML = "";
    items.forEach(function (o) {
      var li = el("li");
      li.appendChild(el("span", { "class": "badge" }, tagText || o.type || "Opportunity"));
      li.appendChild(el("h3", null, o.title));
      if (o.text) li.appendChild(el("p", null, o.text));
      if (o.link) { var a = el("a", { href: o.link, target: "_blank", rel: "noopener noreferrer", "class": "more" }, "Find out more"); li.appendChild(a); }
      listEl.appendChild(li);
    });
  }
  if (D.fundraisingOpportunities.length) {
    var types = ["All"].concat(D.fundraisingOpportunities.map(function (o) { return o.type; }).filter(function (t, i, a) { return t && a.indexOf(t) === i; }));
    var opps = $("opps"), filters = $("filters"), empty = el("p", { "class": "empty", hidden: "" }, "Nothing listed in this type yet.");
    opps.parentNode.appendChild(empty);
    var show = function (type) {
      var items = D.fundraisingOpportunities.filter(function (o) { return type === "All" || o.type === type; });
      cardList(opps, items);
      empty.hidden = items.length > 0;
      filters.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.textContent === type ? "true" : "false"); });
    };
    types.forEach(function (t) { var b = el("button", { type: "button", "aria-pressed": "false" }, t); b.addEventListener("click", function () { show(t); }); filters.appendChild(b); });
    show("All");
  }
  if (D.researchOpportunities.length) cardList($("research-list"), D.researchOpportunities, "Research");

  /* ---------- Chef carousel: slow continuous drift, seamless loop ---------- */
  var view = $("car-view"), track = $("car-track"), count = $("car-count");
  var btnPrev = $("car-prev"), btnNext = $("car-next"), btnPause = $("car-pause");
  var cardColours = ["#FF002E", "#FFD23F", "#FF7A1A", "#FF6FA8", "#1EC8C8", "#FF2BD6", "#FF3D7F"];
  var SPEED = 26;           // pixels per second of drift
  var RESUME_AFTER = 3500;  // ms after the last touch before drifting again
  var pos = 0, setW = 0, n = 0, last = 0, lastTouch = 0, tween = null;
  var userPaused = reduce, hovering = false, focusedIn = false, onScreen = true, settingScroll = false;

  function chefCard(c, i, clone) {
    var li = el("li", { "class": "chef" + (c.wide ? " wide" : "") + (c.image ? "" : " text"), style: "--c:" + cardColours[i % cardColours.length], "data-i": i });
    if (clone) { li.setAttribute("aria-hidden", "true"); li.setAttribute("inert", ""); }
    var phd = el("div", { "class": "ph" });
    if (c.image) {
      phd.appendChild(el("img", { src: c.image, alt: clone ? "" : "Black and white portrait of " + c.name, decoding: "async", width: "560", height: "746" }));
    } else {
      phd.appendChild(el("span", { "aria-hidden": "true" }, c.name));
    }
    li.appendChild(phd);
    li.appendChild(el("div", { "class": "bar", "aria-hidden": "true" }));
    var m = el("div", { "class": "meta" });
    if (c.lead) m.appendChild(el("span", { "class": "lead" }, "Curated by"));
    m.appendChild(el(clone ? "p" : "h3", clone ? { "class": "h3" } : null, c.name));
    if (c.role) m.appendChild(el("span", { "class": "role" }, c.role));
    if (c.recognition) m.appendChild(el("span", { "class": "rec" }, c.recognition));
    li.appendChild(m);
    return li;
  }

  function cards() { return Array.prototype.slice.call(track.children); }
  function target(card) { return card.offsetLeft - track.children[0].offsetLeft; }
  function setScroll(x) { settingScroll = true; view.scrollLeft = x; }
  function normalise() {
    if (!setW) return;
    var changed = false;
    while (pos < setW * 0.5) { pos += setW; changed = true; }
    while (pos >= setW * 1.5) { pos -= setW; changed = true; }
    return changed;
  }
  function currentIndex() {
    var best = null, bd = 1e9;
    cards().forEach(function (c) { var d = Math.abs(target(c) - pos); if (d < bd) { bd = d; best = c; } });
    return best;
  }
  function updateCount() {
    var c = currentIndex();
    if (c) count.textContent = (+c.getAttribute("data-i") + 1) + " / " + n;
  }

  function buildCarousel(list) {
    n = list.length;
    track.innerHTML = "";
    list.forEach(function (c, i) { track.appendChild(chefCard(c, i, true)); });   // set before (clone)
    list.forEach(function (c, i) { track.appendChild(chefCard(c, i, false)); });  // the real set
    list.forEach(function (c, i) { track.appendChild(chefCard(c, i, true)); });   // set after (clone)
    requestAnimationFrame(function () {
      var all = cards();
      setW = target(all[n]) - target(all[0]);
      // add extra clones on very wide screens so the loop never shows a gap
      while (track.scrollWidth < setW * 1.5 + view.clientWidth + 40) {
        list.forEach(function (c, i) { track.appendChild(chefCard(c, i, true)); });
      }
      pos = setW;
      setScroll(pos);
      updateCount();
    });
  }

  function paused() { return userPaused || hovering || focusedIn || !onScreen || tween || document.hidden || (Date.now() - lastTouch < RESUME_AFTER); }
  function frame(t) {
    var dt = last ? Math.min(64, t - last) : 0; last = t;
    if (tween) {
      var k = Math.min(1, (t - tween.start) / tween.dur);
      var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      pos = tween.from + (tween.to - tween.from) * e;
      setScroll(pos);
      if (k >= 1) { tween = null; if (normalise()) setScroll(pos); updateCount(); }
    } else if (!paused() && setW) {
      pos += SPEED * dt / 1000;
      normalise();
      setScroll(pos);
      if (Math.round(t / 250) !== Math.round((t - dt) / 250)) updateCount();
    }
    requestAnimationFrame(frame);
  }

  function touched() { lastTouch = Date.now(); }
  function step(dir) {
    touched();
    var c = currentIndex(); if (!c) return;
    var all = cards(), i = all.indexOf(c);
    if (Math.abs(target(c) - pos) > 8 && dir > 0 && target(c) > pos) i -= 1;
    var next = all[Math.max(0, Math.min(all.length - 1, i + dir))];
    var to = target(next);
    if (reduce) { pos = to; normalise(); setScroll(pos); updateCount(); return; }
    tween = { from: pos, to: to, start: performance.now(), dur: 520 };
  }

  view.addEventListener("scroll", function () {
    if (settingScroll) { settingScroll = false; return; }
    // the visitor is swiping or scrolling by hand
    pos = view.scrollLeft; tween = null; touched();
    clearTimeout(view._t);
    view._t = setTimeout(function () { if (normalise()) setScroll(pos); updateCount(); }, 140);
  }, { passive: true });
  ["pointerdown", "touchstart", "wheel"].forEach(function (ev) { view.addEventListener(ev, touched, { passive: true }); });
  view.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hovering = true; });
  view.addEventListener("pointerleave", function () { hovering = false; });
  $("car").addEventListener("focusin", function () { focusedIn = true; });
  $("car").addEventListener("focusout", function (e) { if (!$("car").contains(e.relatedTarget)) focusedIn = false; });
  view.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });
  btnPrev.addEventListener("click", function () { step(-1); });
  btnNext.addEventListener("click", function () { step(1); });
  function syncPause() {
    btnPause.setAttribute("data-paused", userPaused ? "true" : "false");
    btnPause.setAttribute("aria-label", userPaused ? "Play the moving portraits" : "Pause the moving portraits");
  }
  btnPause.addEventListener("click", function () { userPaused = !userPaused; lastTouch = 0; syncPause(); });
  syncPause();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; }).observe(view);
  }
  window.addEventListener("resize", function () {
    var all = cards(); if (!all.length) return;
    var c = currentIndex(); setW = target(all[n]) - target(all[0]);
    pos = c ? target(c) : setW; normalise(); setScroll(pos);
  });

  /* Year tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function showYear(year, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-year") === year;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    $("panel-chefs").setAttribute("aria-labelledby", "tab-" + year);
    var list = year === "2026" ? D.chefs2026 : D.chefs2027;
    $("lineup").hidden = year !== "2026";
    buildCarousel(list);
    $("list-h").textContent = year === "2026" ? "2026 line-up" : "2027 line-up";
    var stars = $("stars"); stars.innerHTML = "";
    list.forEach(function (c) {
      var li = el("li");
      li.appendChild(el("b", null, c.name));
      if (c.role) li.appendChild(el("span", null, c.role));
      if (c.recognition) li.appendChild(el("em", null, c.recognition));
      stars.appendChild(li);
    });
    var mus = $("music"); mus.innerHTML = "";
    mus.appendChild(document.createTextNode("Music: "));
    mus.appendChild(el("span", null, year === "2026" ? D.music.y2026 : D.music.y2027 + " (confirmed)"));
    var srcSlot = $("chefs-src"); srcSlot.innerHTML = "";
    srcSlot.appendChild(sourceDrawer(year === "2026" ? D.chefsSource2026 : D.chefsSource2027));
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { showYear(t.getAttribute("data-year")); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var nt = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        showYear(nt.getAttribute("data-year"), true);
      }
    });
  });
  showYear("2027");
  requestAnimationFrame(frame);

  /* Gentle reveal on scroll */
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    document.querySelectorAll("main section .wrap > *, .hero .wrap > *").forEach(function (n) { n.classList.add("rv"); io.observe(n); });
  }
})();
