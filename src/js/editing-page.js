app('editing-page', function () {
  var dom = app('dom'),
      settingsStore = app('settings'),
      settings = settingsStore.read(),
      timeInput = dom.one('input[name=time]');

  timeInput.value = settings.minutes;

  dom.one('.settings-form').addEventListener('submit', function (e) {
    e.preventDefault();
    settings.minutes = parseInt(timeInput.value) || 10;
    settingsStore.update(settings);
  });
});
