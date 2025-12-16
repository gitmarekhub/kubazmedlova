document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  let lastTouchY = null;

  const isDesktop = () => window.innerWidth > 990;

  window.addEventListener(
    "wheel",
    (e) => {
      if (!isDesktop()) return;

      if (e.deltaY > 0) header.classList.add("hidden");
      if (e.deltaY < 0) header.classList.remove("hidden");
    },
    { passive: true }
  );

  window.addEventListener(
    "touchstart",
    (e) => {
      if (!isDesktop()) return;
      lastTouchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (!isDesktop()) return;
      if (lastTouchY === null) return;

      const y = e.touches[0].clientY;

      if (y < lastTouchY) header.classList.add("hidden");
      if (y > lastTouchY) header.classList.remove("hidden");

      lastTouchY = y;
    },
    { passive: true }
  );
});
