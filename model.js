import { Grid } from "./grid.js";

export let grid;
export let generationCount = 0;

export function init(rows, cols) {
  console.log("Model kører");
  createGrid(rows, cols);
}

function createGrid(rows, cols) {
  grid = new Grid(rows, cols);
}

export function decideCellState(isAlive, neighbours) {
  const aliveNeighbours = neighbours.filter((neighbour) => neighbour).length;
  if (isAlive) {
    if (aliveNeighbours < 2 || aliveNeighbours > 3) {
      return false; // Cellen dør
    } else {
      return true; // Cellen lever
    }
  } else {
    if (aliveNeighbours === 3) {
      return true; // Cellen genfødes
    }
  }
  return false; // Cellen forbliver død
}

export function nextGeneration() {
  const newGrid = new Grid(grid.rows, grid.cols);
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const isAlive = grid.get(row, col);
      const neighbours = grid.neighbourValues(row, col);
      const newState = decideCellState(isAlive, neighbours);
      newGrid.set(row, col, newState);
    }
  }
  grid = newGrid;
  generationCount++;
}

export function setGenerationCount(count) {
  generationCount = count;
}
