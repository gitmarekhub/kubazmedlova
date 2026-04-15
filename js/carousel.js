document.addEventListener("DOMContentLoaded", () => {

  // SWIPER (BEZE ZMĚNY)
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

  // 👉 FIX: obalit IMG do <a> automaticky (aby fungoval PhotoSwipe)
  document.querySelectorAll(".project-swiper img").forEach(img => {
    if (img.parentElement.tagName !== "A") {
      const link = document.createElement("a");
      link.href = img.src;

      img.parentNode.insertBefore(link, img);
      link.appendChild(img);
    }
  });

  // 👉 FIX: doplnění rozměrů (nutné pro zoom)
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

});