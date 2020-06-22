import { randomState, nextState, deadState } from "./game-of-life.js";
import { renderStateToCanvas } from "./render.js";
import { GameBoard } from "./GameBoard.js"

const board = new GameBoard(10, 100, 50)

//current state of board when the game is not active
let currentState = deadState(board.width, board.height);

//next state to of board that will be rendered when game is active
let toRender;

//Speed the game runs at in ms
let gameSpeed = 100;
function updateGameSpeed(value) {
  value < 10 ? (gameSpeed = 10) : (gameSpeed = value);
}

function randomizeCurrentState() {
  //if game is active randomizes toRender otherwise randomizes currentState
  if (gameActive) {
    toRender = randomState(board.width, board.height);
  } else {
    currentState = randomState(board.width, board.height);
    renderStateToCanvas(currentState, board.cellSize);
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
    renderStateToCanvas(currentState, board.cellSize);
  }
}

//resets the board to a state where no cells are active
function clearState() {
  if (gameActive) {
    toRender = deadState(board.width, board.height);
  } else {
    currentState = deadState(board.width, board.height);
  }

  renderStateToCanvas(currentState, board.cellSize);
}

let gameActive = false;

//used for stopping / starting game interval
let intervalID;

function startGame() {
  stopGame();
  gameActive = true;
  toRender = currentState;

  //IIFE that repeatedly advances the game by one turn until gameActive = false
  (function repeat() {
    if (gameActive === false) {
      return;
    }
    renderStateToCanvas(toRender, board.cellSize);
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

  renderStateToCanvas(currentState, board.cellSize);
  gameActive = false;
}

//Used to first render canvas when page loads
function setupCanvas() {
  renderStateToCanvas(currentState, board.cellSize);
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
  gameActive,
};
