import { CellType } from "../entity/cell/cell-type";
import { Turn } from "../entity/turn/turn";
import { TurnType } from "../entity/turn/turn-type";

export class TurnController {
  turn = new Turn(0, 1);

  turnChange(): Turn {
    this.printTurn();
    this.turn = this.turn.changeTurn();
    this.printTurn();
    return this.turn;
  }

  getCurrentTurn(): Turn {
    return this.turn;
  }

  getCurrentTurnType(): TurnType {
    return this.turn.getCurrentTurn();
  }

  getPieceColor(turn: Turn): CellType {
    return turn.pieceColor[turn.getCurrentTurn()];
  }

  getUserId(turn: Turn): number {
    return turn.playersId[turn.getCurrentTurn()];
  }

  printTurn() {
    if (this.getCurrentTurnType() === TurnType.TurnA) console.log("現在：黒");
    if (this.getCurrentTurnType() === TurnType.TurnB) console.log("現在；白");
  }
}
