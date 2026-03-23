/**
 * Grupo 77A S.A.C. — navegación, navbar y validación del formulario
 */

(function () {
  "use strict";

  const navbar = document.querySelector(".navbar-main") || document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const sections = document.querySelectorAll("section[id]");
  const pageId = document.body.dataset.page;

  if (pageId) {
    document.querySelectorAll(".navbar .nav-link[data-nav]").forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === pageId);
    });
  }

  function onScroll() {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (!pageId && sections.length) {
      let current = "";
      const scrollY = window.scrollY + 120;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = section.getAttribute("id") || "";
        }
      });

      navLinks.forEach((link) => {
        if (link.dataset.nav) return;
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${current}`) {
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Cerrar menú móvil al hacer clic en un enlace
  const collapse = document.querySelector(".navbar-collapse");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (collapse?.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);
        bsCollapse.hide();
      }
    });
  });

  // Formulario — validación básica
  const form = document.getElementById("contactForm");
  const alertSuccess = document.getElementById("formSuccess");

  function showFieldError(input, message) {
    input.classList.add("is-invalid");
    const fb = input.parentElement.querySelector(".invalid-feedback");
    if (fb) fb.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove("is-invalid");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 15;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("was-validated");

      const nombre = form.querySelector("#nombre");
      const email = form.querySelector("#email");
      const telefono = form.querySelector("#telefono");
      const mensaje = form.querySelector("#mensaje");

      let ok = true;

      [nombre, email, telefono, mensaje].forEach(clearFieldError);

      if (!nombre.value.trim()) {
        showFieldError(nombre, "Indique su nombre.");
        ok = false;
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        showFieldError(email, "Introduzca un correo electrónico válido.");
        ok = false;
      }

      if (!telefono.value.trim() || !isValidPhone(telefono.value)) {
        showFieldError(telefono, "Introduzca un teléfono válido (mín. 9 dígitos).");
        ok = false;
      }

      if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        showFieldError(mensaje, "El mensaje debe tener al menos 10 caracteres.");
        ok = false;
      }

      if (!ok) return;

      if (alertSuccess) {
        alertSuccess.classList.remove("d-none");
        alertSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      form.reset();
      form.classList.remove("was-validated");
    });

    form.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("input", function () {
        clearFieldError(el);
        if (alertSuccess) alertSuccess.classList.add("d-none");
      });
    });
  }
})();
