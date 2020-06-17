import { randomState, nextState, deadState } from "./game-of-life.js";
import { renderStateToCanvas } from "./render.js";

//size of each cell on canvas in px
let cellSize = 10;

//width and height of canvas in cells
let width = 100;
let height = 50;

//current state of board when the game is not active
let currentState = deadState(width, height);

//next state to of board that will be rendered when game is active
let toRender;

//Speed the game runs at in ms
let gameSpeed = 100;
function updateGameSpeed(value) {
  gameSpeed = value;
}

function randomizeCurrentState() {
  //if game is active randomizes toRender otherwise randomizes currentState
  if (gameActive) {
    toRender = randomState(width, height);
  } else {
    currentState = randomState(width, height);
    renderStateToCanvas(currentState, cellSize);
  }
}

//edits the state of the board when manually placing cells
function editState(coord) {
  let stateToEdit;
  //decides whether to edit toRender if game is active or currentState if game is not active
  gameActive ? (stateToEdit = toRender) : (stateToEdit = currentState);

  if (stateToEdit[coord[1]][coord[0]] === 0) {
    stateToEdit[coord[1]][coord[0]] = 1;
  } else {
    stateToEdit[coord[1]][coord[0]] = 0;
  }
  if (gameActive === false) {
    renderStateToCanvas(currentState, cellSize);
  }
}

//resets the board to a state where no cells are active
function clearState() {
  if (gameActive) {
    toRender = deadState(width, height);
  } else {
    currentState = deadState(width, height);
  }

  renderStateToCanvas(currentState, cellSize);
}

//used for stopping / starting game interval
let intervalID;

let gameActive = false;

function startGame() {
  stopGame();
  gameActive = true;
  toRender = currentState;

  //IIFE that repeatedly advances the game by one turn until gameActive = false
  (function repeat() {
    if (gameActive === false) {
      return;
    }
    renderStateToCanvas(toRender, cellSize);
    toRender = nextState(toRender);
    //repeat calls itself until gameActive is false
    //this way gamespeed can be updated without stopping/starting game
    intervalID = setTimeout(repeat, gameSpeed);
  })();
}

function stopGame() {
  if (gameActive) {
    //currentState = toRender so that canvas does not revert to what was stored in currentState before the game was started
    currentState = toRender;
  }
  clearInterval(intervalID);

  renderStateToCanvas(currentState, cellSize);
  gameActive = false;
}

//Used to first render canvas when page loads
function setupCanvas() {
  renderStateToCanvas(currentState, cellSize);
}

export {
  startGame,
  stopGame,
  randomizeCurrentState,
  editState,
  updateGameSpeed,
  clearState,
  setupCanvas,
  toRender,
  currentState,
  width,
  gameActive,
};
