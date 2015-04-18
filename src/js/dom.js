app('dom', function () {
  var dom = function (selector) {
    var arr = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

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
          hasClass(el, cls);
        });
      },

      removeClass: function (cls) {
        arr.forEach(function (el) {
          removeClass(el, cls)
        });

        return self;
      },

      addClass: function (cls) {
        arr.forEach(function (el) {
          addClass(el, cls)
        });

        return self;
      },

      css: function (def) {
        arr.forEach(function (el) {
          for (var prop in def) {
            el.style[prop] = def[prop];
          }
        });

        return self;
      },

      text: function (txt) {
        if (txt === undefined) {
          return arr[0] ? arr[0].textContent : undefined;
        }

        arr.forEach(function (el) {
          el.textContent = txt;
        });

        return self;
      },

      val: function (txt) {
        if (txt === undefined) {
          return arr[0] ? arr[0].value : undefined;
        }

        arr.forEach(function (el) {
          el.value = txt;
        });

        return self;
      },

      on: function (evt, handler) {
        arr.forEach(function (el) {
          el.addEventListener(evt, handler);
        });

        return self;
      },

      off: function (evt, handler) {
        arr.forEach(function (el) {
          el.removeEventListener(evt, handler);
        });

        return self;
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

  function classes (el) {
    return (el.getAttribute('class') || '').split(/[^\w\-]+/g);
  }

  function hasClass (el, className) {
    return classes(el).indexOf(className) >= 0;
  }

  function removeClass (el, className) {
    el.setAttribute('class', classes(el).filter(function (cls) {
      return cls !== className;
    }).join(' '));
  }

  function addClass (el, className) {
    if (!hasClass(el, className)) {
      el.setAttribute('class', el.getAttribute('class') + ' ' + className);
    }
  }

  return dom;
});
