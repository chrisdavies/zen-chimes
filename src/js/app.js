var load = require('./loader'),
    dom = require('./dom'),
    page = require('./page'),
    player = require('./random-player');

load(function () {
  page.show('paused-page');
});

dom.one('.btn-play').addEventListener('click', function () {
  player.play();
  page.show('playing-page');
});

dom.one('.btn-pause').addEventListener('click', function () {
  player.pause();
  page.show('paused-page');
});

dom.one('.btn-edit').addEventListener('click', function () {
  page.show('editing-page');
});
