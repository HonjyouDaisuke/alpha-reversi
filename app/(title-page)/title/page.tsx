'use client'
import Button from "@/components/button";
import { Player } from "@/entity/player/player-type";
import titleImage from "@/img/osero-illust17.png";
import titleStrImage from "@/img/title.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function TitleBoard() {
	const players = new Player();
	const [playerA, setPlayerA] = useState(0);
	const [playerB, setPlayerB] = useState(0);

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

		const href = `/reversi?${params}`;
		router.push(href);
	}
	return (
		<div className="h-screen w-screen flex bg-gray-600 items-center justify-center">
			<div className="bg-white rounded p-4 text-black shadow">
				<div className="flex flex-row">
					<Image src={titleImage} width="150" height="150" alt={"Alpha Reversi"} />
					<Image src={titleStrImage} height="100" alt={"Alpha Reversi"} />

				</div>
				<div className="grid grid-cols-2">
					<div className="flex flex-col">
						<div className="border-blue-200 border">先手(黒)</div>
						<select
							name="playerA"
							size={players.players.length}
							className="w-full"
							defaultValue={0}
							onChange={handleChangePlayerA}
						>
							{players.players.map((item) => (
								<option key={item.id} value={item.id} className="hover:bg-blue-300">
									{item.displayName}
								</option>
							))}
						</select>
					</div>
					<div className="flex flex-col">
						<div className=" border-pink-200 border">後手(白)</div>
						<select
							name="playerB"
							size={players.players.length}
							className="w-full"
							defaultValue={0}
							onChange={handleChangePlayerB}
						>
							{players.players.map((item) => (
								<option key={item.id} value={item.id} className="hover:bg-pink-300">
									{item.displayName}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex w-full justify-center m-3">
					<Button onClick={handleButton} mode={0}>★ゲームスタート★</Button>
				</div>
			</div>
		</div>
	);
}
