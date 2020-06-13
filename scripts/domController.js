import {
  startGame,
  stopGame,
  updateWidth,
  updateHeight,
  randomizeCurrentState,
  editCurrentState,
  clearState,
} from "./gameController.js";
import {
  startSequencer,
  stopSequencer,
  updateSequencerSpeed,
} from "./sequencerController.js";

//Adds event listeneres to UI elements.

function setupEventListeners() {
  const startButton = document.querySelector("#start-button");
  startButton.addEventListener("click", () => {
    stopGame();
    startGame();
    toggleStartStop();
  });

  const stopButton = document.querySelector("#stop-button");
  stopButton.addEventListener("click", () => {
    stopGame();
    toggleStartStop();
  });

  //toggles the visibility of start or stop button to so only one is visible at a time
  function toggleStartStop() {
    startButton.classList.toggle("hidden");
    stopButton.classList.toggle("hidden");
  }

  const randomizeButton = document.querySelector("#randomize-button");
  randomizeButton.addEventListener("click", () => {
    randomizeCurrentState();
  });

  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", () => {
    clearState();
  });

  const widthInput = document.querySelector("#width-input");
  widthInput.value = 100;
  //both even listeners necessary to that width updates while typing and when the input loses focus
  widthInput.addEventListener("input", (e) => {
    updateWidth(e.target.value);
  });
  widthInput.addEventListener("change", (e) => {
    updateWidth(e.target.value);
  });

  const heightInput = document.querySelector("#height-input");
  heightInput.value = 50;
  heightInput.addEventListener("input", (e) => {
    updateHeight(e.target.value);
  });
  heightInput.addEventListener("change", (e) => {
    updateHeight(e.target.value);
  });

  //Gets coordinates of each click on canvas and returns them rounded down to nearest 10
  function getMouseCoordinates(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [Math.floor(x / 10), Math.floor(y / 10)];
  }

  //event listener for placing cells with mouse
  const canvas = document.querySelector("#game-canvas");
  canvas.addEventListener("click", (e) => {
    editCurrentState(getMouseCoordinates(canvas, e));
  });

  const startSeq = document.querySelector("#start-seq");
  startSeq.addEventListener("click", () => {
    startSequencer();
  });

  const stopSeq = document.querySelector("#stop-seq");
  stopSeq.addEventListener("click", () => {
    stopSequencer();
  });

  const startAudio = document.querySelector("#start-audio");
  startAudio.addEventListener("click", async () => {
    await Tone.start();
    console.log("audio go go");
  });

  const sequencerSpeed = document.querySelector("#sequencer-speed");
  sequencerSpeed.value = 1000;
  sequencerSpeed.addEventListener("input", (e) => {
    updateSequencerSpeed(e.target.value);
  });
  sequencerSpeed.addEventListener("change", (e) => {
    updateSequencerSpeed(e.target.value);
  });
}

export { setupEventListeners };
