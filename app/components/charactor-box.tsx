export default function CharactorBox() {
	return (
		<>
			<div className=" text-lg text-start p-2 font-bold">登場キャラ</div>
			<div className="border-4 p-2 border-pink-300 m-4 rounded-lg">
				<div className="flex flex-col gap-2 justify-start">
					<div>人間さま：人間のプレーヤー</div>
					<div>貧乏神(level0)：激弱</div>
					<div>赤鬼(level1)：そこそこ強い</div>
					<div>青鬼(level2)：強い</div>
					<div>閻魔大王(level3)：激強(遅い)</div>
				</div>
			</div>
		</>
	)
}