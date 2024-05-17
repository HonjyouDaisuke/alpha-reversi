"use client";
import Button from "@/components/button";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckBox from "@/components/checkbox";
import SelectCharactor, {
  FirstSecondHand,
} from "@/components/select-charactor";
import TitleImage from "@/components/title-image";

type Selector = {
  turnAorB: FirstSecondHand;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

interface ISelector {
  selector: Selector[];
}
function SelectorComp({ selector }: ISelector) {
  return (
    <div className="grid grid-cols-2">
      {selector.map((item, index) => (
        <SelectCharactor
          key={index}
          firstSecond={item.turnAorB}
          onChange={item.onChange}
        />
      ))}
    </div>
  );
}

interface ICommand {
  onChangeHint: (e: FormEvent<Element>) => void;
  onStartClick: () => void;
  useHint: boolean;
}
function Command({ onChangeHint, onStartClick, useHint }: ICommand) {
  return (
    <div className="flex w-full justify-center items-center gap-4 p-3">
      <CheckBox onChange={onChangeHint} value={useHint} label="ヒント" />
      <Button onClick={onStartClick} mode={0}>
        ★ゲームスタート★
      </Button>
    </div>
  );
}

export default function TitleBoard() {
  const [playerA, setPlayerA] = useState(0);
  const [playerB, setPlayerB] = useState(0);
  const [useHint, setUseHint] = useState(false);
  const selector: Selector[] = [
    { turnAorB: FirstSecondHand.First, onChange: handleChangePlayerA },
    { turnAorB: FirstSecondHand.Second, onChange: handleChangePlayerB },
  ];
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
    params.append("useHint", String(useHint));

    const href = `/reversi?${params}`;
    router.push(href);
  }

  function handleHint() {
    setUseHint(!useHint);
  }

  return (
    <div className="h-screen w-screen flex bg-gray-600 items-center justify-center">
      <div className="bg-white rounded p-4 text-black shadow">
        <TitleImage />
        <SelectorComp selector={selector} />
        <Command
          onChangeHint={handleHint}
          useHint={useHint}
          onStartClick={handleButton}
        />
      </div>
    </div>
  );
}
