import Cell from "@/app/components/cell";
import { CellType } from "../cell/cell-type";
import { TurnType } from "./turn-type";
import { Player, PlayerData } from "../player/player-type";

export class Turn {
  turn: TurnType = TurnType.TurnA;
  pieceColor: CellType[] = [CellType.Black, CellType.White];
  playersId: number[] = [];

  constructor(playerAId: number, playerBId: number) {
    this.playersId[0] = playerAId;
    this.playersId[1] = playerBId;
  }
  getTurn(): Turn {
    return this;
  }

  changeTurn(): Turn {
    if (this.turn === TurnType.TurnA) {
      this.turn = TurnType.TurnB;
    } else if (this.turn === TurnType.TurnB) {
      this.turn = TurnType.TurnA;
    }
    console.log(`turn changed ${this.turn}`);
    return this;
  }

  getCurrentTurn(): TurnType {
    return this.turn;
  }
}
