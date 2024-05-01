interface Props {
  cellItem: number;
  onClick: () => void;
}
export default function Cell({ cellItem, onClick }: Props) {
  return (
    <div
      onClick={() => onClick()}
      className="border-black border bg-green-500 w-12 h-12 flex items-center justify-center hover:cursor-pointer"
    >
      {cellItem === 1 && <div className="text-black text-6xl">●</div>}
      {cellItem === 2 && <div className="text-white text-6xl">●</div>}
    </div>
  );
}
