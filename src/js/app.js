var load = require('./loader'),
    dom = require('./dom'),
    page = require('./page'),
    settingsStore = require('./settings'),
    settings = settingsStore.read(),
    Clock = require('./clock'),
    clock = Clock(settings.minutes, pause),
    player = require('./random-player');

load(function () {
  page.show('paused-page');
});

var timeInput = dom.one('input[name=time]');
timeInput.value = settings.minutes;

dom.one('.btn-save').addEventListener('click', function () {
  settings.minutes = parseInt(timeInput.value) || 10;
  settingsStore.update(settings);
  page.show('playing-page');
  clock.stop();
  clock = Clock(settings.minutes, pause);
  clock.start();
});

dom.one('.btn-play').addEventListener('click', function () {
  player.play();
  clock.start();
  page.show('playing-page');
});

dom.one('.btn-reset').addEventListener('click', function () {
  clock.reset();
});

dom.one('.btn-pause').addEventListener('click', pause);

dom.one('.btn-edit').addEventListener('click', function () {
  page.show('editing-page');
  dom.one('.editing-page input').select();
});

function pause () {
  player.pause();
  clock.stop();
  page.show('paused-page');
}
