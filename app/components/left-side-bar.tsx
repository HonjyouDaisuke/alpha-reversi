import { useRouter } from "next/navigation";
import Button from "./button";
import { useAtom } from "jotai";
import { gameControlAtom } from "@/(game-page)/reversi/page";
import { GameController } from "@/usecase/game-controller";

export function LeftSideBar() {
  const router = useRouter();
  const [gameControl, setGameContorl] = useAtom(gameControlAtom);

  function handleGiveUp() {
    setGameContorl(new GameController());
    router.push("/");
  }
  return (
    <div className="flex flex-col h-full p-3">
      <div className="w-full h-full bg-blue-200 rounded shadow">
        <Button onClick={handleGiveUp} mode={0}>
          降参(๑•́ ₃ •̀๑)
        </Button>
      </div>
    </div>
  );
}
