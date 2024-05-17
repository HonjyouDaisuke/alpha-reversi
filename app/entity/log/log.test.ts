import { CellType } from '../cell/cell-type';
import { Score } from '../score/score';
import { Point } from '../cell/point-type';
import { Log } from './log';
import Cell from '@/components/cell';
import { ScoreType } from '../score/score-type';

class MockScore {
	score: ScoreType = { whiteCount: 0, blackCount: 0 };
	getScoreText(): string {
		return 'test score';
	}
	getBlackScore(): number {
		return 3;
	}

	getWhiteScore(): number {
		return 4;
	}
}

describe('Log', () => {
	let log: Log;

	beforeEach(() => {
		log = new Log();
	});

	it('pushLogData should add log data to logDataList', () => {
		const playerCell: CellType = CellType.Black;
		const message = 'Test message';

		log.pushLogData(playerCell, message);

		expect(log.logDataList.length).toBe(1);
		expect(log.logDataList[0].playerCell).toBe(playerCell);
		expect(log.logDataList[0].message).toBe(message);
	});

	it('fetchLogData should return logDataList', () => {
		const logDataList = log.fetchLogData();

		expect(logDataList).toEqual([]);
	});

	it('UnitConversion should convert Point to string correctly', () => {
		const point: Point = { x: 0, y: 0 };

		const result = log.UnitConversion(point);

		expect(result).toBe('[A,1]');
	});

	it('makeMessageInvalidTurn should return correct message', () => {
		const result = log.makeMessageInvalidTurn();

		expect(result).toBe('置ける場所がありませんでした。ターンを入れ替えます');
	});
});
