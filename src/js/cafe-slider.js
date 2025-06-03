document.addEventListener('DOMContentLoaded', () => {
  const cafeSlider = document.querySelector('.cafe-slider');
  if (!cafeSlider) return;

  const slides = cafeSlider.querySelector('.cafe-slides');
  const slideItems = slides.querySelectorAll('li');
  const prevBtn = cafeSlider.querySelector('.prev');
  const nextBtn = cafeSlider.querySelector('.next');
  const pageBtns = cafeSlider.querySelectorAll('.page-btn');

  let currentIndex = 0;

  slides.style.width = `${100 * slideItems.length}%`;
  slideItems.forEach((slide) => {
    slide.style.width = `${100 / slideItems.length}%`;
  });

  function goToSlide(index) {
    if (index < 0) index = slideItems.length - 1;
    if (index >= slideItems.length) index = 0;

    slides.style.transform = `translateX(-${(100 / slideItems.length) * index}%)`;
    pageBtns.forEach((btn, i) => {
      btn.setAttribute('aria-selected', i === index);
    });
    currentIndex = index;
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
  pageBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => goToSlide(i));
  });

  goToSlide(0);
});
