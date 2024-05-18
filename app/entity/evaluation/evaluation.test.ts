import { Evaluation } from "./evaluation";
import { CellType } from "../cell/cell-type";

describe("Evaluation", () => {
  let evaluation: Evaluation;
  let map: number[][];

  beforeEach(() => {
    evaluation = new Evaluation();
    map = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  });

  test("getEvaluation method should return correct evaluation value for black pieces", () => {
    const targetCell: CellType = CellType.Black;
    const expectedEvaluation: number = 7; // expected evaluation value for black pieces

    const result: number = evaluation.getEvaluation(map, targetCell);

    expect(result).toBe(expectedEvaluation);
  });

  test("getEvaluation method should return correct evaluation value for white pieces", () => {
    const targetCell: CellType = CellType.White;
    const expectedEvaluation: number = -7; // expected evaluation value for white pieces

    const result: number = evaluation.getEvaluation(map, targetCell);

    expect(result).toBe(expectedEvaluation);
  });
});
