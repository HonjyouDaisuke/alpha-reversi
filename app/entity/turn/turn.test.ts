import { CellType } from "../cell/cell-type";
import { Turn } from "./turn";
import { TurnType } from "./turn-type";

describe("Turn", () => {
  let turn: Turn;

  beforeEach(() => {
    turn = new Turn();
  });

  test("changeTurn method should switch turns correctly", () => {
    const initialTurn: TurnType = turn.getCurrentTurn();
    const expectedTurn: TurnType =
      initialTurn === TurnType.TurnA ? TurnType.TurnB : TurnType.TurnA;

    turn.changeTurn();
    const result: TurnType = turn.getCurrentTurn();

    expect(result).toEqual(expectedTurn);
  });
  test("changeTurn method should switch turns correctly (two times)", () => {
    const initialTurn: TurnType = turn.getCurrentTurn();
    const expectedTurn: TurnType = initialTurn;

    turn.changeTurn();
    turn.changeTurn();
    const result: TurnType = turn.getCurrentTurn();

    expect(result).toEqual(expectedTurn);
  });
  test("getTurn method test", () => {
    const gettedTurn = turn.getTurn();
    const result: TurnType = turn.turn;

    expect(result).toEqual(TurnType.TurnA);
  });
});
