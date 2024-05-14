"use client";
import Board from "@/components/board";
import { useEffect, useReducer, useState } from "react";
import { Score } from "@/entity/score/score";
import { ScoreBoard } from "@/components/score-board";
import ConfirmModal from "@/components/confirm-modal";
import { GameController } from "@/usecase/game-controller";
import { PrimitiveAtom, atom } from "jotai";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Player } from "@/entity/player/player-type";
import { RightSideBar } from "@/components/right-side-bar";
import { LeftSideBar } from "@/components/left-side-bar";
import ScoreChart from "@/components/score-chart";

const gameControlAtom = atom(new GameController());

export default function ReversiPage() {
	const router = useRouter();
	const [score, setScore] = useState<Score>(new Score());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [status, setStatus] = useState(false);
	const [gameControl, setGameContorl] = useAtom(gameControlAtom);
	let initStatus = false;
	const searchParams = useSearchParams();
	const playerA = Number(searchParams.get("playerA"));
	const playerB = Number(searchParams.get("playerB"));
	const [completeMessage, setMessage] = useState("");
	const intervalId = setInterval(() => {
		if (gameControl.gameInterval()) {
			clearInterval(intervalId);
			setMessage(gameControl.getCompleteMessage());
			setIsModalOpen(true);
		}
		const newState = status === true ? false : true;
		setStatus(newState);
	}, 100);

	function handleCellClick(x: number, y: number) {
		gameControl.putHumanPiece({ x: x, y: y });
		console.log("人間の手完了です。下は変更後です。");
		console.log(gameControl.boardController.getCurrentBoardClass());
		const newState = status === true ? false : true;
		setStatus(newState);
	}

	function handleModalOK() {
		setGameContorl(new GameController());
		router.push("/");
	}

	useEffect(() => {
		gameControl.setPlayer(playerA, playerB);
	}, []);

	return (
		<div className="flex w-screen h-screen flex-row bg-yellow-50">
			<div className="w-1/4 h-full">
				<RightSideBar />
			</div>
			<div className="w-1/2 h-full flex flex-col">
				<Board
					gameBoard={gameControl.boardController.getCurrentBoard()}
					onClick={handleCellClick}
				/>
				<ScoreChart score={gameControl.getScore().score} />
			</div>
			<div className="w-1/4 h-full">
				<LeftSideBar />
			</div>
			<ConfirmModal
				isOpen={isModalOpen}
				title={"ゲーム終了"}
				setIsOpen={setIsModalOpen}
				onCloseAction={handleModalOK}
			>
				{completeMessage}
			</ConfirmModal>
		</div>
	);
}
