import { Score } from "./score";
import { ScoreType } from "./score-type";

describe("Score", () => {
  let score: Score;

  beforeEach(() => {
    score = new Score();
  });

  test("getScore method should return correct score", () => {
    // Arrange
    const map: number[][] = [
      [0, 1, 1, 0],
      [1, 2, 2, 1],
      [1, 2, 1, 1],
      [0, 1, 1, 0],
    ];
    const expectedScore: ScoreType = { whiteCount: 3, blackCount: 9 };

    // Act
    const result: ScoreType = score.getScore(map);

    // Assert
    expect(result).toEqual(expectedScore);
  });
});
