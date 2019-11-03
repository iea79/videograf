/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */
// @prepros-append video.js
// @prepros-append modal.js
// @prepros-append jquery.viewportchecker.min.js
// @prepros-append jquery.fancybox.min.js

var app = {
    page: $('#main'),
    section: $('.section'),
    // hash: location.hash,
    fScroll: true,
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    pageLoaded: false,
    current: '',
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= app.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= app.mdWidth && $(window).width() < app.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= app.smWidth && $(window).width() < app.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < app.smWidth; } // < 768
function isIOS() { return app.iOS(); } // for iPhone iPad iPod
function isTouch() { return app.touchDevice(); } // for touch device


$(document).ready(function() {
    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	// Запрет "отскока" страницы при клике по пустой ссылке с href="#"
	$('[href="#"]').click(function(event) {
		event.preventDefault();
	});

    checkOnResize();

    $.fancybox.defaults.transitionEffect = 'slide';

    loadPage();

});

// $('[data-scroll-to]').on('click', function(event){
//     event.preventDefault();
//     var scroll_el = $(this).attr('href');
//     if ($(scroll_el).length != 0) {
//         $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
//     }
//     return false;
// });
function setActiveNav() {
    var HeaderTop = $('header').offset().top;
    var currentTop = $(window).scrollTop();

    setNavbarPosition();

    $(window).scroll(function(){
        setNavbarPosition();
    });

    function setNavbarPosition() {
        currentTop = $(window).scrollTop() + 100;

        $('.navbar__link').each(function(index, el) {
            var section = $(this).attr('href');


            if ($('section').is(section)) {
                var offset = $(section).offset().top;

                if (offset <= currentTop && offset + $(section).innerHeight() > currentTop) {
                    // console.log(section);
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            }
        });
    }
}

function scrollToHash() {

    $('.navbar__link').click( function(){
        if ($('section').is('#home')) {
            console.log('#home');
            // e.preventDefault();
            var scroll_el = $(this).attr('href').replace(/^.*?(#|$)/,''),
            headerH = $('.header').height();


            if (isXsWidth()) {
                $('body').removeClass('nav_open');
            }
            if (scroll_el !== '') {
                var el = $('#'+scroll_el);
                if (el.length != 0) {
                    $('html, body').animate({ scrollTop: el.offset().top - headerH}, 500);
                }
                return false;
            }
        }
    });
}

scrollToHash();

//
// function disabledScroll() {
//     $("body").addClass("disabled-onepage-scroll");
// }
//
// function enabledScroll() {
//     $("body").removeClass("disabled-onepage-scroll");
// }
//
// $('.scrolled').on('mouseenter', function(e) {
//     disabledScroll();
// })
//
// // $('body').on('mouseenter', function(e) {
// //     if (e.target.classList[1] == 'scrolled') {
// //         disabledScroll();
// //     } else {
// //         enabledScroll();
// //     }
// // })
//
// $('.scrolled').on('mouseleave', function() {
//     if ($(this).hasClass('.projects__text')) return false;
//     enabledScroll();
// })
//
// $('.modal').on('shown.bs.modal', function() {
//     if (!isXsWidth()) {
//         disabledScroll();
//     }
// });
//
// $('.modal').on('hidden.bs.modal', function() {
//     if (!isXsWidth()) {
//         enabledScroll();
//     }
// });
//
$('.modal').on('mousemove', function(e) {
    if (!isXsWidth()) {
        // console.log(e.screenX);
        // console.log(e.screenY);
        $('.layer').each(function(index, el) {
            var speed = $(this).data('speed'),
            x = e.screenX/100,
            y = e.screenY/100;
            // console.log(x);

            $(this).css('transform', 'translate3d(-'+x/speed+'px, -'+y/speed+'px, 0)');
            // console.log(e.screenX);
        });
    }
});

function timeToShow(el, dalay) {
    el.each(function(i) {
        var self = $(this);
        // console.log(self);
        setTimeout(function () {
            self.addClass('show');
        }, dalay * i);
    });
}


// function goToSlide(el) {
//     if (!isXsWidth()) {
//         app.page.moveTo(el.data('slide'));
//     }
// }
// $('[data-slide]').on('click', function() {
//     goToSlide($(this));
// });

// $('.projects__next').on('click', function() {
//     // console.log(app.section.length);
//     // console.log(app.current);
//     if (!isXsWidth()) {
//         if (app.current == app.section.length) {
//             app.page.moveTo(1);
//         } else {
//             app.page.moveDown();
//         }
//     }
// })


function showLoader() {
    $('body').append('<div class="loader"><div class="lds"><div></div><div></div><div></div></div></div>');
}

function hideLoader() {
    // console.log('loader hide');
    $('.loader').remove();
}

function loadPage() {
    // console.log(app.hash);
    if (!isXsWidth()) {

        $('#home').addClass('active');
        $('body').addClass('loaded');
        // var screenIndex = $(app.hash).data('index');
        //
        // // console.log(screenIndex);
        // if (screenIndex !== 0) {
        //     app.section.first().addClass('visibled');
        // } else {
        //     app.section.first().removeClass('visibled');
        // }
        //
        // $('.main_content').moveTo(screenIndex);
        //
        // $('[data-slide]').removeClass('active');
        // $('.section.active').addClass('visibled');

        setActiveNav();
        // $('body').addClass('loaded');
        $('.section').viewportChecker({
            repeat: true,
            offset: 200,

            callbackFunction: function(elem, action) {
                // var elClass = elem.attr('class');

                // console.log(elClass);

                // $('.section__left').css('zIndex', 1);
                // $('.' + elClass + ' .section__left').css('zIndex', 2);
                $(elem).addClass('active');

                if (elem.hasClass('price')) {
                    // console.log('Price');
                    timeToShow($('.price__item'), 500);
                    timeToShow($('.price__info li'), 200);
                }
                if (elem.hasClass('projects')) {
                    // console.log(elem.attr('id'), action);
                    //
                    // if (action == 'remove') {
                    //     // console.log(elem);
                    //     $(elem).find('iframe').remove();
                    // }
                    // console.log('project');
                    timeToShow($('.projects__photo'), 200);
                }
            }
        });

        $('.jobs__item').viewportChecker({
            offset: 20,
            callbackFunction: function(elem) {
                elem.addClass('show');
            }
        })
    }
}

// function setHash(index) {
//     var self = $('[data-index='+index+']'),
//     currentIndex = index;
//     app.hash = self.attr('id');
//
//     // console.log(app.hash);
//     location.hash = app.hash;
// }



$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (app.resized == windowWidth) { return; }
    app.resized = windowWidth;

	checkOnResize();
});

function checkOnResize() {
    // fontResize();
    // $(".jobs__content").reinitialise();
    // renderContent();
    replaceVideoProjects();

    if (!isXsWidth()) {
        $('.price__info').appendTo('.price .section__left');
    } else {
        $('.price__info').appendTo('.price');

        $('.nav__toggle').on('click', function() {
            $('body').toggleClass('nav_open');
        });
        // $('.jobs__more .btn').on('click', function() {
        //     $('.jobs__item').toggleClass('show-more');
        //     $(this).hide();
        // });
    }
}

function replaceVideoProjects() {
    var item, wrapper, video = $('.projects__video');
    video.each(function(index, el) {
        item = $(this).closest('.projects__item'),
        wrapper = $(this).closest('.projects__wrapper');
        if (isXsWidth()) {
            $(this).prependTo(item);
        } else {
            $(this).prependTo(wrapper);
        }
    });
}

// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function (e){
        e.preventDefault();
        var form = $(this).closest('.form');
        var url = form.attr('action');
        var form_data = form.serialize();
        var field = form.find('[required]');
        // console.log(form_data);

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                // return false;
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }
        });

        // console.log(empty);

        if (empty > 0) {
            return false;
        } else {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function (response) {
                    // $('#success').modal('show');
                    // console.log('success');
                    console.log(response);
                    // console.log(data);
                    // document.location.href = "success.html";
                },
                error: function (response) {
                    // $('#success').modal('show');
                    // console.log('error');
                    console.log(response);
                }
            });
        }

    });

    $('[required]').on('keyup', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });
}
formSubmit();
