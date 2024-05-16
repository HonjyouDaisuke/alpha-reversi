"use client";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckBox from "@/components/checkbox";
import SelectCharactor, { FirstSecondHand } from "@/components/select-charactor";
import TitleImage from "@/components/title-image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function TitleBoard() {
	const [playerA, setPlayerA] = useState(0);
	const [playerB, setPlayerB] = useState(0);
	const [useHint, setUseHint] = useState(false);
	const router = useRouter();

	const handleButton = () => navigateToReversi(router, playerA, playerB, useHint);
	function handleHint() {
		setUseHint(!useHint);
	}
	return (
		<div className="h-screen w-screen flex bg-gray-600 items-center justify-center">
			<div className="bg-white rounded p-4 text-black shadow">
				<TitleImage />
				<div className="grid grid-cols-2">
					<SelectCharactor firstSecond={FirstSecondHand.First} onChange={(e) => setPlayerA(Number(e.target.value))} />
					<SelectCharactor firstSecond={FirstSecondHand.Second} onChange={(e) => setPlayerB(Number(e.target.value))} />
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

const navigateToReversi = (router: AppRouterInstance, playerA: number, playerB: number, useHint: boolean) => {
	const params = new URLSearchParams();
	params.append("playerA", String(playerA));
	params.append("playerB", String(playerB));
	params.append("useHint", String(useHint));

	const href = `/reversi?${params}`;
	router.push(href);
};
