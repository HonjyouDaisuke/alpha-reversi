import { BoardType } from "./board-type";
import { CellType } from "../cell/cell-type";

export class BoardClass {
  board: number[][] = [];

  constructor() {
    this.setEmpty();
    this.setStartPos();
  }

  setEmpty() {
    for (let i = 0; i < BoardType.height; i++) {
      this.board[i] = new Array(BoardType.width).fill(CellType.Empty);
    }
  }

  setStartPos() {
    this.setEmpty();
    this.board[3][3] = CellType.Black;
    this.board[3][4] = CellType.White;
    this.board[4][3] = CellType.White;
    this.board[4][4] = CellType.Black;
  }

  setPiece(x: number, y: number, piece: CellType): BoardClass {
    let tempBoard = structuredClone(this);
    tempBoard.board[y][x] = piece;
    return tempBoard;
  }
}
