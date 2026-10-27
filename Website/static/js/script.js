(function () {
  "use strict";

  var links = Array.prototype.slice.call(document.querySelectorAll(".dock-btn"));
  var sections = links
    .map(function (l) { return document.getElementById(l.dataset.target); })
    .filter(Boolean);
  var toTop = document.getElementById("toTop");

  function setActive(id) {
    links.forEach(function (l) {
      l.classList.toggle("active", l.dataset.target === id);
    });
  }

  // Scroll spy
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Smooth scroll on dock click
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.getElementById(link.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + link.dataset.target);
        setActive(link.dataset.target);
      }
    });
  });

  // Scroll-to-top button
  function toggleTop() {
    toTop.classList.toggle("visible", window.scrollY > 300);
  }
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();

  toTop.addEventListener("click", function () {
    var home = document.getElementById("home");
    (home || document.body).scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
