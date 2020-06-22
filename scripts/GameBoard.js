import { randomState, nextState, deadState } from "./game-of-life.js";

class GameBoard {
  constructor(cellSize, width, height){
    //Size of each cell in px
    this.cellSize = cellSize;
    //Dimensions of the board in cells
    this.width = width;
    this.height = height;
    this.currentState = deadState(width, height);
    this.toRender = []
  }
}

export {GameBoard}