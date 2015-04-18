app('clock', function () {
  var $ = app('dom'),
      events = app('events'),
      settingsStore = app('settings');

  var minutes = settingsStore.read().minutes,
      timeout,
      seconds = totalSeconds(),
      clock = $('.zen-clock');

  events.on('paused', stop);

  events.on('playing', start);

  events.on('reset', reset);

  events.on('settings-updated', function (settings) {
    minutes = settings.minutes;
    reset();
  });

  function totalSeconds() {
    return (minutes || 10) * 60;
  }

  function pad(i) {
    return ('00' + i.toString()).slice(-2);
  }

  function setTime() {
    var minutes = Math.floor(seconds / 60),
        secondsInMinute = (seconds % 60);
    clock.text(pad(minutes) + ':' + pad(secondsInMinute));
  }

  function start () {
    setTimeout(function decSecond () {
      if (--seconds) {
        setTime();
        timeout = setTimeout(decSecond, 1000);
      } else {
        done();
        reset();
      }
    }, 0);
  }

  function stop () {
    clearTimeout(timeout);
  }

  function reset() {
    seconds = totalSeconds();
    setTime();
  }

});
