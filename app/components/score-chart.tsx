import { ScoreType } from "@/entity/score/score-type";

interface Props {
	score: ScoreType,
}

function getPostArray(score: ScoreType): number[] {
	let p: number[] = [];
	const maxCells = 64;
	for (let i = 0; i < score.blackCount; i++) {
		p.push(0);
	}
	for (let i = score.blackCount; i < maxCells - score.whiteCount; i++) {
		p.push(1);
	}
	for (let i = maxCells - score.whiteCount; i < maxCells; i++) {
		p.push(2);
	}
	return p;
}

function PutCell({ p }: { p: number }) {
	const cellColor = ["bg-black", "bg-gray-300", "bg-white"];
	const classes = `w-full ${cellColor[p]}`;

	return <div className={classes}></div>;
}
export default function ScoreChart({ score }: Props) {

	return (
		<div className=" flex flex-row rounded h-12 w-full p-2 gap-2 m-3 shadow bg-green-200">
			<div className="w-16 text-right">黒:{score.blackCount}</div>
			<div className={"flex h-full flex-row w-full"}>
				{getPostArray(score).map((c, index) => {
					return (
						<PutCell key={index} p={c} />
					)
				})}
			</div>
			<div className="w-16">{score.whiteCount}:白</div>
		</div >
	)
}