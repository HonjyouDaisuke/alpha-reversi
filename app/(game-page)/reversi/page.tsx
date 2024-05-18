"use client";
import Board from "@/components/board";
import { Suspense, useEffect, useState } from "react";
import ConfirmModal from "@/components/confirm-modal";
import { GameController } from "@/usecase/game-controller";
import { PrimitiveAtom, atom } from "jotai";
import { useAtom } from "jotai/react";
import { RightSideBar } from "@/components/right-side-bar";
import { LeftSideBar } from "@/components/left-side-bar";
import ScoreChart from "@/components/score-chart";
import { useRouter, useSearchParams } from "next/navigation";
import MatchUpCard from "@/components/match-up-card";
import MessageBoard from "@/components/message-board";
import Button from "@/components/button";
import { MessageType } from "@/entity/message/message-type";
import { LogType } from "@/entity/log/log-type";

export const gameControlAtom = atom<GameController>(new GameController());
export default function ReversiPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReversiPageContent />
    </Suspense>
  );
}

function ReversiPageContent() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [gameControl, setGameControl] = useAtom(gameControlAtom);
  const searchParams = useSearchParams();
  const [completeMessage, setCompleteMessage] = useState("");
  const [completeTitle, setCompleteTitle] = useState("");
  const [message, setMessage] = useState<MessageType>({
    message: null,
    useSpinner: false,
  });

  useEffect(
    () =>
      setupGameControlInterval(
        gameControl,
        setCompleteMessage,
        setCompleteTitle,
        setIsModalOpen,
        setMessage,
        setStatus
      ),
    [gameControl]
  );
  useEffect(
    () => initializeGameControl(searchParams, gameControl),
    [searchParams, gameControl]
  );

  return (
    <div className="flex w-screen h-screen flex-row bg-yellow-50">
      <LeftSideBarWrapper />
      <MainContent
        gameControl={gameControl}
        message={message}
        handleCellClick={(x: number, y: number) =>
          updateGameControlWithMove(gameControl, x, y, setStatus)
        }
        handleGiveUp={() => resetGameControl(setGameControl, router)}
      />
      <RightSideBarWrapper logData={gameControl.fetchLogData()} />
      <ConfirmModalWrapper
        isModalOpen={isModalOpen}
        completeMessage={completeMessage}
        title={completeTitle}
        handleModalOK={() => resetGameControl(setGameControl, router)}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

const setupGameControlInterval = (
  gameControl: GameController,
  setCompleteMessage: React.Dispatch<React.SetStateAction<string>>,
  setCompleteTitle: React.Dispatch<React.SetStateAction<string>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>,
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const intervalId = setInterval(() => {
    if (gameControl.gameInterval()) {
      clearInterval(intervalId);
      setCompleteMessage(gameControl.getCompleteMessage());
      setCompleteTitle(gameControl.getCompleteTitle());
      setIsModalOpen(true);
    }
    setMessage(gameControl.getMessageData());
    setStatus((prev) => !prev);
  }, 100);
  return () => clearInterval(intervalId);
};

const initializeGameControl = (
  searchParams: URLSearchParams,
  gameControl: GameController
) => {
  const playerA = Number(searchParams.get("playerA"));
  const playerB = Number(searchParams.get("playerB"));
  const useHint = searchParams.get("useHint") === "true";
  gameControl.setPlayer(playerA, playerB);
  gameControl.setUseHint(useHint);
};

const updateGameControlWithMove = (
  gameControl: GameController,
  x: number,
  y: number,
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
) => {
  gameControl.putHumanPiece({ x, y });
  setStatus((prev) => !prev);
};

const resetGameControl = (
  setGameControl: React.Dispatch<React.SetStateAction<GameController>>,
  router: ReturnType<typeof useRouter>
) => {
  setGameControl(new GameController());
  router.push("/");
};

const LeftSideBarWrapper = () => (
  <div className="w-1/4 h-full">
    <LeftSideBar />
  </div>
);

interface MainContentProps {
  gameControl: GameController;
  message: MessageType;
  handleCellClick: (x: number, y: number) => void;
  handleGiveUp: () => void;
}

const MainContent = ({
  gameControl,
  message,
  handleCellClick,
  handleGiveUp,
}: MainContentProps) => (
  <div className="w-1/2 h-full flex flex-col gap-3 p-3 items-center">
    <MatchUpCard
      playerAName={gameControl.getPlayerName(0)}
      playerBName={gameControl.getPlayerName(1)}
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
);

interface RightSideBarWrapperProps {
  logData: LogType[];
}

const RightSideBarWrapper = ({ logData }: RightSideBarWrapperProps) => (
  <div className="w-1/4 h-full">
    <RightSideBar logData={logData} />
  </div>
);

interface ConfirmModalWrapperProps {
  isModalOpen: boolean;
  title: string;
  completeMessage: string;
  handleModalOK: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConfirmModalWrapper = ({
  isModalOpen,
  title,
  completeMessage,
  handleModalOK,
  setIsModalOpen,
}: ConfirmModalWrapperProps) => (
  <ConfirmModal
    isOpen={isModalOpen}
    title={title}
    setIsOpen={setIsModalOpen}
    onCloseAction={handleModalOK}
  >
    {completeMessage}
  </ConfirmModal>
);
