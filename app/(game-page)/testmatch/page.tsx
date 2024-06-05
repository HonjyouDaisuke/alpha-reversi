"use client";
import Button from "@/components/button";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckBox from "@/components/checkbox";
import SelectCharactor, {
	FirstSecondHand,
} from "@/components/select-charactor";
import TitleImage from "@/components/title-image";
import { GameController } from "@/usecase/game-controller";
import { Score } from "@/entity/score/score";

type Selector = {
	turnAorB: FirstSecondHand;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

interface ISelector {
	selector: Selector[];
}
function SelectorComp({ selector }: ISelector) {
	return (
		<div className="grid grid-cols-2">
			{selector.map((item, index) => (
				<SelectCharactor
					key={index}
					firstSecond={item.turnAorB}
					onChange={item.onChange}
				/>
			))}
		</div>
	);
}

interface ICommand {
	onStartClick: () => void;
}
function Command({ onStartClick }: ICommand) {
	return (
		<div className="flex w-full justify-center items-center gap-4 p-3">
			<Button onClick={onStartClick} mode={0}>
				★スタート★
			</Button>
		</div>
	);
}

export default function TestMatch() {
	const [playerA, setPlayerA] = useState(0);
	const [playerB, setPlayerB] = useState(0);
	const [useHint, setUseHint] = useState(false);
	const selector: Selector[] = [
		{ turnAorB: FirstSecondHand.First, onChange: handleChangePlayerA },
		{ turnAorB: FirstSecondHand.Second, onChange: handleChangePlayerB },
	];
	function handleChangePlayerA(event: React.ChangeEvent<HTMLSelectElement>) {
		setPlayerA(Number(event.target.value));
	}

	function handleChangePlayerB(event: React.ChangeEvent<HTMLSelectElement>) {
		setPlayerB(Number(event.target.value));
	}

	function handleButton() {
		console.log(`PlayerA = ${playerA} PlayerB = ${playerB}`);
		const matchSize = 100;
		const arr = Array(3).fill(0);
		for (let i = 0; i < matchSize; i++) {
			const startTime = performance.now();
			arr[matchMake(playerA, playerB)]++;
			const endTime = performance.now();

			console.log(`i = ${i}  time : ${~~((endTime - startTime)) / 1000}秒`);
		}
		alert(`${arr[1]}勝 ${arr[2]}敗 ${arr[0]}分け`);
	}

	function matchMake(playerA: number, playerB: number): number {
		const gameControl = new GameController();
		initializeGameControl(gameControl, playerA, playerB);
		const score = gameControl.testMatch();
		console.log(`score = ${score.getScoreText()}`);
		return checkScore(score, playerA, playerB);
	}

	// 戻り値
	// 0=引き分け
	// 1=正解
	// 2=不正解
	function checkScore(score: Score, playerA: number, playerB: number) {
		let winner: number;
		const correct = playerA > playerB ? playerA : playerB;
		const black = score.getBlackScore();
		const white = score.getWhiteScore();

		if (black === white) return 0;
		if (black > white) {
			winner = playerA;
		} else {
			winner = playerB;
		}

		if (correct === winner) return 1;
		return 2;

	}
	const initializeGameControl = (
		gameControl: GameController,
		playerA: number,
		playerB: number
	) => {
		const useHint = false;
		gameControl.setPlayer(playerA, playerB);
		gameControl.setUseHint(useHint);
	};

	return (
		<div className="h-screen w-screen flex bg-gray-600 items-center justify-center">
			<div className="bg-white rounded p-4 text-black shadow">
				<SelectorComp selector={selector} />
				<Command
					onStartClick={handleButton}
				/>
			</div>
		</div>
	);
}
