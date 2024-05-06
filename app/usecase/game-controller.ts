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

export class GameController {
  players = new Player();
  turnControl = new TurnController(0, 1);
  rule = new RuleControl();
  boardController = new BoardController();
  evaluation = new Evaluation();
  score = new Score();
  status = StatusType.Prepare;

  constructor() {}

  getTurn(): TurnType {
    //const [turnControl] = useAtom(turnControlAtom);
    return this.turnControl.getCurrentTurn();
    //return this.turnControl.getCurrentTurn();
  }
  gameInterval() {
    console.log(`status = ${this.status} Turn = ${this.getTurn()}`);
    const paths = this.rule.findValidPlace(
      this.boardController.getCurrentBoard(),
      this.turnControl.getCurrentTurnCell()
    );

    console.log(`可能なパスは${paths.length}個あります。`);
    switch (this.status) {
      case StatusType.Prepare:
        this.boardController.clearAbleCell();
        if (this.getTurn() === TurnType.TurnA) {
          const newBoard = this.boardController.setAbleCell(paths);
          if (newBoard !== null && newBoard?.board !== undefined) {
            this.boardController.setNewBoard(newBoard.board);
          }
          //this.boardController.setAbleCell(paths);
        }
        this.status = StatusType.Waiting;
        break;

      case StatusType.Waiting:
        if (paths.length <= 0) {
          console.log("パスが見つかりませんでした。ターンを変えます。");
          this.turnControl.changeTurn();
          // TODO:RecomendCellを消す必要があると思う
          this.status = StatusType.Prepare;
          break;
        }

        if (this.getTurn() === TurnType.TurnB) {
          console.log("コンピュータのターンです。");
          console.log("盤面は以下です");
          console.log(this.boardController.getCurrentBoard());
          console.log("置ける場所は以下です。");
          console.log(paths);
          if (paths.length > 0) {
            const newBoard = this.boardController.setNewPiece(
              paths[0],
              this.turnControl.getCurrentTurnCell()
            );
            if (newBoard === null) {
              console.log("置けませんでした");
              return;
            }
            console.log(`ボードに置きます${this.turnControl.getCurrentTurn()}`);
            //setBoard(newBoard);
            this.boardController.setNewBoard(newBoard.board);
            this.score.getScore(newBoard.board);
            this.score.printScore();
            console.log(
              `ボードに置きました${this.turnControl.getCurrentTurn()}`
            );
            const evaluationScore = this.evaluation.getEvaluation(
              newBoard.board
            );
            console.log(`スコア：${evaluationScore}`);
            //turnController.turnChange();
            console.log(`プレーヤーを入れ替えます${this.getTurn()}`);
            this.turnControl.changeTurn();
            console.log(`プレーヤー入れ替えました。`);
            this.turnControl.printCurrentTurn();
            this.status = StatusType.Prepare;
          }
        }

        break;
      default:
        break;
    }
  }

  printTurn() {
    this.turnControl.printCurrentTurn();
  }

  putHumanPiece(p: Point) {
    console.log(`セルがクリックされました player=${this.getTurn()}`);
    if (this.getTurn() !== TurnType.TurnA) {
      console.log("あなたのターンではありません。");
      return;
    }

    console.log(p);
    const newBoard = this.boardController.setNewPiece(
      p,
      this.turnControl.getCurrentTurnCell()
    );
    if (newBoard === null) {
      console.log("置けませんでした");
      return;
    }
    console.log(`ボードに置きます${this.turnControl.getCurrentTurn()}`);
    //setBoard(newBoard);
    this.boardController.setNewBoard(newBoard.board);
    this.score.getScore(newBoard.board);
    this.score.printScore();
    console.log(`ボードに置きました${this.turnControl.getCurrentTurn()}`);
    const evaluationScore = this.evaluation.getEvaluation(newBoard.board);
    console.log(`スコア：${evaluationScore}`);
    //turnController.turnChange();
    console.log(`プレーヤーを入れ替えます${this.getTurn()}`);
    this.turnControl.changeTurn();
    console.log(`プレーヤー入れ替えました。`);
    this.turnControl.printCurrentTurn();
    this.status = StatusType.Prepare;
    /** 
		const ablePath = this.rule.findValidPlace(
			newBoard.board,
			this.turnControl.getPieceColor(this.turn)
		);
		console.log(
			`player = ${this.turnControl.getUserId(
				this.turn
			)} (color) ${this.turnControl.getPieceColor(this.turn)}`
		);
		console.log(ablePath);
		console.log(`おける場所は${ablePath.length}個あります`);
		if (ablePath.length < 1) {
			console.log("置く場所がありません。パスします");
			this.turnControl.turnChange(this.turn);
			const ablePath2 = this.rule.findValidPlace(
				newBoard.board,
				this.turnControl.getPieceColor(this.turn)
			);
			if (ablePath2.length < 1) {
				console.log("置く場所がありません。ゲーム終了です。");
				//setIsModalOpen(true);
			}
		}
		console.log(`player==>${this.turnControl.getCurrentTurn(this.turn)}`);
		console.log(newBoard.board);
		**/
  }
}
