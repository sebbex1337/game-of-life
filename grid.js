export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(false));
  }

  parseRowCol(rowOrObj, col) {
    if (typeof rowOrObj === "object") {
      return rowOrObj;
    }
    return { row: rowOrObj, col };
  }

  set(rowOrObj, colOrValue, value) {
    const { row, col } = this.parseRowCol(rowOrObj, colOrValue);
    this.grid[row][col] = value;
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
    return [
      this.north(row, column),
      this.south(row, column),
      this.west(row, column),
      this.east(row, column),
      this.northWest(row, column),
      this.northEast(row, column),
      this.southWest(row, column),
      this.southEast(row, column),
    ].filter(Boolean);
  }

  neighbourValues(rowOrObj, col) {
    return this.neighbours(rowOrObj, col).map(({ row, col }) => this.get(row, col));
  }

  north(row, col) {
    if (row > 0) {
      return { row: row - 1, col };
    }
    return undefined;
  }

  south(row, col) {
    if (row < this.rows - 1) {
      return { row: row + 1, col };
    }
    return undefined;
  }

  west(row, col) {
    if (col > 0) {
      return { row, col: col - 1 };
    }
    return undefined;
  }

  east(row, col) {
    if (col < this.cols - 1) {
      return { row, col: col + 1 };
    }
    return undefined;
  }

  northWest(row, col) {
    if (row > 0 && col > 0) {
      return { row: row - 1, col: col - 1 };
    }
    return undefined;
  }

  northEast(row, col) {
    if (row > 0 && col < this.cols - 1) {
      return { row: row - 1, col: col + 1 };
    }
    return undefined;
  }

  southWest(row, col) {
    if (row < this.rows - 1 && col > 0) {
      return { row: row + 1, col: col - 1 };
    }
    return undefined;
  }

  southEast(row, col) {
    if (row < this.rows - 1 && col < this.cols - 1) {
      return { row: row + 1, col: col + 1 };
    }
    return undefined;
  }

  size() {
    return this.rows * this.cols;
  }

  fill(value) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = typeof value === "function" ? value() : value;
      }
    }
  }
}
