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
    <img id="custom-lb-img" src="" alt="" draggable="false" />
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

  function isMobile() { return window.innerWidth <= 768; }

  function openLightbox(urls, index) {
    currentUrls  = urls;
    currentIndex = index;
    lbImg.style.transform = "";
    lbImg.style.transition = "";
    lbImg.src = currentUrls[currentIndex];
    lbPrev.style.display = isMobile() ? "none" : "";
    lbNext.style.display = isMobile() ? "none" : "";
    lbOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lbOverlay.classList.remove("active");
    document.body.style.overflow = "";
    lbImg.src = "";
    lbImg.style.transform = "";
    lbImg.style.transition = "";
  }

  // Desktop: okamžitá výměna
  function goNext() {
    currentIndex = (currentIndex + 1) % currentUrls.length;
    lbImg.src = currentUrls[currentIndex];
  }
  function goPrev() {
    currentIndex = (currentIndex - 1 + currentUrls.length) % currentUrls.length;
    lbImg.src = currentUrls[currentIndex];
  }

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

  // ── MOBILE TOUCH DRAG ────────────────────────────────────────
  let touchStartX = 0;
  let touchStartY = 0;
  let dragX       = 0;
  let dragDir     = null;
  let dragging    = false;

  lbImg.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    dragX       = 0;
    dragDir     = null;
    dragging    = false;
    lbImg.style.transition = "none";
  }, { passive: true });

  lbImg.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    if (!dragDir) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        dragDir = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      }
    }

    if (dragDir === "h") {
      dragging = true;
      dragX = dx;
      lbImg.style.transform = `translateX(${dx}px)`;
    }
  }, { passive: true });

  lbImg.addEventListener("touchend", () => {
    if (!dragging) return;
    const threshold = window.innerWidth * 0.25;

    if (dragX < -threshold) {
      // snap out left → next
      lbImg.style.transition = "transform 0.2s ease";
      lbImg.style.transform  = `translateX(-${window.innerWidth}px)`;
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentUrls.length;
        lbImg.style.transition = "none";
        lbImg.style.transform  = `translateX(${window.innerWidth}px)`;
        lbImg.src = currentUrls[currentIndex];
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            lbImg.style.transition = "transform 0.2s ease";
            lbImg.style.transform  = "translateX(0)";
            setTimeout(() => { lbImg.style.transition = ""; }, 200);
          });
        });
      }, 200);
    } else if (dragX > threshold) {
      // snap out right → prev
      lbImg.style.transition = "transform 0.2s ease";
      lbImg.style.transform  = `translateX(${window.innerWidth}px)`;
      setTimeout(() => {
        currentIndex = (currentIndex - 1 + currentUrls.length) % currentUrls.length;
        lbImg.style.transition = "none";
        lbImg.style.transform  = `translateX(-${window.innerWidth}px)`;
        lbImg.src = currentUrls[currentIndex];
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            lbImg.style.transition = "transform 0.2s ease";
            lbImg.style.transform  = "translateX(0)";
            setTimeout(() => { lbImg.style.transition = ""; }, 200);
          });
        });
      }, 200);
    } else {
      // snap back
      lbImg.style.transition = "transform 0.2s ease";
      lbImg.style.transform  = "translateX(0)";
      setTimeout(() => { lbImg.style.transition = ""; }, 200);
    }

    dragging = false;
    dragDir  = null;
  }, { passive: true });

  // ── ROTACE ───────────────────────────────────────────────────
  window.addEventListener("orientationchange", () => {
    if (!lbOverlay.classList.contains("active")) return;
    setTimeout(() => {
      lbImg.style.transform = "";
      lbPrev.style.display = isMobile() ? "none" : "";
      lbNext.style.display = isMobile() ? "none" : "";
    }, 200);
  });

  // ── GALERIE ──────────────────────────────────────────────────
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
