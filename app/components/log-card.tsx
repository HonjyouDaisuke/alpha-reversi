import { CellType } from "@/entity/cell/cell-type";
import { LogType } from "@/entity/log/log-type";
import blackCell from "@/img/osero-illust1.png";
import whiteCell from "@/img/osero-illust2.png";
import Image from "next/image";

interface Props {
  logData: LogType;
}
function BlackIcon() {
  return <Image src={blackCell} alt="black" width="48" />;
}

function WhiteIcon() {
  return <Image src={whiteCell} alt="white" width="48" />;
}

export default function LogCard({ logData }: Props) {
  let cell: JSX.Element | null = null;

  if (logData.playerCell === CellType.Black) {
    cell = <BlackIcon />;
  } else if (logData.playerCell === CellType.White) {
    cell = <WhiteIcon />;
  }

  return (
    <div className="p-3 w-full flex flex-row items-center bg-emerald-200 shadow rounded">
      {cell && cell}
      {logData.message}
    </div>
  );
}
