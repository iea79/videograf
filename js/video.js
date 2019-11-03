var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerId = $('.player').attr('id');

if (isXsWidth()) {
    var playerSettings = { 'autoplay': 0, 'controls': 0 }
    function onPlayerReady() {
        event.target.setVolume(100);
        event.target.stopVideo();
    }
} else {
    var playerSettings = { 'autoplay': 1, 'controls': 0 }
    function onPlayerReady(event) {
        event.target.setVolume(0);
        event.target.playVideo();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: playerId,
        playerVars: playerSettings,
        events: {
            'onReady': onPlayerReady,
        }
    });
}

$('.firstScreen__player').on('click', function() {
    $(this).remove();
    player.playVideo();
});


$('.voice').on('click', function() {
    toogleVoice($(this));
});


function toogleVoice(el) {
    var icon = el.find('.voice__icon'),
    state = el.find('.voice__state');

    if (icon.hasClass('muted')) {
        icon.removeClass('muted');
        state.text('Вкл');
        player.setVolume(100);
    } else {
        icon.addClass('muted');
        state.text('Выкл');
        player.setVolume(0);
    }
}


function uploadYoutubeVideo(toggl) {
    $(toggl).on('click', function () {
        console.log('video start');
        var wrapp = $(this).closest('.video__wrapper'),
        videoId = wrapp.attr('id');

        var div = $('<div/>').attr('id', 'video_'+videoId);

        var frameId = div.attr('id')
        wrapp.append(div);

        player = new YT.Player(frameId, {
            videoId: videoId,
            playerVars: { 'autoplay': 1, 'controls': 0 },
            events: {
                'onReady': onPlayerReady,
            }
        });

        console.log(player);
        function onPlayerReady(event) {
            event.target.setVolume(100);
            event.target.playVideo();

            var voice = $(this).closest('.section').find('.voice');
        }

    });
};
uploadYoutubeVideo('.video__play, .video__prev');
