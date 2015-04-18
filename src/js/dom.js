(function () {
  app.dom = {
    one: function (selector) {
      return document.querySelector(selector);
    },

    all: function (selector) {
      return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    },

    classes: function (el) {
      return (el.getAttribute('class') || '').split(/[^\w\-]+/g);
    },

    hasClass: function (el, className) {
      return dom.classes(el).indexOf(className) >= 0;
    },

    removeClass: function (el, className) {
      el.setAttribute('class', dom.classes(el).filter(function (cls) {
        return cls !== className;
      }).join(' '));
    },

    addClass: function (el, className) {
      if (!dom.hasClass(el, className)) {
        el.setAttribute('class', el.getAttribute('class') + ' ' + className);
      }
    }
  };

  var dom = app.dom;
})();
