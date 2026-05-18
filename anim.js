// Witney Plant Hire — scroll animations & UI motion (vanilla JS)

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll progress bar ---- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  /* ---- Back-to-top button ---- */
  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = "↑";
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });
  document.body.appendChild(toTop);

  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var heroImg = hero ? hero.querySelector("img") : null;

  /* ---- Scrolling digger band (injected before the footer) ---- */
  var footer = document.querySelector(".site-footer");
  var band = null;
  var digger = null;
  if (footer) {
    band = document.createElement("div");
    band.className = "digger-band";
    band.setAttribute("aria-hidden", "true");
    band.innerHTML =
      '<span class="sky-note">Plant &amp; Tool Hire — On Site Across Oxfordshire</span>' +
      '<div class="ground"></div>' +
      '<svg class="digger" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">' +
        '<g class="dig-boom">' +
          '<path d="M88 74 L150 40" fill="none" stroke="#F97316" stroke-width="13" stroke-linecap="round"/>' +
          '<path d="M150 40 L176 90" fill="none" stroke="#EA6A0C" stroke-width="11" stroke-linecap="round"/>' +
          '<path d="M168 84 q-5 18 13 20 q11 1 13 -9 l-7 -2 q-2 7 -9 5 q-7 -2 -4 -12 z" fill="#0F172A"/>' +
        "</g>" +
        '<ellipse class="dust" cx="168" cy="104" rx="15" ry="7" fill="#94A3B8"/>' +
        '<rect x="14" y="100" width="156" height="22" rx="11" fill="#0F172A"/>' +
        '<circle cx="34" cy="111" r="7" fill="#64748B"/>' +
        '<circle cx="66" cy="111" r="7" fill="#64748B"/>' +
        '<circle cx="98" cy="111" r="7" fill="#64748B"/>' +
        '<circle cx="130" cy="111" r="7" fill="#64748B"/>' +
        '<circle cx="156" cy="111" r="7" fill="#64748B"/>' +
        '<rect x="30" y="72" width="18" height="30" rx="5" fill="#0F172A"/>' +
        '<rect x="40" y="66" width="96" height="38" rx="7" fill="#1E293B"/>' +
        '<rect x="48" y="42" width="48" height="28" rx="6" fill="#64748B"/>' +
        '<rect x="53" y="48" width="22" height="15" rx="2" fill="#E2E8F0"/>' +
      "</svg>";
    footer.parentNode.insertBefore(band, footer);
    digger = band.querySelector(".digger");
    if (reduced && digger) digger.style.left = "12%";
  }

  /* ---- Reveal-on-scroll ---- */
  if (!reduced) {
    var staggerGroup = function (containerSel, childSel, step, variant) {
      document.querySelectorAll(containerSel).forEach(function (c) {
        c.querySelectorAll(childSel).forEach(function (el, i) {
          el.classList.add("reveal");
          if (variant) el.classList.add(variant);
          el.style.transitionDelay = Math.min(i * step, 600) + "ms";
        });
      });
    };
    var single = function (sel, variant) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add("reveal");
        if (variant) el.classList.add(variant);
      });
    };

    single(".hero-title", "reveal-zoom");
    staggerGroup(".intro-inner", ":scope > h1, :scope > .subhead, :scope > p", 70);
    staggerGroup(".cards-grid", ".card", 100, "reveal-zoom");
    staggerGroup(".subgrid", "a", 55);
    staggerGroup(".catalog", ".catalog-block", 90);
    staggerGroup(".catalog-gallery", "figure", 45);
    staggerGroup(".intro-inner", ".news-item", 90);
    staggerGroup("#basket-page", ".checkout-step", 100);
    single(".contact-form", "reveal-left");
    single(".address-box", "reveal-right");

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---- Scroll-driven effects ---- */
  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docH > 0 ? (st / docH) * 100 : 0) + "%";

    if (header) header.classList.toggle("scrolled", st > 30);
    toTop.classList.toggle("show", st > 480);

    if (!reduced && heroImg && hero) {
      var hp = Math.min(st / (hero.offsetHeight || 1), 1);
      heroImg.style.transform = "scale(" + (1 + hp * 0.12) + ")";
    }

    if (!reduced && band && digger) {
      var r = band.getBoundingClientRect();
      var vh = window.innerHeight;
      var prog = (vh - r.top) / (vh + r.height);
      prog = prog < 0 ? 0 : prog > 1 ? 1 : prog;
      var travel = band.offsetWidth + 260;
      digger.style.transform = "translateX(" + (prog * travel - 230) + "px)";
    }
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll);
  onScroll();
})();
