var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = $('.player'),
    playerId = player.attr('id'),
    playrEl = player.children('div');
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: playerId,
        playerVars: { 'autoplay': 1, 'controls': 0 },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(0);
    event.target.playVideo();
}

$('.voice').on('click', function() {
    toogleVoice($(this));
});


function toogleVoice(el) {
    var icon = el.find('.voice__icon'),
    state = el.find('.voice__state');

    if (icon.hasClass('muted')) {
        // console.log('Вкл');
        icon.removeClass('muted');
        state.text('Вкл');
        player.setVolume(100);
    } else {
        // console.log('Выкл');
        icon.addClass('muted');
        state.text('Выкл');
        player.setVolume(0);
    }
}


// Видео youtube для страницы
function uploadYoutubeVideo() {
    if ($(".js_youtube")) {

        $('.video__play, .video__prev').on('click', function () {
            // создаем iframe со включенной опцией autoplay
            var wrapp = $(this).closest('.js_youtube'),
                videoId = wrapp.attr('id');

            var div = $('<div/>').attr('id', 'video_'+videoId);

            var frameId = div.attr('id')
            $(this).closest('.video__wrapper').append(div);

            player = new YT.Player(frameId, {
                videoId: videoId,
                playerVars: { 'autoplay': 1, 'controls': 0 },
                events: {
                    'onReady': onPlayerReady,
                }
            });

            console.log(player);
            function onPlayerReady(event) {
                // wrapp.find('.video__play').hide();
                event.target.setVolume(100);
                event.target.playVideo();

                var voice = $(this).closest('.section').find('.voice');

                // toogleVoice(voice);
                // voice.trigger('click');
            }

        });
    }
};
uploadYoutubeVideo();
