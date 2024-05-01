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

export class GameController {
  players = new Player();
  turn = new Turn(this.players.players[0].id, this.players.players[1].id);
  turnControl = new TurnController();
  rule = new RuleControl();
  boardController = new BoardController();
  evaluation = new Evaluation();
  score = new Score();

  constructor() {}

  getTurn(): TurnType {
    return this.turnControl.getCurrentTurnType();
  }
  gameInterval() {
    //console.log(this.getTurn());
  }

  putHumanPiece(p: Point) {
    console.log(`セルがクリックされました player=${this.getTurn()}`);
    if (this.turnControl.getCurrentTurnType() !== TurnType.TurnA) return;
    console.log(p);
    const newBoard = this.boardController.setNewPiece(
      p,
      this.turn.pieceColor[this.getTurn()]
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
    console.log(`プレーヤーを入れ替えます${this.turnControl.getCurrentTurn()}`);
    this.turnControl.turnChange();
    console.log(
      `プレーヤー入れ替えました。${this.turnControl.getCurrentTurn()}`
    );
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
