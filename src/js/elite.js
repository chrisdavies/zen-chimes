app.Elite = function () {
  var callbacks = [],
      noop = function () { };
      callback = noop;

  return {
    on: on,
    off: off,
    trigger: callback
  };

  function chain(fn) {
    prevCallback = callback;
    callback = function (data) {
      prevCallback(data);
      fn(data);
    };
  }

  function on(fn) {
    callbacks.push(fn);
    chain(fn);
  }

  function off(fn) {
    callbacks = callbacks.filter(function (cb) {
      return cb !== fn;
    });

    callback = noop;
    callbacks.forEach(chain);
  }
};
