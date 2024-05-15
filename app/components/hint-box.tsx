export default function HintBox() {
	return (
		<>
			<div className=" text-lg text-start p-2 font-bold">ヒントの見方</div>
			<div className="border-4 p-2 border-green-800 m-4 rounded-lg">
				<div className="flex flex-col gap-2 justify-start">
					<div className="flex flex-row gap-2 items-center justify-start">
						<div className="bg-green-500 border border-black h-4 w-4"></div>
						<div>置けないところ</div>
					</div>
					<div className="flex flex-row gap-2 items-center justify-start">
						<div className="bg-pink-300 border border-black h-4 w-4"></div>
						<div>置けるところ</div>
					</div>
					<div className="flex flex-row gap-2 items-center justify-start">
						<div className="bg-pink-500 border border-black h-4 w-4"></div>
						<div>おすすめのところ</div>
					</div>
				</div>
			</div>
		</>
	)
}