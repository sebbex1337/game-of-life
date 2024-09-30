import { generationCount } from "./model.js";

let isDragging = false;

window.addEventListener("mouseup", () => {
  isDragging = false;
});

export function renderGrid(grid) {
  const gameGrid = document.getElementById("game-grid");
  gameGrid.innerHTML = "";

  for (let row = 0; row < grid.rows; row++) {
    let tr = document.createElement("tr"); // Opret en række
    for (let col = 0; col < grid.cols; col++) {
      let td = document.createElement("td"); // Opret en celle
      td.setAttribute("draggable", "false");
      td.classList.add(grid.get(row, col) ? "alive" : "dead");

      td.addEventListener("mousedown", () => {
        isDragging = true;
        grid.set(row, col, true); // Sæt cellen til levende
        renderGrid(grid);
      });

      td.addEventListener("mouseover", () => {
        if (isDragging) {
          grid.set(row, col, true); // Sæt cellen til levende
          renderGrid(grid);
        }
      });

      tr.appendChild(td); // Tilføjer hver celle til nuværende række
    }
    gameGrid.appendChild(tr); // Tilføjer rækken til spilbrættet
  }

  document.getElementById("generation-count").innerText = generationCount;
}
