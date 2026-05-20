// Witney Plant Hire Ltd — site scripts

(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when a link is chosen
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active nav link should not navigate/reload — it just marks the
  // current section. The orange underline (.active) stays put.
  document.querySelectorAll(".main-nav a.active").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  // Collapsible "Info" disclosures
  document.querySelectorAll(".info-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest(".info-disclosure");
      if (!wrap) return;
      var open = wrap.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Sticky mobile contact bar (injected once, shown on small screens via CSS)
  if (!document.querySelector(".mobile-bar")) {
    var phoneIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    var quoteIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    var cartIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
    var mbar = document.createElement("nav");
    mbar.className = "mobile-bar";
    mbar.setAttribute("aria-label", "Quick contact");
    mbar.innerHTML =
      '<a href="tel:+441993708020">' + phoneIcon + "<span>Call Us</span></a>" +
      '<a href="/contact">' + quoteIcon + "<span>Get a Quote</span></a>" +
      '<a href="/basket">' + cartIcon +
      '<span class="mobile-bar-count" data-basket-count aria-label="items in basket">0</span>' +
      "<span>Basket</span></a>";
    document.body.appendChild(mbar);
  }

  // Basic contact form feedback (no backend). Works for any .contact-form;
  // each form can supply a custom success message via data-success="...".
  document.querySelectorAll(".contact-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("#form-status") ||
                 document.getElementById("form-status");
      if (note) {
        note.innerHTML = form.getAttribute("data-success") ||
          "Thank you &mdash; your enquiry has been noted. We will be in touch shortly.";
        note.hidden = false;
        note.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });
})();
