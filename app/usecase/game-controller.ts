"use client";
import { BoardController } from "./board-controller";
import { Point } from "../entity/cell/point-type";
import { Evaluation } from "../entity/evaluation/evaluation";
import { Player, PlayerData } from "../entity/player/player-type";
import { Score } from "../entity/score/score";
import { TurnType } from "../entity/turn/turn-type";
import { RuleControl } from "./rule-control";
import { TurnController } from "./turn-controller";
import { CellType } from "../entity/cell/cell-type";
import { StatusType } from "../entity/status/status-type";
import { ComputerControl } from "./computer-control";
import { Log } from "@/entity/log/log";
import { LogType } from "@/entity/log/log-type";
import { MessageType } from "@/entity/message/message-type";
import { Message } from "@/entity/message/message";
import Winner, { ModalType } from "@/entity/winner/winner";

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

	private playerName(
		playerIdMethod: () => number | undefined
	): string | undefined {
		const id = playerIdMethod();
		return id !== undefined
			? this.players.getPlayerData(id)?.displayName
			: undefined;
	}

	getPlayerName(playerAorB: number): string | undefined {
		if (playerAorB === 0)
			return this.playerName(() => this.turnControl.getPlayerAId());
		return this.playerName(() => this.turnControl.getPlayerBId());
	}

	getTurn(): TurnType {
		return this.turnControl.getCurrentTurn();
	}

	getScore(): Score {
		return this.score;
	}

	getCompleteMessage(): ModalType {
		const playerAId = this.turnControl.getPlayerAId();
		const playerAData = this.players.getPlayerData(playerAId);
		const playerBId = this.turnControl.getPlayerBId();
		const playerBData = this.players.getPlayerData(playerBId);
		if (playerAData === null || playerBData === null)
			return {
				message: "勝者データが見つかりませんでした。",
				title: "エラーが発生しました",
			};

		const winner = new Winner(this.score, [playerAData, playerBData]);
		return winner.makeModalMessage();
	}

	isCompleted(): boolean {
		const currentBoard = this.boardController.getCurrentBoard();
		return (
			this.rule.findValidPlace(currentBoard, CellType.Black).length === 0 &&
			this.rule.findValidPlace(currentBoard, CellType.White).length === 0
		);
	}
	testMatch(): Score {
		while (this.status !== StatusType.Completed) {
			if (this.isCompleted()) {
				this.status = StatusType.Completed;
				//const message = this.log.makeMessageEnded(this.score);
				//this.log.pushLogData(null, message);
				break;
			}

			const currentBoard = this.boardController.getCurrentBoard();
			const paths = this.rule.findValidPlace(
				currentBoard,
				this.turnControl.getCurrentTurnCell()
			);
			const playerData = this.players.getPlayerData(
				this.turnControl.getCurrentPlayerId()
			);

			this.handleGameStatus(paths, playerData);
		}
		return this.getScore();
	}
	gameInterval(): boolean {
		if (this.status === StatusType.Completed) return true;
		if (this.isCompleted()) {
			this.status = StatusType.Completed;
			const message = this.log.makeMessageEnded(this.score);
			this.log.pushLogData(null, message);
			return true;
		}

		const currentBoard = this.boardController.getCurrentBoard();
		const paths = this.rule.findValidPlace(
			currentBoard,
			this.turnControl.getCurrentTurnCell()
		);
		const playerData = this.players.getPlayerData(
			this.turnControl.getCurrentPlayerId()
		);

		this.handleGameStatus(paths, playerData);
		return false;
	}

	private handleGameStatus(
		paths: Point[],
		playerData: PlayerData | null | undefined
	): void {
		if (this.status === StatusType.Prepare) {
			this.handlePrepareStatus(paths, playerData);
		} else if (this.status === StatusType.Waiting) {
			this.handleWaitingStatus(paths, playerData);
		}
	}

	private handlePrepareStatus(
		paths: Point[],
		playerData: PlayerData | null | undefined
	): void {
		this.boardController.clearAbleCell();
		this.status = StatusType.Waiting;

		if (playerData?.isCom || !this.useHint) return;

		this.message.setMessage("ヒント準備中。。。", true);
		const newBoard = this.boardController.setAbleCell(
			paths,
			this.turnControl.getCurrentTurnCell()
		);
		if (newBoard) this.boardController.setNewBoard(newBoard.board);
	}

	private handleWaitingStatus(
		paths: Point[],
		playerData: PlayerData | null | undefined
	): void {
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
		this.message.setMessage(
			`${playerData.displayName}の番です。(思考中・・・)`,
			true
		);
		const computer = new ComputerControl(
			this.boardController.getCurrentBoard(),
			playerData.computer?.depth ?? 0
		);
		const post = computer.getComputerPost(
			this.turnControl.getCurrentTurnCell()
		);
		if (post) this.putPiece(post);
	}

	putPiece(p: Point): boolean {
		const newBoard = this.boardController.setNewPiece(
			p,
			this.turnControl.getCurrentTurnCell()
		);
		if (!newBoard) {
			this.message.setMessage("そこには置けませんでした。", false);
			return false;
		}
		this.boardController.setNewBoard(newBoard.board);
		this.score.getScore(newBoard.board);
		const message = this.log.makeMessageFromPut(p, this.score);
		this.log.pushLogData(this.turnControl.getCurrentTurnCell(), message);
		this.turnControl.changeTurn();
		this.status = StatusType.Prepare;
		return true;
	}

	putHumanPiece(p: Point) {
		const playerData = this.players.getPlayerData(
			this.turnControl.getCurrentPlayerId()
		);
		if (playerData?.isCom) return;
		if (this.putPiece(p)) this.boardController.clearAbleCell();
	}
}
