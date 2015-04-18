app('settings', function () {
  var key = 'settings',
      events = app('events');

  return {
    read: function () {
      return JSON.parse(localStorage.getItem(key) || '{ "minutes": 10 }');
    },

    update: function (settings) {
      localStorage.setItem(key, JSON.stringify(settings));
      events.trigger('settings-updated', settings);
    }
  };
});
