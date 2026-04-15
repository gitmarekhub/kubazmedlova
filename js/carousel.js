document.addEventListener("DOMContentLoaded", () => {
  // ── SWIPER (galerie na stránce) ──────────────────────────────
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
  // Sbere všechny galerie a připraví data pro PhotoSwipe
  document.querySelectorAll(".project-swiper").forEach((swiperEl) => {
    const originalSlides = swiperEl.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    // Každý obrázek dostane cursor a klik handler
    originalSlides.forEach((slide, i) => {
      const img = slide.querySelector("img");
      img.style.cursor = "zoom-in";

      img.addEventListener("click", () => {
        // Sestavíme pole všech fotek z téhle galerie
        const items = Array.from(originalSlides).map((s) => {
          const image = s.querySelector("img");
          return {
            src: image.getAttribute("src"),
            w: image.naturalWidth  || image.width  || 1200,
            h: image.naturalHeight || image.height || 1600,
          };
        });

        const pswp = document.querySelector(".pswp");

        const options = {
          index: i,
          bgOpacity: 0.95,
          showHideOpacity: true,
          // Desktop: šipky viditelné
          arrowEl: true,
          // Mobil: šipky skryté (přes CSS)
          closeOnScroll: false,
          // Zoom
          maxSpreadZoom: 4,
          getDoubleTapZoom: (isMouseClick, item) => {
            if (isMouseClick) return item.initialZoomLevel < 0.7 ? 1 : 1.5;
            return item.initialZoomLevel < 0.7 ? 1 : 1.33;
          },
          // Animace při otevření/zavření
          showAnimationDuration: 200,
          hideAnimationDuration: 200,
        };

        const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
        gallery.init();
      });
    });
  });
});
