import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { ScoreType } from "./score-type";
import { CellType } from "../cell/cell-type";

export class Score {
	score: ScoreType = { whiteCount: 0, blackCount: 0 };

	constructor() {
		this.score.blackCount = 0;
		this.score.whiteCount = 0;
	}

	getBlackScore(): number {
		return this.score.blackCount;
	}

	getWhiteScore(): number {
		return this.score.whiteCount;
	}

	getScore(map: number[][]): ScoreType {
		this.score.blackCount = 0;
		this.score.whiteCount = 0;
		for (let j = 0; j < map.length; j++) {
			for (let i = 0; i < map[j].length; i++) {
				this.score.blackCount += map[j][i] === CellType.Black ? 1 : 0;
				this.score.whiteCount += map[j][i] === CellType.White ? 1 : 0;
			}
		}
		return this.score;
	}

	getScoreText(): string {
		return `黒：${this.score.blackCount}枚vs白：${this.score.whiteCount}枚`
	}
}
