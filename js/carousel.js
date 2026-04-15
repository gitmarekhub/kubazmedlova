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

  let activeImg = null;

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
    const extended = [images[images.length-1], ...images, images[0]];

    extended.forEach(src=>{
      const slide = document.createElement("div");
      slide.className = "lb-slide";

      const wrap = document.createElement("div");
      wrap.className = "lb-img-wrap";

      const img = document.createElement("img");
      img.src = src;

      wrap.appendChild(img);
      slide.appendChild(wrap);
      track.appendChild(slide);
    });

    activeImg = track.children[index+1].querySelector("img");
    resetZoom();
  }

  function setPosition(i, animate=true){
    track.style.transition = animate?"transform 0.3s ease":"none";
    track.style.transform = `translateX(${-(i+1)*100}%)`;

    setTimeout(()=>{
      activeImg = track.children[index+1].querySelector("img");
      resetZoom();
    },50);
  }

  function next(){
    index++;
    setPosition(index);

    if(index>=images.length){
      setTimeout(()=>{
        track.style.transition="none";
        index=0;
        setPosition(index,false);
      },300);
    }
  }

  function prev(){
    index--;
    setPosition(index);

    if(index<0){
      setTimeout(()=>{
        track.style.transition="none";
        index=images.length-1;
        setPosition(index,false);
      },300);
    }
  }

  function resetZoom(){
    scale=1;
    translateX=0;
    translateY=0;
    applyTransform();
  }

  function applyTransform(){
    if(!activeImg) return;
    activeImg.style.transform =
      `translate(${translateX}px,${translateY}px) scale(${scale})`;
  }

  function getDistance(t){
    const dx=t[0].clientX-t[1].clientX;
    const dy=t[0].clientY-t[1].clientY;
    return Math.sqrt(dx*dx+dy*dy);
  }

  track.addEventListener("touchstart",e=>{
    if(e.touches.length===2){
      isZooming=true;
      startDist=getDistance(e.touches);
      return;
    }

    if(scale>1){
      startX=e.touches[0].clientX-translateX;
      return;
    }

    isDragging=true;
    startX=e.touches[0].clientX;
  });

  track.addEventListener("touchmove",e=>{
    if(isZooming && e.touches.length===2){
      const newDist=getDistance(e.touches);
      scale*=newDist/startDist;
      scale=Math.max(1,Math.min(scale,4));
      startDist=newDist;
      applyTransform();
      return;
    }

    if(scale>1){
      translateX=e.touches[0].clientX-startX;
      applyTransform();
      return;
    }

    if(!isDragging) return;

    currentX=e.touches[0].clientX;
    const dx=currentX-startX;

    track.style.transition="none";
    track.style.transform =
      `translateX(calc(${-(index+1)*100}% + ${dx}px))`;
  });

  track.addEventListener("touchend",()=>{
    if(isZooming){
      isZooming=false;
      return;
    }

    if(scale>1) return;

    isDragging=false;

    const dx=currentX-startX;

    if(Math.abs(dx)>80){
      dx<0 ? next() : prev();
    } else {
      setPosition(index);
    }
  });

  let lastTap=0;

  track.addEventListener("touchend",()=>{
    const now=Date.now();

    if(now-lastTap<300){
      if(scale===1){
        scale=2;
      } else {
        resetZoom();
      }
      applyTransform();
    }

    lastTap=now;
  });

  track.addEventListener("click",e=>{
    if(window.innerWidth<=768) return;

    const x=e.clientX;
    const half=window.innerWidth/2;

    x>half ? next() : prev();
  });

  document.getElementById("lb-close").onclick = closeLightbox;

  document.querySelectorAll(".project-swiper").forEach(el=>{
    const slides=el.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    const urls=Array.from(slides).map(s =>
      s.querySelector("img").src
    );

    slides.forEach((slide,i)=>{
      slide.querySelector("img").onclick =
        () => openLightbox(urls,i);
    });
  });

});