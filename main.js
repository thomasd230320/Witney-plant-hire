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

  // Basic contact form feedback (no backend)
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-status");
      if (note) {
        note.textContent =
          "Thank you — your enquiry has been noted. We will be in touch shortly.";
        note.hidden = false;
      }
      form.reset();
    });
  }
})();
