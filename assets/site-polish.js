/* Site-wide polish: scroll reveals, number count-ups and the drawing timeline.
   Does nothing for visitors who ask their device for reduced motion. */
(function () {
    "use strict";
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var root = document.documentElement;
    root.classList.add("motion");

    /* Reveal on scroll, with a short stagger between neighbouring items */
    var targets = document.querySelectorAll(".section-title, .v2-lead, .v2-card, .v2-post, .v2-role, .v2-proof li, .v2-principles li, .v2-bio, .v2-contact, .v2-stats li, .blog-card, .fw-card, .section-card");
    var reveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
        });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el) {
        if (!el.classList.contains("section-title")) {
            var i = Array.prototype.indexOf.call(el.parentNode.children, el);
            el.style.setProperty("--d", (Math.min(i, 5) * 0.07).toFixed(2) + "s");
            el.classList.add("rv");
        }
        reveal.observe(el);
    });

    /* Count the headline numbers up from zero; the final text is exactly what is written in the page */
    function countUp(el) {
        // "8 → 1,000+" counts the number after the arrow; "15 of 21" counts the first number
        var pickLast = el.textContent.indexOf("\u2192") > -1;
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), node, best = null;
        while ((node = walker.nextNode())) {
            var re = /\d[\d,]*/g, m;
            while ((m = re.exec(node.nodeValue))) {
                if (best && !pickLast) break;
                best = { node: node, start: m.index, len: m[0].length, n: parseInt(m[0].replace(/,/g, ""), 10), commas: m[0].indexOf(",") > -1 };
            }
            if (best && !pickLast) break;
        }
        if (!best || best.n < 2) return;
        var original = best.node.nodeValue, before = original.slice(0, best.start), after = original.slice(best.start + best.len);
        var t0 = null, dur = 1300;
        function fmt(v) { return best.commas ? v.toLocaleString("en-GB") : String(v); }
        function tick(t) {
            if (!t0) t0 = t;
            var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
            best.node.nodeValue = before + fmt(Math.round(best.n * e)) + after;
            if (k < 1) requestAnimationFrame(tick); else best.node.nodeValue = original;
        }
        requestAnimationFrame(tick);
    }
    var counters = document.querySelectorAll(".v2-proof strong, .v2-stats strong");
    var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); countIO.unobserve(e.target); } });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { countIO.observe(el); });

    /* Timeline line draws as you scroll, and each role's dot lights up as you reach it */
    var tl = document.querySelector(".v2-timeline");
    if (tl) {
        var roles = tl.querySelectorAll(".v2-role"), queued = false;
        var update = function () {
            queued = false;
            var r = tl.getBoundingClientRect(), vh = window.innerHeight;
            var p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
            tl.style.setProperty("--tl", p.toFixed(3));
            Array.prototype.forEach.call(roles, function (role) {
                role.classList.toggle("lit", role.getBoundingClientRect().top < vh * 0.75);
            });
        };
        window.addEventListener("scroll", function () { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
        window.addEventListener("resize", update);
        update();
    }
})();
