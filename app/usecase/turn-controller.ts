import { useSearchParams } from "next/dist/client/components/navigation";
import { CellType } from "../entity/cell/cell-type";
import { Turn } from "../entity/turn/turn";
import { TurnType } from "../entity/turn/turn-type";

export class TurnController {
	turn = new Turn();
	playerId: number[] = [];
	piece: CellType[] = [];

	constructor() { }

	setPlayer(playerA: number, playerB: number) {
		this.playerId[0] = playerA;
		this.playerId[1] = playerB;
		this.piece[0] = CellType.Black;
		this.piece[1] = CellType.White;
	}

	changeTurn() {
		this.turn = this.turn.changeTurn();
	}

	getCurrentTurn(): TurnType {
		return this.turn.getCurrentTurn();
	}

	getCurrentTurnCell(): CellType {
		if (this.turn.getCurrentTurn() === TurnType.TurnA) return CellType.Black;
		else return CellType.White;
	}

	getCurrentPlayerId(): number {
		return this.playerId[this.turn.getCurrentTurn()];
	}

	getPlayerAId(): number {
		return this.playerId[0];
	}

	getPlayerBId(): number {
		return this.playerId[1];
	}
}
