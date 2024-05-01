import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { ScoreType } from "./score-type";
import { CellType } from "../cell/cell-type";

export class Score {
  score: ScoreType = { WhiteCount: 0, BlackCount: 0 };

  constructor() {
    this.score.BlackCount = 0;
    this.score.WhiteCount = 0;
  }

  getScore(map: number[][]): ScoreType {
    this.score.BlackCount = 0;
    this.score.WhiteCount = 0;
    for (let j = 0; j < map.length; j++) {
      for (let i = 0; i < map[j].length; i++) {
        this.score.BlackCount += map[j][i] === CellType.Black ? 1 : 0;
        this.score.WhiteCount += map[j][i] === CellType.White ? 1 : 0;
      }
    }
    return this.score;
  }

  printScore() {
    console.log(
      `現在 黒：${this.score.BlackCount}枚vs白：${this.score.WhiteCount}枚`
    );
  }
}
