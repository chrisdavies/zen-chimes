app('playing-page', function () {
  var $ = app('dom'),
      page = app('page'),
      events = app('events');

  // Initialize page-components
  app('clock');
  app('random-player');

  // Add event handlers
  $('.btn-reset').on('click', function () {
    events.trigger('reset');
  });

  $('.btn-pause').on('click', function () {
    events.trigger('paused');
    page.show('paused-page');
  });

  $('.btn-edit').on('click', function () {
    page.show('editing-page');
  });

});
