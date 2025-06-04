document.addEventListener('DOMContentLoaded', () => {
  const mainSlider = document.querySelector('.main-slider');
  if (!mainSlider) return;

  const slides = mainSlider.querySelector('.main-slides');
  const slideItems = slides.querySelectorAll('.slide');
  const prevBtn = mainSlider.querySelector('.prev');
  const nextBtn = mainSlider.querySelector('.next');
  const pageBtns = mainSlider.querySelectorAll('.page-btn');
  const status = mainSlider.querySelector('#carousel-status'); // aria-live용 상태 텍스트

  let currentIndex = 0;

  function updatePagination(index) {
    pageBtns.forEach((btn, i) => {
      const isSelected = i === index;
      btn.setAttribute('aria-selected', isSelected);
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
    });
  }

  function updateSlideRoles(index) {
    slideItems.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== index);
      slide.setAttribute('aria-label', `${i + 1} / ${slideItems.length}`);
    });
    if (status) {
      status.textContent = `슬라이드 ${index + 1} / ${slideItems.length}`;
    }
  }

  function goToSlide(index) {
    if (index < 0) index = slideItems.length - 1;
    if (index >= slideItems.length) index = 0;

    slides.style.transform = `translateX(-${index * 100}%)`;

    updatePagination(index);
    updateSlideRoles(index);
    currentIndex = index;
  }

  // 버튼 클릭
  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

  // 슬라이더 자체에서 방향키로 슬라이드 이동 가능하게
  mainSlider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });

  // 페이지 버튼 클릭
  pageBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => goToSlide(i));

    // 키보드 화살표 이동 지원
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        pageBtns[(i + 1) % pageBtns.length].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        pageBtns[(i - 1 + pageBtns.length) % pageBtns.length].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(i);
      }
    });
  });

  // 초기화
  goToSlide(0);
});
