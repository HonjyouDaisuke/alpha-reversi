"use client";
import Cell from "./cell";

interface Props {
	gameBoard: number[][];
	onClick: (x: number, y: number) => void;
}
export default function Board({ gameBoard, onClick }: Props) {
	//console.log("ボード表示します");
	//console.log(gameBoard);
	return (
		<div>
			{gameBoard.map((row: number[], y: number) => (
				<div key={y} className="flex flex-row">
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
