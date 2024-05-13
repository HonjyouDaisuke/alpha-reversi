import { CellType } from "../entity/cell/cell-type";
import blackCell from "@/img/osero-illust1.png";
import whiteCell from "@/img/osero-illust2.png";
import Image from "next/image";

interface Props {
  cellItem: CellType;
  onClick: () => void;
}

function BlackCell() {
  return <Image src={blackCell} alt="black" height="46" width="46" />;
}

function WhiteCell() {
  return <Image src={whiteCell} alt="white" height="46" width="46" />;
}

export default function Cell({ cellItem, onClick }: Props) {
  let bgColor: string;
  let textColor: string;
  let piece: number | null;

  switch (cellItem) {
    case CellType.Empty:
      bgColor = "bg-green-500";
      textColor = "";
      piece = null;
      break;
    case CellType.Black:
      bgColor = "bg-green-500";
      textColor = "text-black";
      piece = 1;
      break;
    case CellType.White:
      bgColor = "bg-green-500";
      textColor = "text-white";
      piece = 2;
      break;
    case CellType.Able:
      bgColor = "bg-pink-300";
      textColor = "";
      piece = null;
      break;
    case CellType.Recommend:
      bgColor = "bg-pink-500";
      textColor = "";
      piece = null;
      break;
    default:
      bgColor = "";
      textColor = "";
      piece = null;
  }

  const cellClasses =
    "border-black border w-12 h-12 flex items-center justify-center hover:cursor-pointer " +
    bgColor;
  const textClasses = "text-6xl " + textColor;
  let cell: JSX.Element | null = null;

  if (cellItem === CellType.Black) {
    cell = <BlackCell />;
  } else if (cellItem === CellType.White) {
    cell = <WhiteCell />;
  }

  return (
    <div onClick={onClick} className={cellClasses}>
      <div className={textClasses}>{cell && cell}</div>
    </div>
  );
}
