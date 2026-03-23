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

  var home = document.getElementById("splide-home");
  if (home) {
    new Splide(home, Object.assign({}, common, { interval: 5000 })).mount();
  }
})();
