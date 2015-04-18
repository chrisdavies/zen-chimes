app('paused-page', function () {
  var $ = app('dom'),
      events = app('events'),
      page = app('page');

  events.on('paused', function () {
    page.show('paused-page');
  });

  $('.btn-play').on('click', function () {
    events.trigger('playing');
    page.show('playing-page');
  });
});
