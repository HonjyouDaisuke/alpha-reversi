import { Evaluation } from "./evaluation";
import { CellType } from "../cell/cell-type";

describe("Evaluation", () => {
  let evaluation: Evaluation;

  beforeEach(() => {
    evaluation = new Evaluation();
  });

  test("getEvaluation method should return correct evaluation value for black pieces", () => {
    // Arrange
    const map: number[][] = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const targetCell: CellType = CellType.Black;
    const expectedEvaluation: number = 7; // expected evaluation value for black pieces

    // Act
    const result: number = evaluation.getEvaluation(map, targetCell);

    // Assert
    expect(result).toBe(expectedEvaluation);
  });

  test("getEvaluation method should return correct evaluation value for white pieces", () => {
    // Arrange
    const map: number[][] = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const targetCell: CellType = CellType.White;
    const expectedEvaluation: number = -7; // expected evaluation value for white pieces

    // Act
    const result: number = evaluation.getEvaluation(map, targetCell);

    // Assert
    expect(result).toBe(expectedEvaluation);
  });
});
