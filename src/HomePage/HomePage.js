let dots = document.getElementsByClassName("dot");
let slides = document.getElementsByClassName("mySlides");
let slideIndex = 1;

currentSlide(1);
setInterval(changeSlide, 3000);

function currentSlide(slide) {
  slideIndex = slide;

  updateDot(slideIndex);
  updateImage(slideIndex);
}

function updateDot(slide) {
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = "dot";
  }
  dots[slide - 1].className += " active";
}

function updateImage(slide) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide - 1].style.display = "block";
}

function changeSlide(slideAction = 1) {
  if (slideIndex === slides.length && slideAction === 1) {
    currentSlide(1);
  } else if (slideIndex === 1 && slideAction === 0) {
    currentSlide(slides.length);
  } else {
    if (slideAction === 1) {
      currentSlide(slideIndex + 1);
    } else {
      currentSlide(slideIndex - 1);
    }
  }
}
