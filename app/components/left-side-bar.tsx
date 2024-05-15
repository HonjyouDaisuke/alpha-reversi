import { useRouter } from "next/navigation";
import Image from "next/image";
import titleImage from "@/img/osero-illust17.png";
import CharactorBox from "./charactor-box";
import HintBox from "./hint-box";

export function LeftSideBar() {
  return (
    <div className="flex flex-col h-full p-3">
      <div className="w-full h-full bg-blue-200 rounded shadow">
        <div className="flex flex-col w-full items-center">
          <Image
            className="justify-center"
            src={titleImage}
            height="150"
            width="150"
            alt={"Alpha Reversi"}
            priority={true}
          />
        </div>
        <CharactorBox />
        <HintBox />
      </div>
    </div>
  );
}
