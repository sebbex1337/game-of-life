import * as model from "./model.js";
import * as view from "./view.js";

let intervalId;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("stop-btn").addEventListener("click", stopGame);
document.getElementById("randomize-btn").addEventListener("click", randomizeGrid);
document.getElementById("clear-btn").addEventListener("click", clearGrid);

function startGame() {
  intervalId = setInterval(() => {
    model.nextGeneration();
    view.renderGrid(grid);
  }, 100);
}

function stopGame() {
  clearInterval(intervalId);
}

function randomizeGrid() {
  model.grid.fill(() => Math.random() < 0.2);
  view.renderGrid(grid);
}

function clearGrid() {
  model.grid.fill(false);
  model.setGenerationCount(0);
  view.renderGrid(grid);
}

model.init(20, 20);
randomizeGrid();
view.renderGrid(grid);
