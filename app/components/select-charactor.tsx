import { Player } from "@/entity/player/player-type";

export enum FirstSecondHand {
	First = 0,
	Second,
}

interface Props {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	firstSecond: FirstSecondHand;
}

export default function SelectCharactor({ onChange, firstSecond }: Props) {
	const players = new Player();
	const firstSecondStr = firstSecond === FirstSecondHand.First ? "先手(黒)" : "後手(白)";
	const classes = firstSecond === FirstSecondHand.First ? "border-blue-200 border border-2" : "border-pink-200 border border-2";
	const hoverClass = firstSecond === FirstSecondHand.First ? "hover:bg-pink-300" : "hover:bg-blue-300";
	return (
		<div className="flex flex-col">
			<div className={classes}>{firstSecondStr}</div>
			<select name="playerA" size={players.players.length} className="w-full" defaultValue={0} onChange={onChange}>
				{players.players.map((item) => (
					<option key={item.id} value={item.id} className={hoverClass}>
						{item.displayName}
					</option>
				))}
			</select>
		</div>
	);
}