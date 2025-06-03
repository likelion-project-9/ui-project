document.addEventListener('DOMContentLoaded', () => {
  const mainSlider = document.querySelector('.main-slider');
  if (!mainSlider) return;

  const slides = mainSlider.querySelector('.main-slides');
  const slideItems = slides.querySelectorAll('.slide');
  const prevBtn = mainSlider.querySelector('.prev');
  const nextBtn = mainSlider.querySelector('.next');
  const pageBtns = mainSlider.querySelectorAll('.page-btn');

  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) index = slideItems.length - 1;
    if (index >= slideItems.length) index = 0;

    slides.style.transform = `translateX(-${index * 100}%)`;
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
