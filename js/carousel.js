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
    <div id="custom-lb-strip">
      <img class="lb-slide" id="lb-prev-img" src="" alt="" draggable="false" />
      <img class="lb-slide" id="lb-cur-img"  src="" alt="" draggable="false" />
      <img class="lb-slide" id="lb-next-img" src="" alt="" draggable="false" />
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
  const lbStrip    = document.getElementById("custom-lb-strip");
  const lbPrevImg  = document.getElementById("lb-prev-img");
  const lbCurImg   = document.getElementById("lb-cur-img");
  const lbNextImg  = document.getElementById("lb-next-img");
  const lbPrev     = document.getElementById("custom-lb-prev");
  const lbNext     = document.getElementById("custom-lb-next");
  const lbClose    = document.getElementById("custom-lb-close");

  let currentUrls  = [];
  let currentIndex = 0;
  let isAnimating  = false;

  function isMobile() { return window.innerWidth <= 768; }

  function loadImages(index) {
    const prev = (index - 1 + currentUrls.length) % currentUrls.length;
    const next = (index + 1) % currentUrls.length;
    lbPrevImg.src = currentUrls[prev];
    lbCurImg.src  = currentUrls[index];
    lbNextImg.src = currentUrls[next];
    // Reset strip position – current image centered
    lbStrip.style.transition = "none";
    lbStrip.style.transform  = "translateX(-100%)";
  }

  function openLightbox(urls, index) {
    currentUrls  = urls;
    currentIndex = index;
    isAnimating  = false;
    loadImages(index);
    lbPrev.style.display = isMobile() ? "none" : "";
    lbNext.style.display = isMobile() ? "none" : "";
    lbOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lbOverlay.classList.remove("active");
    document.body.style.overflow = "";
    isAnimating = false;
  }

  // Desktop: okamžitá výměna
  function goNext() {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % currentUrls.length;
    loadImages(currentIndex);
  }

  function goPrev() {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + currentUrls.length) % currentUrls.length;
    loadImages(currentIndex);
  }

  // ── DESKTOP CONTROLS ─────────────────────────────────────────
  lbPrev.addEventListener("click",  (e) => { e.stopPropagation(); goPrev(); });
  lbNext.addEventListener("click",  (e) => { e.stopPropagation(); goNext(); });
  lbClose.addEventListener("click", () => closeLightbox());
  lbOverlay.addEventListener("click", (e) => {
    if (e.target === lbOverlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lbOverlay.classList.contains("active")) return;
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft")  goPrev();
    if (e.key === "Escape")     closeLightbox();
  });

  // ── MOBILE TOUCH – drag strip like iOS ───────────────────────
  let touchStartX  = 0;
  let touchStartY  = 0;
  let currentDragX = 0;
  let isDragging   = false;
  let dragDir      = null; // "h" | "v"
  const W          = () => window.innerWidth;

  lbStrip.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    touchStartX  = e.touches[0].clientX;
    touchStartY  = e.touches[0].clientY;
    currentDragX = 0;
    isDragging   = false;
    dragDir      = null;
    lbStrip.style.transition = "none";
  }, { passive: true });

  lbStrip.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    if (!dragDir) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        dragDir = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      }
    }

    if (dragDir === "h") {
      isDragging   = true;
      currentDragX = dx;
      // -100% je střed (current), přidáme drag offset
      const offset = -100 + (dx / W() * 100);
      lbStrip.style.transform = `translateX(${offset}%)`;
    }
  }, { passive: true });

  lbStrip.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const threshold = W() * 0.3; // 30% šířky = commit

    if (currentDragX < -threshold) {
      // Swipe doleva = next
      lbStrip.style.transition = "transform 0.25s ease";
      lbStrip.style.transform  = "translateX(-200%)";
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentUrls.length;
        loadImages(currentIndex);
      }, 250);
    } else if (currentDragX > threshold) {
      // Swipe doprava = prev
      lbStrip.style.transition = "transform 0.25s ease";
      lbStrip.style.transform  = "translateX(0%)";
      setTimeout(() => {
        currentIndex = (currentIndex - 1 + currentUrls.length) % currentUrls.length;
        loadImages(currentIndex);
      }, 250);
    } else {
      // Vrať zpět na střed
      lbStrip.style.transition = "transform 0.25s ease";
      lbStrip.style.transform  = "translateX(-100%)";
    }

    isDragging = false;
    dragDir    = null;
  }, { passive: true });

  // ── ROTACE ───────────────────────────────────────────────────
  window.addEventListener("orientationchange", () => {
    if (!lbOverlay.classList.contains("active")) return;
    setTimeout(() => {
      loadImages(currentIndex);
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
