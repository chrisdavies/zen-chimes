app('load-audio', function () {
  return function (done) {
    var $ = app('dom');

    generateAudioTags();

    monitorAudioStatus();

    function generateAudioTags() {
      var wav = [
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

      $('.zen-page').append(audioHtml);
    }

    function monitorAudioStatus() {
      var audios = $('audio').toArray(),
          bar = $('.loading-bar');

      audios.forEach(function (audio) {
        audio.load();
      });

      function updateProgress (loadCount) {
        bar.css({
          width: ((loadCount / audios.length) * 100) + '%'
        });
      }

      setTimeout(function checkReadyState () {
        var isDone = audios.every(function (audio) {
          return audio.readyState > 3;
        });

        if (isDone) {
          done();
        } else {
          updateProgress(audios.filter(function (audio) {
            return audio.readyState > 3;
          }).length);

          setTimeout(checkReadyState, 100);
        }
      }, 100);

    }
  };
});
