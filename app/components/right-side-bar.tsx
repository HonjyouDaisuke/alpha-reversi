import { LogType } from "@/entity/log/log-type";
import LogCard from "./log-card";

interface Props {
	logData: LogType[];
}
export function RightSideBar({ logData }: Props) {
	const reversedLogData = logData.slice().reverse();

	return (
		<div className="h-full p-3">
			<div className="flex flex-col w-full h-full bg-gray-300 rounded shadow">
				<div className="text-lg font-bold p-3 text-black">★対戦履歴★</div>
				<div className="flex flex-col gap-2 w-full h-full px-3 overflow-auto">

					{reversedLogData.map((item, index) => (
						<LogCard key={index} logData={item} />
					))}

				</div>
			</div>
		</div>
	);
}
