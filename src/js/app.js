var app = (function () {
  var modules = { };

  function init (name, def) {
    var val = def();
    modules[name] = function () {
      return val;
    };

    return val;
  }

  return function (name, def) {
    if (def) {
      modules[name] = function () {
        return init(name, def);
      };
    } else {
      return modules[name]();
    }
  }
})();
