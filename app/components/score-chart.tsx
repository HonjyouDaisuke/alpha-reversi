"use client"
import { CSSProperties, useEffect, useState } from "react";
import { ScoreType } from "@/entity/score/score-type"

interface Props {
	score: ScoreType,
}
function getSize(num: number): number {
	return Math.round(num / 64 * 100);
}
export default function ScoreChart({ score }: Props) {
	const [classString, setClassString] = useState("");

	useEffect(() => {
		const blackSize = getSize(score.blackCount);
		const whiteSize = getSize(score.whiteCount);

		const newClassString = `grid grid-cols-[${blackSize}%,auto,${whiteSize}%] h-8 shadow-lg`;
		setClassString(newClassString);
	}, [score.blackCount, score.whiteCount]);

	console.log(classString);

	return (
		<div className="h-8 w-full">
			<div className={classString}>
				<div className="w-custom bg-black text-center text-white rounded-l">{score.blackCount}</div>
				<div className="w-custom bg-gray-300"></div>
				<div className="w-custom bg-white text-center text-black rounded-r">{score.whiteCount}</div>
			</div>
		</div >
	)
}