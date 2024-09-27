// view.js
export function createView(container) {
  function render(grid) {
    container.innerHTML = "";
    const table = document.createElement("table");

    for (let row = 0; row < grid.rows; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < grid.cols; col++) {
        const td = document.createElement("td");
        td.className = grid.get(row, col) ? "alive" : "dead";
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    container.appendChild(table);
  }

  return {
    render,
  };
}
