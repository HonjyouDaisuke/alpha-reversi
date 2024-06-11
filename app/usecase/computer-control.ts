import { json } from "stream/consumers";
import { CellType } from "../entity/cell/cell-type";
import { Point } from "../entity/cell/point-type";
import { Computer, Computers } from "../entity/computer/computer";
import { Evaluation } from "../entity/evaluation/evaluation";
import { TurnType } from "../entity/turn/turn-type";
import { RuleControl } from "./rule-control";
import { TurnController } from "./turn-controller";
import Cell from "@/components/cell";

type PosEvaluation = {
	evaluation: number;
	point: Point | null;
};

export class ComputerControl {
	supportMap: number[][];
	com = new Computers();
	comNo = 1;
	depth = 0;

	constructor(map: number[][], depth: number) {
		this.supportMap = JSON.parse(JSON.stringify(map));
		this.depth = depth;
	}

	playerChange(player: CellType): CellType {
		return player === CellType.Black ? CellType.White : CellType.Black;
	}

	getComputerPost(cell: CellType): Point | null {
		if (this.depth === 0) {
			return this.getRandomPos(this.supportMap, cell);
		}
		const pointEvaluation = this.getMinMax(
			this.supportMap,
			this.depth,
			cell,
			cell
		);

		if (pointEvaluation?.point === undefined) {
			return null;
		}
		return pointEvaluation?.point;
	}

	getRandomInt(max: number): number {
		return Math.floor(Math.random() * (max + 1));
	}

	getRandomPos(board: number[][], playerCell: CellType): Point | null {
		const rouleControll = new RuleControl();
		const paths = rouleControll.findValidPlace(board, playerCell);
		if (paths.length <= 0) return null;
		const randomNum = this.getRandomInt(paths.length);
		return paths[randomNum];
	}

	getMinMax(
		board: number[][],
		depth: number,
		playerCell: CellType,
		computerCell: CellType
	): PosEvaluation | null {
		const evaluationClass = new Evaluation();
		const rouleControll = new RuleControl();
		let positionEvaluations: PosEvaluation[] = [];
		const paths = rouleControll.findValidPlace(board, playerCell);

		if (depth === 0 || paths.length <= 0) {
			return {
				point: null,
				evaluation: evaluationClass.getEvaluation([...board], computerCell),
			};
		}
		for (let i = 0; i < paths.length; i++) {
			const map = JSON.parse(JSON.stringify(board));
			const puttedMap = rouleControll.flipPiece([...map], paths[i], playerCell);
			positionEvaluations.push(
				this.getMinMax(
					[...puttedMap],
					depth - 1,
					this.playerChange(playerCell),
					computerCell
				)!
			);
			positionEvaluations[i].point = paths[i];
		}

		let selectEval = 0;
		if (computerCell === playerCell) {
			selectEval = Math.max(...positionEvaluations.map((pe) => pe.evaluation));
		} else {
			selectEval = Math.min(...positionEvaluations.map((pe) => pe.evaluation));
		}
		const selectedPosition = positionEvaluations.find(
			(pe) => pe.evaluation === selectEval
		);
		if (selectedPosition === null || selectedPosition === undefined)
			return null;
		return selectedPosition;
	}
}
