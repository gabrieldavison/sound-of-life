import { randomState, nextState, deadState } from "./game-of-life.js";
import { renderStateToCanvas, drawCanvas } from "./render.js";

//size of each cell on canvas in px
let cellSize = 10;

let width = 100;
function updateWidth(value) {
  width = value;
  //clears state and draws new black canvas
  clearState();
  drawCanvas(width * 10, height * 10);
}

let height = 50;
function updateHeight(value) {
  height = value;
  clearState();
  drawCanvas(width * 10, height * 10);
}

//current state of game when the game is not active
let currentState = deadState(width, height);

function randomizeCurrentState() {
  //if game is active randomizes toRender otherwise randomizes currentState
  if (gameActive) {
    toRender = randomState(width, height);
  } else {
    currentState = randomState(width, height);
    renderStateToCanvas(currentState, cellSize);
  }
}

//edits current state when manually placing cells
function editCurrentState(coord) {
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

//clears current state or toRender depending on whether game is active
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

//next state to be rendered
let toRender;

//whether the game is active or not
let gameActive = false;

function startGame() {
  gameActive = true;
  toRender = currentState;
  intervalID = setInterval(() => {
    renderStateToCanvas(toRender, cellSize);
    toRender = nextState(toRender);
  }, 100);
}

function stopGame() {
  if (gameActive) {
    //stores state that will next be rendered so  canvas does not revert to whatever was stored in currentState before the game was started
    currentState = toRender;
  }
  clearInterval(intervalID);

  renderStateToCanvas(currentState, cellSize);
  gameActive = false;
}

function setupCanvas() {
  renderStateToCanvas(currentState, cellSize);
}

export {
  startGame,
  stopGame,
  updateWidth,
  updateHeight,
  randomizeCurrentState,
  editCurrentState,
  clearState,
  setupCanvas,
};
