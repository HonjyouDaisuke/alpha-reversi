import Button from "@/components/button/button";
import { COLOR_CLASSES } from "@/components/button/colors";
import { Player } from "@/entity/player/player-type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        オセロゲーム
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <div className="bg-green-500">先手(黒)</div>
            <select
              name="playerA"
              size={players.players.length}
              className="w-48"
              defaultValue={0}
              onChange={handleChangePlayerA}
            >
              {players.players.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.displayName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <div className="bg-pink-500">後手(白)</div>
            <select
              name="playerA"
              size={players.players.length}
              className="w-48"
              defaultValue={0}
              onChange={handleChangePlayerB}
            >
              {players.players.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full justify-center">
          <button onClick={handleButton}>★ゲームスタート★</button>
        </div>
      </div>
    </div>
  );
}
