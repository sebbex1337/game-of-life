import { init, nextGeneration, grid, setGenerationCount } from "./model.js";
import { renderGrid } from "./view.js";

let intervalId;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("stop-btn").addEventListener("click", stopGame);
document.getElementById("randomize-btn").addEventListener("click", randomizeGrid);
document.getElementById("clear-btn").addEventListener("click", clearGrid);

function startGame() {
  intervalId = setInterval(() => {
    nextGeneration();
    renderGrid(grid);
  }, 100);
}

function stopGame() {
  clearInterval(intervalId);
}

function randomizeGrid() {
  grid.fill(() => Math.random() < 0.2);
  renderGrid(grid);
}

function clearGrid() {
  grid.fill(false);
  setGenerationCount(0);
  renderGrid(grid);
}

// Initial setup
init(20, 20);
randomizeGrid();
renderGrid(grid);
