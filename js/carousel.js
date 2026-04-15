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
    <button id="custom-lb-close" aria-label="Zavřít">&#10005;</button>
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
    <div id="custom-lb-track"></div>
  `;
  document.body.appendChild(overlay);

  const lbOverlay = document.getElementById("custom-lb-overlay");
  const lbTrack   = document.getElementById("custom-lb-track");
  const lbPrev    = document.getElementById("custom-lb-prev");
  const lbNext    = document.getElementById("custom-lb-next");
  const lbClose   = document.getElementById("custom-lb-close");

  let currentUrls  = [];
  let currentIndex = 0;

  function isMobile() { return window.innerWidth <= 768; }

  function buildTrack(urls) {
    lbTrack.innerHTML = "";
    urls.forEach((src) => {
      const slide = document.createElement("div");
      slide.className = "lb-slide";
      const img = document.createElement("img");
      img.src = src;
      img.draggable = false;
      slide.appendChild(img);
      lbTrack.appendChild(slide);
    });
  }

  function scrollToIndex(index, smooth) {
    const slides = lbTrack.querySelectorAll(".lb-slide");
    if (!slides[index]) return;
    lbTrack.scrollTo({
      left: slides[index].offsetLeft,
      behavior: smooth ? "smooth" : "instant",
    });
  }

  function openLightbox(urls, index) {
    currentUrls  = urls;
    currentIndex = index;
    buildTrack(urls);
    lbPrev.style.display = isMobile() ? "none" : "";
    lbNext.style.display = isMobile() ? "none" : "";
    lbOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    // Scroll na správnou fotku bez animace
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToIndex(index, false);
      });
    });
  }

  function closeLightbox() {
    lbOverlay.classList.remove("active");
    document.body.style.overflow = "";
    lbTrack.innerHTML = "";
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % currentUrls.length;
    scrollToIndex(currentIndex, true);
  }
  function goPrev() {
    currentIndex = (currentIndex - 1 + currentUrls.length) % currentUrls.length;
    scrollToIndex(currentIndex, true);
  }

  // Sleduj scroll a aktualizuj currentIndex
  lbTrack.addEventListener("scroll", () => {
    const slides = lbTrack.querySelectorAll(".lb-slide");
    const scrollLeft = lbTrack.scrollLeft;
    const w = lbTrack.offsetWidth;
    let closest = 0;
    let minDist = Infinity;
    slides.forEach((slide, i) => {
      const d = Math.abs(slide.offsetLeft - scrollLeft);
      if (d < minDist) { minDist = d; closest = i; }
    });
    currentIndex = closest;
  }, { passive: true });

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

  window.addEventListener("orientationchange", () => {
    if (!lbOverlay.classList.contains("active")) return;
    setTimeout(() => {
      scrollToIndex(currentIndex, false);
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
