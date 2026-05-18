// Witney Plant Hire — stock badges + hire basket (demo, client-side only)

(function () {
  "use strict";

  var BASKET_KEY = "wph_basket";
  var USER_KEY = "wph_user";

  function slugify(s) {
    return String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function money(n) {
    return "£" + Number(n).toLocaleString("en-GB");
  }

  // ---- Inventory map (keyed by slug) ----
  var inv = {};
  (window.WPH_INVENTORY || []).forEach(function (item) {
    inv[slugify(item.name)] = item;
  });

  // ---- Basket state (localStorage) ----
  function getBasket() {
    try {
      return JSON.parse(localStorage.getItem(BASKET_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveBasket(b) {
    localStorage.setItem(BASKET_KEY, JSON.stringify(b));
    updateCount();
  }

  function basketCount() {
    return getBasket().reduce(function (n, l) {
      return n + l.qty;
    }, 0);
  }

  function updateCount() {
    var n = basketCount();
    document.querySelectorAll("[data-basket-count]").forEach(function (el) {
      el.textContent = n;
      el.classList.toggle("has-items", n > 0);
    });
  }

  function addToBasket(sku) {
    var item = inv[sku];
    if (!item || item.available <= 0) return;
    var b = getBasket();
    var line = b.filter(function (l) {
      return l.sku === sku;
    })[0];
    if (line) {
      if (line.qty < item.available) line.qty += 1;
    } else {
      b.push({
        sku: sku,
        name: item.name,
        day: item.day,
        week: item.week,
        available: item.available,
        qty: 1,
        units: 1,
        duration: "day"
      });
    }
    saveBasket(b);
  }

  // ---- Stock badge helper ----
  function stockState(available) {
    if (available <= 0) return { cls: "out", text: "Out on hire" };
    if (available <= 2) return { cls: "low", text: "Low stock (" + available + " left)" };
    return { cls: "in", text: "In stock" };
  }

  // ---- Equipment imagery ----
  // Per-machine photos (keyed by name, slugified at runtime so it always
  // matches the catalogue text).
  var ITEM_IMG_BY_NAME = {
    "1.2 Tonne Kubota U10": "images/plant/IMG_3331-removebg-preview-1.png",
    "1.8 Tonne Takeuchi TB016": "images/plant/Takeuchi_TB016_1.8T_Excavator.png",
    "3 Tonne Takeuchi TB228": "images/plant/Takeuchi_TB228_3T_Excavator.png",
    "3 Tonne Hitachi ZX27R": "images/plant/Hitachi_ZX27R_Mini_Excavator.png",
    "5.5 Tonne Takeuchi TB250": "images/plant/Takeuchi_TB250_5.5T_Excavator.png",
    "6 Tonne Doosan DX63R": "images/plant/Doosan_DX63R_6T_Excavator.png",
    "9 Tonne Doosan DX85R": "images/plant/Doosan_DX85R_9T_Excavator.png",
    "14 Tonne Doosan DX140LCR": "images/plant/Doosan_DX140LCR_14T_Excavator.png",
    "22 Tonne Kobelco SK210-10": "images/plant/crawler-excavators-sk-210-lc-11-kobelco(6).jpg",
    "JCB 524-50 - 5 Metre Compact Telescopic Forklift": "images/plant/JCB_524-50_5M_Compact_Forklift.png",
    "JCB 531-70 - 7 Metre Telescopic": "images/plant/JCB_531-70_7M_Forklift.png",
    "JCB 535-95 - 9.5 Metre Telescopic": "images/plant/JCB_535-95_9.5M_Forklift.png",
    "JCB 533-105 - 10 Metre Telescopic": "images/plant/JCB_Telehandler_Compact.png",
    "Manitou MT625 - 6 Metre Compact Telescopic": "images/plant/Manitou_Telehandler_Forklift.png",
    "Manitou MT1335SL - 13 Metre Telescopic": "images/plant/Manitou_Telehandler_Forklift.png",
    "Merlo P25.6 - 6 Metre Compact Telescopic": "images/plant/Merlo_P25_P34_Telescopic_Forklift.png",
    "Merlo P34.7 - 7 Metre Telescopic": "images/plant/Merlo_P25_P34_Telescopic_Forklift.png",
    "Terex PT6000 6 Tonne": "images/plant/Terex_PT6000_Dumper_Truck.png",
    "Volvo ED750 Skip Loading Machine": "images/plant/Volvo_ED750_Dumper_Truck.png",
    "Bobcat T770 Tracked Skid Steer Loader 4.5 Ton": "images/plant/Bobcat_T650_Skid_Steer.png",
    "Case 410 Skid Steer Loader": "images/plant/Case_410_Skid_Steer_Loader.png",
    "Bomag 100 ADL - Ride-on Roller": "images/plant/Bomag_BW100_Roller.png",
    "Bomag BMP8500 - Remote Trench Roller": "images/plant/Bomag_BMP8500_Trench_Roller.png",
    "Bomag BW177D-5 - 7 Ton Self-Propelled Roller (Pad Foot)": "images/plant/Bomag_BW177D-5_Padfoot_Roller.png",
    "Volvo DD25 - 120 Ride-on Roller": "images/plant/Volvo_DD25_Roller.png",
    "Nifty 120T Trailer Mount Boom Lift": "images/plant/Nifty_120T_Trailer_Boom_Lift.png"
  };
  var itemImg = {};
  Object.keys(ITEM_IMG_BY_NAME).forEach(function (n) {
    itemImg[slugify(n)] = ITEM_IMG_BY_NAME[n];
  });

  // Category fallback photos (used when an item has no dedicated shot).
  var CAT_IMG = {
    "Excavators": "images/plant/Doosan_DX85R_9T_Excavator.png",
    "Forklift Trucks": "images/plant/JCB_531-70_7M_Forklift.png",
    "Dumper Trucks": "images/plant/Thwaites_Dumper_Truck.png",
    "Generators": "images/plant/Honda_EC2200_Generator_Petrol.png",
    "Compressors": "images/plant/Atlas_Copco_XASS_Compressor.png",
    "Skid Steers": "images/plant/Bobcat_T650_Skid_Steer.png",
    "Rollers": "images/plant/Bomag_80_Roller.png",
    "Chippers": "images/plant/GTS_1300_Petrol_Wood_Chipper.png",
    "Powered Access": "images/plant/Scissor_Lift_Powered_Access.png",
    "Compaction": "images/plant/Compaction_Vibrating_Plate.png",
    "Concreting": "images/plant/Concrete_Mixer_Belle_Baromix.png"
  };

  function itemImage(sku, data) {
    return (
      itemImg[sku] ||
      CAT_IMG[data.cat] ||
      "https://placehold.co/600x450?text=" + encodeURIComponent(data.name)
    );
  }

  // ---- Turn catalogue list items into hire product cards ----
  function enhanceCatalogue() {
    // Photos now live inside each card — drop the separate galleries.
    document.querySelectorAll(".catalog-gallery").forEach(function (g) {
      g.remove();
    });

    document.querySelectorAll(".catalog-block li").forEach(function (li) {
      var label = li.textContent.trim();
      var sku = slugify(label);
      var data = inv[sku];
      if (!data) return;

      li.classList.add("hireable");
      if (li.parentElement) li.parentElement.classList.add("hire-list");
      li.textContent = "";

      var media = document.createElement("div");
      media.className = "hire-card-media";
      var img = document.createElement("img");
      img.loading = "lazy";
      img.src = itemImage(sku, data);
      img.alt = data.name;
      media.appendChild(img);

      var body = document.createElement("div");
      body.className = "hire-card-body";

      var nameEl = document.createElement("span");
      nameEl.className = "item-name";
      nameEl.textContent = label;

      var st = stockState(data.available);
      var badge = document.createElement("span");
      badge.className = "stock-badge stock-" + st.cls;
      badge.textContent = st.text;

      var price = document.createElement("span");
      price.className = "item-price";
      price.innerHTML = money(data.day) + "<small> / day</small>";

      var meta = document.createElement("div");
      meta.className = "hire-card-meta";
      meta.appendChild(badge);
      meta.appendChild(price);

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "add-btn";
      if (data.available <= 0) {
        btn.disabled = true;
        btn.textContent = "Unavailable";
      } else {
        btn.textContent = "Add to basket";
        btn.addEventListener("click", function () {
          addToBasket(sku);
          btn.classList.add("added");
          btn.textContent = "Added ✓";
          setTimeout(function () {
            btn.classList.remove("added");
            btn.textContent = "Add to basket";
          }, 1400);
        });
      }

      body.appendChild(nameEl);
      body.appendChild(meta);
      body.appendChild(btn);
      li.appendChild(media);
      li.appendChild(body);
    });
  }

  // ================= Basket page controller =================
  function initBasketPage() {
    var page = document.getElementById("basket-page");
    if (!page) return;

    var contents = document.getElementById("basket-contents");
    var signinForm = document.getElementById("signin-form");
    var signedIn = document.getElementById("signed-in");
    var userEmailEl = document.getElementById("user-email");
    var signoutBtn = document.getElementById("signout-btn");
    var sendBtn = document.getElementById("send-enquiry");
    var sendHint = document.getElementById("send-hint");
    var confirmation = document.getElementById("confirmation");
    var sigName = document.getElementById("sig-name");
    var sigAgree = document.getElementById("sig-agree");
    var canvas = document.getElementById("sig-canvas");

    var sigMethod = "draw";
    var hasDrawn = false;

    // ---- Render basket ----
    function rate(line) {
      return line.duration === "week" ? line.week : line.day;
    }
    function lineTotal(line) {
      return rate(line) * line.units * line.qty;
    }

    function renderBasket() {
      var b = getBasket();
      if (!b.length) {
        contents.innerHTML =
          '<p class="basket-empty">Your basket is empty. ' +
          'Browse our <a href="plant-hire.html">plant</a>, ' +
          '<a href="tool-hire.html">tools</a> and ' +
          '<a href="services.html">services</a> to add equipment.</p>';
        refreshGate();
        return;
      }

      var rows = b
        .map(function (line) {
          var maxQty = line.available || 1;
          return (
            '<tr data-sku="' + line.sku + '">' +
            '<td data-label="Equipment">' + line.name + "</td>" +
            '<td data-label="Period">' +
            '<select data-field="duration">' +
            '<option value="day"' + (line.duration === "day" ? " selected" : "") + ">Per day (" + money(line.day) + ")</option>" +
            '<option value="week"' + (line.duration === "week" ? " selected" : "") + ">Per week (" + money(line.week) + ")</option>" +
            "</select></td>" +
            '<td data-label="Duration"><input type="number" min="1" value="' + line.units + '" data-field="units" aria-label="number of ' + line.duration + 's"></td>' +
            '<td data-label="Machines"><input type="number" min="1" max="' + maxQty + '" value="' + line.qty + '" data-field="qty" aria-label="number of machines"></td>' +
            '<td data-label="Line total" class="line-total">' + money(lineTotal(line)) + "</td>" +
            '<td><button type="button" class="remove-btn" data-field="remove" aria-label="Remove ' + line.name + '">Remove</button></td>' +
            "</tr>"
          );
        })
        .join("");

      var grand = b.reduce(function (t, l) {
        return t + lineTotal(l);
      }, 0);

      contents.innerHTML =
        '<table class="basket-table"><thead><tr>' +
        "<th>Equipment</th><th>Period</th><th>Duration</th><th>Machines</th><th>Line total</th><th></th>" +
        "</tr></thead><tbody>" + rows + "</tbody>" +
        '<tfoot><tr><td colspan="4">Estimated total (excl. VAT &amp; delivery)</td>' +
        '<td class="grand-total">' + money(grand) + "</td><td></td></tr></tfoot></table>";

      refreshGate();
    }

    // Basket edits (event delegation)
    contents.addEventListener("change", function (e) {
      var field = e.target.getAttribute("data-field");
      if (!field) return;
      var tr = e.target.closest("tr");
      var sku = tr.getAttribute("data-sku");
      var b = getBasket();
      var line = b.filter(function (l) { return l.sku === sku; })[0];
      if (!line) return;
      if (field === "duration") line.duration = e.target.value;
      if (field === "units") line.units = Math.max(1, parseInt(e.target.value, 10) || 1);
      if (field === "qty") {
        var q = Math.max(1, parseInt(e.target.value, 10) || 1);
        if (line.available) q = Math.min(q, line.available);
        line.qty = q;
      }
      saveBasket(b);
      renderBasket();
    });

    contents.addEventListener("click", function (e) {
      if (e.target.getAttribute("data-field") !== "remove") return;
      var sku = e.target.closest("tr").getAttribute("data-sku");
      saveBasket(getBasket().filter(function (l) { return l.sku !== sku; }));
      renderBasket();
    });

    // ---- Sign in (demo) ----
    function currentUser() {
      return sessionStorage.getItem(USER_KEY) || "";
    }
    function renderUser() {
      var email = currentUser();
      if (email) {
        userEmailEl.textContent = email;
        signedIn.hidden = false;
        signinForm.hidden = true;
      } else {
        signedIn.hidden = true;
        signinForm.hidden = false;
      }
      refreshGate();
    }

    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("signin-email").value.trim();
      var err = document.getElementById("signin-error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = "Please enter a valid email address.";
        err.hidden = false;
        return;
      }
      err.hidden = true;
      sessionStorage.setItem(USER_KEY, email);
      renderUser();
    });

    signoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem(USER_KEY);
      signinForm.reset();
      renderUser();
    });

    // ---- Signature ----
    document.querySelectorAll("[data-sigtab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        sigMethod = tab.getAttribute("data-sigtab");
        document.querySelectorAll("[data-sigtab]").forEach(function (t) {
          t.classList.toggle("active", t === tab);
        });
        document.getElementById("sig-draw").hidden = sigMethod !== "draw";
        document.getElementById("sig-type").hidden = sigMethod !== "type";
        refreshGate();
      });
    });

    var ctx = canvas.getContext("2d");
    function sizeCanvas() {
      var w = canvas.clientWidth || 400;
      canvas.width = w;
      canvas.height = 160;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#1A1A1A";
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    var drawing = false;
    function pos(e) {
      var r = canvas.getBoundingClientRect();
      var p = e.touches ? e.touches[0] : e;
      return { x: p.clientX - r.left, y: p.clientY - r.top };
    }
    function start(e) {
      drawing = true;
      var p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      e.preventDefault();
    }
    function move(e) {
      if (!drawing) return;
      var p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      hasDrawn = true;
      e.preventDefault();
    }
    function end() {
      drawing = false;
      refreshGate();
    }
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);

    document.getElementById("sig-clear").addEventListener("click", function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn = false;
      refreshGate();
    });

    [sigName, sigAgree].forEach(function (el) {
      el.addEventListener("input", refreshGate);
      el.addEventListener("change", refreshGate);
    });

    // ---- Gating ----
    function agreementSigned() {
      if (!sigName.value.trim() || !sigAgree.checked) return false;
      return sigMethod === "draw" ? hasDrawn : true;
    }

    function refreshGate() {
      var hasItems = getBasket().length > 0;
      var signedIn = !!currentUser();
      var signed = agreementSigned();
      var ready = hasItems && signedIn && signed;
      sendBtn.disabled = !ready;
      var msg = "Ready to send your hire enquiry.";
      if (!hasItems) msg = "Add equipment to your basket to continue.";
      else if (!signedIn) msg = "Please sign in with your email to continue.";
      else if (!signed) msg = "Enter your name, sign the agreement and tick the box to continue.";
      sendHint.textContent = msg;
    }

    // ---- Send enquiry (demo) ----
    sendBtn.addEventListener("click", function () {
      var b = getBasket();
      if (!b.length || !currentUser() || !agreementSigned()) return;

      var grand = b.reduce(function (t, l) { return t + lineTotal(l); }, 0);
      var ref = "WPH-" + Math.floor(10000 + Math.random() * 89999);
      var lines = b
        .map(function (l) {
          return (
            "<li>" + l.qty + " &times; " + l.name + " &mdash; " +
            l.units + " " + l.duration + (l.units > 1 ? "s" : "") +
            " @ " + money(rate(l)) + "/" + l.duration +
            " = " + money(lineTotal(l)) + "</li>"
          );
        })
        .join("");

      confirmation.innerHTML =
        '<h2>Enquiry sent &mdash; ' + ref + "</h2>" +
        "<p>Your hire enquiry has been sent from <strong>" + currentUser() +
        "</strong> to <strong>enquiries@witneyplanthire.com</strong>. " +
        "Our hire desk will confirm availability and pricing shortly.</p>" +
        "<ul class=\"confirm-list\">" + lines + "</ul>" +
        '<p class="confirm-total">Estimated total: ' + money(grand) +
        " (excl. VAT &amp; delivery)</p>" +
        "<p>Hire agreement accepted and signed by <strong>" +
        sigName.value.trim() + "</strong> (" + sigMethod + " signature).</p>" +
        '<p class="demo-note">Demo site &mdash; no email is actually sent and no ' +
        "card is charged. Stock figures are sample data standing in for the " +
        "inspHire fleet system.</p>";
      confirmation.hidden = false;

      saveBasket([]);
      renderBasket();
      page.querySelectorAll(".checkout-step").forEach(function (s) {
        s.hidden = true;
      });
      confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // initial paint
    renderBasket();
    renderUser();
  }

  // ---- Boot ----
  document.addEventListener("DOMContentLoaded", function () {
    enhanceCatalogue();
    updateCount();
    initBasketPage();
  });
})();
