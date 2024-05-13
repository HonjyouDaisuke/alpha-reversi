import { ScoreType } from "../entity/score/score-type";
import ScoreChart from "./score-chart";

interface Props {
  score: ScoreType;
  playerAName: string | undefined;
  playerBName: string | undefined;
}

export function ScoreBoard({ score, playerAName, playerBName }: Props) {
  return (
    <div className="flex flex-row bg-blue-900">
      <div>黒</div>
      <ScoreChart score={score} />
      <div>白</div>
    </div>
  );
}
