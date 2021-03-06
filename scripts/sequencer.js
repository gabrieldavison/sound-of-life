import { board, gameActive } from "./gameController.js";
import { playStep } from "./soundController.js";
import { displayStep, clearSequencerCanvas } from "./render.js";

let sequencerActive = false;
let seqIntervalID;
let sequencerSpeed = 1000;
function updateSequencerSpeed(value) {
  value < 10 ? (sequencerSpeed = 10) : (sequencerSpeed = value);
}
//step length in conway cells
let stepLength = 10;

//collects all active cells in a step and counts them, these are passed on to playStep
function collectNotes(gameState, step) {
  let notes = [];
  for (let i = 0; i < gameState.length; i += 5) {
    let noteCount = 0;
    //iterates through each 10*10 cell and counts the number of active cells
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
  stopSequencer();
  sequencerActive = true;
  let stepNumber = 0;

  //runs the noteloop at interval = sequencer speed
  (function repeat() {
    //exit loop if sequencer has been stopped
    if ((sequencerActive = false)) {
      return;
    }
    //displays current step
    displayStep(stepNumber);
    //chooses which state to laod notes from
    if (gameActive === true) {
      collectNotes(board.toRender, stepNumber);
    } else {
      collectNotes(board.currentState, stepNumber);
    }
    stepNumber < 9 ? (stepNumber += 1) : (stepNumber = 0);
    //Loop calls itself recursively so that sequencerSpeed can be checked for changes each iteration
    seqIntervalID = setTimeout(repeat, sequencerSpeed);
  })();
}

function stopSequencer() {
  sequencerActive = false;
  clearInterval(seqIntervalID);
  clearSequencerCanvas();
}

export { startSequencer, stopSequencer, updateSequencerSpeed, stepLength };
