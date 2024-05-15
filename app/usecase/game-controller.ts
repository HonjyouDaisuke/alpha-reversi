"use client";
import { atom, useAtom } from "jotai";
import Board from "../components/board";
import { BoardController } from "../entity/board/board-controller";
import { Point } from "../entity/cell/point-type";
import { Evaluation } from "../entity/evaluation/evaluation";
import { Player } from "../entity/player/player-type";
import { Score } from "../entity/score/score";
import { Turn } from "../entity/turn/turn";
import { TurnType } from "../entity/turn/turn-type";
import { RuleControl } from "./rule-control";
import { TurnController } from "./turn-controller";
import { CellType } from "../entity/cell/cell-type";
import Cell from "../components/cell";
import { StatusType } from "../entity/status/status-type";
import { ComputerControl } from "./computer-control";
import { setting } from "../entity/setting/setting";
import { Log } from "@/entity/log/log";
import { LogType } from "@/entity/log/log-type";

export class GameController {
	players = new Player();
	turnControl = new TurnController();
	rule = new RuleControl();
	useHint = false;
	boardController = new BoardController();
	evaluation = new Evaluation();
	score = new Score();
	status = StatusType.Prepare;
	log = new Log();

	constructor() { }

	setPlayer(playerA: number, playerB: number) {
		this.turnControl.setPlayer(playerA, playerB);
	}

	setUseHint(useHint: boolean | null) {
		if (useHint === null) useHint = false;
		this.useHint = useHint;
	}

	fetchLogData(): LogType[] {
		return this.log.fetchLogData();
	}

	getUseHint(): boolean {
		return this.useHint;
	}
	getPlayerAName(): string | undefined {
		const id = this.turnControl.getPlayerAId();
		return this.players.getPlayerData(id)?.displayName;
	}

	getPlayerBName(): string | undefined {
		const id = this.turnControl.getPlayerBId();
		return this.players.getPlayerData(id)?.displayName;
	}

	getTurn(): TurnType {
		return this.turnControl.getCurrentTurn();
	}

	getScore(): Score {
		return this.score;
	}

	getCompleteMessage(): string {
		const score = this.getScore();
		const black = score.getBlackScore();
		const white = score.getWhiteScore();
		const playerAId = this.turnControl.getPlayerAId();
		const playerAData = this.players.getPlayerData(playerAId);
		const playerBId = this.turnControl.getPlayerBId();
		const playerBData = this.players.getPlayerData(playerBId);

		const winData = black > white ? playerAData : playerBData;

		return `${winData?.displayName}の勝ち！！${playerAData?.displayName} - 黒:${black}個 vs 白:${white} - ${playerBData?.displayName}でした。`;
	}

	isCompleted(): boolean {
		const paths1 = this.rule.findValidPlace(
			this.boardController.getCurrentBoard(),
			CellType.Black
		);
		if (paths1.length > 0) return false;

		const paths2 = this.rule.findValidPlace(
			this.boardController.getCurrentBoard(),
			CellType.White
		);
		if (paths2.length > 0) return false;

		return true;
	}

	gameInterval(): boolean {
		if (this.status === StatusType.Completed) return true;
		if (this.isCompleted()) {
			this.status = StatusType.Completed;
			const message = this.log.makeMessageEnded(this.score);
			this.log.pushLogData(null, message);
		}
		//console.log(`status = ${this.status} Turn = ${this.getTurn()}`);
		const paths = this.rule.findValidPlace(
			this.boardController.getCurrentBoard(),
			this.turnControl.getCurrentTurnCell()
		);

		const playerData = this.players.getPlayerData(
			this.turnControl.getCurrentPlayerId()
		);

		switch (this.status) {
			case StatusType.Prepare:
				this.boardController.clearAbleCell();
				this.status = StatusType.Waiting;
				if (playerData?.isCom) break;
				if (!this.useHint) break;
				const newBoard = this.boardController.setAbleCell(paths);
				if (newBoard === null || newBoard?.board === undefined) break;

				this.boardController.setNewBoard(newBoard.board);

				break;

			case StatusType.Waiting:
				if (paths.length <= 0) {
					const message = this.log.makeMessageInvalidTurn();
					const playerCell = this.turnControl.getCurrentTurnCell();
					this.log.pushLogData(playerCell, message);
					this.turnControl.changeTurn();
					this.boardController.clearAbleCell();
					this.status = StatusType.Prepare;
					break;
				}
				// Comの処理
				if (playerData?.isCom) {
					let depth = 0;
					if (playerData.computer !== null) depth = playerData.computer.depth;
					const computer = new ComputerControl(
						this.boardController.getCurrentBoard(),
						depth
					);
					const post = computer.getComputerPost(
						this.turnControl.getCurrentTurnCell()
					);
					if (post === null) break;
					this.putPiece(post);
				}
				break;

			default:
				break;
		}
		return false;
	}

	printTurn() {
		this.turnControl.printCurrentTurn();
	}

	putPiece(p: Point): boolean {
		const newBoard = this.boardController.setNewPiece(
			p,
			this.turnControl.getCurrentTurnCell()
		);
		if (newBoard === null) {
			console.log("置けませんでした");
			return false;
		}
		console.log(`ボードに置きます${this.turnControl.getCurrentTurn()}`);
		//setBoard(newBoard);
		this.boardController.setNewBoard(newBoard.board);
		this.score.getScore(newBoard.board);
		this.score.printScore();
		console.log(`ボードに置きました${this.turnControl.getCurrentTurn()}`);
		const evaluationScore = this.evaluation.getEvaluation(
			newBoard.board,
			this.turnControl.getCurrentTurnCell()
		);
		const message = this.log.makeMessageFromPut(p, this.score);
		const playerCell = this.turnControl.getCurrentTurnCell();
		this.log.pushLogData(playerCell, message);

		console.log(`プレーヤーを入れ替えます${this.getTurn()}`);
		this.turnControl.changeTurn();
		console.log(`プレーヤー入れ替えました。`);
		this.turnControl.printCurrentTurn();
		this.status = StatusType.Prepare;

		return true;
	}

	putHumanPiece(p: Point) {
		console.log(`セルがクリックされました player=${this.getTurn()}`);
		const playerData = this.players.getPlayerData(
			this.turnControl.getCurrentPlayerId()
		);

		if (playerData?.isCom) {
			console.log("あなたのターンではありません。");
			return;
		}

		//console.log(p);
		if (!this.putPiece(p)) return;
		this.boardController.clearAbleCell();
	}
}
