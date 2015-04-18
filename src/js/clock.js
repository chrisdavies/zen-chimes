app.Clock = function (minutes, done) {
  var dom = app.dom,
      timeout,
      seconds = totalSeconds(),
      clock = dom.one('.zen-clock');

  return {
    stop: stop,
    start: start,
    reset: reset
  };

  function totalSeconds() {
    return (minutes || 10) * 60;
  }

  function pad(i) {
    return ('00' + i.toString()).slice(-2);
  }

  function setTime() {
    var minutes = Math.floor(seconds / 60),
        secondsInMinute = (seconds % 60);
    clock.textContent = pad(minutes) + ':' + pad(secondsInMinute);
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
};
