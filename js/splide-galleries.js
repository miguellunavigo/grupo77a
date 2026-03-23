/**
 * Carruseles Splide — servicios, inicio y nosotros
 */
(function () {
  "use strict";

  if (typeof Splide === "undefined") return;

  var reduceMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var common = {
    type: "loop",
    perPage: 1,
    autoplay: !reduceMotion,
    interval: 4500,
    pauseOnHover: true,
    pauseOnFocus: true,
    speed: 650,
    arrows: true,
    pagination: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    mediaQuery: "min",
    breakpoints: {
      768: {
        arrows: true,
      },
    },
  };

  document.querySelectorAll(".splide--servicio").forEach(function (root) {
    new Splide(root, common).mount();
  });

  var choferes = document.getElementById("splide-choferes");
  if (choferes) {
    new Splide(choferes, {
      type: "loop",
      perPage: 1,
      perMove: 1,
      gap: "1rem",
      autoplay: !reduceMotion,
      interval: 3800,
      pauseOnHover: true,
      pauseOnFocus: true,
      speed: 600,
      arrows: true,
      pagination: true,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      mediaQuery: "min",
      breakpoints: {
        576: {
          perPage: 2,
          gap: "1rem",
        },
        992: {
          perPage: 3,
          gap: "1.25rem",
        },
      },
    }).mount();
  }
})();
