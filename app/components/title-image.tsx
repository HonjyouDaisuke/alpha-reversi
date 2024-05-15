import Image from "next/image";
import titleImage from "@/img/osero-illust17.png";
import titleStrImage from "@/img/title.png";

export default function TitleImage() {
	return (
		<div className="flex flex-row items-end">
			<Image src={titleImage} height="150" width="150" alt={"Alpha Reversi"} priority={true} />
			<Image className="justify-items-end" src={titleStrImage} height="100" alt={"Alpha Reversi"} priority={true} />
		</div>
	);
}