export class Grid {
  constructor(rowOrObj, cols) {
    const { row: rows, col: columns } = this.parseRowCol(rowOrObj, cols);
    this.rows = rows;
    this.cols = columns;
    this.grid = Array.from({ length: rows }, () => Array(columns).fill(null));
  }

  parseRowCol(rowOrObj, col) {
    if (typeof rowOrObj === "object") {
      return { row: rowOrObj.row, col: rowOrObj.col };
    }
    return { row: rowOrObj, col };
  }

  set(rowOrObj, colOrValue, value) {
    const { row, col } = this.parseRowCol(rowOrObj, colOrValue);
    const val = value !== undefined ? value : colOrValue;
    this.grid[row][col] = val;
  }

  get(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return this.grid[row][column];
  }

  indexFor(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return row * this.cols + column;
  }

  rowColFor(index) {
    const row = Math.floor(index / this.cols);
    const col = index % this.cols;
    return { row, col };
  }

  neighbours(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    const neighbours = [];
    if (row > 0) {
      neighbours.push({ row: row - 1, column }); // Check up
    }
    if (row < this.rows - 1) {
      neighbours.push({ row: row + 1, column }); // Check Down
    }
    if (column > 0) {
      neighbours.push({ row, col: column - 1 }); // Check Left
    }
    if (column < this.cols - 1) {
      neighbours.push({ row, col: column + 1 }); // Check Right
    }
    return neighbours;
  }

  neighbourValues(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return this.neighbours(row, column).map(({ row, col }) => this.get(row, col));
  }

  nextInRow(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (column < this.cols - 1) {
      return { row, col: column + 1 };
    }
    return undefined;
  }

  nextInCol(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (row < this.rows - 1) {
      return { row: row + 1, column };
    }
    return undefined;
  }

  north(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (row > 0) {
      return { row: row - 1, column };
    }
    return undefined;
  }

  south(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (row < this.rows - 1) {
      return { row: row + 1, column };
    }
    return undefined;
  }

  west(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (column > 0) {
      return { row, col: column - 1 };
    }
    return undefined;
  }

  east(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (column < this.cols - 1) {
      return { row, col: column + 1 };
    }
    return undefined;
  }

  rows() {
    return this.rows;
  }

  cols() {
    this.cols;
  }

  size() {
    return this.rows * this.cols;
  }

  fill(value) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.set(row, col, value);
      }
    }
  }
}
