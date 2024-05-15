"use client";
import Board from "@/components/board";
import { useEffect, useState } from "react";
import { Score } from "@/entity/score/score";
import ConfirmModal from "@/components/confirm-modal";
import { GameController } from "@/usecase/game-controller";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { RightSideBar } from "@/components/right-side-bar";
import { LeftSideBar } from "@/components/left-side-bar";
import ScoreChart from "@/components/score-chart";
import { useRouter, useSearchParams } from "next/navigation";
import MatchUpCard from "@/components/match-up-card";
import MessageBoard from "@/components/message-board";
import Button from "@/components/button";
import { MessageType } from "@/entity/message/message-type";
import { Message } from "@/entity/message/message";
import { getComponentTypeModule } from "next/dist/server/lib/app-dir-module";

export const gameControlAtom = atom<GameController>(new GameController());

export default function ReversiPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [gameControl, setGameContorl] = useAtom(gameControlAtom);
  const searchParams = useSearchParams();
  const [completeMessage, setCompMessage] = useState("");
  const [message, setMessage] = useState<MessageType>({
    message: null,
    useSpinner: false,
  });

  const intervalId = setInterval(() => {
    if (gameControl.gameInterval()) {
      clearInterval(intervalId);
      setCompMessage(gameControl.getCompleteMessage());
      setIsModalOpen(true);
    }
    setMessage(gameControl.getMessageData());
    const newState = status === true ? false : true;
    setStatus(newState);
  }, 100);

  function handleCellClick(x: number, y: number) {
    gameControl.putHumanPiece({ x: x, y: y });
    const newState = status === true ? false : true;
    setStatus(newState);
  }

  function handleModalOK() {
    setGameContorl(new GameController());
    router.push("/");
  }

  function handleGiveUp() {
    setGameContorl(new GameController());
    router.push("/");
  }

  useEffect(() => {
    const playerA = Number(searchParams.get("playerA"));
    const playerB = Number(searchParams.get("playerB"));
    const useHint = searchParams.get("useHint") === "true" ? true : false;
    gameControl.setPlayer(playerA, playerB);
    gameControl.setUseHint(useHint);
  }, []);

  return (
    <div className="flex w-screen h-screen flex-row bg-yellow-50">
      <div className="w-1/4 h-full">
        <LeftSideBar />
      </div>
      <div className="w-1/2 h-full flex flex-col gap-3 p-3 items-center">
        <MatchUpCard
          playerAName={gameControl.getPlayerAName()}
          playerBName={gameControl.getPlayerBName()}
          useHint={gameControl.getUseHint()}
        />
        <MessageBoard messageData={message} />
        <Board
          gameBoard={gameControl.boardController.getCurrentBoard()}
          onClick={handleCellClick}
        />
        <Button onClick={handleGiveUp} mode={0}>
          降参(๑•́ ₃ •̀๑)
        </Button>
        <ScoreChart score={gameControl.getScore().score} />
      </div>
      <div className="w-1/4 h-full">
        <RightSideBar logData={gameControl.fetchLogData()} />
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
