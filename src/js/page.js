app('page', function () {
  return {
    show: function (page) {
      var $ = app('dom');

      $('.active-page')
        .removeClass('active-page')
        .addClass('inactive-page');

      $('.' + page)
        .removeClass('inactive-page')
        .addClass('active-page');

      var pg = app(page);
      pg && pg.load && pg.load();
    }
  }
});
