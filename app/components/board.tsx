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
