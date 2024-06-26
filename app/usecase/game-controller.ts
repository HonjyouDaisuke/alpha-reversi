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


	setPlayer(playerA: number, playerB: number) {
		this.turnControl.setPlayer(playerA, playerB);
	}

	setUseHint(useHint: boolean | null) {
		this.useHint = useHint ?? false;
	}

	fetchLogData(): LogType[] {
		return this.log.fetchLogData();
	}

	// getMessageData(): MessageType {
	// 	return this.message.getMessage();
	// }

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

	gameInterval(setMessage: React.Dispatch<React.SetStateAction<MessageType>>): boolean {
		if (this.status === StatusType.Completed) {
			return true;
		}
		if (this.isCompleted()) {
			this.status = StatusType.Completed;
			const message = this.log.makeMessageEnded(this.score);
			this.log.pushLogData(null, message);
			setMessage({ message: "試合終了", useSpinner: false });
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

		this.handleGameStatus(paths, playerData, setMessage);
		return false;
	}

	private handleGameStatus(
		paths: Point[],
		playerData: PlayerData | null | undefined,
		setMessage: React.Dispatch<React.SetStateAction<MessageType>>
	): void {
		setMessage({ message: "よしいくぞ！", useSpinner: true });
		if (this.status === StatusType.Prepare) {
			this.handlePrepareStatus(paths, playerData, setMessage);
		} else if (this.status === StatusType.Waiting) {
			setMessage({ message: "かかってきやがれ", useSpinner: true });

			this.handleWaitingStatus(paths, playerData, setMessage);
		}
	}

	private handlePrepareStatus(
		paths: Point[],
		playerData: PlayerData | null | undefined,
		setMessage: React.Dispatch<React.SetStateAction<MessageType>>
	): void {
		this.boardController.clearAbleCell();
		this.status = StatusType.Waiting;
		const displayName = this.players.getPlayerData(this.turnControl.getCurrentPlayerId())?.displayName;
		setMessage({ message: `${displayName} 思考中・・・`, useSpinner: true });

		if (playerData?.isCom || !this.useHint) return;

		setMessage({ message: "ヒント準備中。。。", useSpinner: true });
		const newBoard = this.boardController.setAbleCell(
			paths,
			this.turnControl.getCurrentTurnCell()
		);
		if (newBoard) this.boardController.setNewBoard(newBoard.board);
	}

	private handleWaitingStatus(
		paths: Point[],
		playerData: PlayerData | null | undefined,
		setMessage: React.Dispatch<React.SetStateAction<MessageType>>
	): void {

		if (paths.length === 0) {
			this.handleInvalidTurn();
		} else if (!playerData?.isCom) {
			setMessage({ message: "あなたの番です", useSpinner: false });
		} else {
			setMessage({ message: "コンピュータの番です", useSpinner: true });
			this.handleComputerTurn(playerData, setMessage);
		}
	}

	private handleInvalidTurn(): void {
		const message = this.log.makeMessageInvalidTurn();
		this.log.pushLogData(this.turnControl.getCurrentTurnCell(), message);
		this.turnControl.changeTurn();
		this.boardController.clearAbleCell();
		this.status = StatusType.Prepare;
	}

	private handleComputerTurn(playerData: PlayerData, setMessage: React.Dispatch<React.SetStateAction<MessageType>>): void {
		setMessage({ message: `${playerData.displayName}の番です。(思考中・・・)`, useSpinner: true });
		const computer = new ComputerControl(
			this.boardController.getCurrentBoard(),
			playerData.computer?.depth ?? 0
		);
		const post = computer.getComputerPost(
			this.turnControl.getCurrentTurnCell()
		);
		if (post) this.putPiece(post, setMessage);
	}

	putPiece(p: Point, setMessage: React.Dispatch<React.SetStateAction<MessageType>>): boolean {
		const newBoard = this.boardController.setNewPiece(
			p,
			this.turnControl.getCurrentTurnCell()
		);
		if (!newBoard) {
			setMessage({ message: "そこには置けませんでした。", useSpinner: false });
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

	putHumanPiece(p: Point, setMessage: React.Dispatch<React.SetStateAction<MessageType>>) {
		const playerData = this.players.getPlayerData(
			this.turnControl.getCurrentPlayerId()
		);
		if (playerData?.isCom) return;
		if (this.putPiece(p, setMessage)) this.boardController.clearAbleCell();
	}
}
