import { stepLength } from "./sequencer.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

function drawCanvas(canvasWidth, canvasHeight) {
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
}

//Renders game to html5 canvas
function renderStateToCanvas(state, cellSize) {
  let width = state[0].length;
  let height = state.length;
  ctx.canvas.width = width * cellSize;
  ctx.canvas.height = height * cellSize;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      ctx.beginPath();
      if (state[y][x] === 1) {
        ctx.fillStyle = "#80a851";
        ctx.fillRect(x * 10, y * 10, 10, 10);
      }
    }
  }
}

//Renders active sequencer Step to canvas
const stepCounter = document.querySelector("#sequencer-canvas");
const counterCtx = stepCounter.getContext("2d");
counterCtx.canvas.width = 100 * stepLength;
counterCtx.canvas.height = 100;

function displayStep(stepNumber) {
  counterCtx.clearRect(0, 0, 1000, 100);
  counterCtx.fillStyle = "#4f8f75";
  counterCtx.fillRect(stepNumber * 100, 100, 100, -100);
}

function clearSequencerCanvas() {
  counterCtx.clearRect(0, 0, 1000, 100);
}

export { renderStateToCanvas, drawCanvas, displayStep, clearSequencerCanvas };
