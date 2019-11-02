/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */
// @prepros-append jquery.onepage-scroll.min.js
// @prepros-append jquery.jscrollpane.js
// @prepros-append jquery.mousewheel.js
// @prepros-append scroll.js
// @prepros-append video.js
// @prepros-append modal.js
// @prepros-append jquery.fancybox.min.js

var app = {
    page: $('#main'),
    section: $('.section'),
    hash: location.hash,
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

    // Inputmask.js
    // $('[name=tel]').inputmask("+9(999)999 99 99",{ showMaskOnHover: false });
    // formSubmit();

    checkOnResize();

    // $.fancybox.defaults.arrows = false;
    $.fancybox.defaults.transitionEffect = 'slide';

    // loadPage();
    setTimeout(function () {
        // hideLoader();
    }, 500);
    loadPage();

});

function renderContent() {

    if (isXsWidth()) {
        disabledScroll();
        app.section.removeAttr('style');
        app.page.removeClass('onepage-wrapper').removeAttr('style');
        // setTimeout(function () {
            // hideLoader();
        // }, 1000);
    } else {
        enabledScroll();
        app.page.onepage_scroll({
            updateURL: true,
            animationTime: -1,
            direction: "horizontal",
            loop: false,
            pagination: false,
            beforeMove: function(index) {
                // showLoader();
                setHash(index);
                $('.navbar__link').removeClass('active');
                // console.log(index);
                app.fScroll = true;
                app.section.removeClass('visibled');
                // console.log(player);
                // console.log(player.I.onReady);
                $('.projects__photo').removeClass('show');
                if (!$('.projects__video').length) {
                    // player.remove();
                    if (app.pageLoaded) {
                        player.stopVideo();
                    }
                } else {
                    $('.video__wrapper iframe').remove();
                }
                // $('body').removeClass('disabled-onepage-scroll');
                $('.jobs__content').removeClass('top_overlay');
                $('.price__item, .price__info li').removeClass('show');
                app.pageLoaded == true;
            },
            afterMove: function(index) {
                // hideLoader();
                setHash(index);
                app.current = index;
                enabledScroll();
                $('[data-index='+index+']').addClass('visibled');
                timeToShow($('.projects__photo'));


                if ($('[data-index='+index+']').hasClass('projects')) {
                    disabledScroll();
                    return false;
                }

                if (index === 1) {
                    if (player.onReady) {
                        player.playVideo();
                    }
                }

                if (index === 3) {
                    disabledScroll();
                    setTimeout(function () {
                        $('.jobs__content').addClass('top_overlay');
                    }, 1000);
                    // console.log(e);
                }

                if (index === 4) {
                    $('.price__item').each(function(index, el) {
                        setTimeout(function () {
                            $(el).addClass('show');
                        }, 600 * index);
                    });
                    $('.price__info li').each(function(index, el) {
                        setTimeout(function () {
                            $(el).addClass('show');
                        }, 200 * index);
                    });
                }

                setActiveNav();

            },
        });

    }

}

function setActiveNav() {
    $('.nav [data-slide]').each(function() {
        var thisHash = $(this).attr('href').replace(/^.*?(#|$)/,'');
        // console.log(thisHash +' '+ app.hash);

        if (thisHash === app.hash) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}

function disabledScroll() {
    $("body").addClass("disabled-onepage-scroll");
}

function enabledScroll() {
    $("body").removeClass("disabled-onepage-scroll");
}

$('.scrolled').on('mouseenter', function(e) {
    disabledScroll();
})

// $('body').on('mouseenter', function(e) {
//     if (e.target.classList[1] == 'scrolled') {
//         disabledScroll();
//     } else {
//         enabledScroll();
//     }
// })

$('.scrolled').on('mouseleave', function() {
    if ($(this).hasClass('.projects__text')) return false;
    enabledScroll();
})

$('.modal').on('shown.bs.modal', function() {
    if (!isXsWidth()) {
        disabledScroll();
    }
});

$('.modal').on('hidden.bs.modal', function() {
    if (!isXsWidth()) {
        enabledScroll();
    }
});

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

function timeToShow(el) {
    el.each(function(i) {
        var self = $(this);
        // console.log(self);
        setTimeout(function () {
            self.addClass('show');
        }, 200 * i);
    });
}


function goToSlide(el) {
    if (!isXsWidth()) {
        app.page.moveTo(el.data('slide'));
    }
}
$('[data-slide]').on('click', function() {
    goToSlide($(this));
});

$('.projects__next').on('click', function() {
    // console.log(app.section.length);
    // console.log(app.current);
    if (!isXsWidth()) {
        if (app.current == app.section.length) {
            app.page.moveTo(1);
        } else {
            app.page.moveDown();
        }
    }
})


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
        var screenIndex = $(app.hash).data('index');

        // console.log(screenIndex);
        if (screenIndex !== 0) {
            app.section.first().addClass('visibled');
        } else {
            app.section.first().removeClass('visibled');
        }

        $('.main_content').moveTo(screenIndex);

        $('[data-slide]').removeClass('active');
        $('.section.active').addClass('visibled');
        timeToShow($('.projects__photo'));
        setActiveNav();
        $('body').addClass('loaded');
    }
}

function setHash(index) {
    var self = $('[data-index='+index+']'),
    currentIndex = index;
    app.hash = self.attr('id');

    // console.log(app.hash);
    location.hash = app.hash;
}



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
    renderContent();
    replaceVideoProjects();
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

if (isXsWidth()) {
    $('.nav__toggle, .navbar__link').on('click', function() {
        $('body').toggleClass('nav_open');
    });

    $('.navbar__link').click( function(){
        var scroll_el = $(this).attr('href').replace(/^.*?(#|$)/,''),
            headerH = $('.header').innerHeight();

            console.log(scroll_el);
        $('body').removeClass('nav_open');
        if (scroll_el !== '') {
            var el = $('#'+scroll_el);
            if (el.length != 0) {
                $('html, body').animate({ scrollTop: el.offset().top - headerH}, 500);
            }
            return false;
        }
    });

    $('.scroll').on('click', function() {
        $('.jobs__item').toggleClass('show-more');
        $(this).hide();
    });
}
