// controller.js
export function createController(model, view) {
  let intervalId = null;

  function init() {
    view.render(model.getGrid());
  }

  function start() {
    if (!intervalId) {
      intervalId = setInterval(() => {
        model.nextGeneration();
        view.render(model.getGrid());
      }, 100);
    }
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function reset() {
    stop();
    model.initialize();
    view.render(model.getGrid());
  }

  return {
    init,
    start,
    stop,
    reset,
  };
}
