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

  // ---- Enhance catalogue list items on hire pages ----
  function enhanceCatalogue() {
    var lis = document.querySelectorAll(".catalog-block li");
    lis.forEach(function (li) {
      var label = li.textContent.trim();
      var sku = slugify(label);
      var data = inv[sku];
      if (!data) return;

      li.classList.add("hireable");
      if (li.parentElement) li.parentElement.classList.add("hire-list");
      li.textContent = "";

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

      li.appendChild(nameEl);
      li.appendChild(badge);
      li.appendChild(price);
      li.appendChild(btn);
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
