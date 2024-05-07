"use client";
import Board from "./components/board";
import { useState } from "react";
import { Score } from "./entity/score/score";
import { ScoreBoard } from "./components/score-board";
import ConfirmModal from "./components/confirm-modal";
import { GameController } from "./usecase/game-controller";
import { atom } from "jotai";
import { useAtom } from "jotai/react";

const gameContorlAtom = atom(new GameController());

export default function Home() {
  const [score, setScore] = useState<Score>(new Score());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [gameControl, setGameContorl] = useAtom(gameContorlAtom);

  const intervalId = setInterval(() => {
    if (gameControl.gameInterval()) {
      clearInterval(intervalId);
      setIsModalOpen(true);
    }
    const newState = status === true ? false : true;
    setStatus(newState);
  }, 10000);

  function handleCellClick(x: number, y: number) {
    gameControl.putHumanPiece({ x: x, y: y });
    console.log("人間の手完了です。下は変更後です。");
    console.log(gameControl.boardController.getCurrentBoardClass());
    const newState = status === true ? false : true;
    setStatus(newState);
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Board
        gameBoard={gameControl.boardController.getCurrentBoard()}
        onClick={handleCellClick}
      />
      <ScoreBoard score={gameControl.getScore().score} />
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
