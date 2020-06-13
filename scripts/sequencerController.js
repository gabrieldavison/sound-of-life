import {
  toRender,
  currentState,
  width,
  height,
  cellSize,
  gameActive,
} from "./gameController.js";
import { playStep } from "./soundController.js";

let sequencerActive = false;
let seqIntervalID;
let sequencerSpeed = 1000;
function updateSequencerSpeed(value) {
  sequencerSpeed = value;
}
//step length in conway cells
let stepLength = 10;

const stepCounter = document.querySelector("#sequencer-canvas");
const counterCtx = stepCounter.getContext("2d");
counterCtx.canvas.width = width * stepLength;
counterCtx.canvas.height = 100;

function displayStep(stepNumber) {
  counterCtx.clearRect(0, 0, 1000, 100);
  counterCtx.fillStyle = "#41FF00";
  counterCtx.fillRect(stepNumber * 100, 100, 100, -100);
}

function collectNotes(gameState, step) {
  let notes = [];
  //iterates through each of the 5 rows
  for (let i = 0; i < gameState.length; i += 5) {
    let noteCount = 0;
    //double for loop iterates through each 10*10 cell and counts the notes
    for (let y = i; y < i + 5; y++) {
      for (let x = step * stepLength; x < step * stepLength + stepLength; x++) {
        if (gameState[y][x] === 1) {
          noteCount += 1;
        }
      }
    }
    notes.push(noteCount);
  }
  playStep(notes);
}

function startSequencer() {
  console.log("start");
  sequencerActive = true;
  let stepNumber = 0;

  //first iteration of sequencer loop needs to happen immediately before timed loop begins.
  displayStep(stepNumber);
  collectNotes(currentState, stepNumber);
  stepNumber += 1;

  seqIntervalID = setInterval(() => {
    displayStep(stepNumber);
    if (gameActive === true) {
      collectNotes(toRender, stepNumber);
    } else {
      collectNotes(currentState, stepNumber);
    }
    stepNumber < 9 ? (stepNumber += 1) : (stepNumber = 0);
  }, sequencerSpeed);
}

function stopSequencer() {
  console.log("stop");
  clearInterval(seqIntervalID);
  counterCtx.clearRect(0, 0, 1000, 100);
}

export { startSequencer, stopSequencer, updateSequencerSpeed };
