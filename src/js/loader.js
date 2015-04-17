// Load audio files and display progress
var dom = require('./dom');

module.exports = function () {
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
    return '<audio>' +
      '<source src="./audio/' + w + '.mp3" />' +
      '<source src="./audio/' + w + '.wav" />' +
      '</audio>';
  }).join('');

  dom.one('.zen-page').insertAdjacentHTML('afterend', audioHtml);
  dom.all('audio').forEach(function(audio) {
    audio.addEventListener('canplaythrough', function () {
      if (++loadCount >= wav.length) {
        dom.one('.loading-message').textContent = 'Loaded.';
      }
    });
  });
}
