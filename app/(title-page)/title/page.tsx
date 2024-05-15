"use client";
import Button from "@/components/button";
import { Player } from "@/entity/player/player-type";
import titleImage from "@/img/osero-illust17.png";
import titleStrImage from "@/img/title.png";
//import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CheckBox from "@/components/checkbox";
import SelectCharactor, { FirstSecondHand } from "@/components/select-charactor";
import TitleImage from "@/components/title-image";

export default function TitleBoard() {
	const [playerA, setPlayerA] = useState(0);
	const [playerB, setPlayerB] = useState(0);
	const [useHint, setUseHint] = useState(false);

	const router = useRouter();
	function handleChangePlayerA(event: React.ChangeEvent<HTMLSelectElement>) {
		setPlayerA(Number(event.target.value));
	}

	function handleChangePlayerB(event: React.ChangeEvent<HTMLSelectElement>) {
		setPlayerB(Number(event.target.value));
	}

	function handleButton() {
		const params = new URLSearchParams();
		params.append("playerA", String(playerA));
		params.append("playerB", String(playerB));
		params.append("useHint", String(useHint));

		const href = `/reversi?${params}`;
		router.push(href);
	}

	function handleHint() {
		console.log(`useHint = ${useHint}`);
		setUseHint(!useHint);
	}

	return (
		<div className="h-screen w-screen flex bg-gray-600 items-center justify-center">
			<div className="bg-white rounded p-4 text-black shadow">
				<TitleImage />
				<div className="grid grid-cols-2">
					<SelectCharactor firstSecond={FirstSecondHand.First} onChange={handleChangePlayerA} />
					<SelectCharactor firstSecond={FirstSecondHand.Second} onChange={handleChangePlayerB} />
				</div>
				<div className="flex w-full justify-center items-center gap-4 p-3">
					<CheckBox onChange={handleHint} value={useHint}>
						ヒント
					</CheckBox>
					<Button onClick={handleButton} mode={0}>
						★ゲームスタート★
					</Button>
				</div>
			</div>
		</div>
	);
}
