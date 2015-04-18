app('dom', function () {
  return function (selector) {
    var arr = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

    function setProp(prop, val) {
      if (val === undefined) return arr[0] ? arr[0][prop] : undefined;

      return self.forEach(function (el) {
        el[prop] = val;
      });
    }

    function classes (el) {
      return (el.getAttribute('class') || '').split(/[^\w\-]+/g);
    }

    function hasClass (el, className) {
      return classes(el).indexOf(className) >= 0;
    }

    function removeClass (className, el) {
      el.setAttribute('class', classes(el).filter(function (cls) {
        return cls !== className;
      }).join(' '));
    }

    function addClass (className, el) {
      if (!hasClass(el, className)) {
        el.setAttribute('class', el.getAttribute('class') + ' ' + className);
      }
    }

    var self = {
      length: arr.length,

      forEach: function () {
        arr.forEach.apply(arr, arguments);
        return self;
      },

      get: function (i) {
        return arr[i];
      },

      hasClass: function (cls) {
        return arr.some(function (el) {
          return hasClass(el, cls);
        });
      },

      removeClass: function (cls) {
        return self.forEach(removeClass.bind(null, cls));
      },

      addClass: function (cls) {
        return self.forEach(addClass.bind(null, cls));
      },

      css: function (def) {
        return self.forEach(function (el) {
          for (var prop in def) {
            el.style[prop] = def[prop];
          }
        });
      },

      text: function (txt) {
        return setProp('textContent', txt);
      },

      val: function (txt) {
        return setProp('value', txt);
      },

      on: function (evt, handler) {
        return self.forEach(function (el) {
          el.addEventListener(evt, handler);
        });
      },

      off: function (evt, handler) {
        return self.forEach(function (el) {
          el.removeEventListener(evt, handler);
        });
      },

      append: function (html) {
        var el = arr[0];

        el && el.insertAdjacentHTML('afterend', html);

        return self;
      },

      select: function () {
        var el = arr[0];

        el && typeof(el.select) === 'function' && el.select();

        return self;
      }
    };

    return self;
  };
});
