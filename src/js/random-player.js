app('random-player', function () {
  var $ = app('dom'),
      events = app('events'),
      lastIndex = 0,
      timer;

  events.on('paused', pause);
  events.on('playing', loopRandom);

  return {
    play: loopRandom,
    pause: pause
  };

  function loopRandom() {
    var playMultiple = Math.random() > 0.7,
        nextLoop = Math.floor(Math.random() * 5000) + 250;

    playRandom();

    playMultiple && setTimeout(playRandom, 50);

    pause();
    timer = setTimeout(loopRandom, nextLoop);
  }

  function pause () {
    clearTimeout(timer);
  }

  function playRandom() {
    var audios = $('audio');
    var i = Math.floor(Math.random() * 1000) % audios.length;

    if (lastIndex == i) {
      i = ++i % audios.length;
    }

    lastIndex = i;
    playOne(audios.get(i));
  }

  function playOne (audio) {
    audio.volume = (Math.floor(Math.random() * 7) + 3) / 10;
    audio.currentTime ? audio.currentTime = 0 : audio.play();
  }

});
