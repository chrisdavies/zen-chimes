app('editing-page', function () {
  var $ = app('dom'),
      settingsStore = app('settings'),
      settings = settingsStore.read(),
      timeInput = $('input[name=time]');

  timeInput.val(settings.minutes);

  $('.settings-form').on('submit', function (e) {
    e.preventDefault();
    settings.minutes = parseInt(timeInput.val()) || 10;
    settingsStore.update(settings);
  });

  return {
    load: function () {
      $('.editing-page input').select();
    }
  };
});
