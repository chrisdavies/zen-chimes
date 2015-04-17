module.exports = {
  one: function (selector) {
    return document.querySelector(selector);
  },

  all: function (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
  },

  classes: function (el) {
    return (el.getAttribute('class') || '').split(/\W+/g);
  },

  hasClass: function (el, className) {
    return dom.classes(el).indexOf(className) >= 0;
  },

  addClass: function (el, className) {
    if (!dom.hasClass(el, className)) {
      el.setAttribute('class', el.getAttribute('class') + ' ' + className);
    }
  }
};
