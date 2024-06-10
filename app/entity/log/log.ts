import { CellType } from "../cell/cell-type";
import { Point } from "../cell/point-type";
import { Score } from "../score/score";
import { LogType } from "./log-type";

export class Log {
	logDataList: LogType[] = [];
	lastLogId: number = 0;
	constructor() { }
	pushLogData(playerCell: CellType | null, message: string) {
		const logData = { id: this.lastLogId, playerCell: playerCell, message: message };
		this.lastLogId++;
		this.logDataList.push(logData);
	}

	fetchLogData(): LogType[] {
		return this.logDataList;
	}

	UnitConversion(p: Point): string {
		const xItems = ["A", "B", "C", "D", "E", "F", "G", "H"];
		const yItems = ["1", "2", "3", "4", "5", "6", "7", "8"];
		return `[${xItems[p.x]},${yItems[p.y]}]`;
	}
	makeMessageFromPut(p: Point, score: Score): string {
		return `${this.UnitConversion(
			p
		)}に置きました。→スコアは${score.getScoreText()}になりました。`;
	}

	makeMessageInvalidTurn(): string {
		return `置ける場所がありませんでした。ターンを入れ替えます`;
	}

	makeMessageEnded(score: Score): string {
		return `終了しました。最終スコアは${score.getScoreText()}です。`;
	}
}
