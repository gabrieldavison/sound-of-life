import {
  startGame,
  stopGame,
  randomizeCurrentState,
  editState,
  clearState,
  updateGameSpeed,
} from "./gameController.js";
import {
  startSequencer,
  stopSequencer,
  updateSequencerSpeed,
} from "./sequencerController.js";
import {
  updateModIndex,
  updateAttack,
  updateRelease,
  updateHarmonicity,
} from "./soundController.js";

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

  const gameSpeed = document.querySelector("#game-speed");
  gameSpeed.value = 100;
  gameSpeed.addEventListener("input", (e) => {
    updateGameSpeed(e.target.value);
  });
  gameSpeed.addEventListener("change", (e) => {
    updateGameSpeed(e.target.value);
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
    editState(getMouseCoordinates(canvas, e));
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

  const attack = document.querySelector("#attack");
  attack.addEventListener("input", (e) => {
    updateAttack(e.target.value);
  });

  const release = document.querySelector("#release");
  release.addEventListener("input", (e) => {
    updateRelease(e.target.value);
  });

  const harmonicity = document.querySelector("#harmonicity");
  harmonicity.addEventListener("input", (e) => {
    updateHarmonicity(e.target.value);
  });

  const modIndex = document.querySelector("#mod-index");
  modIndex.addEventListener("input", (e) => {
    updateModIndex(e.target.value);
  });
}

export { setupEventListeners };
