app('elite', function () {
  return function () {
    var callbacks = [],
        noop = function () { },
        callback = noop;

    return {
      on: on,
      off: off,
      trigger: trigger
    };

    function trigger (arg) {
      callback(arg);
    }

    function buildCallback(fn1, fn2) {
      return function (data) {
        fn1(data); fn2(data);
      }
    }

    function chain(fn) {
      callback = buildCallback(callback, fn);
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
});
