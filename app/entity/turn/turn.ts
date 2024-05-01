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
		console.log(`turn changed ${this.turn}`);
		return this;
	}

	getCurrentTurn(): TurnType {
		return this.turn;
	}

	printCurrentTurn() {
		let turnString = "現在のターンは:TurnAです。";

		if (this.turn === TurnType.TurnB) turnString = "現在のターンは:TurnBです。"

		console.log(turnString);
	}
}
