// model.js
import { Grid } from "./grid.js";

export function createModel(rows, cols) {
  let grid = new Grid(rows, cols);

  function initialize() {
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        grid.set(row, col, Math.random() > 0.7 ? 1 : 0);
      }
    }
  }

  function nextGeneration() {
    const newGrid = new Grid(grid.rows, grid.cols);

    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const aliveNeighbors = countAliveNeighbors(row, col);
        const currentCell = grid.get(row, col);

        if (currentCell === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
          newGrid.set(row, col, 1);
        } else if (currentCell === 0 && aliveNeighbors === 3) {
          newGrid.set(row, col, 1);
        } else {
          newGrid.set(row, col, 0);
        }
      }
    }

    grid = newGrid;
  }

  function countAliveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < grid.rows && newCol >= 0 && newCol < grid.cols) {
          count += grid.get(newRow, newCol);
        }
      }
    }
    return count;
  }

  function getGrid() {
    return grid;
  }

  initialize();

  return {
    nextGeneration,
    getGrid,
    initialize,
  };
}
