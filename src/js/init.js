(function () {
  var load = app('load-audio'),
      dom = app('dom'),
      page = app('page'),
      events = app('events'),
      player = app('random-player');

  load(function () {
    page.show('paused-page');
  });

  events.on('settings-updated', function () {
    page.show('playing-page');
  });

  dom.one('.btn-play').addEventListener('click', function () {
    player.play();
    events.trigger('playing');
    page.show('playing-page');
  });

  dom.one('.btn-reset').addEventListener('click', function () {
    events.trigger('reset');
  });

  dom.one('.btn-pause').addEventListener('click', pause);

  dom.one('.btn-edit').addEventListener('click', function () {
    page.show('editing-page');
    dom.one('.editing-page input').select();
  });

  function pause () {
    player.pause();
    events.trigger('paused');
    page.show('paused-page');
  }

})();
