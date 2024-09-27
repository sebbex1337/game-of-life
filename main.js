// main.js
import { createModel } from "./model.js";
import { createView } from "./view.js";
import { createController } from "./controller.js";

const container = document.getElementById("game-container");
const model = createModel(50, 50);
const view = createView(container);
const controller = createController(model, view);

controller.init();

// Add event listeners for control buttons
document.getElementById("start-btn").addEventListener("click", controller.start);
document.getElementById("stop-btn").addEventListener("click", controller.stop);
document.getElementById("reset-btn").addEventListener("click", controller.reset);
