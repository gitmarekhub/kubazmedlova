document.addEventListener("DOMContentLoaded", () => {

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

  const lb = document.getElementById("lb");
  const track = document.getElementById("lb-track");

  let images = [];
  let index = 0;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  let scale = 1;
  let startDist = 0;
  let isZooming = false;
  let translateX = 0;
  let translateY = 0;
  let initialScale = 1;

  let activeImg = null;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function openLightbox(urls, startIndex) {
    images = urls;
    index = startIndex;

    buildSlides();
    setPosition(index, false);

    lb.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("active");
    document.body.style.overflow = "";
  }

  function buildSlides() {
    track.innerHTML = "";

    const extended = [
      images[images.length - 1],
      ...images,
      images[0],
    ];

    extended.forEach(src => {
      const slide = document.createElement("div");
      slide.className = "lb-slide";

      const img = document.createElement("img");
      img.src = src;

      slide.appendChild(img);
      track.appendChild(slide);
    });

    activeImg = track.children[index + 1].querySelector("img");
    resetZoom();
  }

  function setPosition(i, animate = true) {
    track.style.transition = animate ? "transform 0.3s ease" : "none";
    track.style.transform = `translateX(${-(i + 1) * 100}%)`;

    setTimeout(() => {
      activeImg = track.children[index + 1].querySelector("img");
      resetZoom();
    }, 50);
  }

  function next() {
    index++;
    setPosition(index);

    if (index >= images.length) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        setPosition(index, false);
      }, 300);
    }
  }

  function prev() {
    index--;
    setPosition(index);

    if (index < 0) {
      setTimeout(() => {
        track.style.transition = "none";
        index = images.length - 1;
        setPosition(index, false);
      }, 300);
    }
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function applyTransform() {
    if (!activeImg) return;

    activeImg.style.transform =
      `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  track.addEventListener("touchstart", e => {
    if (!isMobile()) return;

    if (e.touches.length === 2) {
      isZooming = true;
      startDist = getDistance(e.touches);
      initialScale = scale;
      return;
    }

    if (scale > 1) {
      startX = e.touches[0].clientX - translateX;
      return;
    }

    isDragging = true;
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", e => {
    if (!isMobile()) return;

    if (isZooming && e.touches.length === 2) {
      const newDist = getDistance(e.touches);
      const ratio = newDist / startDist;

      let nextScale = initialScale * ratio;
      scale = Math.max(1, Math.min(nextScale, 4));

      applyTransform();
      return;
    }

    if (scale > 1) {
      const moveX = e.touches[0].clientX;
      const moveY = e.touches[0].clientY;

      translateX += moveX - startX;
      translateY += moveY - startX;

      startX = moveX;

      applyTransform();
      return;
    }

    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    const dx = currentX - startX;

    track.style.transition = "none";
    track.style.transform =
      `translateX(calc(${-(index + 1) * 100}% + ${dx}px))`;
  });

  track.addEventListener("touchend", () => {
    if (!isMobile()) return;

    if (isZooming) {
      isZooming = false;
      return;
    }

    if (scale > 1) return;

    isDragging = false;

    const dx = currentX - startX;

    if (Math.abs(dx) > 80) {
      dx < 0 ? next() : prev();
    } else {
      setPosition(index);
    }
  });

  let lastTap = 0;

  track.addEventListener("touchend", () => {
    if (!isMobile()) return;

    const now = Date.now();

    if (now - lastTap < 300) {
      if (scale === 1) {
        scale = 2;
      } else {
        resetZoom();
      }
      applyTransform();
    }

    lastTap = now;
  });

  track.addEventListener("click", e => {
    if (isMobile()) return;

    const x = e.clientX;
    const half = window.innerWidth / 2;

    x > half ? next() : prev();
  });

  lb.addEventListener("click", e => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });

  document.getElementById("lb-close").onclick = closeLightbox;

  document.querySelectorAll(".project-swiper").forEach(el => {
    const slides = el.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    const urls = Array.from(slides).map(s =>
      s.querySelector("img").src
    );

    slides.forEach((slide, i) => {
      slide.querySelector("img").onclick =
        () => openLightbox(urls, i);
    });
  });

});