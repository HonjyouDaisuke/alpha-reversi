"use client";
import { atom, useAtom } from "jotai";
import Board from "../components/board";
import { BoardController } from "../entity/board/board-controller";
import { Point } from "../entity/cell/point-type";
import { Evaluation } from "../entity/evaluation/evaluation";
import { Player, PlayerData } from "../entity/player/player-type";
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
import { MessageType } from "@/entity/message/message-type";
import { Message } from "@/entity/message/message";

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
	message = new Message();

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

	getMessageData(): MessageType {
		return this.message.getMessage();
	}

	getUseHint(): boolean {
		return this.useHint;
	}

	getPlayerName(playerIdMethod: () => number | undefined): string | undefined {
		const id = playerIdMethod();
		return id !== undefined ? this.players.getPlayerData(id)?.displayName : undefined;
	}

	getPlayerAName(): string | undefined {
		return this.getPlayerName(() => this.turnControl.getPlayerAId());
	}

	getPlayerBName(): string | undefined {
		return this.getPlayerName(() => this.turnControl.getPlayerBId());
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
			this.completeGame();
			return true;
		}

		const paths = this.rule.findValidPlace(
			this.boardController.getCurrentBoard(),
			this.turnControl.getCurrentTurnCell()
		);

		const playerData = this.players.getPlayerData(this.turnControl.getCurrentPlayerId());

		if (this.status === StatusType.Prepare) {
			this.handlePrepareStatus(paths, playerData);
		} else if (this.status === StatusType.Waiting) {
			this.handleWaitingStatus(paths, playerData);
		}

		return false;
	}

	private completeGame(): void {
		this.status = StatusType.Completed;
		const message = this.log.makeMessageEnded(this.score);
		this.log.pushLogData(null, message);
	}

	private handlePrepareStatus(paths: Point[], playerData: PlayerData | null | undefined): void {
		this.boardController.clearAbleCell();
		this.status = StatusType.Waiting;

		if (playerData?.isCom || !this.useHint) return;

		console.log(`turntype--->${this.turnControl.getCurrentTurn()}`);
		this.message.setMessage("ヒント準備中。。。", true);
		const newBoard = this.boardController.setAbleCell(paths, this.turnControl.getCurrentTurnCell());
		console.log(`ヒントを作成しました。`);

		if (newBoard === null || newBoard?.board === undefined) return;

		this.boardController.setNewBoard(newBoard.board);
		console.log(this.boardController.getCurrentBoard());
	}

	private handleWaitingStatus(paths: Point[], playerData: PlayerData | null | undefined): void {
		if (paths.length <= 0) {
			this.handleInvalidTurn();
			return;
		}

		if (!playerData?.isCom) {
			this.message.setMessage("あなたの番です", false);
		} else {
			this.handleComputerTurn(playerData);
		}
	}

	private handleInvalidTurn(): void {
		const message = this.log.makeMessageInvalidTurn();
		const playerCell = this.turnControl.getCurrentTurnCell();
		this.log.pushLogData(playerCell, message);
		this.turnControl.changeTurn();
		this.boardController.clearAbleCell();
		this.status = StatusType.Prepare;
	}

	private handleComputerTurn(playerData: PlayerData): void {
		this.message.setMessage(`${playerData.displayName}の番です。(思考中・・・)`, true);
		let depth = playerData.computer?.depth ?? 0;
		const computer = new ComputerControl(this.boardController.getCurrentBoard(), depth);
		const post = computer.getComputerPost(this.turnControl.getCurrentTurnCell());

		if (post !== null) {
			this.putPiece(post);
		}
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
			this.message.setMessage("そこには置けませんでした。", false);
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
