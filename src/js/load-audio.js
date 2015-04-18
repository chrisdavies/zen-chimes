app('load-audio', function () {
  return function (done) {
    var $ = app('dom'),
        loadCount = 0,
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

    $('audio').forEach(function(audio) {
      incIfReady(audio) || audio.addEventListener('canplay', function () {
        incIfReady(audio);
      });
    });
  };
});
