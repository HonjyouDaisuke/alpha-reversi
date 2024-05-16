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
		this.useHint = useHint ?? false;
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
		const black = this.score.getBlackScore();
		const white = this.score.getWhiteScore();
		const [playerAId, playerBId] = [this.turnControl.getPlayerAId(), this.turnControl.getPlayerBId()];
		const [playerAData, playerBData] = [this.players.getPlayerData(playerAId), this.players.getPlayerData(playerBId)];
		const winData = black > white ? playerAData : playerBData;
		return `${winData?.displayName}の勝ち！！${playerAData?.displayName} - 黒:${black} vs 白:${white} - ${playerBData?.displayName}でした。`;
	}

	isCompleted(): boolean {
		const paths = [
			this.rule.findValidPlace(this.boardController.getCurrentBoard(), CellType.Black),
			this.rule.findValidPlace(this.boardController.getCurrentBoard(), CellType.White)
		];
		return paths.every(path => path.length === 0);
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
		this.handleGameStatus(paths, playerData);
		return false;
	}

	private completeGame(): void {
		this.status = StatusType.Completed;
		const message = this.log.makeMessageEnded(this.score);
		this.log.pushLogData(null, message);
	}

	private handleGameStatus(paths: Point[], playerData: PlayerData | null | undefined): void {
		this.status === StatusType.Prepare ? this.prepareStatus(paths, playerData) : this.waitingStatus(paths, playerData);
	}

	private prepareStatus(paths: Point[], playerData: PlayerData | null | undefined): void {
		this.boardController.clearAbleCell();
		this.status = StatusType.Waiting;
		if (!playerData?.isCom && this.useHint) {
			this.message.setMessage("ヒント準備中。。。", true);
			const newBoard = this.boardController.setAbleCell(paths, this.turnControl.getCurrentTurnCell());
			if (newBoard) this.boardController.setNewBoard(newBoard.board);
		}
	}

	private waitingStatus(paths: Point[], playerData: PlayerData | null | undefined): void {
		if (paths.length === 0) {
			this.handleInvalidTurn();
		} else if (!playerData?.isCom) {
			this.message.setMessage("あなたの番です", false);
		} else {
			this.handleComputerTurn(playerData);
		}
	}

	private handleInvalidTurn(): void {
		const message = this.log.makeMessageInvalidTurn();
		this.log.pushLogData(this.turnControl.getCurrentTurnCell(), message);
		this.turnControl.changeTurn();
		this.boardController.clearAbleCell();
		this.status = StatusType.Prepare;
	}

	private handleComputerTurn(playerData: PlayerData): void {
		this.message.setMessage(`${playerData.displayName}の番です。(思考中・・・)`, true);
		const computer = new ComputerControl(this.boardController.getCurrentBoard(), playerData.computer?.depth ?? 0);
		const post = computer.getComputerPost(this.turnControl.getCurrentTurnCell());
		if (post) this.putPiece(post);
	}

	printTurn() {
		this.turnControl.printCurrentTurn();
	}

	putPiece(p: Point): boolean {
		const newBoard = this.boardController.setNewPiece(p, this.turnControl.getCurrentTurnCell());
		if (!newBoard) {
			this.message.setMessage("そこには置けませんでした。", false);
			return false;
		}
		this.boardController.setNewBoard(newBoard.board);
		this.score.getScore(newBoard.board);
		this.score.printScore();
		const message = this.log.makeMessageFromPut(p, this.score);
		this.log.pushLogData(this.turnControl.getCurrentTurnCell(), message);
		this.turnControl.changeTurn();
		this.status = StatusType.Prepare;
		return true;
	}

	putHumanPiece(p: Point) {
		const playerData = this.players.getPlayerData(this.turnControl.getCurrentPlayerId());
		if (playerData?.isCom) return;
		if (this.putPiece(p)) this.boardController.clearAbleCell();
	}
}
