"use strict";

const subscribeBtn = document.querySelector('button[type="button"]'),
	succesMsg = document.querySelector('.succsess'),
	fields = document.querySelectorAll('input');

function hideSuccessMsg() {
	succesMsg.style.width = '0';
}

function checkEmptyRequiredFields() {
	let count = 0;

	for (let i = 0; i < fields.length; i++) {
		if (fields[i].required && !fields[i].value) {
			count += 1;
		}
	}

	if (count == 0) {
		return true;
	}

	return false;
}

function clearFields() {
	fields.forEach(field => {
		field.value = '';
	});
}

subscribeBtn.addEventListener('click', (event) => {
	event.preventDefault();

	if (checkEmptyRequiredFields()) {
		succesMsg.style.width = '100%';
		clearFields();
	}

	setTimeout(hideSuccessMsg, 3000);
});
