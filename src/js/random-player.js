app('random-player', function () {
  var dom = app('dom'),
      lastIndex = 0,
      timer;

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
    var audios = dom.all('audio');
    var i = Math.floor(Math.random() * 1000) % audios.length;

    if (lastIndex == i) {
      i = ++i % audios.length;
    }

    lastIndex = i;
    playOne(audios[i]);
  }

  function playOne (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

});
