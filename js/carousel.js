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

  // ── PHOTOSWIPE LIGHTBOX ──────────────────────────────────────
  // Cache rozměrů obrázků aby se nenačítaly znovu
  const sizeCache = {};

  function getImageSize(src) {
    return new Promise((resolve) => {
      if (sizeCache[src]) {
        resolve(sizeCache[src]);
        return;
      }
      const img = new Image();
      img.onload = () => {
        sizeCache[src] = { w: img.naturalWidth, h: img.naturalHeight };
        resolve(sizeCache[src]);
      };
      img.onerror = () => {
        resolve({ w: 1200, h: 1600 }); // fallback
      };
      img.src = src;
    });
  }

  document.querySelectorAll(".project-swiper").forEach((swiperEl) => {
    const originalSlides = swiperEl.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    // Předem načti rozměry všech obrázků v galerii
    originalSlides.forEach((slide) => {
      const src = slide.querySelector("img").getAttribute("src");
      getImageSize(src); // spustí cache na pozadí
    });

    originalSlides.forEach((slide, i) => {
      const img = slide.querySelector("img");
      img.style.cursor = "zoom-in";

      img.addEventListener("click", async () => {
        const urls = Array.from(originalSlides).map((s) =>
          s.querySelector("img").getAttribute("src")
        );

        // Načti rozměry všech fotek (z cache pokud dostupné)
        const items = await Promise.all(
          urls.map(async (src) => {
            const size = await getImageSize(src);
            return { src, w: size.w, h: size.h };
          })
        );

        const pswp = document.querySelector(".pswp");

        const options = {
          index: i,
          bgOpacity: 0.95,
          showHideOpacity: true,
          closeOnScroll: false,
          maxSpreadZoom: 4,
          getDoubleTapZoom: (isMouseClick, item) => {
            if (isMouseClick) return item.initialZoomLevel < 0.7 ? 1 : 1.5;
            return item.initialZoomLevel < 0.7 ? 1 : 1.33;
          },
          showAnimationDuration: 200,
          hideAnimationDuration: 200,
        };

        const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
        gallery.init();
      });
    });
  });
});
