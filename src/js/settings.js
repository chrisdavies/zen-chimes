(function () {
  var key = 'settings';
  
  app.settings = {
    read: function () {
      return JSON.parse(localStorage.getItem(key) || '{ "minutes": 10 }');
    },

    update: function (settings) {
      localStorage.setItem(key, JSON.stringify(settings));
    }
  };
})();
