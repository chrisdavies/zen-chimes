app('events', function () {
  var Elite = app('elite'),
      events = {};

  function getEvent(name) {
    return events[name] || (events[name] = Elite());
  }

  return {
    on: function (name, fn) {
      getEvent(name).on(fn);
    },

    off: function (name, fn) {
      getEvent(name).off(fn);
    },

    trigger: function (name, args) {
      setTimeout(function () {
        getEvent(name).trigger(args);
      }, 0);
    }
  };
});
