import { randomState, nextState, deadState } from "./gameOfLifeLogic.js";

class GameBoard {
  constructor(cellSize, width, height) {
    //Size of each cell in px
    this.cellSize = cellSize;
    //Dimensions of the board in cells
    this.width = width;
    this.height = height;
    this.currentState = randomState(width, height);
    this.toRender = [];
  }
}

export { GameBoard };
