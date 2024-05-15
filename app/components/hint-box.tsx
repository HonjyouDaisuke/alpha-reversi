interface ExplainProps {
  str: string;
  classes: string;
}

function ExplainHint({ str, classes }: ExplainProps) {
  const classesStr = `${classes} border border-black h-4 w-4`;
  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <div className={classesStr}></div>
      <div>{str}</div>
    </div>
  );
}
export default function HintBox() {
  return (
    <>
      <div className=" text-lg text-start p-2 font-bold">ヒントの見方</div>
      <div className="border-4 p-2 border-green-800 m-4 rounded-lg">
        <div className="flex flex-col gap-2 justify-start">
          <ExplainHint str="置けないところ" classes="bg-green-500" />
          <ExplainHint str="置けるところ" classes="bg-pink-300" />
          <ExplainHint str="おすすめのところ" classes="bg-pink-500" />
        </div>
      </div>
    </>
  );
}
