import { CellType } from "../cell/cell-type";

export class Evaluation {
	evaluation: number[][] = [];

	constructor() {
		this.evaluation = [
			[50, -10, 10, -1, -1, 10, -10, 50],
			[-10, -20, -1, -5, -5, -1, -20, -10],
			[10, -1, 5, -1, -1, 5, -1, 10],
			[-1, -5, -1, 0, 0, -1, -5, -1],
			[-1, -5, -1, 0, 0, -1, -5, -1],
			[10, -1, 5, -1, -1, 5, -1, 10],
			[-10, -20, -1, -5, -5, -1, -20, -10],
			[50, -10, 10, -1, -1, 10, -10, 50],
		];
	}

	getEvaluation(map: number[][], targetCell: CellType): number {
		let res = 0;
		let black = 0;
		let white = 0;
		for (let j = 0; j < map.length; j++) {
			for (let i = 0; i < map[j].length; i++) {
				const Black = map[j][i] === CellType.Black ? this.evaluation[j][i] : 0;
				const White = map[j][i] === CellType.White ? this.evaluation[j][i] : 0;
				black += Black;
				white += White;
				//res += Black - White;
			}
		}

		if (targetCell === CellType.Black) res = black - white;
		else res = white - black;
		//console.log(map);
		//console.log(
		//   `評価値計算中:black = ${black} white = ${white} target=${targetCell} 評価値:${res}`
		// );
		return res;
	}
}
