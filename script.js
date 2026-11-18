/* =========================================================
   Siphelele Malotana — Portfolio scripts
   Shared by the homepage and project case-study pages.
   Every block checks its elements exist, so pages can omit them.
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;

  /* ---------- Theme toggle (saved between visits) ---------- */
  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    const dark = theme === "dark";
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(dark));
      themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.innerHTML = dark
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
    }
  }

  if (themeToggle) {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  function setMenu(open) {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuToggle.innerHTML = open
      ? '<i class="fas fa-xmark" aria-hidden="true"></i>'
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        setMenu(false);
        menuToggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("is-open") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- Header shadow + back-to-top ---------- */
  const header = document.querySelector(".site-header");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      const target = document.getElementById("main");
      if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
    });
  }

  /* ---------- Current-section highlight in the nav ---------- */
  if (navLinks && "IntersectionObserver" in window) {
    const links = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll(".copy-btn[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      const label = btn.querySelector(".copy-label");
      try {
        await navigator.clipboard.writeText(value);
        btn.classList.add("is-copied");
        if (label) label.textContent = "Copied";
        btn.setAttribute("aria-label", "Email address copied");
        setTimeout(() => {
          btn.classList.remove("is-copied");
          if (label) label.textContent = "Copy";
          btn.setAttribute("aria-label", "Copy email address");
        }, 2000);
      } catch (e) {
        window.location.href = "mailto:" + value;
      }
    });
  });

  /* ---------- Contact form (EmailJS) ---------- */
  const EMAILJS_PUBLIC_KEY = "D5_iZOaeAj2N1-vcU";
  const EMAILJS_SERVICE = "service_22b95u5";
  const EMAILJS_TEMPLATE = "template_hbmmbkn";

  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  function setStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle("is-error", !!isError);
  }

  function validate(form) {
    let firstInvalid = null;
    form.querySelectorAll("input, textarea").forEach((el) => {
      const ok = el.checkValidity() && el.value.trim() !== "";
      el.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    return firstInvalid;
  }

  if (contactForm) {
    contactForm.addEventListener("input", (e) => {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity() && e.target.value.trim()) {
        e.target.setAttribute("aria-invalid", "false");
      }
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const invalid = validate(this);
      if (invalid) {
        const label = this.querySelector('label[for="' + invalid.id + '"]');
        const name = label ? label.textContent.toLowerCase() : "this field";
        setStatus(invalid.type === "email" && invalid.value.trim()
          ? "Enter a valid email address, like name@example.com."
          : "Add your " + name + " to send the message.", true);
        invalid.focus();
        return;
      }

      if (typeof window.emailjs === "undefined") {
        setStatus("The form couldn't load. Email me directly at ririemalotana@gmail.com.", true);
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      setStatus("");

      const name = this.from_name.value.trim();
      const email = this.reply_to.value.trim();
      const formData = {
        from_name: name,
        name: name,            // kept for EmailJS template compatibility
        reply_to: email,
        email: email,          // kept for EmailJS template compatibility
        subject: this.subject.value.trim(),
        message: this.message.value.trim()
      };

      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      window.emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formData)
        .then(() => {
          contactForm.outerHTML =
            '<div class="form-success" role="status" tabindex="-1" id="form-success">' +
              '<i class="fas fa-circle-check" aria-hidden="true"></i>' +
              "<h3>Message sent</h3>" +
              "<p>Thank you for getting in touch. I'll reply to " + email.replace(/[<>&"]/g, "") + " soon.</p>" +
            "</div>";
          const done = document.getElementById("form-success");
          if (done) done.focus();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          setStatus("The message didn't send. Try again, or email me directly at ririemalotana@gmail.com.", true);
        });
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
