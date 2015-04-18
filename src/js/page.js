app('page', function () {
  return {
    show: function (page) {
      var dom = app('dom');
      var activePage = dom.one('.active-page');

      dom.removeClass(activePage, 'active-page');
      dom.addClass(activePage, 'inactive-page');

      var pageElement = dom.one('.' + page);
      dom.removeClass(pageElement, 'inactive-page');
      dom.addClass(pageElement, 'active-page');
    }
  }
});
