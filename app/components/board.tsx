"use client";
import Cell from "./cell";

interface Props {
  gameBoard: number[][];
  onClick: (x: number, y: number) => void;
}
export default function Board({ gameBoard, onClick }: Props) {
  // TODO:座標をつけたい・・・
  const xItems = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
  const yItems = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return (
    <div>
      <div className="container flex">
        {xItems.map((item, index) => (
          <div
            key={index}
            className="w-12 flex flex-row justify-center text-center text-black"
          >
            {xItems[index]}
          </div>
        ))}
      </div>

      {gameBoard.map((row: number[], y: number) => (
        <div key={y} className="flex flex-row">
          <div
            key={y}
            className="h-12 w-12 flex justify-end pr-2 items-center text-black"
          >
            {yItems[y]}
          </div>

          {row.map((cell: number, x: number) => (
            <div key={`${x}-${y}`} className="flex flex-col">
              <Cell onClick={() => onClick(x, y)} cellItem={gameBoard[y][x]} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
