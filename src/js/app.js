var load = require('./loader'),
    dom = require('./dom'),
    player = require('./random-player');

load();

dom.one('.btn-play').addEventListener('click', player.play);
dom.one('.btn-pause').addEventListener('click', player.pause);
