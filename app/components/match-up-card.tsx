import Image from "next/image";
import BlackCell from "@/img/osero-illust1.png";
import WhiteCell from "@/img/osero-illust2.png";

interface Props {
	playerAName: string | undefined;
	playerBName: string | undefined;
	useHint: boolean | undefined;
}
export default function MatchUpCard({ playerAName, playerBName, useHint }: Props) {
	return (
		<div className="flex flex-row gap-2 text-center rounded p-3 h-18 items-center justify-center w-full shadow bg-green-200">
			<Image src={BlackCell} width="46" height="46" alt="先手" />
			<div className="text-black">{playerAName && playerAName}</div>
			<div className="text-black">vs</div>
			<div className="text-black">{playerBName && playerBName}</div>
			<Image src={WhiteCell} width="46" height="46" alt="後手" />
			{useHint === true ? "ヒントあり" : ""}
		</div>
	);
}