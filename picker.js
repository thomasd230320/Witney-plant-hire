// Witney Plant Hire — Equipment Finder Quiz
// Decision tree maps an answer pair to a list of inventory SKU slugs.
// Result cards are looked up from window.WPH_inv (basket.js) so they always
// reflect current stock + day rates.

(function () {
  "use strict";

  // ---- Decision tree ----------------------------------------------------
  // Each first-step option -> object with { label, follow }.
  // `follow` defines the second question and its answer mappings to either
  // skus[] (inventory SKU slugs to recommend) or page (a category page link).
  var FLOW = {
    dig: {
      label: "Digging or earthworks",
      icon: "M5 18h14M7 18v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6M9 14h6M3 18l9-12 9 12",
      q2: "How deep do you need to dig?",
      answers: [
        {
          label: "Up to 1.5 m — drainage, garden, shallow trench",
          skus: ["1-2-tonne-kubota-u10", "1-8-tonne-takeuchi-tb016"],
          page: "/plant-hire/excavators",
          note: "Mini diggers are best for tight access and shallow work."
        },
        {
          label: "1.5–3 m — footings, commercial trench",
          skus: ["3-tonne-takeuchi-tb228", "5-5-tonne-takeuchi-tb250"],
          page: "/plant-hire/excavators",
          note: "Midi excavators give the reach for footings without the bulk of a big machine."
        },
        {
          label: "3 m+ — civils, foundations, large jobs",
          skus: ["9-tonne-doosan-dx85r", "14-tonne-doosan-dx140lcr", "22-tonne-kobelco-sk210-10"],
          page: "/plant-hire/excavators",
          note: "Large excavators for civils — book a site survey for very deep digs."
        }
      ]
    },
    move: {
      label: "Moving spoil or muck",
      icon: "M3 17h14M5 17v-5a2 2 0 0 1 2-2h5l3 3v4M16 17h5",
      q2: "What scale of muck-shifting?",
      answers: [
        {
          label: "On-site dumper — small to medium loads",
          skus: ["thwaites-2-tonne-swivel-skip-dumper", "thwaites-6-tonne-dumper-truck", "terex-pt6000-6-tonne"],
          page: "/plant-hire/dumpers",
          note: "Self-drive dumpers — load with an excavator or skid steer."
        },
        {
          label: "Tight access — skid-steer style",
          skus: ["bobcat-t770-tracked-skid-steer-loader-4-5-ton", "case-410-skid-steer-loader"],
          page: "/plant-hire/skid-steers",
          note: "Skid steers can fit through a 1.2 m gate and handle tight yards."
        },
        {
          label: "Off-site / muck-away & tipper hire",
          skus: [],
          page: "/services/tipper-lorry-hire",
          note: "Our 8-wheel tipper service handles muck-away across Oxfordshire and the Cotswolds."
        }
      ]
    },
    lift: {
      label: "Lifting (people or materials)",
      icon: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5",
      q2: "What are you lifting?",
      answers: [
        {
          label: "Pallets or materials on site",
          skus: ["jcb-524-50-5-metre-compact-telescopic-forklift", "jcb-531-70-7-metre-telescopic", "manitou-mt625-6-metre-compact-telescopic"],
          page: "/plant-hire/forklift-truck",
          note: "Telescopic forklifts — reach 5–14 m. Tell us the lift height when you call."
        },
        {
          label: "People working at height",
          skus: ["nifty-120t-trailer-mount-boom-lift"],
          page: "/plant-hire/powered-access",
          note: "Powered access — Nifty boom lifts and scissor lifts available."
        },
        {
          label: "Heavy or one-off specialist lift",
          skus: [],
          page: "/services/crane-hire",
          note: "Our 32 t-m and 85 t-m Scania HIAB crane lorries handle specialist lifts UK-wide."
        }
      ]
    },
    brk: {
      label: "Breaking or demolition",
      icon: "M14 4l-6 9h4l-1 7 6-9h-4l1-7z",
      q2: "What scale of breaking?",
      answers: [
        {
          label: "On a digger — concrete, footings, large slabs",
          skus: ["9-tonne-doosan-dx85r", "14-tonne-doosan-dx140lcr"],
          page: "/plant-hire/excavators",
          note: "Excavator-mounted hydraulic breaker attachments available — ask when you call."
        },
        {
          label: "Handheld — kerbs, paths, smaller jobs",
          skus: [],
          page: "/tool-hire/breakers-drills",
          note: "Electric and hydraulic breakers, Kango hammers, SDS drills and demolition tools."
        }
      ]
    },
    compact: {
      label: "Compacting or rolling",
      icon: "M5 18h14M5 14h14M5 10h14M5 6h14",
      q2: "What surface are you compacting?",
      answers: [
        {
          label: "Trench / narrow sub-base",
          skus: ["bomag-bmp8500-remote-trench-roller", "bomag-80-roller"],
          page: "/plant-hire/rollers",
          note: "Trench rollers and walk-behind compactors for tight work."
        },
        {
          label: "Roads, drives, large sub-base",
          skus: ["bomag-100-adl-ride-on-roller", "bomag-bw120-ad-ride-on-roller", "volvo-dd25-120-ride-on-roller", "bomag-bw177d-5-7-ton-self-propelled-roller-pad-foot"],
          page: "/plant-hire/rollers",
          note: "Ride-on rollers up to 7 tonnes for tarmac and large areas."
        }
      ]
    },
    power: {
      label: "Power or lighting on site",
      icon: "M12 2v8m0 4v8M4 12h8m4 0h4",
      q2: "What do you need to power?",
      answers: [
        {
          label: "Floodlights / site lighting / 110v leads",
          skus: [],
          page: "/tool-hire/lighting-leads-safety",
          note: "Halogen lamps, festoon lighting, 110 v transformers and safety kit."
        },
        {
          label: "Tools, cabin, site office — a few kW",
          skus: [],
          page: "/plant-hire/generators",
          note: "Portable petrol and diesel generators sized for your load."
        },
        {
          label: "High-power industrial / large site",
          skus: [],
          page: "/plant-hire/generators",
          note: "Larger towable diesel generators — call to size correctly for your site."
        }
      ]
    }
  };

  // ---- Render ----------------------------------------------------------
  function money(n) {
    return "£" + Number(n).toLocaleString("en-GB");
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k === "html") e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  var app, state = { step1: null };

  function paint() {
    if (!state.step1) return renderStep1();
    if (!state.step2) return renderStep2();
    renderResult();
  }

  function renderStep1() {
    app.innerHTML = "";
    app.appendChild(el("p", { class: "picker-eyebrow" }, "Step 1 of 2"));
    app.appendChild(el("h2", { class: "picker-question" }, "What kind of job is it?"));
    var grid = el("div", { class: "picker-grid" });
    Object.keys(FLOW).forEach(function (key) {
      var f = FLOW[key];
      var btn = el("button", { type: "button", class: "picker-tile", "data-key": key });
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="' + f.icon + '"/></svg>' +
        '<span>' + f.label + '</span>';
      btn.addEventListener("click", function () {
        state.step1 = key;
        state.step2 = null;
        paint();
      });
      grid.appendChild(btn);
    });
    app.appendChild(grid);
  }

  function renderStep2() {
    var f = FLOW[state.step1];
    app.innerHTML = "";
    var back = el("button", { type: "button", class: "picker-back" },
      "&larr; Back");
    back.addEventListener("click", function () { state.step1 = null; paint(); });
    app.appendChild(back);
    app.appendChild(el("p", { class: "picker-eyebrow" }, "Step 2 of 2 &middot; " + f.label));
    app.appendChild(el("h2", { class: "picker-question" }, f.q2));
    var list = el("div", { class: "picker-options" });
    f.answers.forEach(function (a, i) {
      var b = el("button", { type: "button", class: "picker-option", "data-idx": String(i) },
        a.label);
      b.addEventListener("click", function () {
        state.step2 = i;
        paint();
      });
      list.appendChild(b);
    });
    app.appendChild(list);
  }

  function renderResult() {
    var f = FLOW[state.step1];
    var a = f.answers[state.step2];
    app.innerHTML = "";

    var actions = el("div", { class: "picker-actions" });
    var back = el("button", { type: "button", class: "picker-back" }, "&larr; Change my answer");
    back.addEventListener("click", function () { state.step2 = null; paint(); });
    var restart = el("button", { type: "button", class: "picker-restart" }, "Start again");
    restart.addEventListener("click", function () { state.step1 = null; state.step2 = null; paint(); });
    actions.appendChild(back);
    actions.appendChild(restart);
    app.appendChild(actions);

    app.appendChild(el("p", { class: "picker-eyebrow" }, "Recommended for you"));
    app.appendChild(el("h2", { class: "picker-question" }, "Based on your answers, we'd suggest:"));
    if (a.note) app.appendChild(el("p", { class: "picker-note" }, a.note));

    var inv = window.WPH_inv || {};
    var img = window.WPH_itemImage || function () { return "/images/wph-placeholder.svg"; };

    var grid = el("div", { class: "picker-result-grid" });
    var found = 0;
    a.skus.forEach(function (sku) {
      var data = inv[sku];
      if (!data) return;
      found += 1;
      var card = el("article", { class: "picker-result-card" });
      var src = img(sku, data);
      card.innerHTML =
        '<div class="picker-result-media"><img loading="lazy" src="' + src + '" alt="' + data.name + '" /></div>' +
        '<div class="picker-result-body">' +
          '<p class="picker-result-cat">' + (data.cat || "") + '</p>' +
          '<h3>' + data.name + '</h3>' +
          '<p class="picker-result-price">From <strong>' + money(data.day) + '</strong> / day</p>' +
          '<a class="btn" href="' + a.page + '">View this hire &rarr;</a>' +
        '</div>';
      grid.appendChild(card);
    });
    if (found === 0) {
      // Page-only recommendation (e.g. crane hire, tipper hire) — show a CTA card
      var card = el("article", { class: "picker-result-card picker-result-card--cta" });
      card.innerHTML =
        '<div class="picker-result-body">' +
          '<h3>Browse the full range</h3>' +
          '<p>' + (a.note || "") + '</p>' +
          '<a class="btn" href="' + a.page + '">Open this hire page &rarr;</a>' +
        '</div>';
      grid.appendChild(card);
    } else {
      // also add a "see all" tile
      var more = el("article", { class: "picker-result-card picker-result-card--more" });
      more.innerHTML =
        '<div class="picker-result-body">' +
          '<h3>See the full range</h3>' +
          '<p>Browse every option in this category with live prices and stock.</p>' +
          '<a class="btn btn-ghost" href="' + a.page + '">All ' + (FLOW[state.step1].label.toLowerCase()) + ' options &rarr;</a>' +
        '</div>';
      grid.appendChild(more);
    }
    app.appendChild(grid);

    app.appendChild(el("p", { class: "picker-footnote" },
      'Not sure? Call our hire desk on <a href="tel:+441993708020">01993 708020</a> &mdash; we&rsquo;ll talk through your job and confirm the right machine.'));
  }

  // ---- Boot ------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    app = document.getElementById("picker-app");
    if (!app) return;
    paint();
  });
})();
