import { RuleControl } from "@/app/usecase/rule-control";
import { CellType } from "../cell/cell-type";
import { BoardClass } from "./board";
import { Point } from "../cell/point-type";

export class BoardController {
  board = new BoardClass();

  setNewPiece(p: Point, player: CellType): BoardClass | null {
    const rule = new RuleControl();
    console.log(p);
    if (this.board.board[p.y][p.x] !== CellType.Empty) return null;
    if (!rule.checkAbleToPlace(this.board.board, p, player)) {
      console.log(`ここには置けません (${p.x},${p.y})`);
      return null;
    }
    let tempBoard = structuredClone(this.board);
    tempBoard.board = rule.flipPiece(tempBoard.board, p, player);
    return tempBoard;
  }

  getCurrentBoard(): number[][] {
    return this.board.board;
  }

  getCurrentBoardClass(): BoardClass {
    return this.board;
  }

  setNewBoard(board: number[][]) {
    this.board.board = board;
    console.log(`ボードを更新しました。`);
    console.log(this.board.board);
  }
}
