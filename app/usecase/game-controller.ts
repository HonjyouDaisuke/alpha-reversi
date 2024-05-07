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

  getScore(): Score {
    return this.score;
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
      console.log("終了でーす♪");
    }
    //console.log(`status = ${this.status} Turn = ${this.getTurn()}`);
    const paths = this.rule.findValidPlace(
      this.boardController.getCurrentBoard(),
      this.turnControl.getCurrentTurnCell()
    );

    switch (this.status) {
      case StatusType.Prepare:
        this.boardController.clearAbleCell();
        this.status = StatusType.Waiting;
        if (this.getTurn() !== TurnType.TurnA) break;

        const newBoard = this.boardController.setAbleCell(paths);
        if (newBoard === null || newBoard?.board === undefined) break;

        this.boardController.setNewBoard(newBoard.board);
        console.log(`置くことが可能なパスは${paths.length}個あります。`);
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
          const computer = new ComputerControl(
            this.boardController.getCurrentBoard()
          );
          console.log("コンピュータのターンです。");
          console.log("盤面は以下です");
          console.log(this.boardController.getCurrentBoard());
          console.log("置ける場所は以下です。");
          console.log(paths);
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

  putPiece(p: Point) {
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
  }

  putHumanPiece(p: Point) {
    console.log(`セルがクリックされました player=${this.getTurn()}`);
    if (this.getTurn() !== TurnType.TurnA) {
      console.log("あなたのターンではありません。");
      return;
    }

    console.log(p);
    this.putPiece(p);
  }
}
