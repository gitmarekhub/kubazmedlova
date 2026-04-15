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
    <div id="custom-lb-viewport">
      <img id="custom-lb-img" src="" alt="" draggable="false" />
    </div>
    <button id="custom-lb-prev" aria-label="Předchozí">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
      </svg>
    </button>
    <button id="custom-lb-next" aria-label="Další">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
      </svg>
    </button>
    <button id="custom-lb-close" aria-label="Zavřít">&#10005;</button>
  `;
  document.body.appendChild(overlay);

  const lbOverlay  = document.getElementById("custom-lb-overlay");
  const lbViewport = document.getElementById("custom-lb-viewport");
  const lbImg      = document.getElementById("custom-lb-img");
  const lbPrev     = document.getElementById("custom-lb-prev");
  const lbNext     = document.getElementById("custom-lb-next");
  const lbClose    = document.getElementById("custom-lb-close");

  let currentUrls  = [];
  let currentIndex = 0;
  let isNavigating = false;

  // ── ZOOM STATE ───────────────────────────────────────────────
  let scale        = 1;
  let originX      = 0;
  let originY      = 0;
  let translateX   = 0;
  let translateY   = 0;

  function isMobile() { return window.innerWidth <= 768; }

  function applyTransform() {
    lbImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function resetZoom() {
    scale      = 1;
    translateX = 0;
    translateY = 0;
    lbImg.style.transition = "transform 0.25s ease";
    applyTransform();
    setTimeout(() => { lbImg.style.transition = ""; }, 250);
  }

  function isZoomed() { return scale > 1.05; }

  // ── OPEN / CLOSE ─────────────────────────────────────────────
  function openLightbox(urls, index) {
    currentUrls  = urls;
    currentIndex = index;
    resetZoom();
    lbImg.src = currentUrls[currentIndex];
    lbPrev.style.display = isMobile() ? "none" : "";
    lbNext.style.display = isMobile() ? "none" : "";
    lbOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lbOverlay.classList.remove("active");
    document.body.style.overflow = "";
    resetZoom();
    lbImg.src = "";
  }

  // ── NAVIGATE (slide animace) ─────────────────────────────────
  function navigateTo(newIndex, direction) {
    if (isNavigating) return;
    isNavigating = true;
    resetZoom();

    const nextIndex = (newIndex + currentUrls.length) % currentUrls.length;
    const exitX     = direction === "next" ? "-110%" : "110%";
    const enterX    = direction === "next" ? "110%"  : "-110%";

    // Stará fotka vyjede
    lbImg.style.transition = "transform 0.3s ease";
    lbImg.style.transform  = `translateX(${exitX})`;

    setTimeout(() => {
      // Nová přijede
      lbImg.src              = currentUrls[nextIndex];
      lbImg.style.transition = "none";
      lbImg.style.transform  = `translateX(${enterX})`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lbImg.style.transition = "transform 0.3s ease";
          lbImg.style.transform  = "translateX(0)";

          setTimeout(() => {
            lbImg.style.transition = "";
            lbImg.style.transform  = "";
            currentIndex           = nextIndex;
            isNavigating           = false;
            scale = 1; translateX = 0; translateY = 0;
          }, 300);
        });
      });
    }, 300);
  }

  function showNext() { navigateTo(currentIndex + 1, "next"); }
  function showPrev() { navigateTo(currentIndex - 1, "prev"); }

  // ── DESKTOP CONTROLS ─────────────────────────────────────────
  lbPrev.addEventListener("click",  (e) => { e.stopPropagation(); showPrev(); });
  lbNext.addEventListener("click",  (e) => { e.stopPropagation(); showNext(); });
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

  // ── TOUCH HANDLING ───────────────────────────────────────────
  let touch1Start  = null;
  let touch2Start  = null;
  let initScale    = 1;
  let initDist     = 0;
  let initTransX   = 0;
  let initTransY   = 0;
  let gesture      = null; // "swipe" | "pinch" | "drag"

  function dist(a, b) {
    return Math.sqrt((a.clientX - b.clientX) ** 2 + (a.clientY - b.clientY) ** 2);
  }

  lbViewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touch1Start = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      touch2Start = null;
      initScale   = scale;
      initTransX  = translateX;
      initTransY  = translateY;
      gesture     = null;
    } else if (e.touches.length === 2) {
      touch1Start = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      touch2Start = { clientX: e.touches[1].clientX, clientY: e.touches[1].clientY };
      initDist    = dist(e.touches[0], e.touches[1]);
      initScale   = scale;
      initTransX  = translateX;
      initTransY  = translateY;
      gesture     = "pinch";
    }
  }, { passive: true });

  lbViewport.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2 && touch2Start) {
      // PINCH ZOOM
      gesture = "pinch";
      const d       = dist(e.touches[0], e.touches[1]);
      const newScale = Math.min(5, Math.max(1, initScale * (d / initDist)));
      scale         = newScale;

      // Střed prstů jako origin
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const rect = lbImg.getBoundingClientRect();
      const imgCX = rect.left + rect.width / 2;
      const imgCY = rect.top  + rect.height / 2;

      translateX = initTransX + (cx - imgCX) * (1 - initScale / scale) * 0;
      translateY = initTransY + (cy - imgCY) * (1 - initScale / scale) * 0;

      lbImg.style.transition = "none";
      applyTransform();

    } else if (e.touches.length === 1 && touch1Start) {
      const dx = e.touches[0].clientX - touch1Start.clientX;
      const dy = e.touches[0].clientY - touch1Start.clientY;

      if (!gesture) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          gesture = isZoomed() ? "drag" : (Math.abs(dx) > Math.abs(dy) ? "swipe" : "drag");
        }
      }

      if (gesture === "drag" && isZoomed()) {
        // Posouvání při zoomu
        translateX = initTransX + dx;
        translateY = initTransY + dy;
        lbImg.style.transition = "none";
        applyTransform();
      }
    }
  }, { passive: true });

  lbViewport.addEventListener("touchend", (e) => {
    if (gesture === "swipe" && !isZoomed() && touch1Start) {
      const dx = e.changedTouches[0].clientX - touch1Start.clientX;
      const dy = e.changedTouches[0].clientY - touch1Start.clientY;
      if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 50) {
        if (dx < 0) showNext();
        else        showPrev();
      }
    }

    if (gesture === "pinch" && scale < 1.05) {
      resetZoom();
    }

    // Double tap = zoom in/out
    gesture = null;
  }, { passive: true });

  // ── ROTACE ───────────────────────────────────────────────────
  window.addEventListener("orientationchange", () => {
    if (!lbOverlay.classList.contains("active")) return;
    resetZoom();
    const src = currentUrls[currentIndex];
    lbImg.src = "";
    setTimeout(() => {
      lbImg.src            = src;
      lbPrev.style.display = isMobile() ? "none" : "";
      lbNext.style.display = isMobile() ? "none" : "";
    }, 200);
  });

  // ── GALERIE KLIKY ────────────────────────────────────────────
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
