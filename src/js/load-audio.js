app('load-audio', function () {
  return function (done) {
    var $ = app('dom');

    if (isFirefox()) {
      showUnsupportedMessage();
    } else {
      loadAudio();
    }

    function isFirefox() {
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }

    function showUnsupportedMessage() {
      $('.loading-message').text('FireFox is unsupported. :/');
    }

    function loadAudio() {
      var loadCount = 0,
        wav = [
          'c1',
          'c2',
          'c3',
          'c4',
          'c5',
          'c6'
        ];
      
      var audioHtml = wav.map(function (w) {
        return '<audio preload="auto">' +
          '<source src="audio/' + w + '.mp3" />' +
          '<source src="audio/' + w + '.wav" />' +
          '</audio>';
      }).join('');

      var bar = $('.loading-bar');

      $('.zen-page').append(audioHtml);

      function incIfReady (audio) {
        if (audio.readyState <= 3 || loadCount >= wav.length) return false;

        ++loadCount;

        bar.css({
          width: ((loadCount / wav.length) * 100) + '%'
        });

        (loadCount >= wav.length) && done && done();

        return true;
      }

      $('audio').on('canplay', function (e) {
        incIfReady(e.target);
      }).forEach(function (audio) {
        audio.load();
      });
    }
  };
});
