import { useRouter } from "next/navigation";
import Button from "./button";
import { useAtom } from "jotai";
import { gameControlAtom } from "@/(game-page)/reversi/page";
import { GameController } from "@/usecase/game-controller";
import Image from "next/image";
import titleImage from "@/img/osero-illust17.png";
import titleStrImage from "@/img/title.png";
import CharactorBox from "./charactor-box";
import HintBox from "./hint-box";

export function LeftSideBar() {
	const router = useRouter();
	const [gameControl, setGameContorl] = useAtom(gameControlAtom);

	return (
		<div className="flex flex-col h-full p-3">
			<div className="w-full h-full bg-blue-200 rounded shadow">
				<div className="flex flex-col w-full items-center">
					<Image className="justify-center" src={titleImage} height="150" width="150" alt={"Alpha Reversi"} priority={true} />
				</div>
				<CharactorBox />
				<HintBox />
			</div>
		</div>
	);
}
