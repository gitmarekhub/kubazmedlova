import PhotoSwipeLightbox from "https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js";

document.addEventListener("DOMContentLoaded", () => {
  // SWIPER (jen layout)
  document.querySelectorAll(".project-swiper").forEach((el) => {
    new Swiper(el, {
      loop: true,
      spaceBetween: 32,
      slidesPerView: 3,
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });

  // SIZE FIX (nutný pro správný zoom)
  document.querySelectorAll(".pswp-item img").forEach((img) => {
    if (img.complete) fix(img);
    else img.onload = () => fix(img);
  });

  function fix(img) {
    const a = img.parentElement;
    a.dataset.pswpWidth = img.naturalWidth;
    a.dataset.pswpHeight = img.naturalHeight;
  }

  // PHOTOSWIPE
  const lightbox = new PhotoSwipeLightbox({
    gallery: ".project-swiper",
    children: ".pswp-item",
    pswpModule: () =>
      import("https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js"),
  });

  lightbox.init();
});
