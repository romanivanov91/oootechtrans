"use strict"

/*Поиск по странице сайта. Ломает анимацию и вообще может сломать страницу. Если использовать, то надо доработать
var lastResFind =""; // последний удачный результат
var copy_page =""; // копия страницы в ихсодном виде
function TrimStr(s) {
     s = s.replace( /^\s+/g, '');
  return s.replace( /\s+$/g, '');
}
function FindOnPage(inputId) {//ищет текст на странице, в параметр передается ID поля для ввода
  var obj = window.document.getElementById("term");
  var textToFind;
 
  if (obj) {
    textToFind = TrimStr(obj.value);//обрезаем пробелы
  } else {
    alert("Введенная фраза не найдена");
    return;
  }
  if (textToFind == "") {
    alert("Вы ничего не ввели");
    return;
  }
 
  if(document.body.innerHTML.indexOf(textToFind)=="-1")
  alert("Ничего не найдено, проверьте правильность ввода!");
 
  if(copy_page.length>0)
        document.body.innerHTML=copy_page;
  else copy_page=document.body.innerHTML;

 
  document.body.innerHTML = document.body.innerHTML.replace(eval("/name="+lastResFind+"/gi")," ");//стираем предыдущие якори для скрола
  document.body.innerHTML = document.body.innerHTML.replace(eval("/"+textToFind+"/gi"),"<a name="+textToFind+" style='background:red'>"+textToFind+"</a>"); //Заменяем найденный текст ссылками с якорем;
  lastResFind=textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
  window.location = '#'+textToFind;//перемещаем скрол к последнему найденному совпадению
 }
 */


//Преобразование меню с навигацией в фиксированную при скролле
$(window).scroll(function(){
	if ($(window).scrollTop() > 120) {
		$('.containernav2').addClass('containernav2-fixed');
	}
	else {
		$('.containernav2').removeClass('containernav2-fixed');
	}
});


//Отложенная анимация
$(document).ready (function() {

	let options = {threshold: [1]};
	let observer = new IntersectionObserver(onEntry, options);
	let elements = $('.resumeh2,.resumep');
	elements.each ((i, el) => {
		observer.observe (el);
	});
});

function onEntry (entry) {
	entry.forEach (change => {
		if (change.isIntersecting) {
			change.target.classList.add ('animClass');
		}
	});
}


//слайдер в разделе "Наши услуги"
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

//Slick-слайдер
$('.multiple-items').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 3,
	prevArrow: "<img src='img/prev.png' class='prev' alt='1'>",
    nextArrow: "<img src='img/next.png' class='next' alt='2'>",
  });