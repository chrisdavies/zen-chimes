(function () {
  var load = app('load-audio'),
      page = app('page'),
      events = app('events');

  load(function () {
    page.show('paused-page');
  });

  events.on('settings-updated', function () {
    page.show('playing-page');
  });
})();
