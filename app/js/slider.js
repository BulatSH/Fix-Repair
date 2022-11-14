"use strict";

const slider = document.querySelector('.slider'),
	sliderItemsCont = slider.querySelector('.slider-items-cont'),
	sliderItems = slider.querySelectorAll('.slider-items-cont figure'),
	prevBtn = slider.querySelector('.slider .prev'),
	nextBtn = slider.querySelector('.slider .next');

const sliderItemWidth = +sliderItemsCont.offsetWidth;

function setSlideSize() {
	sliderItemsCont.style.width =
		sliderItemsCont.offsetWidth * sliderItems.length + 'px';

	sliderItems.forEach(function (item) {
		item.style.width = sliderItemWidth + 'px';
	});
}

setSlideSize();

function setCurrentSlide(slides, switchBtn) {
	for (var i = 0; i < slides.length; i++) {
		if (slides[i].classList.contains('current') &&
			switchBtn.classList.contains('next') &&
			slides[i] !== slides[slides.length - 1]) {
			switchSlide(switchBtn);

			slides[i].classList.remove('current');
			slides[i + 1].classList.add('current');

			break;
		} else if (slides[i].classList.contains('current') &&
			switchBtn.classList.contains('prev') &&
			slides[i] !== slides[0]) {
			switchSlide(switchBtn);

			slides[i].classList.remove('current');
			slides[i - 1].classList.add('current');

			break;
		}
	}
}

var slideTransform = 0;

function switchSlide(switchBtn) {
	if (switchBtn.classList.contains('next')) {
		sliderItemsCont.style.transform =
			`translateX(${-(sliderItemWidth + slideTransform)}px)`;

		slideTransform += sliderItemWidth;
	} else if (switchBtn.classList.contains('prev')) {
		sliderItemsCont.style.transform =
			`translateX(${(sliderItemWidth - slideTransform)}px)`;

		slideTransform -= sliderItemWidth;
	}
}
nextBtn.addEventListener('click', function () {
	setCurrentSlide(sliderItems, nextBtn);
});
prevBtn.addEventListener('click', function () {
	setCurrentSlide(sliderItems, prevBtn);
});
