document.addEventListener("DOMContentLoaded", () => {
  // ── SWIPER ──────────────────────────────────────────────────
  document.querySelectorAll(".project-swiper").forEach((el) => {
    new Swiper(el, {
      loop: true,
      speed: 600,
      spaceBetween: 32,
      slidesPerView: 3,
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        0:    { slidesPerView: 1 },
        768:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });

  // ── LIGHTBOX ─────────────────────────────────────────────────
  const overlay = document.createElement("div");
  overlay.id = "custom-lb-overlay";
  overlay.innerHTML = `
    <button id="custom-lb-prev" aria-label="Předchozí">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
      </svg>
    </button>
    <img id="custom-lb-img" src="" alt="" />
    <button id="custom-lb-next" aria-label="Další">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
      </svg>
    </button>
    <button id="custom-lb-close" aria-label="Zavřít">&#10005;</button>
  `;
  document.body.appendChild(overlay);

  const lbOverlay = document.getElementById("custom-lb-overlay");
  const lbImg     = document.getElementById("custom-lb-img");
  const lbPrev    = document.getElementById("custom-lb-prev");
  const lbNext    = document.getElementById("custom-lb-next");
  const lbClose   = document.getElementById("custom-lb-close");

  let currentUrls  = [];
  let currentIndex = 0;
  let isAnimating  = false;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function openLightbox(urls, index) {
    currentUrls            = urls;
    currentIndex           = index;
    // Reset všeho před otevřením
    lbImg.style.cssText    = "";
    lbImg.src              = currentUrls[currentIndex];
    isAnimating            = false;
    lbPrev.style.display   = isMobile() ? "none" : "";
    lbNext.style.display   = isMobile() ? "none" : "";
    lbOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lbOverlay.classList.remove("active");
    document.body.style.overflow = "";
    lbImg.src              = "";
    lbImg.style.cssText    = "";
    isAnimating            = false;
  }

  function changeTo(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const nextIndex = (newIndex + currentUrls.length) % currentUrls.length;

    lbImg.style.transition = "opacity 0.4s ease";
    lbImg.style.opacity    = "0";

    setTimeout(() => {
      lbImg.src              = currentUrls[nextIndex];
      lbImg.style.opacity    = "1";
      setTimeout(() => {
        lbImg.style.transition = "";
        currentIndex           = nextIndex;
        isAnimating            = false;
      }, 400);
    }, 400);
  }

  function showNext() { changeTo(currentIndex + 1); }
  function showPrev() { changeTo(currentIndex - 1); }

  lbNext.addEventListener("click",  (e) => { e.stopPropagation(); showNext(); });
  lbPrev.addEventListener("click",  (e) => { e.stopPropagation(); showPrev(); });
  lbClose.addEventListener("click", () => closeLightbox());
  lbOverlay.addEventListener("click", (e) => {
    if (e.target === lbOverlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lbOverlay.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft")  showPrev();
    if (e.key === "Escape")     closeLightbox();
  });

  // ── TOUCH – pouze swipe, ne pinch/zoom ──────────────────────
  let touchStartX  = 0;
  let touchStartY  = 0;
  let touchStartDist = 0;
  let isPinching   = false;

  function getTouchDist(e) {
    if (e.touches.length < 2) return 0;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  lbOverlay.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      isPinching     = true;
      touchStartDist = getTouchDist(e);
    } else {
      isPinching  = false;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  lbOverlay.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) isPinching = true;
  }, { passive: true });

  lbOverlay.addEventListener("touchend", (e) => {
    if (!lbOverlay.classList.contains("active")) return;
    if (isPinching) { isPinching = false; return; }

    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Swipe jen při jednoznačném horizontálním pohybu > 60px
    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 60) {
      if (dx < 0) showNext();
      else        showPrev();
    }
  }, { passive: true });

  // ── Rotace obrazovky ─────────────────────────────────────────
  window.addEventListener("orientationchange", () => {
    if (!lbOverlay.classList.contains("active")) return;
    const src = currentUrls[currentIndex];
    lbImg.src = "";
    setTimeout(() => {
      lbImg.src            = src;
      lbPrev.style.display = isMobile() ? "none" : "";
      lbNext.style.display = isMobile() ? "none" : "";
    }, 200);
  });

  // Kliky na galerii
  document.querySelectorAll(".project-swiper").forEach((el) => {
    const originalSlides = el.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );
    const urls = Array.from(originalSlides).map((s) =>
      s.querySelector("img").getAttribute("src")
    );
    originalSlides.forEach((slide, i) => {
      const img = slide.querySelector("img");
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openLightbox(urls, i));
    });
  });
});
