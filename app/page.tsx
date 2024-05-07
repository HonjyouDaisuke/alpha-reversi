"use client";
import Board from "./components/board";
import { BoardClass } from "./entity/board/board";
import { useEffect, useRef, useState } from "react";
import { CellType } from "./entity/cell/cell-type";
import { BoardController } from "./entity/board/board-controller";
import { TurnType } from "./entity/turn/turn-type";
import { TurnController } from "./usecase/turn-controller";
import { Turn } from "./entity/turn/turn";
import { Score } from "./entity/score/score";
import { RuleControl } from "./usecase/rule-control";
import { ScoreBoard } from "./components/score-board";
import { ScoreType } from "./entity/score/score-type";
import { Evaluation } from "./entity/evaluation/evaluation";
import { ComputerControl } from "./usecase/computer-control";
import ConfirmModal from "./components/confirm-modal";
import { GameController } from "./usecase/game-controller";
import { atom } from "jotai";
import { useAtom } from "jotai/react";

const gameContorlAtom = atom(new GameController());

export default function Home() {
	const [board, setBoard] = useState<BoardClass>(new BoardClass());
	const [turn, setTurn] = useState<TurnType>(TurnType.TurnA);
	const [score, setScore] = useState<Score>(new Score());
	const [isModalOpen, setIsModalOpen] = useState(true);
	const boardController = new BoardController();
	//const turnController = new TurnController();
	const [status, setStatus] = useState(false);
	const eveluation = new Evaluation();
	const [isBoardChange, setIsBoardChange] = useState(false);
	const [dummyState, setDummyState] = useState(0); // ダミーの状態変数
	const [gameControl, setGameContorl] = useAtom(gameContorlAtom);
	const [currentBoard, setCurrentBoard] = useState(
		gameControl.boardController.board
	);
	//const score = new Score();
	//const rule = new RuleControl();
	//let newBoard: BoardClass | null = new BoardClass();
	const intervalId = setInterval(() => {
		//console.log("set Interval")
		//setDummyState(dummyState + 1);
		//console.log(dummyState);
		gameControl.gameInterval(intervalId);
		setBoard(gameControl.boardController.getCurrentBoardClass());
		const newState = status === true ? false : true;
		setStatus(newState);
		// const player: CellType = turnController.getPieceColor(turn);
		// if (player === 1 || isBoardChange === false) return;
		// console.log(`computerの手を考えます`);
		// if (newBoard === null) return;
		// console.log(newBoard.board);
		// setIsBoardChange(false);
		// const com = new ComputerControl([...board.board]);
		// const path = rule.findValidPlace(board.board, player);
		// const selectPath = com.miniMax(board.board, 1, path[0], player);
		// if (selectPath !== null) {
		//   const newBoard = boardController.setNewPiece(board, selectPath, player);
		// }
		// turnController.turnChange(turn);
	}, 10000);

	function handleCellClick(x: number, y: number) {
		//console.log(turn);
		gameControl.putHumanPiece({ x: x, y: y });
		console.log("人間の手完了です。下は変更後です。");
		setBoard(gameControl.boardController.getCurrentBoardClass());
		//setTurn(gameControl.getTurn());
		console.log(gameControl.boardController.getCurrentBoardClass());
		const newState = status === true ? false : true;
		setStatus(newState);
		// const player: CellType = turnController.getPieceColor(turn);
		// setIsBoardChange(false);
		// if (player === 2) return;
		// newBoard = boardController.setNewPiece(board, { x: x, y: y }, player);
		// if (newBoard === null) {
		//   console.log("置けませんでした");
		//   return;
		// }
		// console.log(`ボードに置きます${turnController.getCurrentTurn(turn)}`);
		// setBoard(newBoard);
		// score.getScore(newBoard.board);
		// score.printScore();
		// console.log(`ボードに置きました${turnController.getCurrentTurn(turn)}`);
		// const evaluationScore = eveluation.getEvaluation(newBoard.board);
		// console.log(`スコア：${evaluationScore}`);
		// //turnController.turnChange();
		// console.log(
		//   `プレーヤーを入れ替えます${turnController.getCurrentTurn(turn)}`
		// );
		// turnController.turnChange(turn);
		// console.log(
		//   `プレーヤー入れ替えました。${turnController.getCurrentTurn(turn)}`
		// );
		// const ablePath = rule.findValidPlace(
		//   newBoard.board,
		//   turnController.getPieceColor(turn)
		// );
		// console.log(
		//   `player = ${turnController.getUserId(
		//     turn
		//   )} (color) ${turnController.getPieceColor(turn)}`
		// );
		// console.log(ablePath);
		// console.log(`おける場所は${ablePath.length}個あります`);
		// if (ablePath.length < 1) {
		//   console.log("置く場所がありません。パスします");
		//   turnController.turnChange(turn);
		//   const ablePath2 = rule.findValidPlace(
		//     newBoard.board,
		//     turnController.getPieceColor(turn)
		//   );
		//   if (ablePath2.length < 1) {
		//     console.log("置く場所がありません。ゲーム終了です。");
		//     setIsModalOpen(true);
		//   }
		// }
		// console.log(`player==>${player}`);
		// console.log(newBoard.board);
		// forceUpdate();
		//console.log("chenged!!");
		//console.log(`Turn type = ${turn}`);
		//console.log(board.board);
		//console.log(newBoard.board);
	}

	useEffect(() => {
		//console.log(board.board);
		//console.log("Change???");
		//console.log(turnController.getCurrentTurn());
		//turnController.turnChange();
		//console.log(turnController.getCurrentTurn());
		//setTurn(turnController.getCurrentTurn());
	}, [isModalOpen]);
	useEffect(() => {
		console.log(`currentBoard に変化あり`);
		console.log(board);
	}, [board]);


	// useEffect(() => {
	// 	console.log(`ターンが変わりました turn=${turn}`);
	// 	console.log(`turn = ${gameControl.getTurn()}`);
	// 	gameControl.printTurn();
	// }, [turn]);
	return (
		<div className="h-screen w-screen flex flex-col">
			<Board gameBoard={board.board} onClick={handleCellClick} />
			<ScoreBoard score={score.score} />
			<ConfirmModal
				isOpen={isModalOpen}
				title={"ゲーム終了"}
				setIsOpen={setIsModalOpen}
			>
				ゲーム終了でーす。
			</ConfirmModal>
		</div>
	);
}
