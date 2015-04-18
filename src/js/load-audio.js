app.loadAudio = function (done) {
  var dom = app.dom,
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
    return '<audio>' +
      '<source src="./audio/' + w + '.mp3" />' +
      '<source src="./audio/' + w + '.wav" />' +
      '</audio>';
  }).join('');

  var bar = dom.one('.loading-bar');

  dom.one('.zen-page').insertAdjacentHTML('afterend', audioHtml);

  function incIfReady (audio) {
    if (audio.readyState <= 3 || loadCount >= wav.length) return false;

    ++loadCount;

    bar.style.width = ((loadCount / wav.length) * 100) + '%';

    (loadCount >= wav.length) && done && done();

    return true;
  }

  dom.all('audio').forEach(function(audio) {
    incIfReady(audio) || audio.addEventListener('canplay', function () {
      incIfReady(audio);
    });
  });
};
