(() => {
  "use strict";

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menu = document.getElementById("mobileMenu");
  const toggle = document.getElementById("menuToggle");
  const desktop = window.matchMedia("(min-width: 801px)");

  function closeMenu() {
    menu.close();
  }

  toggle.addEventListener("click", () => {
    menu.showModal();
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  });
  document.getElementById("menuClose").addEventListener("click", closeMenu);
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
    if (event.target === menu) {
      const bounds = menu.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        closeMenu();
    }
  });
  menu.addEventListener("close", () => {
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
  desktop.addEventListener("change", () => {
    if (desktop.matches && menu.open) closeMenu();
  });

  document.querySelectorAll(".faq-item").forEach((item) => {
    const summary = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");
    let animation;
    let expanded = item.open;

    summary.addEventListener("click", (event) => {
      if (!answer.animate || motion.matches) return;
      event.preventDefault();
      const start = item.open ? answer.getBoundingClientRect().height : 0;
      animation?.cancel();
      expanded = !expanded;
      item.open = true;
      animation = answer.animate(
        [
          { height: `${start}px`, opacity: expanded ? 0.5 : 1 },
          {
            height: `${expanded ? answer.scrollHeight : 0}px`,
            opacity: expanded ? 1 : 0,
          },
        ],
        { duration: 320, easing: "cubic-bezier(.22, 1, .36, 1)" },
      );
      animation.onfinish = () => {
        item.open = expanded;
        animation = null;
      };
    });
    item.addEventListener("toggle", () => {
      if (!animation) expanded = item.open;
    });
  });

  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          reveal.unobserve(target);
          if (!motion.matches && target.animate) {
            target.animate(
              [
                { opacity: 0, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(.22, 1, .36, 1)" },
            );
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => reveal.observe(element));
  }

  const navLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = navLinks.map((link) => document.querySelector(link.hash));
  let scrollPending = false;
  function updateNavigation() {
    let current;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.4)
        current = section.id;
    });
    navLinks.forEach((link) => {
      if (link.hash === `#${current}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollPending = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (scrollPending) return;
      scrollPending = true;
      requestAnimationFrame(updateNavigation);
    },
    { passive: true },
  );
  window.addEventListener("resize", updateNavigation);
  updateNavigation();

  const video = document.getElementById("heroVideo");
  let heroVisible = true;
  function updateVideo() {
    if (motion.matches || document.hidden || !heroVisible) video.pause();
    else video.play().catch(() => {});
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateVideo();
    }).observe(video);
  }
  motion.addEventListener("change", updateVideo);
  document.addEventListener("visibilitychange", updateVideo);
  updateVideo();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
