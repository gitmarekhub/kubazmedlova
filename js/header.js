document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  let lastTouchY = null;

  window.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY > 0) header.classList.add("hidden");
      if (e.deltaY < 0) header.classList.remove("hidden");
    },
    { passive: true }
  );

  window.addEventListener(
    "touchstart",
    (e) => {
      lastTouchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (lastTouchY === null) return;
      const y = e.touches[0].clientY;

      if (y < lastTouchY) header.classList.add("hidden");
      if (y > lastTouchY) header.classList.remove("hidden");

      lastTouchY = y;
    },
    { passive: true }
  );
});
