'use client'
import { TurnType } from "./turn-type";

export class Turn {
	turn: TurnType = TurnType.TurnA;

	constructor() {
		this.turn = TurnType.TurnA;
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
		return this;
	}

	getCurrentTurn(): TurnType {
		return this.turn;
	}
}
