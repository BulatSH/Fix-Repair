"use strict";

const scrollBtns = document.querySelectorAll('.scroll-button');

for (let scrollBtn of scrollBtns) {
	scrollBtn.addEventListener('click', (event) => {
		event.preventDefault();

		const id = scrollBtn.getAttribute('href');

		document.querySelector('' + id).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
}
