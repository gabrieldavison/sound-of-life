import { randomState, nextState, deadState } from "./gameOfLifeLogic.js";
import { renderStateToCanvas } from "./render.js";
import { GameBoard } from "./GameBoard.js"

//initializes a gameBoard
const board = new GameBoard(10, 100, 50)


//Speed the game runs at in ms
let gameSpeed = 100;
function updateGameSpeed(value) {
  value < 10 ? (gameSpeed = 10) : (gameSpeed = value);
}

function randomizeGame() {
  //if game is active randomizes toRender otherwise randomizes currentState
  if (gameActive) {
    board.toRender = randomState(board.width, board.height);
  } else {
    board.currentState = randomState(board.width, board.height);
    renderStateToCanvas(board.currentState, board.cellSize);
  }
}

//edits the state of the board when manually placing cells
function placeCell(coord) {
  let stateToEdit;
  //decides whether to edit toRender if game is active or currentState if game is not active
  gameActive ? (stateToEdit = board.toRender) : (stateToEdit = board.currentState);

  if (stateToEdit[coord[1]][coord[0]] === 0) {
    stateToEdit[coord[1]][coord[0]] = 1;
  } else {
    stateToEdit[coord[1]][coord[0]] = 0;
  }
  if (gameActive === false) {
    renderStateToCanvas(board.currentState, board.cellSize);
  }
}

//resets the board to a state where no cells are active
function clearState() {
  if (gameActive) {
    board.toRender = deadState(board.width, board.height);
  } else {
    board.currentState = deadState(board.width, board.height);
  }

  renderStateToCanvas(board.currentState, board.cellSize);
}


let gameActive = false;

//used for stopping / starting the interval in the game loop
let intervalID;
function startGame() {
  stopGame();
  gameActive = true;
  board.toRender = board.currentState;

  //IIFE that repeatedly advances the game by one turn until gameActive = false
  (function repeat() {
    if (gameActive === false) {
      return;
    }
    renderStateToCanvas(board.toRender, board.cellSize);
    board.toRender = nextState(board.toRender);
    //repeat() calls itself until gameActive is false
    //this way gamespeed can be updated without stopping/starting game
    intervalID = setTimeout(repeat, gameSpeed);
  })();
}

function stopGame() {
  if (gameActive) {
    //currentState = toRender so that canvas does not revert to what was stored in currentState before the game was started
    board.currentState = board.toRender;
  }
  clearInterval(intervalID);

  renderStateToCanvas(board.currentState, board.cellSize);
  gameActive = false;
}

//Used to first render canvas when page loads
function initialRender() {
  renderStateToCanvas(board.currentState, board.cellSize);
}



export {
  startGame,
  stopGame,
  randomizeGame,
  placeCell,
  updateGameSpeed,
  clearState,
  initialRender,
  board,
  gameActive,
};
