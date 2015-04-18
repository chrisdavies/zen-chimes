(function () {
  var load = app('load-audio'),
      dom = app('dom'),
      page = app('page'),
      settingsStore = app('settings'),
      settings = settingsStore.read(),
      Clock = app('clock'),
      clock = Clock(settings.minutes, pause),
      player = app('random-player');

  load(function () {
    page.show('paused-page');
  });

  var timeInput = dom.one('input[name=time]');
  timeInput.value = settings.minutes;

  dom.one('.btn-save').addEventListener('click', function () {
    settings.minutes = parseInt(timeInput.value) || 10;
    settingsStore.update(settings);
    page.show('playing-page');
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

})();
