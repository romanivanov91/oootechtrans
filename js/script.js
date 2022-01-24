// let body = document.querySelector("body");
// let containerequipments = document.querySelector(".containerequipments");

// containerequipments.addEventListener('click', (event) => {
//     if(!event.target.classList.contains('equipmentrow')) return;

//     let equipment = event.target;

//     console.log(equipment.innerText);

//     let modalequipment = document.createElement('div');

//     modalequipment.classList.add('popup');

//     modalequipment.innerHTML = `<div class='popup_bg'>${equipment}</div>`;

//     equipment.classList.add('popup_img');

//     body.append(modalequipment);

//     // equipment.classList.toggle('active');
// });
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
const mainSlide = document.querySelector('.main-slide');
const slidesCount = mainSlide.querySelectorAll('div').length;

let activeSlideIndex = 0;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener('click', function() {
	changeSlide('up');
});

downBtn.addEventListener('click', function() {
	changeSlide('down');
});

function changeSlide(direction) {
	if (direction === 'up') {
		activeSlideIndex++;
		if (activeSlideIndex === slidesCount) {
			activeSlideIndex = 0;
		}
	} else if (direction === 'down') {
		activeSlideIndex--
		if (activeSlideIndex < 0) {
			activeSlideIndex = slidesCount - 1;
		}
	}

	const height = container.clientHeight;

	mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
	sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}