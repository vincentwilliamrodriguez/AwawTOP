import './style.scss';

document.querySelectorAll('.dropdown').forEach((dropdown) => {
  const button = dropdown.querySelector('.dropdown__btn');
  const menu = dropdown.querySelector('.dropdown__menu');
  const hideMenu = () => {
    menu.classList.toggle('dropdown__menu--hidden');
  };

  button.addEventListener('click', () => {
    hideMenu();
  });

  dropdown.querySelectorAll('.dropdown__item').forEach((item) => {
    item.addEventListener('click', () => {
      hideMenu();
    });
  });
});

document.querySelectorAll('.carousel').forEach((carousel) => {
  const slidesContainer = carousel.querySelector('.carousel__slides-container');
  const circlesContainer = carousel.querySelector(
    '.carousel__circles-container'
  );

  function switchSlide(slideIndex) {
    const updateActive = (name, containerElem) => {
      containerElem
        .querySelector(`.carousel__${name}--active`)
        .classList.remove(`carousel__${name}--active`);

      containerElem
        .querySelector(`.carousel__${name}[data-slide-num="${slideIndex}"]`)
        .classList.add(`carousel__${name}--active`);
    };

    updateActive('slide', slidesContainer);
    updateActive('circle', circlesContainer);
  }

  function moveSlide(moveNum) {
    const currentIndex = +slidesContainer
      .querySelector('.carousel__slide--active')
      .getAttribute('data-slide-num');

    const total = slidesContainer.children.length;

    switchSlide((((currentIndex + moveNum) % total) + total) % total);
  }

  [...slidesContainer.children].forEach((slide, i) => {
    slide.setAttribute('data-slide-num', i);
  });

  [...circlesContainer.children].forEach((circle, i) => {
    circle.setAttribute('data-slide-num', i);
    circle.addEventListener('click', () => {
      switchSlide(i);
    });
  });

  carousel
    .querySelector('.carousel__nav--left')
    .addEventListener('click', () => {
      moveSlide(-1);
    });

  carousel
    .querySelector('.carousel__nav--right')
    .addEventListener('click', () => {
      moveSlide(1);
    });

  switchSlide(0);

  setInterval(() => {
    moveSlide(1);
  }, 5000);
});
