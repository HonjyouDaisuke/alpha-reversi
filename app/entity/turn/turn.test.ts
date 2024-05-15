import { CellType } from "../cell/cell-type";
import { Turn } from "./turn";
import { TurnType } from "./turn-type";

describe("Turn", () => {
	let turn: Turn;

	beforeEach(() => {
		turn = new Turn();
	});

	test("changeTurn method should switch turns correctly", () => {
		// Arrange
		const initialTurn: TurnType = turn.getCurrentTurn();
		const expectedTurn: TurnType =
			initialTurn === TurnType.TurnA ? TurnType.TurnB : TurnType.TurnA;

		// Act
		turn.changeTurn();
		const result: TurnType = turn.getCurrentTurn();

		// Assert
		expect(result).toEqual(expectedTurn);
	});
	test("changeTurn method should switch turns correctly (two times)", () => {
		// Arrange
		const initialTurn: TurnType = turn.getCurrentTurn();
		const expectedTurn: TurnType = initialTurn;

		// Act
		turn.changeTurn();
		turn.changeTurn();
		const result: TurnType = turn.getCurrentTurn();

		// Assert
		expect(result).toEqual(expectedTurn);
	});
	test("getTurn method test", () => {
		// Act
		const gettedTurn = turn.getTurn();
		const result: TurnType = turn.turn;

		// Assert
		expect(result).toEqual(TurnType.TurnA);
	});
});
