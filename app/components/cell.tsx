import { CellType } from "../entity/cell/cell-type";

interface Props {
  cellItem: CellType;
  onClick: () => void;
}

export default function Cell({ cellItem, onClick }: Props) {
  let bgColor: string;
  let textColor: string;
  let piece: string;

  switch (cellItem) {
    case CellType.Empty:
      bgColor = "bg-green-500";
      textColor = "";
      piece = "";
      break;
    case CellType.Black:
      bgColor = "bg-green-500";
      textColor = "text-black";
      piece = "●";
      break;
    case CellType.White:
      bgColor = "bg-green-500";
      textColor = "text-white";
      piece = "●";
      break;
    case CellType.Able:
      bgColor = "bg-pink-300";
      textColor = "";
      piece = "";
      break;
    case CellType.Recommend:
      bgColor = "bg-pink-500";
      textColor = "";
      piece = "";
      break;
    default:
      bgColor = "";
      textColor = "";
      piece = "";
  }

  const cellClasses =
    "border-black border w-12 h-12 flex items-center justify-center hover:cursor-pointer " +
    bgColor;
  const textClasses = "text-6xl " + textColor;

  return (
    <div onClick={() => onClick()} className={cellClasses}>
      <div className={textClasses}>{piece}</div>
    </div>
  );
}
