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
let containernav1 = $('.containernav1');
let containernav1Height = containernav1.height();
$(window).scroll(function(){
	if ($(window).scrollTop() > containernav1Height) {
		$('.containernav2').addClass('containernav2-fixed');
	}
	else {
		$('.containernav2').removeClass('containernav2-fixed');
	}
});

//Добавление подстветки пунктов меню при скроле страницы (взял из обучения). На этой странице не работает
// $(window).scroll(() => {
// 	let scrollDistance = $(window).scrollTop();
// 	$(".section").each((i, el) => {
// 		if ($(el).offset().top - $(".containernav2").outerHeight() <= scrollDistance) {
// 			$(".containernav2 a").each((i, el) =>{
// 				if ($(el).hasClass(".active")) {
// 					$(el).removeClass(".active");
// 				}
// 			});
// 			$('.containernav2 li:eq('+ i +')').find('a').addClass('.active');
// 		}
// 	});
// });

//Добавление подстветки пунктов меню при скроле страницы.
$(function() {

    let section = $('.section'),
          nav = $('.menu'),
          navHeight = nav.outerHeight(); // получаем высоту навигации 

    // поворот экрана 
    window.addEventListener('orientationchange', function () {
        navHeight = nav.outerHeight();
    }, false);

    $(window).on('scroll', function () {
        const position = $(this).scrollTop();

        section.each(function () {
            const top = $(this).offset().top - navHeight - 5,
                  bottom = top + $(this).outerHeight();

            if (position >= top && position <= bottom) {
                nav.find('a').removeClass('active');
                section.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        const id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - navHeight
        }, 487);

        return false;
    });

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

  //Кнопка обратного звонка

const callbackBtn = document.querySelector('.callback');

callbackBtn.addEventListener('mouseover', () => {
	callbackBtn.classList.add("animate__animated");
	callbackBtn.classList.add("animate__shakeX");
	callbackBtn.classList.add("animate__repeat-1");
});

callbackBtn.addEventListener("click", (event) => {
	callbackBtn.classList.add("activecallback");
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.callback')) {
		callbackBtn.classList.remove("activecallback");
	}
});

callbackBtn.addEventListener("mouseout", () => {
	callbackBtn.classList.remove("animate__animated");
	callbackBtn.classList.remove("animate__shakeX");
	callbackBtn.classList.remove("animate__repeat-1");
});