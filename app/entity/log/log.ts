import { CellType } from "../cell/cell-type";
import { Point } from "../cell/point-type";
import { Score } from "../score/score";
import { LogType } from "./log-type";

export class Log {
	logDataList: LogType[] = [];
	constructor() { }
	pushLogData(playerCell: CellType | null, message: string) {
		const logData = { playerCell: playerCell, message: message };

		this.logDataList.push(logData);
	}

	fetchLogData(): LogType[] {
		return this.logDataList;
	}

	makeMessageFromPut(p: Point, score: Score): string {
		return `[${p.x}, ${p.y}]に置きました。→スコアは${score.getScoreText()}になりました。`;
	}

	makeMessageInvalidTurn(): string {
		return `置ける場所がありませんでした。ターンを入れ替えます`;
	}

	makeMessageEnded(score: Score): string {
		return `終了しました。最終スコアは${score.getScoreText()}です。`;
	}
}