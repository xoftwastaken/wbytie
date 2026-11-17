/* ============================================================
   wbytie – Privacy Designed To Protect
   Page logic: count-up, ASCII bars, scroll reveal, scrollspy,
   mobile menu, hero video pause.
   ============================================================ */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------- Count-up (hero stats + speed numbers) ---------------- */
  var counters = Array.prototype.slice.call(
    document.querySelectorAll(".count")
  );

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function runCountUp(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var duration = parseInt(el.getAttribute("data-duration") || "1500", 10);
    var startOffset = parseInt(el.getAttribute("data-delay") || "0", 10);

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    var startTime = null;

    function frame(now) {
      if (startTime === null) startTime = now + startOffset;
      var t = (now - startTime) / duration;
      if (t < 0) t = 0;
      if (t > 1) t = 1;
      el.textContent = (target * easeOutCubic(t)).toFixed(decimals);
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          runCountUp(entry.target);
        });
      },
      { threshold: 0.25 }
    );
    counters.forEach(function (el) {
      countObserver.observe(el);
    });
  } else {
    counters.forEach(runCountUp);
  }

  /* ---------------- ASCII progress bars ---------------- */
  var bars = Array.prototype.slice.call(document.querySelectorAll(".ascii-bar"));

  function paintBar(bar, filled) {
    var chars = parseInt(bar.getAttribute("data-chars") || "24", 10);
    var text = "";
    for (var i = 0; i < chars; i++) {
      text += i < filled ? "▓" : "░";
    }
    bar.textContent = text;
  }

  function runBar(bar) {
    var chars = parseInt(bar.getAttribute("data-chars") || "24", 10);
    var fill = parseFloat(bar.getAttribute("data-fill") || "0");
    var total = Math.round(chars * Math.min(1, Math.max(0, fill)));

    if (prefersReducedMotion) {
      paintBar(bar, total);
      return;
    }

    var step = 0;
    var timer = setInterval(function () {
      step += 1;
      paintBar(bar, Math.min(step, total));
      if (step >= total) clearInterval(timer);
    }, 26);
  }

  if ("IntersectionObserver" in window) {
    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          barObserver.unobserve(entry.target);
          runBar(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach(function (bar) {
      paintBar(bar, 0);
      barObserver.observe(bar);
    });
  } else {
    bars.forEach(runBar);
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------------- Scrollspy (nav + mobile menu) ---------------- */
  var spyLinks = {};
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-spy].nav-link, [data-spy].m-link"),
    function (link) {
      var key = link.getAttribute("data-spy");
      (spyLinks[key] = spyLinks[key] || []).push(link);
    }
  );

  function setActiveSpy(key) {
    Object.keys(spyLinks).forEach(function (k) {
      spyLinks[k].forEach(function (link) {
        link.classList.toggle("is-active", k === key);
      });
    });
  }

  var spySections = Array.prototype.slice.call(
    document.querySelectorAll("section[data-spy]")
  );

  if ("IntersectionObserver" in window && spySections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveSpy(entry.target.getAttribute("data-spy"));
          }
        });
      },
      // A narrow horizontal band around the upper-middle of the viewport.
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    spySections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------------- Hero entrance cleanup ----------------
     Fill-mode "both" would keep the final keyframe transform
     alive and block hover transforms; drop the animation once
     it has finished. */
  Array.prototype.forEach.call(
    document.querySelectorAll(".anim"),
    function (el) {
      el.addEventListener(
        "animationend",
        function () {
          el.classList.add("revealed");
        },
        { once: true }
      );
    }
  );

  /* ---------------- Mobile menu ---------------- */
  var burger = document.getElementById("menuToggle");
  var overlay = document.getElementById("mobileOverlay");
  var sheet = document.getElementById("mobileMenu");
  var closeTimer = null;

  function isOpen() {
    return !sheet.hidden;
  }

  function openMenu() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    overlay.hidden = false;
    sheet.hidden = false;
    burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    // Restart the entrance animations
    overlay.classList.remove("open");
    sheet.classList.remove("open");
    void sheet.offsetWidth;
    overlay.classList.add("open");
    sheet.classList.add("open");
  }

  function closeMenu() {
    if (sheet.hidden) return;
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    overlay.classList.remove("open");
    sheet.classList.remove("open");
    closeTimer = setTimeout(function () {
      overlay.hidden = true;
      sheet.hidden = true;
      closeTimer = null;
    }, 400);
  }

  if (burger && overlay && sheet) {
    burger.addEventListener("click", function () {
      isOpen() ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    Array.prototype.forEach.call(
      sheet.querySelectorAll(".m-link, .m-signin"),
      function (el) {
        el.addEventListener("click", closeMenu);
      }
    );

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  /* ---------------- Pause the hero video while it is offscreen ---------------- */
  var hero = document.querySelector(".hero");
  var video = document.getElementById("heroVideo");
  if (hero && video && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            video.play().catch(function () {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    ).observe(hero);
  }
})();
