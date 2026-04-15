document.addEventListener("DOMContentLoaded", async () => {

  // SWIPER
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
        0:{slidesPerView:1},
        768:{slidesPerView:2},
        1024:{slidesPerView:3},
      },
    });
  });

  // 1. WRAP IMG → A
  document.querySelectorAll(".project-swiper img").forEach(img => {
    if (img.parentElement.tagName !== "A") {
      const link = document.createElement("a");
      link.href = img.src;

      img.parentNode.insertBefore(link, img);
      link.appendChild(img);
    }
  });

  // 2. SIZE FIX (nutné pro zoom)
  document.querySelectorAll(".project-swiper img").forEach(img => {
    if (img.complete) {
      setSize(img);
    } else {
      img.onload = () => setSize(img);
    }
  });

  function setSize(img) {
    img.setAttribute("data-pswp-width", img.naturalWidth);
    img.setAttribute("data-pswp-height", img.naturalHeight);
  }

  // 3. PHOTOSWIPE INIT (SPRÁVNĚ)
  const { default: PhotoSwipeLightbox } = await import(
    'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js'
  );

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.project-swiper',
    children: 'a',
    pswpModule: () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js'),
  });

  lightbox.init();

});