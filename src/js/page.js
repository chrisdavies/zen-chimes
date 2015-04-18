var dom = require('./dom');

module.exports = {
  show: function (page) {
    var activePage = dom.one('.active-page');

    dom.removeClass(activePage, 'active-page');
    dom.addClass(activePage, 'inactive-page');

    var pageElement = dom.one('.' + page);
    dom.removeClass(pageElement, 'inactive-page');
    dom.addClass(pageElement, 'active-page');
  }
};
